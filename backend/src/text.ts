import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";
import { textContainerClient, poolPromise } from "./azureClients";
import sql from "mssql";

dotenv.config();
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

export const fetchTextMessagesFromChannels = async (
  channelIds: string[],
  count: number
) => {
  console.log("Fetching text messages from multiple channels...");

  const pool = await poolPromise;
  let allMessages: any[] = [];

  for (const channelId of channelIds) {
    // Fetch channel information to get the channel name
    const channelInfo = await web.conversations.info({ channel: channelId });
    const channelName = channelInfo.channel?.name || "unknown-channel";

    const result = await web.conversations.history({
      channel: channelId,
    });
    // Collect all valid messages from the current channel
    for (const message of result.messages || []) {
      // Filter out messages where users join/leave the channel
      if (
        message.subtype &&
        (message.subtype === "channel_join" ||
          message.subtype === "channel_leave")
      )
        continue;

      // Include messages with text, even if they have files or attachments
      if (message.text && !message.subtype && !message.bot_id) {
        const userInfo = await web.users.info({ user: message.user || "" });

        // Replace channel and user tags in the message text
        const processedText = await processText(message.text);

        allMessages.push({
          id: message.ts,
          text: processedText,
          author: userInfo.user?.real_name || "Unknown",
          author_image: userInfo.user?.profile?.image_72 || "",
          date: new Date(parseInt(message.ts || "0") * 1000).toISOString(),
          ts: message.ts,
          channel_name: channelName,
        });
      }
    }
  }
  // Sort all messages by timestamp (newest first)
  allMessages.sort((a, b) => parseFloat(b.ts) - parseFloat(a.ts));

  // Save up to the requested count of sorted messages
  let savedCount = 0;
  for (const message of allMessages) {
    if (savedCount >= count) break;

    // Check if message already exists
    const existing = await pool
      .request()
      .input("Id", sql.NVarChar, message.id)
      .query("SELECT Id FROM TextMessages WHERE Id = @Id");

    if (existing.recordset.length > 0) {
      console.log(`Text message already exists: ${message.id}`);
      continue; // Skip existing messages
    }

    // Upload text to Azure Blob
    const blobName = `${message.ts}.json`;
    const blockBlobClient = textContainerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(
      JSON.stringify({
        id: message.id,
        text: message.text,
        author: message.author,
        author_image: message.author_image,
        date: message.date,
        channel_name: message.channel_name,
      }),
      Buffer.byteLength(
        JSON.stringify({
          id: message.id,
          text: message.text,
          author: message.author,
          author_image: message.author_image,
          date: message.date,
          channel_name: message.channel_name,
        })
      )
    );

    const blobUrl = blockBlobClient.url;

    // Insert metadata into Azure SQL
    await pool
      .request()
      .input("Id", sql.NVarChar, message.id)
      .input("Text", sql.NVarChar, message.text)
      .input("Author", sql.NVarChar, message.author)
      .input("AuthorImage", sql.NVarChar, message.author_image)
      .input("Date", sql.DateTime, new Date(message.date))
      .input("ChannelName", sql.NVarChar, message.channel_name).query(`
                INSERT INTO TextMessages (Id, Text, Author, AuthorImage, Date, ChannelName)
                VALUES (@Id, @Text, @Author, @AuthorImage, @Date, @ChannelName)
            `);

    console.log(`Text message saved: ${blobUrl}`);
    savedCount++;
  }
};

const processText = async (text: string) => {
  text = await replaceChannelTags(text);
  text = await replaceUserTags(text);
  return text;
};

const replaceChannelTags = async (text: string) => {
  const channelTagRegex = /<#(C\w+)\|?>/g;
  // Find all matches of channel tags
  const channelTagMatches = [...text.matchAll(channelTagRegex)];

  // Iterate over all found channel tags and fetch the channel names
  for (const match of channelTagMatches) {
    const channelId = match[1]; // Extract the channel ID
    // Fetch the channel name from Slack API
    try {
      const channelInfo = await web.conversations.info({ channel: channelId });
      const channelName = channelInfo.channel?.name || "unknown-channel";
      // Replace the tag in the text with the actual channel name
      text = text.replace(match[0], `#${channelName}`);
    } catch (error) {
      console.error(`Error fetching channel info for ${channelId}:`, error);
      text = text.replace(match[0], "#unknown-channel");
    }
  }

  return text;
};

const replaceUserTags = async (text: string) => {
  const userTagRegex = /<@(U\w+)>/g;
  const userTagMatches = [...text.matchAll(userTagRegex)];

  for (const match of userTagMatches) {
    const userId = match[1];
    try {
      const userInfo = await web.users.info({ user: userId });
      const userName = userInfo.user?.profile?.display_name || "unknown-user";
      text = text.replace(match[0], `@${userName}`);
    } catch (error) {
      console.error(`Error fetching user info for ${userId}:`, error);
      text = text.replace(match[0], "@unknown-user");
    }
  }

  return text;
};
