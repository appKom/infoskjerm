import Weather from './Weather';

const WeatherContainer = ({weather}) => {
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
