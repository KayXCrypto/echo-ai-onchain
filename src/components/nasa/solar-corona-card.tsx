'use client';

export default function SolarCoronaCard() {
  // Sun's corona data
  const coronaTempMinF = 1800000; // fahrenheit
  const coronaTempMaxF = 3600000; // fahrenheit
  const coronaTempAvgK = 1500000; // kelvin average

  const photosphereTemp = 5800; // kelvin for comparison
  const tempRatio = Math.round(coronaTempAvgK / photosphereTemp);

  const solarWindSpeedMin = 250; // km/s
  const solarWindSpeedMax = 750; // km/s
  const cmeSpeedMin = 20; // km/s
  const cmeSpeedMax = 3200; // km/s
  const cmeAvgSpeed = 489; // km/s

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Solar Corona
        </h3>
        <p className="text-xs text-gray-500">Outer Atmosphere • Plasma</p>
      </div>

      <div className="flex-1 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              1.8-3.6M°F
            </div>
            <div className="text-xs text-gray-500">{coronaTempAvgK.toLocaleString()}K avg</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">vs Surface</div>
            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {tempRatio}× hotter
            </div>
            <div className="text-xs text-gray-500">Heating mystery</div>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
          <div className="text-xs text-yellow-600 dark:text-yellow-400">Solar Wind</div>
          <div className="text-base font-bold text-yellow-900 dark:text-yellow-200">
            {solarWindSpeedMin}-{solarWindSpeedMax} km/s
          </div>
        </div>

        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
          <div className="text-xs text-orange-600 dark:text-orange-400">CME Speed</div>
          <div className="text-base font-bold text-orange-900 dark:text-orange-200">
            {cmeSpeedMin}-{cmeSpeedMax.toLocaleString()} km/s
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            Avg: {cmeAvgSpeed} km/s
          </div>
        </div>

        <div className="rounded bg-gray-50 p-2 text-xs dark:bg-gray-800/50">
          <div className="text-gray-500">Earth Impact Time</div>
          <div className="font-semibold text-red-600 dark:text-red-400">
            15 hours - 5 days
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Solar Dynamics Observatory
      </div>
    </div>
  );
}
