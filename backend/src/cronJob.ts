import cron from "node-cron";
import { saveMedia, saveTextMessages } from "./client";

cron.schedule("0 * * * *", async () => {
  try {
    console.log("Starting scheduled fetch at", new Date().toISOString());
    const limit = 50;

    // Fetch media and text messages from the configured channels
    await Promise.all([saveMedia({ limit }), saveTextMessages({ limit })]);

    console.log("Scheduled fetch completed at", new Date().toISOString());
  } catch (error) {
    console.error("Error during scheduled fetch:", error);
  }
});
