'use client';

export default function GanymedeCard() {
  // Ganymede data from NASA
  const moonSize = 3273; // miles diameter
  const sizeComparison = 'Mercury'; // larger than Mercury
  const magneticField = 'Yes'; // only moon with one
  const oceanDepth = 60; // miles deep subsurface ocean
  const temperature = -297; // °F average
  const orbitalPeriod = 7.15; // Earth days
  const surfaceType = 'Two types'; // old dark & young bright terrain
  const iceThickness = 100; // miles thick ice shell

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Ganymede
        </h3>
        <p className="text-xs text-gray-500">Jupiter's Moon • Largest Moon</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Diameter</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {moonSize.toLocaleString()} mi
            </div>
            <div className="text-xs text-gray-500">Larger than {sizeComparison}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {temperature}°F
            </div>
            <div className="text-xs text-gray-500">Ice world</div>
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Magnetic Field</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            Only moon with one
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Creates magnetosphere
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Subsurface Ocean</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {oceanDepth} miles deep
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Beneath {iceThickness} mi ice
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Surface</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {surfaceType}
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Orbit</div>
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              {orbitalPeriod} days
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Galileo
      </div>
    </div>
  );
}


