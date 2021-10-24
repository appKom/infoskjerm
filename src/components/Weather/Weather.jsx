import PropTypes from 'prop-types';

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('./weathersvg', false, /\.(png|jpe?g|svg)$/));

const Weather = ({img, time, temp}) => {
  return (
    <div className="weather">
      <p>{time}</p>
      <img src={images[`${img}.svg`].default} alt="weather forecast" className="weatherimg"/>
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
