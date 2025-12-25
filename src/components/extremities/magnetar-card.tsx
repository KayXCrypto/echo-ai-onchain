'use client';

export default function MagnetarCard() {
  // Magnetar data
  const magneticField = 1000000000000000; // gauss (quadrillion)
  const magneticFieldTesla = 100000000000; // tesla (100 billion)
  const earthComparison = 1000000000000000; // quadrillion times stronger
  const radius = 12; // miles diameter
  const mass = 1.4; // solar masses
  const temperature = 18000000; // °F surface
  const rotation = 0.001; // seconds per rotation (some)
  const xrayFlares = 'Catastrophic'; // x-ray and gamma-ray bursts

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Magnetar
        </h3>
        <p className="text-xs text-gray-500">Neutron Star • Strongest Magnetic Field</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Magnetic Field</div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              10¹⁵ gauss
            </div>
            <div className="text-xs text-gray-500">Strongest known</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">vs Earth</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              10¹⁵× stronger
            </div>
            <div className="text-xs text-gray-500">Tears atoms apart</div>
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Energy Release</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            {xrayFlares} flares
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            Can ionize Earth's atmosphere
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Size & Mass</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {radius} mi wide • {mass} M☉
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            City-sized neutron star
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Temp</div>
            <div className="font-semibold text-orange-600 dark:text-orange-400">
              18M°F
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Rotation</div>
            <div className="font-semibold text-purple-600 dark:text-purple-400">
              Milliseconds
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Fermi
      </div>
    </div>
  );
}


