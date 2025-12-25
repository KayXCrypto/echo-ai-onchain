'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    rain: number;
    weather_code: number;
    cloud_cover: number;
    wind_speed_10m: number;
  };
  daily: {
    precipitation_sum: number[];
    rain_sum: number[];
    precipitation_hours: number[];
  };
  historical?: {
    yearlyPrecipitation: { year: number; total: number }[];
    decadeTotal: number;
    decadeAverage: number;
  };
}

export default function AtacamaDesertWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/weather/atacama-desert');
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading weather data...</div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load weather data</div>
      </div>
    );
  }

  const temp = weatherData.current.temperature_2m.toFixed(1);
  const tempC = ((weatherData.current.temperature_2m - 32) * 5 / 9).toFixed(1);
  const humidity = weatherData.current.relative_humidity_2m;
  const precipitation = weatherData.current.precipitation.toFixed(3);
  const windSpeed = weatherData.current.wind_speed_10m.toFixed(1);
  const cloudCover = weatherData.current.cloud_cover;
  const todayPrecip = weatherData.daily.precipitation_sum[0].toFixed(3);
  const todayPrecipHours = weatherData.daily.precipitation_hours[0];

  // Format last updated time
  const lastUpdated = weatherData.current.time ? new Date(weatherData.current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  // Coordinates
  const latitude = 24.5;
  const longitude = 69.25;

  // Get current year and most recent year data
  const currentYear = new Date().getFullYear();
  const recentYearData = weatherData.historical?.yearlyPrecipitation.find(y => y.year === currentYear) ||
                         weatherData.historical?.yearlyPrecipitation[0];
  const decadeAvg = weatherData.historical?.decadeAverage || 0;
  const decadeTotal = weatherData.historical?.decadeTotal || 0;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Atacama Desert
        </h3>
        <p className="text-xs text-gray-500">{latitude}°S {longitude}°W • Chile</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {temp}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {tempC}°C
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Humidity</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {humidity}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Relative
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {recentYearData && (
            <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/20">
              <div className="text-xs text-purple-600 dark:text-purple-400">{recentYearData.year} Total</div>
              <div className="text-lg font-bold text-purple-900 dark:text-purple-200">
                {recentYearData.total.toFixed(3)} in
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                Annual precipitation
              </div>
            </div>
          )}

          {weatherData.historical && (
            <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/20">
              <div className="text-xs text-indigo-600 dark:text-indigo-400">10-Year Data</div>
              <div className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
                Avg: {decadeAvg.toFixed(3)} in/year
              </div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400">
                Total: {decadeTotal.toFixed(3)} in
              </div>
            </div>
          )}

          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Wind & Clouds</div>
            <div className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              {windSpeed} mph • {cloudCover}% cover
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400 mt-2">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
}
