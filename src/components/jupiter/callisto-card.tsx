'use client';

export default function CallistoCard() {
  // Callisto data from NASA
  const moonSize = 2995; // miles diameter
  const sizeRank = '3rd'; // third largest moon
  const craterCount = 'Most'; // most cratered in solar system
  const surfaceAge = 4; // billion years old
  const temperature = -218; // °F average
  const orbitalPeriod = 16.7; // Earth days
  const oceanDepth = 'Possible'; // possible subsurface ocean
  const composition = 'Ice & rock';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Callisto
        </h3>
        <p className="text-xs text-gray-500">Jupiter's Moon • Most Cratered</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Diameter</div>
            <div className="text-xl font-bold text-gray-600 dark:text-gray-400">
              {moonSize.toLocaleString()} mi
            </div>
            <div className="text-xs text-gray-500">{sizeRank} largest moon</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {temperature}°F
            </div>
            <div className="text-xs text-gray-500">Cold and ancient</div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900/20">
          <div className="text-xs text-gray-600 dark:text-gray-400">Impact Craters</div>
          <div className="text-base font-bold text-gray-900 dark:text-gray-200">
            {craterCount} cratered
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            In solar system
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Surface Age</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {surfaceAge}B years
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Ancient and unchanged
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Ocean</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {oceanDepth}
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Orbit</div>
            <div className="font-semibold text-gray-600 dark:text-gray-400">
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


