'use client';

export default function UranusTiltCard() {
  // Uranus data from NASA Voyager 2
  const axisTilt = 98; // degrees - rolls on its side
  const temperature = -320; // °F coldest planetary atmosphere
  const temperatureC = -195; // °C
  const windSpeed = 560; // mph
  const seasonLength = 21; // Earth years per season
  const magneticTilt = 59; // degrees off axis
  const moonCount = 27; // known moons
  const ringCount = 13; // faint rings

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Uranus
        </h3>
        <p className="text-xs text-gray-500">Sideways Planet • Ice Giant</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Axis Tilt</div>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {axisTilt}°
            </div>
            <div className="text-xs text-gray-500">Rolls on its side</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {temperature}°F
            </div>
            <div className="text-xs text-gray-500">Coldest atmosphere</div>
          </div>
        </div>

        <div className="rounded-lg bg-cyan-50 p-3 dark:bg-cyan-900/20">
          <div className="text-xs text-cyan-600 dark:text-cyan-400">Wind Speed</div>
          <div className="text-base font-bold text-cyan-900 dark:text-cyan-200">
            {windSpeed} mph
          </div>
          <div className="text-xs text-cyan-600 dark:text-cyan-400">
            Retrograde rotation
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Season Length</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {seasonLength} years
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            42 year day/night cycle
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Moons</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {moonCount}
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Rings</div>
            <div className="font-semibold text-cyan-600 dark:text-cyan-400">
              {ringCount}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Voyager 2
      </div>
    </div>
  );
}


