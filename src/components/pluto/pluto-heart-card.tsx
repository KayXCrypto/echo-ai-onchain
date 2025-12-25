'use client';

export default function PlutoHeartCard() {
  // Pluto data from NASA New Horizons
  const temperature = -375; // °F average
  const temperatureC = -225; // °C
  const heartName = 'Tombaugh Regio';
  const heartWidth = 1000; // miles wide
  const atmosphereHeight = 1000; // miles high when close to Sun
  const moonCharon = 'Charon';
  const orbitDays = 248; // Earth years
  const dayLength = 153; // Earth hours

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Pluto
        </h3>
        <p className="text-xs text-gray-500">Dwarf Planet • Heart-Shaped Region</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {temperature}°F
            </div>
            <div className="text-xs text-gray-500">{temperatureC}°C</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">The Heart</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {heartWidth.toLocaleString()} mi
            </div>
            <div className="text-xs text-gray-500">Nitrogen ice</div>
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Tombaugh Regio</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            Heart-shaped plain
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            Bright nitrogen ice
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Orbital Period</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {orbitDays} years
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Distant dwarf planet
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Moon</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {moonCharon}
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Atmosphere</div>
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              Thin
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA New Horizons
      </div>
    </div>
  );
}


