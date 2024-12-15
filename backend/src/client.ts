import { fetchMedia } from "./media";
import { fetchTextMessagesFromChannels } from "./text";
import { channelsConfig } from "../index";

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
