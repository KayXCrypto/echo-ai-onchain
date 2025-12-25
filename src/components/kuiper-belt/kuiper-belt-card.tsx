'use client';

export default function KuiperBeltCard() {
  // Kuiper Belt data from NASA
  const distance = 30; // AU from Sun (start)
  const distanceEnd = 50; // AU from Sun (end)
  const objectCount = 'Billions'; // icy bodies
  const largestObject = 'Pluto'; // and similar dwarf planets
  const temperature = -380; // °F average
  const temperatureC = -230; // °C
  const composition = 'Ice & rock';
  const discoveryYear = 1992; // first object found

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Kuiper Belt
        </h3>
        <p className="text-xs text-gray-500">Beyond Neptune • Icy Frontier</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Distance</div>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {distance}-{distanceEnd} AU
            </div>
            <div className="text-xs text-gray-500">From the Sun</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {temperature}°F
            </div>
            <div className="text-xs text-gray-500">{temperatureC}°C</div>
          </div>
        </div>

        <div className="rounded-lg bg-cyan-50 p-3 dark:bg-cyan-900/20">
          <div className="text-xs text-cyan-600 dark:text-cyan-400">Objects</div>
          <div className="text-base font-bold text-cyan-900 dark:text-cyan-200">
            {objectCount}
          </div>
          <div className="text-xs text-cyan-600 dark:text-cyan-400">
            Icy bodies
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Largest Objects</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {largestObject}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            And other dwarf planets
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Composition</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {composition}
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Discovered</div>
            <div className="font-semibold text-cyan-600 dark:text-cyan-400">
              {discoveryYear}
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


