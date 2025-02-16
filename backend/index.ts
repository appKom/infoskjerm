import { Pool } from "pg";
import express, { Request, Response } from "express";
import cors from "cors";
import cronHandler from "./src/cronJob";
import { query, validationResult } from "express-validator";
import { toCamelCaseKeys } from "./src/utils";

const pool = new Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
});

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.listen(3000, () => console.log("Server running on port 3000"));
}

app.get("/cron", cronHandler);

app.get(
  "/latest-memes",
  [query("count").optional().isInt({ min: 1, max: 10 }), query("type").optional().isString().isIn(["image", "video"])],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const count = parseInt(req.query.count as string, 10) || 10;
      const type = req.query.type as string | undefined;
      const channel = "memeogvinogklinoggrin2";

      let queryText = `
        SELECT "Id", "Name", "Author", "Username", "AuthorImage", "Date", "Url", "Type", "Reactions", "ChannelName"
        FROM "MediaFiles"
        WHERE "ChannelName" = $1 AND "Url" IS NOT NULL
      `;

      const queryParams: any[] = [channel];

      if (type) {
        queryText += ` AND "Type" = $2`;
        queryParams.push(type);
      }

      queryText += `
        ORDER BY "Date" DESC
        LIMIT $${queryParams.length + 1}
      `;
      queryParams.push(count);

      const result = await pool.query(queryText, queryParams);
      res.json(result.rows.map(toCamelCaseKeys));
    } catch (error) {
      console.error("Failed to get memes:", error);
      res.status(500).send("Failed to get memes :(");
    }
  }
);

app.get(
  "/latest-blasts",
  [query("count").optional().isInt({ min: 1, max: 10 })],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const count = parseInt(req.query.count as string, 10) || 5;
      const channelNames = ["korktavla", "online", "utveksling", "kontoret"];

      const queryText = `
        SELECT "Id", "Text", "Author", "AuthorImage", "Date", "ChannelName"
        FROM "MediaFiles"
        WHERE "ChannelName" = ANY($1)
        AND "Text" IN (
            SELECT DISTINCT ON ("Text") "Text"
            FROM "MediaFiles"
            WHERE "ChannelName" = ANY($1)
            ORDER BY "Text", "Date" DESC
        )
        ORDER BY "Date" DESC
        LIMIT $2;
      `;
      const result = await pool.query(queryText, [channelNames, count]);
      res.json(result.rows.map(toCamelCaseKeys));
    } catch (error) {
      console.error("Failed to get blasts:", error);
      res.status(500).send("Failed to get blasts :(");
    }
  }
);

app.get(
  "/movember",
  [query("date").optional().isISO8601()],
  async (req: Request, res: Response) => {
    try {
      const channel = "movember";
      const cutoffDate = req.query.date;

      const queryText = `
        SELECT "Id", "Name", "Author", "Username", "AuthorImage", "Date", "Url", "Type", "Reactions", "ChannelName"
        FROM "MediaFiles"
        WHERE "ChannelName" = $1
          AND "Date" >= $2
          AND "Url" IS NOT NULL
        ORDER BY "Date" DESC
        LIMIT 50
      `;
      const result = await pool.query(queryText, [channel, cutoffDate]);
      res.json(result.rows.map(toCamelCaseKeys));
    } catch (error) {
      console.error("Failed to get Movember images:", error);
      res.status(500).send("Failed to get Movember images :(");
    }
  }
);

export default app;
