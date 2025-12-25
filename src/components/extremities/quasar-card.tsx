'use client';

export default function QuasarCard() {
  // Quasar data
  const luminosity = 1000; // trillion times the Sun
  const distance = 13; // billion light-years (some of the most distant)
  const blackHoleMass = 1; // billion solar masses
  const energySource = 'Supermassive black hole';
  const brightness = 'Brightest objects';
  const temperature = 18000000; // °F in accretion disk
  const jets = 'Relativistic'; // near speed of light
  const galaxyType = 'Active galactic nucleus';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Quasar
        </h3>
        <p className="text-xs text-gray-500">Active Galaxy • Brightest Objects</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Luminosity</div>
            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {luminosity}T ☉
            </div>
            <div className="text-xs text-gray-500">Trillion times Sun</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Distance</div>
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {distance}B ly
            </div>
            <div className="text-xs text-gray-500">Billion light-years</div>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
          <div className="text-xs text-yellow-600 dark:text-yellow-400">Power Source</div>
          <div className="text-base font-bold text-yellow-900 dark:text-yellow-200">
            {blackHoleMass}B M☉ black hole
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400">
            Feeding on matter
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Jets</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {jets}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Near light speed
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Type</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              AGN
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Brightness</div>
            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              Max known
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Hubble
      </div>
    </div>
  );
}


