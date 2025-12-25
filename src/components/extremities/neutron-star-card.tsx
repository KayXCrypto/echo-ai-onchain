'use client';

export default function NeutronStarCard() {
  // Neutron star data
  const density = 1000000000; // tons per teaspoon (billion)
  const diameter = 12; // miles
  const mass = 1.4; // solar masses
  const gravity = 2000000000000; // times Earth's (trillion)
  const escapeVelocity = 100000; // miles per second (half speed of light)
  const temperature = 1800000; // °F surface
  const magneticField = 1000000000000; // gauss (trillion)
  const composition = 'Neutrons'; // mostly neutrons

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Neutron Star
        </h3>
        <p className="text-xs text-gray-500">Stellar Remnant • Extreme Density</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Density</div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              1B tons
            </div>
            <div className="text-xs text-gray-500">Per teaspoon</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Gravity</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              2T× Earth
            </div>
            <div className="text-xs text-gray-500">Trillion times</div>
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Size vs Mass</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {diameter} mi • {mass} M☉
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            City-sized, star-massed
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Escape Velocity</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            {escapeVelocity.toLocaleString()} mi/sec
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            50% speed of light
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Temp</div>
            <div className="font-semibold text-orange-600 dark:text-orange-400">
              1.8M°F
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Composition</div>
            <div className="font-semibold text-purple-600 dark:text-purple-400">
              {composition}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA
      </div>
    </div>
  );
}


