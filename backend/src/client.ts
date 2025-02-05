import { fetchMedia } from "./media";

import { channelsConfig } from "./channelsConfig";

export const saveMedia = async ({ limit }: { limit: number }) => {
  console.log("Saving media...");

  await Promise.all([
    ...channelsConfig.memes.map((channelId) => fetchMedia(channelId, limit)),
    ...channelsConfig.blasts.map((channelId) => fetchMedia(channelId, limit)),
  ]);
};
