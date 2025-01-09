require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cities = require("./data/moroccan-cities");
const requestIp = require("request-ip");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://yourproductiondomain.com"],
  })
);
const port = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Get list of all cities
app.get("/api/cities", (req, res) => {
  res.json(cities);
});

// Get weather for specific city by ID
app.get("/api/weather/:cityId", async (req, res) => {
  try {
    const city = cities.find((c) => c.id === parseInt(req.params.cityId));

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat: city.lat,
          lon: city.lon,
          appid: OPENWEATHER_API_KEY,
          units: "metric", // For Celsius
        },
      }
    );

    const weatherData = {
      city: city.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      icon: response.data.weather[0].icon,
    };

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.get("/api/detect-location", async (req, res) => {
  try {
    const clientIp = requestIp.getClientIp(req);
    // const response = await axios.get(`https://ipapi.co/${clientIp}/json/`);
    const response = await axios.get(`https://ipapi.co/41.92.15.194/json/`);

    console.log(response.data);

    const locationData = {
      city: response.data.city,
      region: response.data.region,
      country: response.data.country_name,
      latitude: response.data.latitude,
      longitude: response.data.longitude,
      cityId:
        cities.find(
          (c) => c.name.toLowerCase() === response.data.city.toLowerCase()
        )?.id || null,
    };

    res.json(locationData);
  } catch (error) {
    console.error("Error detecting location:", error);
    res.status(500).json({ error: "Failed to detect location" });
  }
});

// Get 5-day forecast for a city
app.get("/api/forecast/:cityId", async (req, res) => {
  try {
    const city = cities.find((c) => c.id === parseInt(req.params.cityId));
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          lat: city.lat,
          lon: city.lon,
          appid: OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    const forecastData = response.data.list.map(item => ({
      date: item.dt_txt,
      temperature: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }));

    res.json(forecastData);
  } catch (error) {
    console.error("Error fetching forecast:", error);
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
