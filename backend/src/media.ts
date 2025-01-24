import { WebClient } from "@slack/web-api";
import axios from "axios";
import dotenv from "dotenv";
import sharp from "sharp";
import { saveComments } from "./client";
import { supabase, mediaBucket } from "./supabaseClient";

dotenv.config();

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

/**
 * The main function to fetch messages (with or without attachments) from Slack,
 * then store or update them in Supabase.
 */
export const fetchMedia = async (channelId: string, count: number) => {
  console.log("Fetching media...");
  console.log("Channel ID:", channelId);

  // Get channel info
  const channelInfo = await web.conversations.info({ channel: channelId });
  const channelName = channelInfo.channel?.name || "unknown-channel";

  // Get channel history
  const result = await web.conversations.history({ channel: channelId });

  // Get custom emojis for the workspace
  const customEmojis = await fetchCustomEmojis();

  let mediaCount = 0;
  for (const message of result.messages || []) {
    if (mediaCount >= count) break;

    // Skip join/leave system messages
    if (
      message.subtype &&
      (message.subtype === "channel_join" ||
        message.subtype === "channel_leave")
    ) {
      continue;
    }

    // Reactions
    const reactions = (message.reactions || []).map((reaction) => {
      const emojiUrl = customEmojis?.[reaction.name || ""] || null;
      return {
        name: reaction.name,
        count: reaction.count,
        url: emojiUrl,
      };
    });

    // Slack user info
    const userInfo = await web.users.info({ user: message.user || "" });

    // If no files, treat it as a text-only message
    if (!message.files || message.files.length === 0) {
      await handleTextMessage({
        message,
        channelId,
        channelName,
        userInfo,
        reactions,
      });
      mediaCount++;
      continue;
    }

    // If we have files, process only images/videos
    const mediaFiles = message.files.filter((file) =>
      file.mimetype
        ? file.mimetype.startsWith("image/") ||
          file.mimetype.startsWith("video/")
        : false
    );

    for (const media of mediaFiles) {
      if (mediaCount >= count) break;

      await handleMediaMessage({
        message,
        channelId,
        channelName,
        userInfo,
        reactions,
        media,
      });
      mediaCount++;
    }
  }
};

/**
 * Handles a text-only message by upserting into Supabase.
 */
