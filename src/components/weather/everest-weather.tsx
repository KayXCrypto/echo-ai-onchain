'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  location: {
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
  };
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    pressure_msl: number;
  };
  current_units: {
    temperature_2m: string;
    wind_speed_10m: string;
    pressure_msl: string;
  };
}

export default function EverestWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather/everest');
        if (!response.ok) throw new Error('Failed to fetch weather');
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading weather data...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load weather data</div>
      </div>
    );
  }

  const { current, current_units, location } = weather;

  // Conversions
  const tempC = current.temperature_2m;
  const tempF = (tempC * 9/5) + 32;
  const tempK = tempC + 273.15;

  const windKmh = current.wind_speed_10m;
  const windMph = windKmh * 0.621371;

  const precipMm = current.precipitation;
  const precipIn = precipMm * 0.0393701;

  const elevationM = location.elevation;
  const elevationFt = elevationM * 3.28084;

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {location.name}
        </h3>
        <p className="text-xs text-gray-500">
          {location.latitude.toFixed(4)}°N {location.longitude.toFixed(4)}°E • Nepal/Tibet
        </p>
      </div>

      <div className="flex-1 space-y-3">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(tempF)}°F / {Math.round(tempC)}°C
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {Math.round(tempK)}K
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/20">
            <div className="text-xs text-purple-600 dark:text-purple-400">Wind Speed</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-200">
              {Math.round(windMph)} mph / {Math.round(windKmh)} km/h
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/20">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Precipitation</div>
            <div className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
              {precipIn.toFixed(2)}in / {precipMm.toFixed(1)}mm
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-gray-500">Humidity</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {current.relative_humidity_2m}%
            </div>
          </div>
          <div>
            <div className="text-gray-500">Wind Dir</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {Math.round(current.wind_direction_10m)}°
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Updated: {new Date(current.time).toLocaleTimeString()}
      </div>
    </div>
  );
}