import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { authenticate } from "./src/authentication";
import sql from "mssql";
import "./src/cronJob";
import { query, validationResult } from "express-validator";
import { poolPromise } from "./src/azureClients";

export const channelsConfig = {
  memes: [
    "C01DG6JFNSG", // #memeogvinogklinoggrin2
  ],
  blasts: [
    "CGR4J7PLH", // #korktavla
    "C03S8TX1L", // #online
  ],
  movember: "C01DL1YV4N6", // #movember
};

export const channels = channelsConfig;

const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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
          ORDER BY Date DESC
        `);

      res.json(result.recordset);
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
      const result = await poolConnection
        .request()
        .input("Count", sql.Int, count).query(`
          SELECT TOP (@Count) Id, Text, Author, AuthorImage, Date, ChannelName
          FROM TextMessages
          ORDER BY Date DESC
        `);

      res.json(result.recordset);
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
    const dateParam = req.query.date as string;
    const specificDate = dateParam
      ? new Date(dateParam)
      : new Date("2024-11-29");

    try {
      const poolConnection = await poolPromise;
      const result = await poolConnection
        .request()
        .input("ChannelName", sql.NVarChar, "movember")
        .input("SpecificDate", sql.Date, specificDate).query(`
          SELECT Id, Name, Author, Username, AuthorImage, Date, Url, Type, Reactions, ChannelName
          FROM MediaFiles
          WHERE ChannelName = @ChannelName AND CAST(Date AS DATE) = @SpecificDate
          ORDER BY Date DESC
        `);

      res.json(result.recordset);
    } catch (error) {
      console.error("Failed to get Movember images:", error);
      res.status(500).send("Failed to get Movember images :(");
    }
  }
);
