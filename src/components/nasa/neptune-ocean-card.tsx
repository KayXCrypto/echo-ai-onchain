'use client';

export default function NeptuneOceanCard() {
  // Scientific data for Neptune based on NASA research and planetary models
  // No live data available - last mission was Voyager 2 (1989)
  const tempC = -214;
  const tempF = -353;
  const tempK = 59;
  const windKmh = 2000;
  const windMph = 1243;
  const pressureBars = 100000; // Extreme pressure in the ocean
  const depthKm = 8000;
  const depthMiles = 4971;

  return (
    <div className="flex h-full flex-col space-y-2 overflow-hidden">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Neptune's Ocean
        </h3>
        <p className="text-xs text-gray-500">8th Planet • Ice Giant</p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Cloud Top Temperature</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {tempF}°F / {tempC}°C
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {tempK}K
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Ocean Depth</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {depthMiles.toLocaleString()} mi
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {depthKm.toLocaleString()} km
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-900/20">
            <div className="text-xs text-cyan-600 dark:text-cyan-400">Wind Speed</div>
            <div className="text-lg font-bold text-cyan-900 dark:text-cyan-200">
              {windMph.toLocaleString()} mph / {windKmh.toLocaleString()} km/h
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Ocean Composition</div>
            <div className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              Water, Methane, Ammonia
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/20">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Pressure</div>
            <div className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
              ~{(pressureBars / 1000).toLocaleString()}k bars
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