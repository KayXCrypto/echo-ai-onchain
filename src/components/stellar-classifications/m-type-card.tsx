'use client';

export default function MTypeCard() {
  const mass = '0.08-0.59 M☉';
  const fusionSource = 'pp-chain';
  const lifetime = '100s Gyr - Tyrs';
  const endState = 'Blue dwarf → WD';
  const spectralRange = 'M0-M9 V';
  const nickname = 'Red dwarfs';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          M-Type Star
        </h3>
        <p className="text-xs text-gray-500">Main Sequence • {spectralRange}</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">{nickname}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Lifetime</div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              Trillions
            </div>
            <div className="text-xs text-gray-500">of years</div>
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Fusion Process</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            {fusionSource}
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            Fully convective at low mass
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">End State</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {endState}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Trillion-year timescales
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
