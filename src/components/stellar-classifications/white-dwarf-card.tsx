'use client';

export default function WhiteDwarfCard() {
  const mass = '0.17-1.35 M☉';
  const energySource = 'None (degenerate)';
  const composition = 'Mostly CO, some ONe';
  const subclasses = 'DA, DB, DO, DQ, DZ, DC';
  const fate = 'Cool to black dwarf';
  const progenitors = '<8 M☉ stars';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          White Dwarf
        </h3>
        <p className="text-xs text-gray-500">Remnant • Class D</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">Electron-degenerate</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Subclasses</div>
            <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
              {subclasses}
            </div>
            <div className="text-xs text-gray-500">Spectral types</div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Composition</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {composition}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            He WDs from binaries
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900/20">
          <div className="text-xs text-gray-600 dark:text-gray-400">Evolution</div>
          <div className="text-base font-bold text-gray-900 dark:text-gray-200">
            {fate}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Hypothetical; far future
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">From</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {progenitors}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
