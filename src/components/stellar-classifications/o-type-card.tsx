'use client';

export default function OTypeCard() {
  const mass = '16-120+ M☉';
  const fusionSource = 'H via CNO cycle';
  const laterStages = 'He→C→Ne→O→Si→Fe';
  const lifetime = '3-10 Myr';
  const endState = 'Core-collapse SN → NS/BH';
  const spectralRange = 'O2-O9.5 V';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          O-Type Star
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
            <div className="text-xs text-gray-500">Most massive</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Lifetime</div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
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
            Later: {laterStages}
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">End State</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            {endState}
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            Type II/Ib/Ic supernova
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
