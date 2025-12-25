'use client';

export default function LunarCraterCard() {
  // Hermite Crater - coldest measured place in the Solar System
  const tempC = -249;
  const tempF = -416;
  const tempK = 24;
  const diameterKm = 104;

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Hermite Crater
        </h3>
        <p className="text-xs text-gray-500">
          North Pole • Permanently Shadowed
        </p>
      </div>

      <div className="flex-1 space-y-3">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {tempF}°F / {tempC}°C
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {tempK}K
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Coldest measured place in Solar System
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/20">
            <div className="text-xs text-purple-600 dark:text-purple-400">Crater Diameter</div>
            <div className="text-sm font-semibold text-purple-900 dark:text-purple-200 mt-1">
              {diameterKm} km
            </div>
          </div>

          <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-900/20">
            <div className="text-xs text-cyan-600 dark:text-cyan-400">Ancient Ice Deposits</div>
            <div className="text-sm font-semibold text-cyan-900 dark:text-cyan-200 mt-1">
              Millions of years in darkness
            </div>
            <div className="text-xs text-cyan-700 dark:text-cyan-300 mt-1">
              Never seen sunlight
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/20">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Discovery</div>
            <div className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 mt-1">
              Diviner instrument (2009)
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Lunar Reconnaissance Orbiter
      </div>
    </div>
  );
}