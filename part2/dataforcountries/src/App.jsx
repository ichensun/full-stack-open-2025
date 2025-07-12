import { useState, useEffect } from 'react';
import axios from 'axios';

import CountryDetails from './components/CountryDetails';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [shownCountry, setShownCountry] = useState('');

  // fetch data for countries once value is changed
  useEffect(() => {
    console.log(`effect is running, search field is now ${value}`);

    if (value) {
      console.log(`fetching data for countries includes ${value}`);
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((response) => {
          setCountries(response.data);
        });
    }
  }, [value]);

  // filter countries by input value
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

  const handleChangeValue = (e) => {
    setValue(e.target.value);
    setShownCountry('');
  };

  return (
    <>
      <p>
        find countries <input value={value} onChange={handleChangeValue} />
      </p>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        filteredCountries.map((country) => (
          <div key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => setShownCountry(country.name.common)}>
              Show
            </button>
            {shownCountry === country.name.common && (
              <CountryDetails country={country} />
            )}
          </div>
        ))
      )}
    </>
  );
}

export default App;
