'use client';

import { useEffect, useState } from 'react';

export default function ChoOyu8000mCard() {
  const [weather, setWeather] = useState<any>(null);
  const heightM = 8188;
  const heightFt = 26864;
  const prominence = 2340;

  useEffect(() => {
    fetch('/api/weather/cho-oyu')
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(() => {});
  }, []);

  const tempC = weather?.weather?.current?.temperature_2m;
  const tempF = tempC ? (tempC * 9/5) + 32 : null;
  const windKmh = weather?.weather?.current?.wind_speed_10m;
  const windMph = windKmh ? windKmh * 0.621371 : null;

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Cho Oyu</h3>
        <p className="text-xs text-gray-500">Himalayas • Nepal/China</p>
      </div>
      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Elevation</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{heightM.toLocaleString()} m</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{heightFt.toLocaleString()} ft</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Prominence</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{prominence.toLocaleString()} m</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Rank</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-200">#6 of 14 Eight-thousanders</div>
          </div>
          <div className="space-y-2">
            <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/20">
              <div className="text-xs text-amber-600 dark:text-amber-400">Temperature</div>
              {tempC !== null && tempC !== undefined ? (
                <div className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                  {Math.round(tempF!)}°F / {Math.round(tempC)}°C
                </div>
              ) : (
                <div className="text-xs text-gray-500">Loading...</div>
              )}
            </div>
            <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-900/20">
              <div className="text-xs text-cyan-600 dark:text-cyan-400">Wind Speed</div>
              {windKmh !== null && windKmh !== undefined ? (
                <div className="text-sm font-semibold text-cyan-900 dark:text-cyan-200">
                  {Math.round(windMph!)} mph
                </div>
              ) : (
                <div className="text-xs text-gray-500">Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400">28°06′N 86°40′E</div>
    </div>
  );
}
