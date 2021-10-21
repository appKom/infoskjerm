//import Weather from './components/Weather';
import WeatherContainer from './components/Weather/WeatherContainer';
import {useState, useEffect} from 'react';


function App() {
  const [ weather,setWeather ] = useState([
    {id:1,
      time:8,
      temp:4
    },
    {
      id:2,
      time:12,
      temp:8
    },
    {
      id:3,
      time:16,
      temp:15
    },
    {
      id:4,
      time:18,
      temp:13
    }
  ]);

  useEffect(() => {
    const getWeather=async() => {
      const weatherFromAPI=await fetchWeather();
      console.log(weatherFromAPI);
    };

    getWeather();
  }, []);


  const fetchWeather = async() => {
    const res = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=54&lon=54');
    const data = await res.json();
    return data;
  };


  return (
    <div>
      <WeatherContainer weather={weather}/>
    </div>
  );
}

export default App;

//ES7
//rafce
