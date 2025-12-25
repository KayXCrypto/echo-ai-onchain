'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    surface_pressure: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
  };
}

export default function VostokStationWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/weather/vostok-station');
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
  const windSpeed = weatherData.current.wind_speed_10m.toFixed(1);
  const windDir = weatherData.current.wind_direction_10m;
  const pressure = weatherData.current.surface_pressure.toFixed(1);

  // Record low temperature
  const recordLowF = -128.6;
  const recordLowC = -89.2;

  // Format last updated time
  const lastUpdated = weatherData.current.time ? new Date(weatherData.current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  // Coordinates and elevation
  const latitude = 78.4587;
  const longitude = 106.8357;
  const elevation = 3488; // meters

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Vostok Station
        </h3>
        <p className="text-xs text-gray-500">{latitude}°S {longitude}°E • Antarctica</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Current Temperature</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {temp}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {tempC}°C
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Record Low</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {recordLowF}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {recordLowC}°C
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-900/20">
            <div className="text-xs text-cyan-600 dark:text-cyan-400">Coldest on Earth</div>
            <div className="text-lg font-bold text-cyan-900 dark:text-cyan-200">
              July 21, 1983
            </div>
            <div className="text-xs text-cyan-600 dark:text-cyan-400">
              {elevation.toLocaleString()}m elevation • Polar plateau
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Katabatic Winds</div>
            <div className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              {windSpeed} mph • {windDir}°
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">
              Avg 11 mph, gusts up to 60 mph
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/20">
            <div className="text-xs text-purple-600 dark:text-purple-400">Polar Night</div>
            <div className="text-sm font-semibold text-purple-900 dark:text-purple-200">
              ~120 days of darkness
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              85 days continuous night (Apr-Aug)
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
}
