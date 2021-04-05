import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WeatherWidget from './components/WeatherWidget/WeatherWidget';
// mock data for testing without API call
import testData from './testData.json';
import transformDataFromApi from './utils/transformDataFromApi';
import { LOCATION_CONFIG, OPEN_WEATHER_MAP_KEY, OPEN_CAGE_DATA_KEY } from './constant/defaultConfig'
const App = () => {
  // get weather forecast
  const [forecast, setForecast] = useState([]);
  // use coordinate to get current City info
  const [currentCityInfo, setCurrentCityInfo] = useState({});
  // set state to get weather after coordinate is returned
  const [shouldCallForWeather, setShouldCallForWeather] = useState(false);
  // set state to get city name after coordinate is returned
  const [shouldCallForCityName, setShouldCallForCityName] = useState(false);
  // store location in state
  const [location, setLocation] = useState([]);
  // store error message in state
  const [error, setError] = useState('');
  
  // TODO feature to store coordinates in local storage
  // const oldCoords = localStorage.getItem('coords');

  // Success handler for geolocation's `getCurrentPosition` method
  const handleSuccess = position => {
    const { latitude, longitude } = position.coords;
    // localStorage.setItem('coords', position.coords);
    if(latitude !== location[0] && longitude !== location[1]) {
      setLocation([
        latitude,
        longitude
      ]);
      setShouldCallForWeather(true);
      setShouldCallForCityName(true);
    }
  };

  // Error handler for geolocation's `getCurrentPosition` method
  const handleError = error => {
    setError(error.message);
  };
  // ...

  if(!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
  } else {
    // console.log('Locating…');
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }

  const getCityName = async (latitude, longitude) => {
    try {
      if(latitude && longitude) {
        const response = await axios.get( `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPEN_CAGE_DATA_KEY}`);
        if(response.data.results[0]) {
          setCurrentCityInfo({city: `${response.data.results[0].components.village}, ${response.data.results[0].components.state} `, label: response.data.results[0].annotations.flag});
          setShouldCallForCityName(false);
        }
      }
    } catch (err) {
      if (OPEN_CAGE_DATA_KEY.length === 0) {
        setError('');
      } else {
        setError(err.stack);
      }
    }
  }

  const fetchWeatherAsync = async (latitude, longitude, cityId) => {
    let queryParams = {}
    if(!cityId) {
      queryParams = {
        lat: latitude,
        lon: longitude,
        lang: LOCATION_CONFIG.locale,
        appid: OPEN_WEATHER_MAP_KEY,
        units: LOCATION_CONFIG.unit,
      }
    } else {
      queryParams = {
        q: cityId,
        lang: LOCATION_CONFIG.locale,
        appid: OPEN_WEATHER_MAP_KEY,
        units: LOCATION_CONFIG.unit,
      };
    }
    try {
      if(JSON.stringify(queryParams) !== '{}') {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/forecast',
          {
            params: queryParams,
          },
        );
        const transformData = response.data.list.map(transformDataFromApi);
        setForecast(transformData);
        setShouldCallForWeather(false);
      }
    } catch (err) {
      if (OPEN_WEATHER_MAP_KEY.length === 0) {
        // Use mock data if no key
        const transformData = testData.list.map(transformDataFromApi);
        setForecast(transformData);
        setError('');
      } else {
        setError(err.stack);
      }
    }
  };

  useEffect(() => {
    if(shouldCallForWeather) {
      fetchWeatherAsync(location[0], location[1]);
    }
  }, [shouldCallForWeather]); // notice the empty array here

  useEffect(() => {
    if(shouldCallForCityName) {
      getCityName(location[0], location[1]);
    }
  }, [shouldCallForCityName]);
  return (
    <div className="App">
      {error.length === 0 ? (
        <WeatherWidget
          config={{
            city: currentCityInfo.city,
            location: currentCityInfo.label,
            locale: LOCATION_CONFIG.locale,
            unit: LOCATION_CONFIG.unit,
          }}
          forecast={forecast}
        />
      ) : (
        <div>
          <h2>Unable to fetch weather data!</h2>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
