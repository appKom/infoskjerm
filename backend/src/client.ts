import { fetchMedia } from "./media";
import { channelsConfig } from "../index";
import { fetchComments } from "./comments";

export const saveMedia = async ({ limit }: { limit: number }) => {
  console.log("Saving media...");

  // Fetcher memes
  for (const channelId of channelsConfig.memes) {
    try {
      await fetchMedia(channelId, limit);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  }

  // Fetcher blasts
  for (const channelId of channelsConfig.blasts) {
    try {
      await fetchMedia(channelId, limit);
    } catch (error) {
      console.error("Error fetching blasts:", error);
    }
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
