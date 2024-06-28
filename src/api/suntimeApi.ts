
const TRD_COORDINATES = {
  lat: '63.415450',
  lon: '10.404695',
};

const fetchSunTime = async() => {
  // Get the current date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const apiUrl = `https://api.met.no/weatherapi/sunrise/3.0/sun?lat=${TRD_COORDINATES.lat}&lon=${TRD_COORDINATES.lon}&date=${formattedDate}&offset=+01:00`;

  const response = await fetch(apiUrl);
  if (response.ok) {
    return await response.json();
  }
  throw response;
};

export default fetchSunTime;