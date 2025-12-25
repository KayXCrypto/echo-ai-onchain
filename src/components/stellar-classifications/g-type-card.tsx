'use client';

export default function GTypeCard() {
  const mass = '0.8-1.04 M☉';
  const fusionSource = 'pp-chain';
  const lifetime = '5-12 Gyr';
  const endState = 'PN → CO WD';
  const spectralRange = 'G0-G9 V';
  const example = 'Sun (G2 V)';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          G-Type Star ☉
        </h3>
        <p className="text-xs text-gray-500">Main Sequence • {spectralRange} • Our Sun</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">Yellow dwarfs</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Lifetime</div>
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {lifetime}
            </div>
            <div className="text-xs text-gray-500">Billion years</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
            <div className="text-xs text-yellow-600 dark:text-yellow-400">Example</div>
            <div className="text-base font-bold text-yellow-900 dark:text-yellow-200">
              {example}
            </div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">
              Our home star
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
            <div className="text-xs text-purple-600 dark:text-purple-400">Fusion Process</div>
            <div className="text-base font-bold text-purple-900 dark:text-purple-200">
              Proton-proton chain
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              Current hydrogen burning
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
            <div className="text-xs text-orange-600 dark:text-orange-400">Evolution</div>
            <div className="text-base font-bold text-orange-900 dark:text-orange-200">
              Red Giant → AGB
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-400">
              Helium core then AGB phase
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
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
