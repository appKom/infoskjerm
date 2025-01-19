import { saveMedia } from "./client";

export const seed = async () => {
  console.log("Starting seed at", new Date().toISOString());
  const limit = 200;

  await Promise.all([saveMedia({ limit })]);

  console.log("Seed completed at", new Date().toISOString());
};
seed();
