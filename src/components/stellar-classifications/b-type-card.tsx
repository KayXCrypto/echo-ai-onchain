'use client';

export default function BTypeCard() {
  const mass = '2.1-16 M☉';
  const fusionSource = 'H via CNO cycle';
  const lifetime = '10-300 Myr';
  const endState = '≥8 M☉: SN → NS/BH';
  const lowerEndState = '<8 M☉: → WD';
  const spectralRange = 'B0-B9 V';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          B-Type Star
        </h3>
        <p className="text-xs text-gray-500">Main Sequence • {spectralRange}</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">Hot & luminous</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Lifetime</div>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {lifetime}
            </div>
            <div className="text-xs text-gray-500">Million years</div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Fusion Process</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {fusionSource}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Advanced burning in high-mass B stars
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">End States</div>
          <div className="text-sm font-bold text-purple-900 dark:text-purple-200">
            {endState}
          </div>
          <div className="text-sm font-semibold text-purple-900 dark:text-purple-200">
            {lowerEndState}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
