'use client';

export default function LDwarfCard() {
  const mass = '0.013-0.075 M☉';
  const massJupiter = '13-75 MJup';
  const fusionSource = 'No sustained H fusion';
  const deuteriumBurning = 'D burn >13 MJup';
  const lithiumBurning = 'Li burn >~0.065 M☉';
  const fate = 'Cool to Jupiter-like';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          L-Dwarf
        </h3>
        <p className="text-xs text-gray-500">Brown Dwarf • Substellar</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">{massJupiter}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Fusion</div>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              None
            </div>
            <div className="text-xs text-gray-500">Below H limit</div>
          </div>
        </div>

        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
          <div className="text-xs text-orange-600 dark:text-orange-400">Burning</div>
          <div className="text-base font-bold text-orange-900 dark:text-orange-200">
            {deuteriumBurning}
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            {lithiumBurning}
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Fate</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {fate}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            No classical death
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
