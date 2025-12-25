'use client';

export default function OlympusMonsCard() {
  // Olympus Mons - tallest planetary mountain in the Solar System
  const heightM = 21900; // meters
  const heightFt = 72000; // feet
  const diameterKm = 600; // kilometers
  const diameterMi = 373; // miles
  const tempC = -23; // average degrees Celsius
  const tempF = -9; // average degrees Fahrenheit
  const pressurePa = 72; // pascals (much lower than Mars average)

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Olympus Mons
        </h3>
        <p className="text-xs text-gray-500">Shield Volcano • Tharsis Region</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Height</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {heightM.toLocaleString()} m
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {heightFt.toLocaleString()} ft
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {tempF}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {tempC}°C
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-red-50 p-2 dark:bg-red-900/20">
            <div className="text-xs text-red-600 dark:text-red-400">Base Diameter</div>
            <div className="text-lg font-bold text-red-900 dark:text-red-200">
              {diameterKm} km / {diameterMi} mi
            </div>
            <div className="text-xs text-red-600 dark:text-red-400">
              Nearly 3x height of Mt. Everest
            </div>
          </div>

          <div className="rounded-lg bg-orange-50 p-2 dark:bg-orange-900/20">
            <div className="text-xs text-orange-600 dark:text-orange-400">Atmospheric Pressure</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-200">
              {pressurePa} Pa
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/20">
            <div className="text-xs text-amber-600 dark:text-amber-400">Type</div>
            <div className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              Extinct Shield Volcano
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA
      </div>
    </div>
  );
}
