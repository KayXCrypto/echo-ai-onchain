'use client';

export default function Everest7SummitsCard() {
  // Mount Everest - Asia (7 Summits)
  const heightM = 8849; // meters
  const heightFt = 29032; // feet
  const continent = "Asia";
  const location = "Himalayas";
  const countries = "Nepal/China";
  const firstAscent = "1953";

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Mount Everest
        </h3>
        <p className="text-xs text-gray-500">{continent} • {location}</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Elevation</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {heightM.toLocaleString()} m
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {heightFt.toLocaleString()} ft
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">7 Summits Rank</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              #1
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Highest
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/20">
            <div className="text-xs text-purple-600 dark:text-purple-400">Continent</div>
            <div className="text-lg font-bold text-purple-900 dark:text-purple-200">
              {continent} - Highest Peak
            </div>
          </div>

          <div className="rounded-lg bg-emerald-50 p-2 dark:bg-emerald-900/20">
            <div className="text-xs text-emerald-600 dark:text-emerald-400">First Ascent</div>
            <div className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
              {firstAscent} • Edmund Hillary & Tenzing Norgay
            </div>
          </div>

          <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/20">
            <div className="text-xs text-amber-600 dark:text-amber-400">Challenge</div>
            <div className="text-sm font-semibold text-amber-900 dark:text-amber-200">
              Most technically demanding of the 7 Summits
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        {countries} • 27°59′N 86°55′E
      </div>
    </div>
  );
}
