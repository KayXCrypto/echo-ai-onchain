'use client';

export default function PolarIceCapsCard() {
  // Martian Polar Ice Caps
  const northCapDiameterKm = 1000; // kilometers
  const southCapDiameterKm = 350; // kilometers
  const winterTempC = -125; // degrees Celsius
  const winterTempF = -193; // degrees Fahrenheit
  const summerTempC = -73; // degrees Celsius
  const summerTempF = -99; // degrees Fahrenheit
  const thicknessM = 3000; // meters at maximum

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Polar Ice Caps
        </h3>
        <p className="text-xs text-gray-500">Water & CO₂ Ice</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Winter Temperature</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {winterTempF}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {winterTempC}°C
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Summer Temperature</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {summerTempF}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {summerTempC}°C
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-900/20">
            <div className="text-xs text-cyan-600 dark:text-cyan-400">North Cap Diameter</div>
            <div className="text-lg font-bold text-cyan-900 dark:text-cyan-200">
              {northCapDiameterKm.toLocaleString()} km
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">South Cap Diameter</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-200">
              {southCapDiameterKm.toLocaleString()} km
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/20">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Ice Thickness</div>
            <div className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              Up to {thicknessM.toLocaleString()} m
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
