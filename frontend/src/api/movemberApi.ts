export const fetchMovemberResults = async () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL + `/movember`;

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
