import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { WeatherID } from '../../Config';

function Weather({ lat, lng }) {
  const customStyles = {
    fontFamily: 'Helvetica, sans-serif',
    gradientStart: '#7F7FD5',
    gradientMid: '#86A8E7',
    gradientEnd: '#91EAE4',
    locationFontColor: '#FFF',
    todayTempFontColor: '#FFF',
    todayDateFontColor: '#B5DEF4',
    todayRangeFontColor: '#B5DEF4',
    todayDescFontColor: '#B5DEF4',
    todayInfoFontColor: '#B5DEF4',
    todayIconColor: '#FFF',
    forecastBackgroundColor: '#FFF',
    forecastSeparatorColor: '#DDD',
    forecastDateColor: '#777',
    forecastDescColor: '#777',
    forecastRangeColor: '#777',
    forecastIconColor: '#4BC4F7'
  };

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: WeatherID,
    lat: String(lat),
    lon: String(lng),
    lang: 'en',
    unit: 'metric'
  });

  return (
    <div>
      <ReactWeather
        theme={customStyles}
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
        showForecast={false}
      />
    </div>
  );
}

export default Weather;
