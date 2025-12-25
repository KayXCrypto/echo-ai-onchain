'use client';

export default function NeutronStarCard() {
  const mass = '1.1-2.3 M☉';
  const energySource = 'None (degenerate)';
  const composition = 'Neutron-degenerate';
  const progenitors = '≳8-20 M☉ stars';
  const types = 'Pulsars, magnetars';
  const stability = 'Stable unless accreting';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Neutron Star
        </h3>
        <p className="text-xs text-gray-500">Remnant • Core Collapse</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">Baryonic core</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Progenitor</div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {progenitors}
            </div>
            <div className="text-xs text-gray-500">Initial mass</div>
          </div>
        </div>

        <div className="rounded-lg bg-cyan-50 p-3 dark:bg-cyan-900/20">
          <div className="text-xs text-cyan-600 dark:text-cyan-400">Composition</div>
          <div className="text-base font-bold text-cyan-900 dark:text-cyan-200">
            {composition}
          </div>
          <div className="text-xs text-cyan-600 dark:text-cyan-400">
            Degenerate neutrons
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Types</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {types}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            {stability}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
