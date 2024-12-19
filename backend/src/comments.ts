import { WebClient } from "@slack/web-api";
import axios from "axios";
import dotenv from "dotenv";
import { mediaContainerClient, poolPromise } from "./azureClients";
import sql from "mssql";
import sharp from "sharp";
import { fetchCustomEmojis, getMediaType } from "./media";

dotenv.config();
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

export const fetchComments = async (
  channelId: string,
  postId: string,
  parentId: string
) => {
  console.log("ChannelId:", channelId);
  const pool = await poolPromise;

  const channelInfo = await web.conversations.info({ channel: channelId });
  const channelName = channelInfo.channel?.name || "unknown-channel";

  const result = await web.conversations.replies({
    channel: channelId,
    ts: postId,
  });

  // Removes the original post from the list
  result.messages?.shift();

  // Get custom emojis for the workspace
  const customEmojis = await fetchCustomEmojis();

  let mediaCount = 0;
  for (const message of result.messages || []) {
    if (!message.files || message.files.length === 0) {
      console.log("Processing comment without attachments...");

      // Get user info
      const userInfo = await web.users.info({ user: message.user || "" });

      // Fetch reactions for the message
      const reactions = (message.reactions || []).map((reaction) => {
        const emojiUrl = customEmojis?.[reaction.name || ""] || null;
        return {
          name: reaction.name,
          count: reaction.count,
          url: emojiUrl, // Include the URL if it's a custom emoji
        };
      });

      // Generate a unique ID for the text-only message
      const messageId = message.ts || "unknown";

      // Check if the message already exists in the database
      const existing = await pool
        .request()
        .input("Id", sql.NVarChar, messageId)
        .query("SELECT * FROM MediaFiles WHERE Id = @Id");

      if (existing.recordset.length > 0) {
        console.log(`Text-only message already exists: ${messageId}`);

        const existingRecord = existing.recordset[0];
        const existingReactions = JSON.parse(existingRecord.Reactions || "[]");
        const newReactions = reactions;

        const reactionsChanged =
          JSON.stringify(existingReactions) !== JSON.stringify(newReactions);
        const textChanged = existingRecord.Text !== message.text;

        if (reactionsChanged || textChanged) {
          console.log(`Updating text-only comment record: ${messageId}`);
          await pool
            .request()
            .input("CommentId", sql.NVarChar, messageId)
            .input("Reactions", sql.NVarChar, JSON.stringify(reactions))
            .input("Text", sql.NVarChar, message.text || "").query(`
            UPDATE Comments
            SET Reactions = @Reactions,
                Text = @Text
            WHERE CommentId = @CommentId
          `);
        }
        continue;
      }

      await pool
        .request()
        .input("CommentId", sql.NVarChar, messageId)
        .input("PostId", sql.NVarChar, parentId)
        .input("Name", sql.NVarChar, `Message-${messageId}`)
        .input("Author", sql.NVarChar, userInfo.user?.real_name || "Unknown")
        .input("Username", sql.NVarChar, userInfo.user?.name || "unknown")
        .input(
          "AuthorImage",
          sql.NVarChar,
          userInfo.user?.profile?.image_72 || ""
        )
        .input(
          "Date",
          sql.DateTime,
          new Date(parseInt(message.ts || "0") * 1000)
        )
        .input("Url", sql.NVarChar, null)
        .input("Type", sql.NVarChar, "text")
        .input("Text", sql.NVarChar, message.text || "")
        .input("Reactions", sql.NVarChar, JSON.stringify(reactions))
        .input("ChannelName", sql.NVarChar, channelName).query(`
          INSERT INTO Comments (CommentId, PostId, Name, Author, Username, AuthorImage, Date, Url, Type, Text, Reactions, ChannelName)
          VALUES (@CommentId, @PostId, @Name, @Author, @Username, @AuthorImage, @Date, @Url, @Type, @Text, @Reactions, @ChannelName);
        `);

      console.log(`Text-only message saved: ${messageId}`);
      mediaCount++;
      continue;
    }

    if (message.files && message.files.length > 0) {
      const Comments = message.files.filter(
        (file) =>
          file.mimetype &&
          (file.mimetype.startsWith("image/") ||
            file.mimetype.startsWith("video/"))
      );

      for (const media of Comments) {
        // Check if media already exists in Azure SQL
        const existing = await pool
          .request()
          .input("CommentId", sql.NVarChar, media.id)
          .query("SELECT * FROM Comments WHERE CommentId = @CommentId");

        // Download media
        const response = await axios.get(media.url_private || "", {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        });

        // Get user info
        const userInfo = await web.users.info({ user: message.user || "" });

        // Fetch reactions for the message
        const reactions = (message.reactions || []).map((reaction) => {
          const emojiUrl = customEmojis?.[reaction.name || ""] || null;
          return {
            name: reaction.name,
            count: reaction.count,
            url: emojiUrl, // Include the URL if it's a custom emoji
          };
        });

        // Upload comment to Azure Blob
        const blobName = `${channelName}/${media.id}-${media.name}`;
        const blockBlobClient =
          mediaContainerClient.getBlockBlobClient(blobName);

        if (existing.recordset.length > 0) {
          console.log(`Comment already exists: ${media.id}`);

          // Compares existing data with new data to decide if an update is necessary
          const existingRecord = existing.recordset[0];

          // Checks if reactions have changed
          const existingReactions = JSON.parse(
            existingRecord.Reactions || "[]"
          );
          const newReactions = reactions;

          const reactionsChanged =
            JSON.stringify(existingReactions) !== JSON.stringify(newReactions);
          const textChanged = existingRecord.Text !== message.text;

          // If reactions has changed it updates the record
          if (reactionsChanged || textChanged) {
            console.log(`Updating comment record: ${media.id}`);

            await pool
              .request()
              .input("CommentId", sql.NVarChar, media.id)
              .input("Reactions", sql.NVarChar, JSON.stringify(reactions))
              .input("Text", sql.NVarChar, message.text || "").query(`
              UPDATE Comments
              SET Reactions = @Reactions,
                  Text = @Text
              WHERE CommentId = @CommentId
            `);

            console.log(`Comment updated: ${media.id}`);
          } else {
            console.log(`No updates required for media: ${media.id}`);
          }

          continue; // Skip to the next media file
        }

        // If media does not exist, proceed to upload and insert as new
        await blockBlobClient.upload(response.data, response.data.length);

        if (media.mimetype?.startsWith("image/")) {
          if (media.mimetype === "image/gif") {
            // **Handle GIFs without compression**
            await blockBlobClient.upload(response.data, response.data.length);
          } else {
            // **Handle other image types with compression**
            const image = sharp(response.data);
            const metadata = await image.metadata();

            let compressedImageBuffer;

            // Resize images larger than 1920px
            if (metadata.width && metadata.width > 1920) {
              compressedImageBuffer = await image
                .resize({ width: Math.min(metadata.width, 1920) })
                .jpeg({ quality: 80 })
                .toBuffer();
            } else {
              compressedImageBuffer = await image.toBuffer();
            }

            await blockBlobClient.upload(
              compressedImageBuffer,
              compressedImageBuffer.length
            );
          }
        } else if (media.mimetype?.startsWith("video/")) {
          // Uploads videos without compression**
          await blockBlobClient.upload(response.data, response.data.length);
        }

        const blobUrl = blockBlobClient.url;
        console.log(message.text);

        // Insert metadata into Azure SQL using an UPSERT (MERGE) statement
        await pool
          .request()
          .input("CommentId", sql.NVarChar, message.ts)
          .input("PostId", sql.NVarChar, parentId)
          .input("Name", sql.NVarChar, media.name || null)
          .input("Author", sql.NVarChar, userInfo.user?.real_name || "Unknown")
          .input("Username", sql.NVarChar, userInfo.user?.name || "unknown")
          .input(
            "AuthorImage",
            sql.NVarChar,
            userInfo.user?.profile?.image_72 || ""
          )
          .input(
            "Date",
            sql.DateTime,
            new Date(parseFloat(message.ts || "0") * 1000)
          )
          .input("Url", sql.NVarChar, blobUrl || null)
          .input("Type", sql.NVarChar, getMediaType(media.mimetype) || null)
          .input("Text", sql.NVarChar, message.text || "")
          .input("Reactions", sql.NVarChar, JSON.stringify(reactions))
          .input("ChannelName", sql.NVarChar, channelName)
          .input("FileUrl", sql.NVarChar, blobUrl || null).query(`
            MERGE Comments AS target
            USING (SELECT @CommentId AS CommentId) AS source
            ON target.CommentId = source.CommentId
            WHEN MATCHED THEN 
              UPDATE SET 
                PostId = @PostId,
                Name = @Name,
                Author = @Author,
                Username = @Username,
                AuthorImage = @AuthorImage,
                Date = @Date,
                Url = @Url,
                Text = @Text,
                Type = @Type,
                Reactions = @Reactions,
                ChannelName = @ChannelName,
  
                UpdatedAt = GETDATE()
            WHEN NOT MATCHED THEN
              INSERT (CommentId, PostId, Name, Author, Username, AuthorImage, Date, Url, Type, Text, Reactions, ChannelName)
              VALUES (@CommentId, @PostId, @Name, @Author, @Username, @AuthorImage, @Date, @Url, @Type, @Text, @Reactions, @ChannelName);
          `);

        console.log(`Comment saved or updated: ${blobUrl}`);
        mediaCount++;
      }
    }
  }
};
