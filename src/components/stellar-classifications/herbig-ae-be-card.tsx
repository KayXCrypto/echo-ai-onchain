'use client';

export default function HerbigAeBeCard() {
  const mass = '2-8 M☉';
  const phase = 'Pre-main sequence';
  const energySource = 'Gravitational contraction';
  const lifetime = '0.1-5 Myr';
  const destination = 'A/B main sequence';
  const feature = 'IR-bright disks';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Herbig Ae/Be Star
        </h3>
        <p className="text-xs text-gray-500">{phase} • A/B Analog</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">Massive PMS</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Duration</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {lifetime}
            </div>
            <div className="text-xs text-gray-500">Million years (Myr)</div>
          </div>
        </div>

        <div className="rounded-lg bg-cyan-50 p-3 dark:bg-cyan-900/20">
          <div className="text-xs text-cyan-600 dark:text-cyan-400">Characteristics</div>
          <div className="text-base font-bold text-cyan-900 dark:text-cyan-200">
            {feature}
          </div>
          <div className="text-xs text-cyan-600 dark:text-cyan-400">
            Envelopes & disks
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
