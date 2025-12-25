'use client';

export default function YDwarfCard() {
  const mass = '<0.02-0.03 M☉';
  const fusionSource = 'No fusion';
  const temperature = 'Very cool';
  const fate = 'Cool over time';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Y-Dwarf
        </h3>
        <p className="text-xs text-gray-500">Brown Dwarf • Substellar</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-lg font-bold text-violet-600 dark:text-violet-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">Coolest class</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              Very cool
            </div>
            <div className="text-xs text-gray-500">Coldest known</div>
          </div>
        </div>

        <div className="rounded-lg bg-violet-50 p-3 dark:bg-violet-900/20">
          <div className="text-xs text-violet-600 dark:text-violet-400">Energy Source</div>
          <div className="text-base font-bold text-violet-900 dark:text-violet-200">
            {fusionSource}
          </div>
          <div className="text-xs text-violet-600 dark:text-violet-400">
            Cooler than T-dwarfs
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900/20">
          <div className="text-xs text-gray-600 dark:text-gray-400">Evolution</div>
          <div className="text-base font-bold text-gray-900 dark:text-gray-200">
            {fate}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Substellar object
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
