'use client';

export default function GammaRayBurstCard() {
  // Gamma-ray burst data
  const energy = 'Entire galaxy'; // energy output
  const duration = '0.01-1000'; // seconds
  const frequency = 1; // per day in observable universe
  const distance = 13; // billion light-years (most distant)
  const brightness = 'Brightest'; // brightest events
  const beamWidth = 'Narrow'; // highly collimated jets
  const source = 'Hypernova or neutron star merger';
  const danger = 'Lethal'; // within few thousand light-years

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Gamma-Ray Burst
        </h3>
        <p className="text-xs text-gray-500">Most Energetic • Universe Brightest</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Energy</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              Galaxy-scale
            </div>
            <div className="text-xs text-gray-500">In seconds</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Duration</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {duration}s
            </div>
            <div className="text-xs text-gray-500">Millisec to mins</div>
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Brightness</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            {brightness} events
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            Visible across universe
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Source</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            Hypernova
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Or neutron star merger
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Frequency</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              1/day
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Danger</div>
            <div className="font-semibold text-red-600 dark:text-red-400">
              {danger}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Swift
      </div>
    </div>
  );
}


