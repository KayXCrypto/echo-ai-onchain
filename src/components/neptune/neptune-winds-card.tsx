'use client';

export default function NeptuneWindsCard() {
  // Neptune data from NASA Voyager 2
  const windSpeed = 1200; // mph - fastest in solar system
  const windSpeedKmh = 2000; // km/h
  const temperature = -330; // °F
  const temperatureC = -200; // °C
  const greatDarkSpot = 'Storm'; // Earth-sized storm
  const stormSize = 'Earth-sized';
  const orbitalPeriod = 165; // Earth years
  const moonCount = 14; // known moons

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Neptune
        </h3>
        <p className="text-xs text-gray-500">Ice Giant • Fastest Winds</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Wind Speed</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {windSpeed.toLocaleString()} mph
            </div>
            <div className="text-xs text-gray-500">Fastest in solar system</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {temperature}°F
            </div>
            <div className="text-xs text-gray-500">{temperatureC}°C</div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Great Dark Spot</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {stormSize} {greatDarkSpot}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Comes and goes
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Orbital Period</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {orbitalPeriod} years
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Most distant planet
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Moons</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {moonCount}
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Color</div>
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              Deep blue
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Voyager 2
      </div>
    </div>
  );
}


