'use client';

export default function IoCard() {
  // Io data from NASA
  const volcanoCount = 400; // active volcanoes
  const temperature = -260; // °F average surface
  const hotSpots = 2700; // °F in volcanic regions
  const moonSize = 2264; // miles diameter
  const orbitalPeriod = 1.77; // Earth days
  const sulfurPlumes = 250; // miles high
  const tidalHeating = 'Extreme'; // from Jupiter's gravity
  const surfaceAge = 'Young'; // constantly resurfacing

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Io
        </h3>
        <p className="text-xs text-gray-500">Jupiter's Moon • Most Volcanically Active</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Active Volcanoes</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {volcanoCount}+
            </div>
            <div className="text-xs text-gray-500">Most in solar system</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Volcanic Temp</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {hotSpots}°F
            </div>
            <div className="text-xs text-gray-500">At hot spots</div>
          </div>
        </div>

        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
          <div className="text-xs text-orange-600 dark:text-orange-400">Sulfur Plumes</div>
          <div className="text-base font-bold text-orange-900 dark:text-orange-200">
            {sulfurPlumes} miles high
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            Yellow and orange surface
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Tidal Heating</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            {tidalHeating}
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            Jupiter's gravity stretches Io
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Diameter</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {moonSize.toLocaleString()} mi
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Orbit</div>
            <div className="font-semibold text-orange-600 dark:text-orange-400">
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


