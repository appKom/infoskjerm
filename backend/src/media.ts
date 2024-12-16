import { WebClient } from "@slack/web-api";
import axios from "axios";
import dotenv from "dotenv";
import { mediaContainerClient, poolPromise } from "./azureClients";
import sql from "mssql";
import sharp from "sharp";
import { saveComments } from "./client";

dotenv.config();
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

export const fetchMedia = async (channelId: string, count: number) => {
  console.log("Fetching media...");

  const pool = await poolPromise;

  const channelInfo = await web.conversations.info({ channel: channelId });
  const channelName = channelInfo.channel?.name || "unknown-channel";

  const result = await web.conversations.history({
    channel: channelId,
  });

  // Get custom emojis for the workspace
  const customEmojis = await fetchCustomEmojis();
  console.log("Custom emojis fetched:", customEmojis);

  let mediaCount = 0;
  for (const message of result.messages || []) {
    if (mediaCount >= count) break;

    if (message.files && message.files.length > 0) {
      const mediaFiles = message.files.filter(
        (file) =>
          file.mimetype &&
          (file.mimetype.startsWith("image/") ||
            file.mimetype.startsWith("video/"))
      );

      for (const media of mediaFiles) {
        if (mediaCount >= count) break;

        // Check if media already exists in Azure SQL
        const existing = await pool
          .request()
          .input("Id", sql.NVarChar, media.id)
          .query("SELECT * FROM MediaFiles WHERE Id = @Id");

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

        // Upload media to Azure Blob
        const blobName = `${channelName}/${media.id}-${media.name}`;
        const blockBlobClient =
          mediaContainerClient.getBlockBlobClient(blobName);

        if (existing.recordset.length > 0) {
          console.log(`Media already exists: ${media.id}`);

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

          const newComments =
            message.reply_count !== existingRecord.AmtComments;

          // If changes it updates the record
          if (reactionsChanged || textChanged || newComments) {
            console.log(`Updating media record: ${media.id}`);

            if (message.ts && media.id) {
              try {
                saveComments({
                  postId: message.ts,
                  parentId: media.id,
                });
              } catch (error) {
                console.error("Error fetching comments:", error);
              }
            }

            await pool
              .request()
              .input("Id", sql.NVarChar, media.id)
              .input("AmtComments", sql.Int, message.reply_count || 0)
              .input("Reactions", sql.NVarChar, JSON.stringify(reactions))
              .input("Text", sql.NVarChar, message.text || "").query(`
              UPDATE MediaFiles
              SET Reactions = @Reactions,
                  Text = @Text,
                  AmtComments = @AmtComments
              WHERE Id = @Id
            `);

            console.log(`Media record updated: ${media.id}`);
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

        // Insert metadata into Azure SQL using an UPSERT (MERGE) statement
        await pool
          .request()
          .input("Id", sql.NVarChar, media.id)
          .input("Name", sql.NVarChar, media.name)
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
          .input("Url", sql.NVarChar, blobUrl)
          .input("Type", sql.NVarChar, getMediaType(media.mimetype))
          .input("Text", sql.NVarChar, message.text || "")
          .input("AmtComments", sql.Int, message.reply_count || 0)
          .input("Reactions", sql.NVarChar, JSON.stringify(reactions))
          .input("ChannelName", sql.NVarChar, channelName).query(`
            MERGE MediaFiles AS target
            USING (SELECT @Id AS Id) AS source
            ON target.Id = source.Id
            WHEN MATCHED THEN 
              UPDATE SET 
                Name = @Name,
                Author = @Author,
                Username = @Username,
                AuthorImage = @AuthorImage,
                Date = @Date,
                Url = @Url,
                Text = @Text, -- Add Text to the UPDATE clause
                Type = @Type,
                AmtComments = @AmtComments,
                Reactions = @Reactions,
                ChannelName = @ChannelName
            WHEN NOT MATCHED THEN
              INSERT (Id, Name, Author, Username, AuthorImage, Date, Url, Type, Text, Reactions, AmtComments, ChannelName) -- Include Text here
              VALUES (@Id, @Name, @Author, @Username, @AuthorImage, @Date, @Url, @Type, @Text, @Reactions, @AmtComments, @ChannelName);
          `);

        if (message.ts && media.id) {
          try {
            saveComments({
              postId: message.ts,
              parentId: media.id,
            });
          } catch (error) {
            console.error("Error fetching comments:", error);
          }
        }
        console.log(`Media saved or updated: ${blobUrl}`);
        mediaCount++;
      }
    }
  }
};

export const getMediaType = (mimetype: string | undefined): string => {
  if (!mimetype) return "unknown";
  // Extract the type before the '/'
  const type = mimetype.split("/")[0];
  return type || "unknown";
};

// Fetch custom emojis for the workspace
export const fetchCustomEmojis = async () => {
  try {
    const emojiList = await web.emoji.list({});
    return emojiList.emoji;
  } catch (error) {
    console.error("Failed to fetch custom emojis:", error);
    return {};
  }
};
