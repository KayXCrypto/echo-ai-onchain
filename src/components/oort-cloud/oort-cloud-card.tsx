'use client';

export default function OortCloudCard() {
  // Oort Cloud data from NASA
  const innerDistance = 2000; // AU from Sun
  const outerDistance = 100000; // AU from Sun
  const objectCount = 'Trillions'; // icy bodies
  const temperature = -440; // °F near absolute zero
  const temperatureC = -262; // °C
  const sunlightTime = 1.5; // years for light to reach
  const composition = 'Icy comets';
  const discoveryYear = 1950; // theorized by Jan Oort

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Oort Cloud
        </h3>
        <p className="text-xs text-gray-500">Edge of Solar System • Comet Nursery</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Distance</div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {innerDistance.toLocaleString()}-{outerDistance.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">AU from Sun</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {temperature}°F
            </div>
            <div className="text-xs text-gray-500">Near absolute zero</div>
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Objects</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {objectCount}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            {composition}
          </div>
        </div>

        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
          <div className="text-xs text-indigo-600 dark:text-indigo-400">Light Travel Time</div>
          <div className="text-base font-bold text-indigo-900 dark:text-indigo-200">
            {sunlightTime} years
          </div>
          <div className="text-xs text-indigo-600 dark:text-indigo-400">
            From Sun to outer edge
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Shape</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              Spherical shell
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Theorized</div>
            <div className="font-semibold text-purple-600 dark:text-purple-400">
              {discoveryYear}
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


