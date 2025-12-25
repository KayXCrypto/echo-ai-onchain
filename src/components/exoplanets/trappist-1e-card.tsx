'use client';

export default function Trappist1eCard() {
  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          TRAPPIST-1e
        </h3>
        <p className="text-xs text-gray-500">
          Most Earth-like • 40.7 light-years
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="text-center py-2 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              Best Candidate
            </span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            Most Earth-like TRAPPIST planet. Perfect size and temperature. JWST priority target.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Temp</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">246K</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">-27°C / -17°F</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Size</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">0.92R⊕</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Mass</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">0.77M⊕</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Period</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">6.1d</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-700">
          Discovered 2017 • Transit • M8V
        </div>
      </div>
    </div>
  );
}
