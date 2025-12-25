'use client';

export default function LunarEquatorCard() {
  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Lunar Equator
        </h3>
        <p className="text-xs text-gray-500">
          Facing Sun/Earth
        </p>
      </div>

      <div className="flex-1 space-y-3">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            260°F / 127°C
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            400K
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Sunlit surface temperature
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Shadowed Surface</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-200">
              -280°F / -173°C
            </div>
            <div className="text-xs text-blue-700 dark:text-blue-300">
              100K
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/20">
            <div className="text-xs text-amber-600 dark:text-amber-400">Temperature Range</div>
            <div className="text-lg font-bold text-amber-900 dark:text-amber-200">
              540°F / 300°C
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-600 dark:text-gray-400">
          Extreme temperature swings between lunar day and night due to lack of atmosphere
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Lunar Reconnaissance Orbiter
      </div>
    </div>
  );
}