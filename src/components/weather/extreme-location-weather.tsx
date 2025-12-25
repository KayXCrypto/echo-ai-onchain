'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  location: {
    name: string;
    latitude: number;
    longitude: number;
    elevation?: number;
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

interface Props {
  endpoint: string;
  colorScheme: 'red' | 'blue' | 'green' | 'purple';
}

export default function ExtremeLocationWeather({ endpoint, colorScheme }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const colors = {
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-600 dark:text-red-400',
      bold: 'text-red-900 dark:text-red-200',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      bold: 'text-blue-900 dark:text-blue-200',
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-600 dark:text-green-400',
      bold: 'text-green-900 dark:text-green-200',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-600 dark:text-purple-400',
      bold: 'text-purple-900 dark:text-purple-200',
    },
  };

  const color = colors[colorScheme];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(endpoint);
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
  }, [endpoint]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load</div>
      </div>
    );
  }

  const { current, location } = weather;

  const tempC = current.temperature_2m;
  const tempF = (tempC * 9/5) + 32;
  const tempK = tempC + 273.15;

  const windKmh = current.wind_speed_10m;
  const windMph = windKmh * 0.621371;

  const precipMm = current.precipitation;
  const precipIn = precipMm * 0.0393701;

  // Determine country/region based on location name
  const getLocationInfo = (name: string) => {
    if (name.includes('North Pole')) {
      return { coords: '90.0°N 0.0°E', region: 'Arctic Ocean' };
    } else if (name.includes('South Pole')) {
      return { coords: '90.0°S 0.0°E', region: 'Antarctica' };
    } else if (name.includes('Death Valley')) {
      return { coords: `${Math.abs(location.latitude).toFixed(4)}°N ${Math.abs(location.longitude).toFixed(4)}°W`, region: 'California, USA' };
    }
    // Default fallback
    const latDir = location.latitude >= 0 ? 'N' : 'S';
    const lonDir = location.longitude >= 0 ? 'E' : 'W';
    return {
      coords: `${Math.abs(location.latitude).toFixed(4)}°${latDir} ${Math.abs(location.longitude).toFixed(4)}°${lonDir}`,
      region: ''
    };
  };

  const locationInfo = getLocationInfo(location.name);

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {location.name}
        </h3>
        <p className="text-xs text-gray-500">
          {locationInfo.coords}{locationInfo.region ? ` • ${locationInfo.region}` : ''}
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
          <div className={`rounded-lg p-2 ${color.bg}`}>
            <div className={`text-xs ${color.text}`}>Wind Speed</div>
            <div className={`text-lg font-bold ${color.bold}`}>
              {Math.round(windMph)} mph / {Math.round(windKmh)} km/h
            </div>
          </div>

          <div className={`rounded-lg p-2 ${color.bg}`}>
            <div className={`text-xs ${color.text}`}>Precipitation</div>
            <div className={`text-lg font-bold ${color.bold}`}>
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