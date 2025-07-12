import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country, api_key]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(([code, lang]) => (
          <li key={code}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        style={{ width: '200px', display: 'block', marginLeft: 0 }}
      />
      <h2>Weather in {country.capital[0]}</h2>
      {weather ? (
        <div>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loeading weather...</p>
      )}
    </div>
  );
};

export default CountryDetails;
