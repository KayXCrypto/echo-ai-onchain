'use client';

export default function BlackHoleCard() {
  const progenitors = '≳20-25+ M☉ stars';
  const formation = 'Core collapse';
  const type = 'Stellar-mass BH';
  const eventHorizon = 'Light cannot escape';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Stellar Black Hole
        </h3>
        <p className="text-xs text-gray-500">Remnant • {type}</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Progenitor</div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {progenitors}
            </div>
            <div className="text-xs text-gray-500">Very massive</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Formation</div>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {formation}
            </div>
            <div className="text-xs text-gray-500">Supernova</div>
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Event Horizon</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {eventHorizon}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Beyond Schwarzschild radius
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900/20">
          <div className="text-xs text-gray-600 dark:text-gray-400">Properties</div>
          <div className="text-base font-bold text-gray-900 dark:text-gray-200">
            Gravitational singularity
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Infinite density
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
