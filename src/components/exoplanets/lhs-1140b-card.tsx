'use client';

export default function LHS1140bCard() {
  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          LHS 1140 b
        </h3>
        <p className="text-xs text-gray-500">
          Ocean World • 48.5 light-years
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="text-center py-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
            <span className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              Ocean Candidate
            </span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            Massive super-Earth possibly covered in global ocean. Best biosignature target.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Temp</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">230K</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">-43°C / -45°F</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Size</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">1.73R⊕</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Mass</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">5.6M⊕</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Period</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">24.7d</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-700">
          Discovered 2017 • Transit • M4.5V
        </div>
      </div>
    </div>
  );
}
