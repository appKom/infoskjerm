import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.API_KEY;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userApiKey = req.headers["x-api-key"];
  if (!userApiKey || userApiKey !== apiKey) {
    return res.status(403).send("Access Denied: Invalid API Key");
  }
  next();
};
