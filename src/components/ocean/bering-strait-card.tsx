'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  weather: {
    current: {
      time: string;
      temperature_2m: number;
      relative_humidity_2m: number;
      apparent_temperature: number;
      precipitation: number;
      weather_code: number;
      wind_speed_10m: number;
      wind_direction_10m: number;
    };
    current_units: {
      temperature_2m: string;
      wind_speed_10m: string;
    };
  };
  current_wave: {
    wave_height: number;
    wave_direction: number;
    wave_period: number;
    swell_wave_height: number;
    swell_wave_direction: number;
    swell_wave_period: number;
  };
}

export default function BeringStraitCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather/bering-strait');
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

  const { weather: weatherData, location, current_wave } = weather;
  const { current } = weatherData;

  const tempC = current.temperature_2m;
  const tempF = (tempC * 9/5) + 32;

  const waveHeightM = current_wave.wave_height;
  const waveHeightFt = waveHeightM * 3.28084;

  const swellHeightM = current_wave.swell_wave_height;
  const swellHeightFt = swellHeightM * 3.28084;

  const windKmh = current.wind_speed_10m;
  const windMph = windKmh * 0.621371;

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {location.name}
        </h3>
        <p className="text-xs text-gray-500">
          Arctic Ocean • Gateway between continents
        </p>
        <p className="text-xs text-gray-500">
          {location.latitude.toFixed(1)}°N {Math.abs(location.longitude).toFixed(1)}°W
        </p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(tempF)}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {Math.round(tempC)}°C
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Wave Height</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {waveHeightFt.toFixed(1)} ft
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {waveHeightM.toFixed(1)} m
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Swell Height</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-200">
              {swellHeightFt.toFixed(1)} ft / {swellHeightM.toFixed(1)} m
            </div>
          </div>

          <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-900/20">
            <div className="text-xs text-cyan-600 dark:text-cyan-400">Wind Speed</div>
            <div className="text-lg font-bold text-cyan-900 dark:text-cyan-200">
              {Math.round(windMph)} mph / {Math.round(windKmh)} km/h
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/20">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Wave Period</div>
            <div className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
              {current_wave.wave_period.toFixed(1)} seconds
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Updated {new Date(current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}
