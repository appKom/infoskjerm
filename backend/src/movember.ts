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

export const fetchImagesFromDate = async (channelId: string, date: string, req: Request) => {
  const oldest = getStartOfDayTimestamp(date).toString();

  const result = await web.conversations.history({
    channel: channelId,
    oldest,
    inclusive: true
  });

  // Filter and collect image files
  const imageFiles = [];
  for (const message of result.messages || []) {
    if (message.files && message.files.length > 0) {
      const mediaFiles = message.files.filter(file =>
        file.mimetype?.startsWith('image/')
      );
      imageFiles.push(...mediaFiles.map(media => ({ media, message })));
    }
  }

  // Save each image and its metadata
  for (const { media, message } of imageFiles) {
    const filePath = path.join(mediaDir, `${media.id}-${media.name}`);
    const metadataPath = path.join(mediaDir, `${media.id}.json`);

    const response = await axios.get(media.url_private || "", {
      headers: { 'Authorization': `Bearer ${token}` },
      responseType: 'arraybuffer'
    });

    // Get user info
    const userInfo = await web.users.info({ user: message.user || "" });

    // Save image file
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
      type: 'image',
    }));

    console.log(`Image saved: ${filePath}`);
  }
};

const getStartOfDayTimestamp = (dateStr: string): number => {
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  return Math.floor(date.getTime() / 1000);
};