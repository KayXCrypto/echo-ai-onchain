'use client';

export default function TOI700dCard() {
  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          TOI-700 d
        </h3>
        <p className="text-xs text-gray-500">
          TESS Discovery • 101.4 light-years
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="text-center py-2 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              Habitable Zone
            </span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            First Earth-size habitable-zone planet discovered by TESS mission. Could have water on its surface.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Temp</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">269K</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">-4°C / 25°F</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Size</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">1.19R⊕</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Mass</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">1.72M⊕</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">Period</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">37.4d</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-700">
          Discovered 2020 • Transit
        </div>
      </div>
    </div>
  );
}

