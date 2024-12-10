import cron from "node-cron";
import { fetchMedia } from "./media";
import { fetchTextMessagesFromChannels } from "./text";
import { channels } from "..";

cron.schedule("0 * * * *", async () => {
  try {
    console.log("Starting scheduled fetch at", new Date().toISOString());

    // Fetch Memes
    try {
      const memeChannelIds = channels.memes;
      for (const channelId of memeChannelIds) {
        await fetchMedia(channelId, 10);
      }
    } catch (error) {
      console.error("Error fetching memes:", error);
    }

    // Fetch Blasts
    try {
      const blastChannelIds = channels.blasts;
      await fetchTextMessagesFromChannels(blastChannelIds, 20);
    } catch (error) {
      console.error("Error fetching blasts:", error);
    }

    console.log("Scheduled fetch completed at", new Date().toISOString());
  } catch (error) {
    console.error("Error during scheduled fetch:", error);
  }
});
