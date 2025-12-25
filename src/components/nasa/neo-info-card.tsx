'use client';

export default function NEOInfoCard() {
  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Understanding NEOs
        </h3>
        <p className="text-xs text-gray-500">
          Near-Earth Objects & Distance Measurements
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto max-h-[calc(25rem-8rem)]">
        {/* What are NEOs */}
        <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">
            What are NEOs?
          </div>
          <div className="text-xs text-blue-900 dark:text-blue-200">
            Asteroids and comets with orbits bringing them within 1.3 AU of the Sun, potentially crossing Earth's path.
          </div>
        </div>

        {/* Distance Units */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-green-50 p-2 dark:bg-green-900/20">
            <div className="text-xs text-green-600 dark:text-green-400">LD</div>
            <div className="text-lg font-bold text-green-900 dark:text-green-200">
              384,400 km
            </div>
            <div className="text-xs text-green-700 dark:text-green-300">
              Lunar Distance
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/20">
            <div className="text-xs text-purple-600 dark:text-purple-400">AU</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-200">
              149.6M km
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-300">
              Earth-Sun Dist.
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="rounded-lg bg-orange-50 p-2 dark:bg-orange-900/20">
          <div className="text-xs text-orange-600 dark:text-orange-400 font-semibold mb-1">
            PHAs
          </div>
          <div className="text-xs text-orange-700 dark:text-orange-300">
            Objects &gt;140m approaching within 0.05 AU (19.5 LD) are potentially hazardous.
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        Source: NASA Center for Near Earth Object Studies (CNEOS)
      </div>
    </div>
  );
}
