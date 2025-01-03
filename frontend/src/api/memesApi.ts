import { MemeType } from "../lib/types";

export const fetchMemes = async (amount: number): Promise<MemeType[]> => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL + `/latest-memes?count=${amount}`;

  const response = await fetch(apiUrl, {
    headers: {
      'x-api-key': import.meta.env.VITE_BACKEND_API_KEY
    }
  });

  if (response.ok) {
    return await response.json();
  }
  throw response;
};
