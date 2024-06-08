export const fetchMemes = async (amount: number) => {
  const apiUrl = `https://slack-memes-backend.vercel.app/latest-memes?count=${amount}`;

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
