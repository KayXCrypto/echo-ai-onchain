'use client';

export default function SupernovaCard() {
  // Supernova data
  const luminosity = 5; // billion times the Sun
  const temperature = 1800000000; // °F (billion degrees)
  const duration = 'Weeks'; // visible for weeks/months
  const energyRelease = 'Star\'s lifetime'; // in seconds
  const speed = 22000; // miles per second (expansion)
  const remnantType = 'Neutron star or black hole';
  const frequency = 1; // per 50 years in Milky Way
  const heavyElements = 'All'; // creates all heavy elements

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Supernova
        </h3>
        <p className="text-xs text-gray-500">Stellar Explosion • Element Forge</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Brightness</div>
            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {luminosity}B ☉
            </div>
            <div className="text-xs text-gray-500">Billion times Sun</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              1.8B°F
            </div>
            <div className="text-xs text-gray-500">Billion degrees</div>
          </div>
        </div>

        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
          <div className="text-xs text-orange-600 dark:text-orange-400">Expansion Speed</div>
          <div className="text-base font-bold text-orange-900 dark:text-orange-200">
            {speed.toLocaleString()} mi/sec
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            10% speed of light
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Element Creation</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {heavyElements} heavy elements
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Gold, uranium, platinum
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Remnant</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              NS or BH
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Frequency</div>
            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              1/50 yrs
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Chandra
      </div>
    </div>
  );
}


