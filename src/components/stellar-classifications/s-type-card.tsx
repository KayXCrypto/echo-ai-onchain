'use client';

export default function STypeCard() {
  const mass = '1-8 M☉';
  const phase = 'AGB giants';
  const spectralFeature = 'ZrO bands';
  const process = 's-process';
  const endState = 'PN → CO WD';
  const sequence = 'MS→S→SC';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          S-Type Star
        </h3>
        <p className="text-xs text-gray-500">Class S • {sequence}</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">{phase}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Spectral Feature</div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {spectralFeature}
            </div>
            <div className="text-xs text-gray-500">Zirconium oxide</div>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
          <div className="text-xs text-amber-600 dark:text-amber-400">Process</div>
          <div className="text-base font-bold text-amber-900 dark:text-amber-200">
            {process} enrichment
          </div>
          <div className="text-xs text-amber-600 dark:text-amber-400">
            Between M and C stars
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">End State</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {endState}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            AGB phase
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
