'use client';

export default function VenusSurfaceCard() {
  // Venus surface data from NASA Magellan and Venera missions
  const temperature = 900; // °F - hotter than Mercury despite being farther from Sun
  const temperatureC = 475; // °C  
  const meltLeadTemp = 'Yes'; // Hot enough to melt lead
  const dayLength = 243; // Earth days (rotation period)
  const yearLength = 225; // Earth days (orbital period)
  const volcanoCount = 'Thousands'; // Volcanoes mapped
  const surfaceAge = 150; // million years (relatively young)
  const craterCount = 'Fewest'; // Among rocky planets

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Venus Surface
        </h3>
        <p className="text-xs text-gray-500">Hottest Planet • Volcanic Plains</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {temperature}°F
            </div>
            <div className="text-xs text-gray-500">{temperatureC}°C</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Hot Enough</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              Melt Lead
            </div>
            <div className="text-xs text-gray-500">Hotter than Mercury</div>
          </div>
        </div>

        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
          <div className="text-xs text-orange-600 dark:text-orange-400">Volcanic Activity</div>
          <div className="text-base font-bold text-orange-900 dark:text-orange-200">
            {volcanoCount} volcanoes
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            Possibly still active
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Rotation</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            Retrograde
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Day ({dayLength}d) {'>'} Year ({yearLength}d)
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Surface Age</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              ~{surfaceAge}M yrs
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Impact Craters</div>
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              {craterCount}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Magellan
      </div>
    </div>
  );
}

