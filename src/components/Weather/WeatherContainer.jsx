import Weather from './Weather';

const WeatherContainer = ({weather}) => {
  return (
    <div id="weatherDiv">
      <h3>Været på A4</h3>
      <div className="weatherContainer">
        {weather.map((wet) => (
          <Weather time={wet.time} temp={wet.temp}/>
        ))}
      </div>
    </div>

  );
};

export default WeatherContainer;
