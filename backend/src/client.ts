import { fetchMedia } from "./media";
import { fetchTextMessagesFromChannels } from "./text";
import { channelsConfig } from "../index";
import { fetchComments } from "./comments";
import { forEach } from "lodash";

export const saveMedia = async ({ limit }: { limit: number }) => {
  console.log("Saving media...");
  for (const channelId of channelsConfig.memes) {
    try {
      await fetchMedia(channelId, limit);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  }
};

export const saveTextMessages = async ({ limit }: { limit: number }) => {
  console.log("Saving text messages...");
  try {
    await fetchTextMessagesFromChannels(channelsConfig.blasts, limit);
  } catch (error) {
    console.error("Error fetching blasts:", error);
  }
};

export const saveComments = async ({
  postId,
  parentId,
}: {
  postId: string;
  parentId: string;
}) => {
  console.log("Saving comments...");

  try {
    for (const channelId of channelsConfig.memes) {
      await fetchComments(channelId, postId, parentId);
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};
