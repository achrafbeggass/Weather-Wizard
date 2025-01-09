import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./App.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface City {
  id: number;
  name: string;
}

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cities");
        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data = await response.json();
        setCities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/detect-location"
        );
        if (!response.ok) {
          throw new Error("Failed to detect location");
        }
        const data = await response.json();
        setCurrentLocation(data.city);
        setSelectedCity(data.cityId.toString());

        handleCitySelect(data.cityId.toString());
      } catch (err) {
        console.error("Failed to detect location:", err);
      }
    };

    detectLocation();
  }, []);

  const handleCitySelect = async (cityId: string) => {
    setSelectedCity(cityId);
    setWeatherLoading(true);
    setWeatherError(null);
    setForecastLoading(true);
    setForecastError(null);

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(`http://localhost:3000/api/weather/${cityId}`),
        fetch(`http://localhost:3000/api/forecast/${cityId}`),
      ]);

      if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");
      if (!forecastResponse.ok)
        throw new Error("Failed to fetch forecast data");

      const [weatherData, forecastData] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json(),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setWeatherError(err instanceof Error ? err.message : "An error occurred");
      setForecastError(
        err instanceof Error ? err.message : "An error occurred"
      );
    } finally {
      setWeatherLoading(false);
      setForecastLoading(false);
    }
  };

  const formatForecastForChart = (forecastData: any[]) => {
    return forecastData
      .map((day) => ({
        time: new Date(day.date).toLocaleDateString("en-US", {
          weekday: "short",
          hour: "numeric",
        }),
        temperature: Math.round(day.temperature),
        originalDate: new Date(day.date),
      }))
      .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime());
  };

  const getDailyForecasts = (forecastData: any[]) => {
    const dailyData = forecastData.reduce((acc: any, curr) => {
      const date = new Date(curr.date).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!acc[date]) {
        acc[date] = {
          date: new Date(curr.date),
          temperatures: [],
        };
      }
      acc[date].temperatures.push(curr.temperature);
      return acc;
    }, {});

    return Object.values(dailyData).map((day: any) => ({
      date: day.date,
      avgTemperature: Math.round(
        day.temperatures.reduce((sum: number, temp: number) => sum + temp, 0) /
          day.temperatures.length
      ),
    }));
  };

  if (loading) return <div>Loading cities...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      {currentLocation && (
        <div className="mb-4 text-sm text-gray-600 italic">
          You are currently in {currentLocation}
        </div>
      )}

      {selectedCity && (
        <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
          <img
            src={
              cities.find((city) => city.id.toString() === selectedCity)
                ?.imageUrl
            }
            alt={
              cities.find((city) => city.id.toString() === selectedCity)?.name
            }
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
            {cities.find((city) => city.id.toString() === selectedCity)?.name}
          </h1>
        </div>
      )}

      <Select onValueChange={handleCitySelect} value={selectedCity}>
        <SelectTrigger className="w-full mb-6">
          <SelectValue placeholder="Select a city" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.id} value={city.id.toString()}>
              {city.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {weatherLoading && (
        <div className="text-center text-gray-600">Loading weather data...</div>
      )}
      {weatherError && (
        <div className="text-center text-red-500">
          Weather Error: {weatherError}
        </div>
      )}
      {weather && !weatherLoading && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {weather.city}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              className="w-16 h-16"
            />
          </div>

          <div className="mb-4">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {Math.round(weather.temperature)}°C
            </div>
            <div className="text-gray-600 capitalize">
              {weather.description}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Humidity: {weather.humidity}%</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <span>Wind: {weather.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      )}

      {forecastLoading && (
        <div className="text-center text-gray-600 mt-6">
          Loading forecast...
        </div>
      )}
      {forecastError && (
        <div className="text-center text-red-500 mt-6">
          Forecast Error: {forecastError}
        </div>
      )}
      {forecast.length > 0 && !forecastLoading && (
        <>
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Temperature Timeline
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={formatForecastForChart(forecast)}
                  margin={{ top: 20, right: 30, bottom: 30, left: 20 }}
                >
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 8,
                      fill: "#06b6d4",
                      strokeWidth: 0,
                    }}
                  />
                  <XAxis
                    dataKey="time"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    stroke="#e5e7eb"
                  />
                  <YAxis
                    unit="°C"
                    width={45}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    stroke="#e5e7eb"
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      padding: "12px",
                    }}
                    formatter={(value: number) => [`${value}°C`, "Temperature"]}
                    labelStyle={{ color: "#6b7280" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {getDailyForecasts(forecast).map((day) => (
              <div
                key={day.date.toString()}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                <div className="text-lg font-semibold text-gray-800">
                  {day.date.toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </div>
                <div className="text-3xl font-bold text-gray-900 my-2">
                  {day.avgTemperature}°C
                </div>
                <div className="text-sm text-gray-600">Daily Average</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
