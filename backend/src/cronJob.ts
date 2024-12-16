import cron from "node-cron";
import { saveMedia } from "./client";

cron.schedule("0 * * * *", async () => {
  try {
    console.log("Starting scheduled fetch at", new Date().toISOString());
    const limit = 200;

    // Fetch media and text messages from the configured channels
    saveMedia({ limit });

    console.log("Scheduled fetch completed at", new Date().toISOString());
  } catch (error) {
    console.error("Error during scheduled fetch:", error);
  }
});
