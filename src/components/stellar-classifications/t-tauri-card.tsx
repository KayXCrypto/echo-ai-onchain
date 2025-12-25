'use client';

export default function TTauriCard() {
  const mass = '0.1-2 M☉';
  const phase = 'Pre-main sequence';
  const energySource = 'Gravitational contraction';
  const lifetime = '1-10 Myr';
  const destination = 'K-M (or G) main sequence';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          T Tauri Star
        </h3>
        <p className="text-xs text-gray-500">{phase} • Protostar</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">Contracting</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Duration</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {lifetime}
            </div>
            <div className="text-xs text-gray-500">Million years (Myr)</div>
          </div>
        </div>

        <div className="rounded-lg bg-pink-50 p-3 dark:bg-pink-900/20">
          <div className="text-xs text-pink-600 dark:text-pink-400">Energy Source</div>
          <div className="text-base font-bold text-pink-900 dark:text-pink-200">
            {energySource}
          </div>
          <div className="text-xs text-pink-600 dark:text-pink-400">
            No core H burning yet
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Evolution</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            → {destination}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Join main sequence
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
