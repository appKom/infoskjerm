import { WebClient } from '@slack/web-api';
import fs from 'fs';
import path from 'path';
import { Request } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { mediaDir } from './directories';

dotenv.config();
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

export const fetchMedia = async (channelId: string, count: number, req: Request) => {
  console.log('Fetching media...');
  
  // Fetch channel information to get the channel name
  const channelInfo = await web.conversations.info({ channel: channelId });
  const channelName = channelInfo.channel?.name || 'unknown-channel';

  const result = await web.conversations.history({
    channel: channelId
  });

  // Get custom emojis for the workspace
  const customEmojis = await fetchCustomEmojis();
  console.log('Custom emojis fetched:', customEmojis);

  let mediaCount = 0;
  for (const message of result.messages || []) {
    if (mediaCount >= count) break;

    if (message.files && message.files.length > 0) {
      const mediaFiles = message.files.filter(file =>
        (file.mimetype && (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')))
      );

      for (const media of mediaFiles) {
        if (mediaCount >= count) break;

        const filePath = path.join(mediaDir, `${media.id}-${media.name}`);
        const metadataPath = path.join(mediaDir, `${media.id}.json`);

        const response = await axios.get(media.url_private || "", {
          headers: { 'Authorization': `Bearer ${token}` },
          responseType: 'arraybuffer'
        });

        // Get user info
        const userInfo = await web.users.info({ user: message.user || "" });

        // Fetch reactions for the message
        const reactions = (message.reactions || []).map(reaction => {
          // Check if it's a custom emoji and get the URL
          const emojiUrl = customEmojis?.[reaction.name || 0] || null;
          return {
            name: reaction.name,
            count: reaction.count,
            url: emojiUrl // Include the URL if it's a custom emoji
          };
        });

        // Save media file
        fs.writeFileSync(filePath, response.data);

        // Save metadata file
        fs.writeFileSync(metadataPath, JSON.stringify({
          id: media.id,
          name: media.name,
          author: userInfo.user?.real_name,
          username: userInfo.user?.name,
          author_image: userInfo.user?.profile?.image_72,
          date: new Date(parseInt(message.ts || "") * 1000).toISOString(),
          url: `${req.protocol}://${req.headers.host}/media/${media.id}-${encodeURIComponent(media.name || "")}`,
          type: getMediaType(media.mimetype),
          reactions: reactions,
          channel_name: channelName
        }));

        console.log(`Media saved: ${filePath}`);
        mediaCount++;
      }
    }
  }
};

const getMediaType = (mimetype: string | undefined): string => {
  if (!mimetype) return 'unknown';

  // Extract the type before the '/'
  const type = mimetype.split('/')[0];

  return type || 'unknown';
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
