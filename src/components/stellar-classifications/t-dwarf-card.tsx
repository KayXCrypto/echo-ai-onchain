'use client';

export default function TDwarfCard() {
  const mass = '0.013-0.075 M☉';
  const fusionSource = 'No sustained H fusion';
  const spectralFeature = 'Methane-rich';
  const fate = 'Cool & fade';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          T-Dwarf
        </h3>
        <p className="text-xs text-gray-500">Brown Dwarf • Substellar</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">Brown dwarf</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Spectra</div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              CH₄ rich
            </div>
            <div className="text-xs text-gray-500">Methane bands</div>
          </div>
        </div>

        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
          <div className="text-xs text-indigo-600 dark:text-indigo-400">Fusion</div>
          <div className="text-base font-bold text-indigo-900 dark:text-indigo-200">
            {fusionSource}
          </div>
          <div className="text-xs text-indigo-600 dark:text-indigo-400">
            Cooler than L-dwarfs
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Evolution</div>
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
