import { fetchMedia } from "./media";
import { channelsConfig } from "../index";
import { fetchComments } from "./comments";

export const saveMedia = async ({ limit }: { limit: number }) => {
  console.log("Saving media...");

  await Promise.all([
    ...channelsConfig.memes.map((channelId) => fetchMedia(channelId, limit)),
    ...channelsConfig.blasts.map((channelId) => fetchMedia(channelId, limit)),
  ]);
};

export const saveComments = async ({
  postId,
  parentId,
  channelId,
}: {
  postId: string;
  parentId: string;
  channelId: string;
}) => {
  try {
    await fetchComments(channelId, postId, parentId);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};
