import { saveMedia, saveTextMessages } from "./client";

export const seed = async () => {
  console.log("Starting seed at", new Date().toISOString());
  const limit = 50;

  await Promise.all([saveMedia({ limit }), saveTextMessages({ limit })]);

  console.log("Seed completed at", new Date().toISOString());
};
seed();
