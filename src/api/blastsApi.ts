import { BlastType } from "../lib/types";

export const fetchBlasts = async (amount: number): Promise<BlastType[]> => {
  const apiUrl = `https://infoskjerm-backend-appkom.vercel.app/latest-blasts?count=${amount}`;

  const response = await fetch(apiUrl, {
    headers: {
        'x-api-key': import.meta.env.VITE_MEME_API_KEY
    }
  });

  if (response.ok) {
    return await response.json();
  }
  throw response;
};
