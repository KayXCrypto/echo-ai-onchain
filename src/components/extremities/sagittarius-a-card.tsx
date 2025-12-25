'use client';

export default function SagittariusACard() {
  // Sagittarius A* (Milky Way's black hole) data
  const mass = 4.3; // million solar masses
  const distance = 26000; // light-years from Earth
  const eventHorizon = 15; // million miles diameter
  const orbitalSpeed = 5000; // miles per second for nearby stars
  const temperature = 'Infinite'; // at singularity (theoretical)
  const hawkingRadiation = 'Minimal'; // very cold for a black hole
  const type = 'Supermassive';
  const discoveryYear = 1974;

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Sagittarius A*
        </h3>
        <p className="text-xs text-gray-500">Milky Way's Black Hole • Galactic Center</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass</div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {mass}M ☉
            </div>
            <div className="text-xs text-gray-500">Million solar masses</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Distance</div>
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {distance.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Light-years</div>
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Event Horizon</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {eventHorizon}M miles
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Point of no return
          </div>
        </div>

        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
          <div className="text-xs text-indigo-600 dark:text-indigo-400">Nearby Star Speed</div>
          <div className="text-base font-bold text-indigo-900 dark:text-indigo-200">
            {orbitalSpeed.toLocaleString()} mi/sec
          </div>
          <div className="text-xs text-indigo-600 dark:text-indigo-400">
            3% speed of light
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Type</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {type}
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Discovered</div>
            <div className="font-semibold text-purple-600 dark:text-purple-400">
              {discoveryYear}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Event Horizon Telescope
      </div>
    </div>
  );
}


