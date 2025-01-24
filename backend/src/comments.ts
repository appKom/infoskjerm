import { WebClient } from "@slack/web-api";
import axios from "axios";
import dotenv from "dotenv";
import sharp from "sharp";
import { supabase, mediaBucket } from "./supabaseClient";
import { fetchCustomEmojis, getMediaType } from "./media";

dotenv.config();
const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);

/**
 * Fetches comment replies for a given Slack channel/post, then stores them in Supabase.
 */
export const fetchComments = async (
  channelId: string,
  postId: string,
  parentId: string
) => {
  console.log("ChannelId:", channelId);

  // Get channel info
  const channelInfo = await web.conversations.info({ channel: channelId });
  const channelName = channelInfo.channel?.name || "unknown-channel";

  // Fetch conversation replies (comments)
  const result = await web.conversations.replies({
    channel: channelId,
    ts: postId,
  });

  // The first element is the original post; remove it
  result.messages?.shift();

  // Get custom Slack emojis for reaction icons
  const customEmojis = await fetchCustomEmojis();

  let mediaCount = 0;
  for (const message of result.messages || []) {
    // If this comment has no files, treat it as text-only
    if (!message.files || message.files.length === 0) {
      console.log("Processing comment without attachments...");
      await handleTextComment({
        message,
        channelName,
        parentId,
        customEmojis: customEmojis || {},
      });
      mediaCount++;
      continue;
    }

    // Otherwise, process each file as media (image/video)
    const commentFiles = message.files.filter((file) =>
      file.mimetype
        ? file.mimetype.startsWith("image/") ||
          file.mimetype.startsWith("video/")
        : false
    );

    for (const media of commentFiles) {
      await handleMediaComment({
        message,
        channelName,
        parentId,
        customEmojis: customEmojis || {},
        media,
      });
      mediaCount++;
    }
  }
};

/**
 * Handle a text-only comment message and upsert into Supabase.
 */
async function handleTextComment({
  message,
  channelName,
  parentId,
  customEmojis,
}: {
  message: any;
  channelName: string;
  parentId: string;
  customEmojis: Record<string, string>;
}) {
  const messageId = message.ts || "unknown";

  // Fetch user info from Slack
  const userInfo = await web.users.info({ user: message.user || "" });

  // Collect Slack reactions
  const reactions = (message.reactions || []).map((reaction: any) => {
    const emojiUrl = customEmojis?.[reaction.name] || null;
    return {
      name: reaction.name,
      count: reaction.count,
      url: emojiUrl,
    };
  });

  // Check if this comment already exists in Supabase
  const { data: existingRecord, error: existingError } = await supabase
    .from("Comments")
    .select("*")
    .eq("CommentId", messageId)
    .maybeSingle();

  if (existingError) {
    console.error("Error checking existing text comment:", existingError);
    return;
  }

  if (existingRecord) {
    console.log(`Text-only comment already exists: ${messageId}`);

    // Compare existing fields to see if an update is needed
    const existingReactions =
      JSON.parse(existingRecord.Reactions || "[]") || [];
    const newReactions = reactions;
    const reactionsChanged =
      JSON.stringify(existingReactions) !== JSON.stringify(newReactions);
    const textChanged = existingRecord.Text !== message.text;

    if (reactionsChanged || textChanged) {
      console.log(`Updating text-only comment record: ${messageId}`);
      const { error: updateError } = await supabase
        .from("Comments")
        .update({
          Reactions: JSON.stringify(newReactions),
          Text: message.text || "",
        })
        .eq("CommentId", messageId);

      if (updateError) {
        console.error("Error updating text-only comment:", updateError);
      }
    }
  } else {
    // Insert new text-only comment
    const { error: insertError } = await supabase.from("Comments").insert([
      {
        CommentId: messageId,
        PostId: parentId,
        Name: `Message-${messageId}`,
        Author: userInfo.user?.real_name || "Unknown",
        Username: userInfo.user?.name || "unknown",
        AuthorImage: userInfo.user?.profile?.image_72 || "",
        Date: new Date(parseInt(message.ts || "0") * 1000),
        Url: null,
        Type: "text",
        Text: message.text || "",
        Reactions: JSON.stringify(reactions),
        ChannelName: channelName,
      },
    ]);

    if (insertError) {
      console.error("Error inserting text-only comment:", insertError);
    } else {
      console.log(`Text-only comment saved: ${messageId}`);
    }
  }
}

