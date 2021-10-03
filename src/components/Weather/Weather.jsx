import PropTypes from 'prop-types';


const Weather = ({img, time, temp}) => {
  return (
    <div className="weather">
      <p>kl. {time}:00</p>
      <img src={img} alt="weather forecast" className="weatherimg"/>
      <p>{temp}&#176;C</p>
    </div>
  );
};

Weather.defaultProps={
  img:'https://www.yr.no/assets/images/svg/02d.svg',
  temp:15,
  time:16,
};

Weather.propTypes={
  img: PropTypes.string,
  temp: PropTypes.number,
};

export default Weather;