async function handleTextMessage({
  message,
  channelId,
  channelName,
  userInfo,
  reactions,
}: {
  message: any;
  channelId: string;
  channelName: string;
  userInfo: any;
  reactions: any[];
}) {
  const messageId = message.ts || "unknown";

  // Check if the message already exists in Supabase
  const { data: existingRecord, error: existingError } = await supabase
    .from("MediaFiles")
    .select("*")
    .eq("Id", messageId)
    .maybeSingle();

  if (existingError) {
    console.error("Error checking existing text message:", existingError);
    return;
  }

  const newReactions = reactions;
  const newComments = message.reply_count || 0;

  // If record exists, check for changes
  if (existingRecord) {
    console.log(`Text-only message already exists: ${messageId}`);

    const existingReactions =
      JSON.parse(existingRecord.Reactions || "[]") || [];
    const reactionsChanged =
      JSON.stringify(existingReactions) !== JSON.stringify(newReactions);
    const textChanged = existingRecord.Text !== message.text;
    const commentsChanged = existingRecord.AmtComments !== newComments;

    if (reactionsChanged || textChanged || commentsChanged) {
      // Save comments if needed
      if (message.ts && messageId) {
        try {
          saveComments({
            postId: message.ts,
            parentId: messageId,
            channelId,
          });
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }

      // Update record
      const { error: updateError } = await supabase
        .from("MediaFiles")
        .update({
          Text: message.text || "",
          Reactions: JSON.stringify(newReactions),
          AmtComments: newComments,
        })
        .eq("Id", messageId);

      if (updateError) {
        console.error("Error updating text-only message:", updateError);
      } else {
        console.log(`Updated text-only message record: ${messageId}`);
      }
    }
  } else {
    // Insert a new record
    const { error: insertError } = await supabase.from("MediaFiles").insert([
      {
        Id: messageId,
        Name: `Message-${messageId}`,
        Author: userInfo.user?.real_name || "Unknown",
        Username: userInfo.user?.name || "unknown",
        AuthorImage: userInfo.user?.profile?.image_72 || "",
        Date: new Date(parseInt(message.ts || "0") * 1000),
        Url: null,
        Type: "text",
        Text: message.text || "",
        AmtComments: newComments,
        Reactions: JSON.stringify(newReactions),
        ChannelName: channelName,
      },
    ]);

    if (insertError) {
      console.error("Error inserting text-only message:", insertError);
    } else {
      console.log(`Text-only message saved: ${messageId}`);
    }

    // Optionally fetch comments for new message
    if (message.ts && messageId) {
      try {
        saveComments({
          postId: message.ts,
          parentId: messageId,
          channelId,
        });
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  }
}

/**
 * Handles a media message (images or videos) by uploading to Supabase Storage
 * and upserting into the `MediaFiles` table.
 */
async function handleMediaMessage({
  message,
  channelId,
  channelName,
  userInfo,
  reactions,
  media,
}: {
  message: any;
  channelId: string;
  channelName: string;
  userInfo: any;
  reactions: any[];
  media: any;
}) {
  // Check if media already exists
  const { data: existingRecord, error: existingError } = await supabase
    .from("MediaFiles")
    .select("*")
    .eq("Id", media.id)
    .maybeSingle();

  if (existingError) {
    console.error("Error checking existing media:", existingError);
    return;
  }

  // Download media from Slack
  let fileBuffer: Buffer;
  try {
    const response = await axios.get(media.url_private, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "arraybuffer",
    });
    fileBuffer = Buffer.from(response.data);
  } catch (error) {
    console.error("Error downloading media:", error);
    return;
  }

  const newReactions = reactions;
  const newComments = message.reply_count || 0;

  if (existingRecord) {
    console.log(`Media already exists: ${media.id}`);

    const existingReactions =
      JSON.parse(existingRecord.Reactions || "[]") || [];
    const reactionsChanged =
      JSON.stringify(existingReactions) !== JSON.stringify(newReactions);
    const textChanged = existingRecord.Text !== message.text;
    const commentsChanged = existingRecord.AmtComments !== newComments;

    if (reactionsChanged || textChanged || commentsChanged) {
      console.log(`Updating media record: ${media.id}`);

      // Fetch comments if needed
      if (message.ts && media.id) {
        try {
          saveComments({
            postId: message.ts,
            parentId: media.id,
            channelId,
          });
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }

      // Update existing record
      const { error: updateError } = await supabase
        .from("MediaFiles")
        .update({
          Text: message.text || "",
          Reactions: JSON.stringify(newReactions),
          AmtComments: newComments,
        })
        .eq("Id", media.id);

      if (updateError) {
        console.error("Error updating media:", updateError);
      } else {
        console.log(`Media record updated: ${media.id}`);
      }
    } else {
      console.log(`No updates required for media: ${media.id}`);
    }
    return;
  }

  // Otherwise, it's a new media file. Let's upload it.
  const filePath = `${channelName}/${media.id}-${media.name}`;

  // Compress images (except GIF) or pass videos directly
  let uploadData: Buffer = fileBuffer;

  // If image and not GIF, try resizing/compressing
  if (media.mimetype?.startsWith("image/") && media.mimetype !== "image/gif") {
    try {
      const image = sharp(fileBuffer);
      const metadata = await image.metadata();

      if (metadata.width && metadata.width > 1920) {
        // Resize if over 1920px wide
        uploadData = await image
          .resize({ width: 1920 })
          .jpeg({ quality: 80 })
          .toBuffer();
      } else {
        // Otherwise just convert to buffer (or compress at your preference)
        uploadData = await image.toBuffer();
      }
    } catch (err) {
      console.error("Error processing image with sharp:", err);
      return;
    }
  }
  // If it's a GIF or a video, do nothing special (for now).

  // Upload to Supabase Storage
  const { data: storageData, error: storageError } = await mediaBucket.upload(
    filePath,
    uploadData,
    { contentType: media.mimetype }
  );

  if (storageError) {
    console.error("Error uploading to Supabase Storage:", storageError);
    return;
  }

  // Retrieve public URL from Supabase
  const {
    data: { publicUrl },
  } = mediaBucket.getPublicUrl(filePath);

  // Insert (or upsert) into Supabase
  const { error: upsertError } = await supabase.from("MediaFiles").upsert(
    [
      {
        Id: media.id,
        Name: media.name,
        Author: userInfo.user?.real_name || "Unknown",
        Username: userInfo.user?.name || "unknown",
        AuthorImage: userInfo.user?.profile?.image_72 || "",
        Date: new Date(parseInt(message.ts || "0") * 1000),
        Url: publicUrl,
        Type: getMediaType(media.mimetype),
        Text: message.text || "",
        AmtComments: newComments,
        Reactions: JSON.stringify(newReactions),
        ChannelName: channelName,
      },
    ],
    {
      onConflict: "Id", // Make sure you have a unique constraint on Id
    }
  );

  if (upsertError) {
    console.error("Error upserting media record:", upsertError);
    return;
  }

  // Fetch comments if needed
  if (message.ts && media.id) {
    try {
      saveComments({
        postId: message.ts,
        parentId: media.id,
        channelId,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  console.log(`Media saved or updated: ${publicUrl}`);
}

/**
 * Determine media type from mimetype.
 */
export const getMediaType = (mimetype: string | undefined): string => {
  if (!mimetype) return "unknown";
  const type = mimetype.split("/")[0];
  return type || "unknown";
};

/**
 * Fetch custom emojis for the Slack workspace.
 */
export const fetchCustomEmojis = async () => {
  try {
    const emojiList = await web.emoji.list({});
    return emojiList.emoji;
  } catch (error) {
    console.error("Failed to fetch custom emojis:", error);
    return {};
  }
};
