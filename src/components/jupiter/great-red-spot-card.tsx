'use client';

export default function GreatRedSpotCard() {
  // Jupiter's Great Red Spot data from NASA
  const stormAge = 350; // years minimum observed
  const stormWidth = 10000; // miles - could fit 1-2 Earths
  const windSpeed = 268; // mph at the edges
  const rotationPeriod = 6; // days for one rotation
  const cloudTop = 'Ammonia';
  const stormType = 'Anticyclone';
  const shrinkingRate = 'Yes'; // Getting smaller over time
  const temperature = -260; // °F at cloud tops

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Great Red Spot
        </h3>
        <p className="text-xs text-gray-500">Jupiter • Massive Storm</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Storm Age</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {stormAge}+ years
            </div>
            <div className="text-xs text-gray-500">Still raging</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Size</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {stormWidth.toLocaleString()} mi
            </div>
            <div className="text-xs text-gray-500">Fits 1-2 Earths</div>
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Wind Speed</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            {windSpeed} mph
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            {stormType} storm
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Rotation Period</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {rotationPeriod} days
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Counter-clockwise
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Clouds</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {cloudTop}
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Temp</div>
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              {temperature}°F
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Juno
      </div>
    </div>
  );
}

