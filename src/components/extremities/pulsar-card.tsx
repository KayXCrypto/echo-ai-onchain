'use client';

export default function PulsarCard() {
  // Pulsar data
  const rotationSpeed = 716; // rotations per second (fastest known)
  const precision = 'Atomic clock'; // timing precision
  const beamType = 'Lighthouse'; // rotating beam
  const diameter = 12; // miles
  const mass = 1.4; // solar masses
  const density = '1B tons/teaspoon'; // billion
  const magneticField = 1000000000000; // gauss (trillion)
  const discovered = 1967;

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Pulsar
        </h3>
        <p className="text-xs text-gray-500">Neutron Star • Cosmic Lighthouse</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Rotation</div>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {rotationSpeed}/sec
            </div>
            <div className="text-xs text-gray-500">Fastest known</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Density</div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              1B tons
            </div>
            <div className="text-xs text-gray-500">Per teaspoon</div>
          </div>
        </div>

        <div className="rounded-lg bg-cyan-50 p-3 dark:bg-cyan-900/20">
          <div className="text-xs text-cyan-600 dark:text-cyan-400">Beam Pattern</div>
          <div className="text-base font-bold text-cyan-900 dark:text-cyan-200">
            {beamType} effect
          </div>
          <div className="text-xs text-cyan-600 dark:text-cyan-400">
            Radio wave pulses
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Precision</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {precision} accurate
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Used for deep space navigation
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Diameter</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {diameter} mi
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Mass</div>
            <div className="font-semibold text-purple-600 dark:text-purple-400">
              {mass} M☉
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Jocelyn Bell Burnell
      </div>
    </div>
  );
}


