const fetchWeather = async() => {
  const res = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.415528347442574&lon=10.404464071457326');
  const data = await res.json();
  const returnData=[];
  for(let i=0;i<4;i++){
    returnData.push({time: data.properties.timeseries[i*2+3].time.substring(11,16), temp: data.properties.timeseries[i*2+3].data.instant.details.air_temperature, img: data.properties.timeseries[i*2+3].data.next_1_hours.summary.symbol_code});
  }
  return returnData;
};

export default fetchWeather;