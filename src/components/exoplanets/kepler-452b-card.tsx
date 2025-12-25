'use client';

export default function Kepler452bCard() {
  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Kepler-452b
        </h3>
        <p className="text-xs text-gray-500">
          Earth's Cousin • 1,800 light-years
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="text-center py-2 rounded-lg bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/30">
            <span className="text-sm font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
              Sun-like Star
            </span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            Most Earth-like planet around Sun-like star. 385-day year, 1.5 billion years older.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Temp</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">265K</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">-8°C / 17°F</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Size</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">1.63R⊕</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Mass</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">~5M⊕</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Period</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">385d</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-700">
          Discovered 2015 • Transit
        </div>
      </div>
    </div>
  );
}