/**
 * Handle a media comment (image/video) by uploading to Supabase Storage and upserting into Supabase.
 */
async function handleMediaComment({
  message,
  channelName,
  parentId,
  customEmojis,
  media,
}: {
  message: any;
  channelName: string;
  parentId: string;
  customEmojis: Record<string, string>;
  media: any;
}) {
  const commentId = media.id;

  // Check if this media comment already exists
  const { data: existingRecord, error: existingError } = await supabase
    .from("Comments")
    .select("*")
    .eq("CommentId", commentId)
    .maybeSingle();

  if (existingError) {
    console.error("Error checking existing media comment:", existingError);
    return;
  }

  // Download file from Slack
  let fileBuffer: Buffer;
  try {
    const response = await axios.get(media.url_private || "", {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "arraybuffer",
    });
    fileBuffer = Buffer.from(response.data);
  } catch (downloadError) {
    console.error("Error downloading media file:", downloadError);
    return;
  }

  // Get Slack user info
  const userInfo = await web.users.info({ user: message.user || "" });

  // Reactions
  const reactions = (message.reactions || []).map((reaction: any) => {
    const emojiUrl = customEmojis?.[reaction.name] || null;
    return {
      name: reaction.name,
      count: reaction.count,
      url: emojiUrl,
    };
  });

  // If existing record, see if anything changed (reactions or text)
  if (existingRecord) {
    console.log(`Comment already exists: ${commentId}`);

    const existingReactions =
      JSON.parse(existingRecord.Reactions || "[]") || [];
    const newReactions = reactions;
    const reactionsChanged =
      JSON.stringify(existingReactions) !== JSON.stringify(newReactions);
    const textChanged = existingRecord.Text !== message.text;

    if (reactionsChanged || textChanged) {
      console.log(`Updating comment record: ${commentId}`);
      const { error: updateError } = await supabase
        .from("Comments")
        .update({
          Text: message.text || "",
          Reactions: JSON.stringify(newReactions),
        })
        .eq("CommentId", commentId);

      if (updateError) {
        console.error("Error updating media comment:", updateError);
      } else {
        console.log(`Media comment updated: ${commentId}`);
      }
    } else {
      console.log(`No updates required for comment: ${commentId}`);
    }

    // If you do NOT want to re-upload the file again, we can stop here
    return;
  }

  // Otherwise, it's a new media comment – proceed to upload
  const filePath = `${channelName}/${media.id}-${media.name}`;

  // Compress images except GIF, or pass videos directly
  let uploadData: Buffer = fileBuffer;

  // If image (not a GIF), compress/resize
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
        // Otherwise just compress or keep as is
        uploadData = await image.toBuffer();
      }
    } catch (err) {
      console.error("Error processing image with sharp:", err);
      return;
    }
  }

  // Upload to Supabase Storage
  const { data: storageData, error: storageError } = await mediaBucket.upload(
    filePath,
    uploadData,
    { contentType: media.mimetype }
  );

  if (storageError) {
    console.error("Error uploading file to Supabase Storage:", storageError);
    return;
  }

  // Retrieve a public URL (or you can create signed URLs if needed)
  const {
    data: { publicUrl },
  } = mediaBucket.getPublicUrl(filePath);

  // Upsert into the "Comments" table
  const { error: upsertError } = await supabase.from("Comments").upsert(
    [
      {
        CommentId: commentId,
        PostId: parentId,
        Name: media.name || null,
        Author: userInfo.user?.real_name || "Unknown",
        Username: userInfo.user?.name || "unknown",
        AuthorImage: userInfo.user?.profile?.image_72 || "",
        Date: new Date(parseFloat(message.ts || "0") * 1000),
        Url: publicUrl,
        Text: message.text || "",
        Type: getMediaType(media.mimetype),
        Reactions: JSON.stringify(reactions),
        ChannelName: channelName,
      },
    ],
    {
      onConflict: "CommentId", // Make sure you have a unique or primary key on CommentId
    }
  );

  if (upsertError) {
    console.error("Error upserting media comment:", upsertError);
  } else {
    console.log(`Comment saved or updated: ${publicUrl}`);
  }
}
