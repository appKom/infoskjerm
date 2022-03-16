import Weather from './Weather';
import fetchWeather from '../../api/weather/fetchWeather';
import { useQuery } from 'react-query';

import './Weather.css';

const WeatherContainer = () => {
  const { data: weather, isLoading, isError } = useQuery('weather', fetchWeather, { refetchInterval: 1000 * 60 * 60 * 3});

  if (isLoading || isError) return null;

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
