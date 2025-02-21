import { BlastType } from "../lib/types";

export const fetchBlasts = async (amount: number): Promise<BlastType[]> => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL + `/latest-blasts?count=${amount}`;

  const response = await fetch(apiUrl);

  if (response.ok) {
    return await response.json();
  }
  throw response;
};
