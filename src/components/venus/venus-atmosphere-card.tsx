'use client';

export default function VenusAtmosphereCard() {
  // Venus atmosphere data from NASA
  const co2Percentage = 96.5; // Mostly CO₂
  const cloudComposition = 'Sulfuric Acid'; // H₂SO₄ clouds
  const atmosphericPressure = 90; // Times Earth's at surface
  const pressureType = 'Crushing';
  const windSpeed = 224; // mph in upper atmosphere
  const greenhouseEffect = 'Runaway';
  const magneticField = 'Induced'; // From solar wind interaction

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Venus Atmosphere
        </h3>
        <p className="text-xs text-gray-500">Earth's Evil Twin • Runaway Greenhouse</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Composition</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {co2Percentage}% CO₂
            </div>
            <div className="text-xs text-gray-500">Carbon dioxide</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Pressure</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {atmosphericPressure}× Earth
            </div>
            <div className="text-xs text-gray-500">{pressureType}</div>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
          <div className="text-xs text-yellow-600 dark:text-yellow-400">Cloud Composition</div>
          <div className="text-base font-bold text-yellow-900 dark:text-yellow-200">
            {cloudComposition}
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400">
            Corrosive droplets
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Upper Atmosphere Winds</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {windSpeed} mph
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Super-rotation
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Greenhouse</div>
            <div className="font-semibold text-red-600 dark:text-red-400">
              {greenhouseEffect}
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Magnetic Field</div>
            <div className="font-semibold text-purple-600 dark:text-purple-400">
              {magneticField}
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

