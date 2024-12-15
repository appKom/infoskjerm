import { fetchMedia } from "./src/media";
import { fetchTextMessagesFromChannels } from "./src/text";
import { channelsConfig } from "./index";

export const seed = async () => {
  console.log("Starting seed at", new Date().toISOString());
  const limit = 50;

  for (const channelId of channelsConfig.memes) {
    try {
      await fetchMedia(channelId, limit);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  }

  try {
    await fetchTextMessagesFromChannels(channelsConfig.blasts, limit);
  } catch (error) {
    console.error("Error fetching blasts:", error);
  }

  console.log("Seed completed at", new Date().toISOString());
};
seed();
