'use client';

export default function VallesMarinerisCard() {
  // Valles Marineris - largest canyon system in the Solar System
  const lengthKm = 4000; // kilometers
  const lengthMi = 2485; // miles
  const widthKm = 200; // kilometers
  const widthMi = 124; // miles
  const depthKm = 7; // kilometers
  const depthM = 7000; // meters
  const tempC = -23; // average degrees Celsius
  const tempF = -9; // average degrees Fahrenheit

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Valles Marineris
        </h3>
        <p className="text-xs text-gray-500">Equatorial Canyon System</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Length</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {lengthKm.toLocaleString()} km
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {lengthMi.toLocaleString()} mi
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Max Depth</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {depthKm} km
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {depthM.toLocaleString()} m
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-red-50 p-2 dark:bg-red-900/20">
            <div className="text-xs text-red-600 dark:text-red-400">Width</div>
            <div className="text-lg font-bold text-red-900 dark:text-red-200">
              {widthKm} km / {widthMi} mi
            </div>
            <div className="text-xs text-red-600 dark:text-red-400">
              ~10x deeper than Grand Canyon
            </div>
          </div>

          <div className="rounded-lg bg-orange-50 p-2 dark:bg-orange-900/20">
            <div className="text-xs text-orange-600 dark:text-orange-400">Temperature</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-200">
              {tempF}°F / {tempC}°C
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/20">
            <div className="text-xs text-amber-600 dark:text-amber-400">Formation</div>
            <div className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              Tectonic Rifting
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
