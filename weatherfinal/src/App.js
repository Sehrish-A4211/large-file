import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${'03cd21be35d86983a67f387511fef099'}&units=metric`;

    try {
      const response = await fetch(apiURL);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setWeather(null);
        setError(data.message);
      }
    } catch (error) {
      setWeather(null);
      setError('Unable to fetch weather data.');
    }
  };

  const getUserLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'03cd21be35d86983a67f387511fef099'}&units=metric`;

        try {
          const response = await fetch(apiURL);
          const data = await response.json();

          if (response.ok) {
            setWeather(data);
            setError(null);
          } else {
            setWeather(null);
            setError(data.message);
          }
        } catch (error) {
          setWeather(null);
          setError('Unable to fetch weather data.');
        }
      }, (error) => {
        setWeather(null);
        setError('Error getting geolocation.');
      });
    } else {
      setWeather(null);
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="App">
      <h1>Weather</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city or country name"
      />
      <button onClick={getWeather}>Get Weather</button>
      <button onClick={getUserLocationWeather}>Get Current Location Weather</button>
      <div id="weatherDisplay">
        {weather && (
          <div>
            <p>Location: {weather.name}, {weather.sys.country}</p>
       
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
        {error && <p className="error">Error: {error}</p>}
      </div>
    </div>
  );
}

export default App;

