'use client';

export default function MercuryTemperatureCard() {
  // Mercury temperature data from NASA MESSENGER mission
  const dayTemp = 800; // °F in direct sunlight
  const dayTempC = 430; // °C
  const nightTemp = -290; // °F in shadow
  const nightTempC = -180; // °C
  const tempSwing = 1090; // °F - Largest of any planet
  const sunBrightness = 7; // times brighter than on Earth
  const sunSize = 3; // times larger appearance than from Earth
  const icePresence = 'Possible'; // Water ice in polar craters

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Mercury Temperature
        </h3>
        <p className="text-xs text-gray-500">Extreme Swings • Closest to Sun</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Day (Sunlight)</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {dayTemp}°F
            </div>
            <div className="text-xs text-gray-500">{dayTempC}°C</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Night (Shadow)</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {nightTemp}°F
            </div>
            <div className="text-xs text-gray-500">{nightTempC}°C</div>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-r from-red-50 to-blue-50 p-3 dark:from-red-900/20 dark:to-blue-900/20">
          <div className="text-xs text-gray-600 dark:text-gray-400">Temperature Swing</div>
          <div className="text-base font-bold text-gray-900 dark:text-white">
            {tempSwing.toLocaleString()}°F
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Largest of any planet
          </div>
        </div>

        <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
          <div className="text-xs text-yellow-600 dark:text-yellow-400">Sunlight</div>
          <div className="text-base font-bold text-yellow-900 dark:text-yellow-200">
            {sunBrightness}× brighter
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400">
            Sun appears {sunSize}× larger
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Atmosphere</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              Thin exosphere
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Polar Ice</div>
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              {icePresence}
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

