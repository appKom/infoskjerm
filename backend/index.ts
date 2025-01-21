import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { authenticate } from "./src/authentication";
import sql from "mssql";
import "./src/cronJob";
import { query, validationResult } from "express-validator";
import { poolPromise } from "./src/supabaseClient";
import { toCamelCaseKeys } from "./src/utils";

const app = express();

// Can be removed if we don't want CORS
const allowedStaticOrigins = [
  "http://localhost:5173",
  "https://infoskjerm-online.vercel.app",
];
const vercelPreviewPattern =
  /^https:\/\/infoskjerm-[a-zA-Z0-9]+-appkom\.vercel\.app$/;

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: any, allow?: boolean) => void
  ) {
    console.log("Origin:", origin);
    if (!origin) return callback(null, true);
    if (allowedStaticOrigins.includes(origin)) {
      return callback(null, true);
    }
    if (vercelPreviewPattern.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

app.get(
  "/latest-memes",
  authenticate,
  [
    query("count")
      .optional()
      .isInt({ min: 1, max: 10 })
      .withMessage("Count should be an integer between 1 and 10"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const count = parseInt(req.query.count as string, 10) || 10;

    try {
      const poolConnection = await poolPromise;
      const channel = "memeogvinogklinoggrin2";

      const result = await poolConnection
        .request()
        .input("ChannelName", sql.NVarChar, channel)
        .input("Count", sql.Int, count).query(`
          SELECT TOP (@Count) Id, Name, Author, Username, AuthorImage, Date, Url, Type, Reactions, ChannelName
          FROM MediaFiles
          WHERE ChannelName = @ChannelName
            AND Url IS NOT NULL
          ORDER BY Date DESC
        `);

      const parsedRecords = result.recordset.map((record) =>
        toCamelCaseKeys(record)
      );

      res.json(parsedRecords);
    } catch (error) {
      console.error("Failed to get memes:", error);
      res.status(500).send("Failed to get memes :(");
    }
  }
);

app.get(
  "/latest-blasts",
  authenticate,
  [
    query("count")
      .optional()
      .isInt({ min: 1, max: 10 })
      .withMessage("Count should be an integer between 1 and 10"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const count = parseInt(req.query.count as string, 10) || 5;

    try {
      const poolConnection = await poolPromise;

      const channelNames = ["korktavla", "online"];

      const result = await poolConnection
        .request()
        .input("Count", sql.Int, count)
        .input("Channel1", sql.NVarChar, channelNames[0])
        .input("Channel2", sql.NVarChar, channelNames[1]).query(`
          SELECT TOP (@Count) Id, Text, Author, AuthorImage, Date, ChannelName
          FROM MediaFiles
          WHERE ChannelName IN (@Channel1, @Channel2)
          ORDER BY Date DESC
        `);

      const parsedRecords = result.recordset.map((record) =>
        toCamelCaseKeys(record)
      );

      res.json(parsedRecords);
    } catch (error) {
      console.error("Failed to get blasts:", error);
      res.status(500).send("Failed to get blasts :(");
    }
  }
);

app.get(
  "/movember",
  authenticate,
  [
    query("date")
      .optional()
      .isISO8601()
      .withMessage("Date must be in ISO8601 format (YYYY-MM-DD)"),
  ],
  async (req: Request, res: Response) => {
    try {
      const poolConnection = await poolPromise;
      const channel = "movember";
      const cutoffDate = req.query.date;

      const result = await poolConnection
        .request()
        .input("ChannelName", sql.NVarChar, channel)
        .input("CutoffDate", sql.Date, cutoffDate)
        .input("Count", sql.Int, 50).query(`
            SELECT TOP (@Count) Id, Name, Author, Username, AuthorImage, Date, Url, Type, Reactions, ChannelName
            FROM MediaFiles
            WHERE ChannelName = @ChannelName AND Date >= @CutoffDate
              AND Url IS NOT NULL
            ORDER BY Date DESC
          `);

      const parsedRecords = result.recordset.map((record) =>
        toCamelCaseKeys(record)
      );

      res.json(parsedRecords);
    } catch (error) {
      console.error("Failed to get Movember images:", error);
      res.status(500).send("Failed to get Movember images :(");
    }
  }
);

export default app;
