'use client';

export default function MercuryOrbitalCard() {
  // Mercury orbital and physical data from NASA
  const orbitalPeriod = 88; // Earth days - fastest planet
  const orbitalSpeed = 29; // miles per second
  const rotationPeriod = 59; // Earth days
  const solarDay = 176; // Earth days (one full day-night cycle)
  const distanceFromSun = 36; // million miles (average)
  const coreRadius = 85; // percent of planet's radius
  const surfaceGravity = 38; // percent of Earth's
  const axisTilt = 2; // degrees - nearly upright

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Mercury Orbital Data
        </h3>
        <p className="text-xs text-gray-500">Fastest Planet • Slow Rotation</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Orbital Period</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {orbitalPeriod} days
            </div>
            <div className="text-xs text-gray-500">Fastest orbit</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Solar Day</div>
            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {solarDay} days
            </div>
            <div className="text-xs text-gray-500">2 Mercury years</div>
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Orbital Speed</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {orbitalSpeed} mi/sec
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Faster than any planet
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Iron Core</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {coreRadius}% of radius
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Largest ratio in solar system
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Gravity</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {surfaceGravity}% Earth
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Axis Tilt</div>
            <div className="font-semibold text-purple-600 dark:text-purple-400">
              {axisTilt}°
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA MESSENGER
      </div>
    </div>
  );
}

