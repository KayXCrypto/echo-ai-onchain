'use client';

export default function AsteroidBeltCard() {
  const location = '2.2 - 3.2 AU';
  const bodies = '1-2 million';
  const largestBody = 'Ceres';
  const ceresSize = '940 km diameter';
  const orbitalSpeed = '17-25 km/s';
  const totalMass = '3% Moon mass';
  const spacing = 'Average 1 million km';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Asteroid Belt
        </h3>
        <p className="text-xs text-gray-500">Main Belt • Between Mars & Jupiter</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Location</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {location}
            </div>
            <div className="text-xs text-gray-500">From Sun</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Bodies</div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {bodies}
            </div>
            <div className="text-xs text-gray-500">Asteroids</div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900/20">
          <div className="text-xs text-gray-600 dark:text-gray-400">Largest Body</div>
          <div className="text-base font-bold text-gray-900 dark:text-gray-200">
            {largestBody}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {ceresSize} (dwarf planet)
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Orbital Speed</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {orbitalSpeed}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Varies by distance
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Total Mass</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {totalMass}
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Spacing</div>
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              {spacing}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA JPL
      </div>
    </div>
  );
}
