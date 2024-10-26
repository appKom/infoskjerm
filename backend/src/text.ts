import { Request } from 'express';
import { WebClient } from '@slack/web-api';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { textDir } from './directories';

dotenv.config();
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

export const fetchTextMessagesFromChannels = async (channelIds: string[], count: number, req: Request) => {
  console.log('Fetching text messages from multiple channels...');
  
  let allMessages: any[] = [];
  
  // Store channel names to avoid multiple API calls for the same channel
  const channelNameCache: { [channelId: string]: string } = {};

  for (const channelId of channelIds) {
    // Fetch channel information to get the channel name
    const channelInfo = await web.conversations.info({ channel: channelId });
    const channelName = channelInfo.channel?.name;

    const result = await web.conversations.history({
      channel: channelId,
    });

    // Collect all valid messages from the current channel
    for (const message of result.messages || []) {
      // Filter out messages where users join/leave the channel
      if (message.subtype && (message.subtype === 'channel_join' || message.subtype === 'channel_leave')) continue;

      // Include messages with text, even if they have files or attachments
      if (message.text && !message.subtype && !message.bot_id) {
        const userInfo = await web.users.info({ user: message.user || "" });
        
        // Replace channel tags in the message text
        const processedText = await replaceChannelTags(message.text, channelNameCache);

        allMessages.push({
          id: message.ts,
          text: processedText,
          author: userInfo.user?.real_name,
          author_image: userInfo.user?.profile?.image_72,
          date: new Date(parseInt(message.ts || "") * 1000).toISOString(),
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

    const filePath = path.join(textDir, `${message.ts}.json`);
    fs.writeFileSync(filePath, JSON.stringify({
      id: message.id,
      text: message.text,
      author: message.author,
      author_image: message.author_image,
      date: message.date,
      channel_name: message.channel_name,
    }));
    console.log(`Text message saved: ${filePath}`);
    savedCount++;
  }
};

const replaceChannelTags = async (text: string, channelNameCache: { [channelId: string]: string }) => {
  const channelTagRegex = /<#(C\w+)\|?>/g;

  // Find all matches of channel tags
  const channelTagMatches = [...text.matchAll(channelTagRegex)];

  // Iterate over all found channel tags and fetch the channel names
  for (const match of channelTagMatches) {
    const channelId = match[1]; // Extract the channel ID

    // Check if the channel name is already cached
    if (!channelNameCache[channelId]) {
      // Fetch the channel name from Slack API
      const channelInfo = await web.conversations.info({ channel: channelId });
      const channelName = channelInfo.channel?.name || 'unknown-channel';
      // Cache the channel name
      channelNameCache[channelId] = channelName;
    }

    // Replace the tag in the text with the actual channel name
    text = text.replace(match[0], `#${channelNameCache[channelId]}`);
  }

  return text;
};
