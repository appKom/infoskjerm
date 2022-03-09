import PropTypes from 'prop-types';

import './Weather.css';

const Weather = ({img, time, temp}) => {
  return (
    <div className="weather">
      <p>{time}</p>
      <img src={`./weathersvg/${img}.svg`} alt="weather forecast" className="weatherimg"/>
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
