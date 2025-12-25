'use client';

export default function ATypeCard() {
  const mass = '1.4-2.1 M☉';
  const fusionSource = 'pp + CNO transition';
  const lifetime = '0.5-2 Gyr';
  const endState = 'PN → CO WD';
  const spectralRange = 'A0-A9 V';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          A-Type Star
        </h3>
        <p className="text-xs text-gray-500">Main Sequence • {spectralRange}</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">White-blue stars</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Lifetime</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {lifetime}
            </div>
            <div className="text-xs text-gray-500">Billion years</div>
          </div>
        </div>

        <div className="rounded-lg bg-cyan-50 p-3 dark:bg-cyan-900/20">
          <div className="text-xs text-cyan-600 dark:text-cyan-400">Fusion Process</div>
          <div className="text-base font-bold text-cyan-900 dark:text-cyan-200">
            {fusionSource}
          </div>
          <div className="text-xs text-cyan-600 dark:text-cyan-400">
            He core then AGB phase
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
