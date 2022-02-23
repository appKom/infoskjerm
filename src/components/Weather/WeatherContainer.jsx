import Weather from './Weather';
import {useState, useEffect} from 'react';

import './Weather.css';

const WeatherContainer = () => {
  const [ weather,setWeather ] = useState([]);

  useEffect(() => {
    const getWeather=async() => {
      const weatherFromAPI=await fetchWeather();
      setWeather(weatherFromAPI);
    };

    getWeather();
  }, []);


  const fetchWeather = async() => {
    const res = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.415528347442574&lon=10.404464071457326');
    const data = await res.json();
    const returnData=[];
    for(let i=0;i<4;i++){
      returnData.push({time: data.properties.timeseries[i*2+3].time.substring(11,16), temp: data.properties.timeseries[i*2+3].data.instant.details.air_temperature, img: data.properties.timeseries[i*2+3].data.next_1_hours.summary.symbol_code});
    }
    return returnData;
  };

  return (
    <div id="weatherDiv">
      <h3>Været på A4</h3>
      <div className="weatherContainer">
        {weather.map((wet, index) => (
          <Weather key={index} time={wet.time} temp={wet.temp} img={wet.img}/>
        ))}
      </div>
    </div>

  );
};

export default WeatherContainer;
