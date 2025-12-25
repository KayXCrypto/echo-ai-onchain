'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    surface_pressure: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export default function DanakilDepressionWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/weather/danakil-depression');
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
  const windSpeed = weatherData.current.wind_speed_10m.toFixed(1);
  const pressure = weatherData.current.surface_pressure.toFixed(1);
  const todayMax = weatherData.daily.temperature_2m_max[0].toFixed(1);
  const todayMin = weatherData.daily.temperature_2m_min[0].toFixed(1);

  // Format last updated time
  const lastUpdated = weatherData.current.time ? new Date(weatherData.current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  // Coordinates and elevation
  const latitude = 14.2417;
  const longitude = 40.3;
  const elevation = -125; // meters below sea level

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Danakil Depression
        </h3>
        <p className="text-xs text-gray-500">{latitude}°N {longitude}°E • Ethiopia</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Current Temperature</div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {temp}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {tempC}°C
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Today's Range</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {todayMax}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Low: {todayMin}°F
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-red-50 p-2 dark:bg-red-900/20">
            <div className="text-xs text-red-600 dark:text-red-400">Hottest Inhabited Place</div>
            <div className="text-lg font-bold text-red-900 dark:text-red-200">
              Year-round 120°F+
            </div>
            <div className="text-xs text-red-600 dark:text-red-400">
              Average: 96-100°F (36-38°C)
            </div>
          </div>

          <div className="rounded-lg bg-yellow-50 p-2 dark:bg-yellow-900/20">
            <div className="text-xs text-yellow-600 dark:text-yellow-400">Volcanic Activity</div>
            <div className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
              Acid pools • pH ≈ 0
            </div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">
              {elevation}m below sea level
            </div>
          </div>

          <div className="rounded-lg bg-orange-50 p-2 dark:bg-orange-900/20">
            <div className="text-xs text-orange-600 dark:text-orange-400">Conditions</div>
            <div className="text-sm font-semibold text-orange-900 dark:text-orange-200">
              {windSpeed} mph • {humidity}% humidity
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
