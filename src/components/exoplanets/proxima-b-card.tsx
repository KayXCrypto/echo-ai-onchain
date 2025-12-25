'use client';

export default function ProximaBCard() {
  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Proxima Centauri b
        </h3>
        <p className="text-xs text-gray-500">
          Closest Exoplanet • 4.24 light-years
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="text-center py-2 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
            <span className="text-sm font-bold text-green-700 dark:text-green-300 uppercase tracking-wider">
              Potentially Habitable
            </span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            Nearest exoplanet in habitable zone. May harbor liquid water despite stellar flares.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Temp</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">234K</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">-39°C / -38°F</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Size</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">1.17R⊕</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Mass</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">1.27M⊕</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Period</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">11.2d</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-700">
          Discovered 2016 • Radial Velocity
        </div>
      </div>
    </div>
  );
}
