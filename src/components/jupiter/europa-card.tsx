'use client';

export default function EuropaCard() {
  // Europa data from NASA
  const iceThickness = 15; // miles thick ice shell
  const oceanDepth = 60; // miles deep subsurface ocean
  const waterVolume = 2; // times Earth's oceans
  const temperature = -260; // °F surface
  const moonSize = 1940; // miles diameter
  const orbitalPeriod = 3.55; // Earth days
  const surfaceAge = 'Young'; // 40-90 million years
  const lifeProspect = 'High'; // potential for life

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Europa
        </h3>
        <p className="text-xs text-gray-500">Jupiter's Moon • Subsurface Ocean</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Ice Shell</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {iceThickness} miles
            </div>
            <div className="text-xs text-gray-500">Thick ice crust</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Ocean Depth</div>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
              {oceanDepth} miles
            </div>
            <div className="text-xs text-gray-500">Beneath the ice</div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Water Volume</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {waterVolume}× Earth's oceans
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Liquid water ocean
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Life Potential</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {lifeProspect}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Habitable ocean world
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Diameter</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {moonSize.toLocaleString()} mi
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Orbit</div>
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              {orbitalPeriod} days
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Galileo
      </div>
    </div>
  );
}


