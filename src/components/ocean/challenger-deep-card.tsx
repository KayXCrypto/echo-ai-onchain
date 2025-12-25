'use client';

export default function ChallengerDeepCard() {
  const depthM = 10984;
  const depthFt = 36037;
  const pressurePsi = 15750;
  const pressureMPa = 108.6;
  const tempC = 1;
  const tempF = 34;
  const salinity = 34.7;

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Challenger Deep
        </h3>
        <p className="text-xs text-gray-500">
          Mariana Trench • Deepest point on Earth
        </p>
        <p className="text-xs text-gray-500">
          11.4°N 142.6°E
        </p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Depth</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {depthFt.toLocaleString()} ft
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {depthM.toLocaleString()} m
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {tempF}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {tempC}°C
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Pressure</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-200">
              {pressurePsi.toLocaleString()} psi / {pressureMPa} MPa
            </div>
          </div>

          <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-900/20">
            <div className="text-xs text-cyan-600 dark:text-cyan-400">Pressure vs Surface</div>
            <div className="text-lg font-bold text-cyan-900 dark:text-cyan-200">
              1,071x atmospheric
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/20">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Salinity</div>
            <div className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
              {salinity} PSU
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NOAA
      </div>
    </div>
  );
}
