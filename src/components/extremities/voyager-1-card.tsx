'use client';

export default function Voyager1Card() {
  // Voyager 1 data
  const distance = 15; // billion miles from Earth
  const lightHours = 22; // light-hours away
  const speed = 38000; // mph
  const launched = 1977;
  const yearsActive = 47; // as of 2024
  const signalTime = 22; // hours for signal to reach Earth
  const power = 'Plutonium'; // radioisotope thermoelectric generators
  const status = 'Active'; // still transmitting

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Voyager 1
        </h3>
        <p className="text-xs text-gray-500">Interstellar Space • Farthest Human Object</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Distance</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {distance}B mi
            </div>
            <div className="text-xs text-gray-500">{lightHours} light-hours</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Speed</div>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {speed.toLocaleString()} mph
            </div>
            <div className="text-xs text-gray-500">38,000 miles/hour</div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Mission Duration</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {yearsActive} years
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Launched {launched}
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Signal Time</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {signalTime} hours
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            One-way communication
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Power</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              RTG
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Status</div>
            <div className="font-semibold text-green-600 dark:text-green-400">
              {status}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA JPL
      </div>
    </div>
  );
}


