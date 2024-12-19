import { saveMedia } from "./client";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET is not defined in the environment variables.");
    return res.status(500).json({ error: "Server configuration error." });
  }

  const authHeader = req.get("Authorization");

  if (authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).end("Unauthorized");
  }

  try {
    console.log("Starting scheduled fetch at", new Date().toISOString());
    const limit = 200;

    await saveMedia({ limit });

    console.log("Scheduled fetch completed at", new Date().toISOString());
    res.status(200).json({ message: "Media fetched successfully." });
  } catch (error) {
    console.error("Error during scheduled fetch:", error);
    res.status(500).json({ error: "Failed to fetch media." });
  }
}
