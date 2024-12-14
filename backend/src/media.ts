import { WebClient } from "@slack/web-api";
import axios from "axios";
import dotenv from "dotenv";
import { mediaContainerClient, poolPromise } from "./azureClients";
import sql from "mssql";
import sharp from "sharp";

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
          .query("SELECT Id FROM MediaFiles WHERE Id = @Id");

        if (existing.recordset.length > 0) {
          console.log(`Media already exists: ${media.id}`);
          continue; // Skip existing media
        }

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
            url: emojiUrl,
          };
        });

        // Upload media to Azure Blob
        const blobName = `${channelName}/${media.id}-${media.name}`;
        const blockBlobClient =
          mediaContainerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(response.data, response.data.length);
        const blobUrl = blockBlobClient.url;

        if (media.mimetype?.startsWith("image/")) {
          const compressedImageBuffer = await sharp(response.data)
            .resize({ width: 800 })
            .jpeg({ quality: 80 })
            .toBuffer();

          await blockBlobClient.upload(
            compressedImageBuffer,
            compressedImageBuffer.length
          );
        } else if (media.mimetype?.startsWith("video/")) {
          // TODO compress videos
          break;
        } else {
          await blockBlobClient.upload(response.data, response.data.length);
        }

        // Insert metadata into Azure SQL
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
          .input("Reactions", sql.NVarChar, JSON.stringify(reactions))
          .input("ChannelName", sql.NVarChar, channelName).query(`
                        INSERT INTO MediaFiles (Id, Name, Author, Username, AuthorImage, Date, Url, Type, Reactions, ChannelName)
                        VALUES (@Id, @Name, @Author, @Username, @AuthorImage, @Date, @Url, @Type, @Reactions, @ChannelName)
                    `);

        console.log(`Media saved: ${blobUrl}`);
        mediaCount++;
      }
    }
  }
};

const getMediaType = (mimetype: string | undefined): string => {
  if (!mimetype) return "unknown";
  const type = mimetype.split("/")[0];
  return type || "unknown";
};

// Fetch custom emojis for the workspace
const fetchCustomEmojis = async () => {
  try {
    const emojiList = await web.emoji.list({});
    return emojiList.emoji;
  } catch (error) {
    console.error("Failed to fetch custom emojis:", error);
    return {};
  }
};
