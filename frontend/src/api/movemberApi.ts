export const fetchMovemberResults = async () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL + `/movember`;

  const year = new Date().getFullYear();

  const cutoffDate = `${year}-11-30`;
  const response = await fetch(`${apiUrl}?date=${cutoffDate}`);

  if (response.ok) {
    return await response.json();
  }
  throw response;
};
