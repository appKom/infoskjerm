import { ISlackMessage } from "../lib/types";

export const fetchMemes = async (amount: number): Promise<ISlackMessage[]> => {
  const apiUrl = `http://localhost:3000/memes`;

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
