//import Weather from './components/Weather';
import WeatherContainer from './components/Weather/WeatherContainer';
import {useState, useEffect} from 'react';


function App() {
  const [ weather,setWeather ] = useState([]);

  useEffect(() => {
    const getWeather=async() => {
      const weatherFromAPI=await fetchWeather();
      console.log(weatherFromAPI);
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
    <div>
      <WeatherContainer weather={weather}/>
    </div>
  );
}

export default App;

//ES7
//rafce
