import React, { useState } from "react";
import "./App.css";

function WeatherCard({ city, temperature, description }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Shahar: {city}</h5>
        <p className="card-text">Harorat: {temperature}°C</p>
        <p className="card-text">Qisqacha Malumot: {description}</p>
      </div>
    </div>
  );
}

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const fetchWeatherData = () => {
    // Validate city name
    if (!city.trim()) {
      setError("Shahar nomini kiriting");
      setWeatherData(null);
      return;
    }

    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=895284fb2d2c50a520ea537456963d9c`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Bunday shahar mavjud emas");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData({
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
        });
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("Bunday shahar mavjud emas");
        setWeatherData(null);
      });
  };

  return (
    <div className="container mx-auto w-50">
      <h1 className="text-center mt-4 pt-5 mb-5 text-light">
        Shahar Ob Havosi haqida qisqacha
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Shahar nomi kiriting"
            value={city}
            onChange={handleChange}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      {weatherData && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <WeatherCard
              city={weatherData.city}
              temperature={weatherData.temperature}
              description={weatherData.description}
            />
          </div>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default App;
