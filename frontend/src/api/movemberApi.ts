export const fetchMovemberResults = async () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL + `/movember`;

  const year = new Date().getFullYear();

  const cutoffDate = `${year}-11-30`;
  const response = await fetch(`${apiUrl}?date=${cutoffDate}`, {
    headers: {
      "x-api-key": import.meta.env.VITE_BACKEND_API_KEY,
    },
  });

  if (response.ok) {
    return await response.json();
  }
  throw response;
};
