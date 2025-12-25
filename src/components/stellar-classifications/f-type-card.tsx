'use client';

export default function FTypeCard() {
  const mass = '1.04-1.4 M☉';
  const fusionSource = 'pp-chain + CNO';
  const lifetime = '2-6 Gyr';
  const endState = 'PN → CO WD';
  const spectralRange = 'F0-F9 V';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          F-Type Star
        </h3>
        <p className="text-xs text-gray-500">Main Sequence • {spectralRange}</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">Yellow-white stars</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Lifetime</div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {lifetime}
            </div>
            <div className="text-xs text-gray-500">Billion years</div>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
          <div className="text-xs text-yellow-600 dark:text-yellow-400">Fusion Process</div>
          <div className="text-base font-bold text-yellow-900 dark:text-yellow-200">
            {fusionSource}
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400">
            CNO contribution increasing
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">End State</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            Planetary Nebula
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            → CO White Dwarf
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
