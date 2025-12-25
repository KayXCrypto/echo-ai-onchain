'use client';

export default function KTypeCard() {
  const mass = '0.59-0.88 M☉';
  const fusionSource = 'pp-chain';
  const lifetime = '15-45+ Gyr';
  const endState = 'PN → CO WD';
  const spectralRange = 'K0-K9 V';
  const nickname = 'Orange dwarfs';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          K-Type Star
        </h3>
        <p className="text-xs text-gray-500">Main Sequence • {spectralRange}</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">{nickname}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Lifetime</div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {lifetime}
            </div>
            <div className="text-xs text-gray-500">Billion years</div>
          </div>
        </div>

        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
          <div className="text-xs text-orange-600 dark:text-orange-400">Fusion Process</div>
          <div className="text-base font-bold text-orange-900 dark:text-orange-200">
            {fusionSource}
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            He core then AGB (far future)
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">End State</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            Planetary Nebula
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            → CO White Dwarf (far future)
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
