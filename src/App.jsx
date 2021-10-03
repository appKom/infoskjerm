//import Weather from './components/Weather';
import WeatherContainer from './components/Weather/WeatherContainer';
import {useState} from 'react';


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
  return (
    <div>
      <WeatherContainer weather={weather}/>
    </div>
  );
}

export default App;

//ES7
//rafce
