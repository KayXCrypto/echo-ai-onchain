'use client';

export default function SolarCoreCard() {
  // Sun's core data
  const coreTempK = 15700000; // kelvin
  const coreTempF = 28000000; // fahrenheit (approx)
  const hydrogenConverted = 600; // million tonnes per second
  const age = 4.57; // billion years
  const lifeRemaining = 5; // billion years approximately
  const lifecycleProgress = (age / (age + lifeRemaining)) * 100; // ~48%
  const hydrogenPercent = 34; // at center due to fusion
  const heliumPercent = 64; // at center
  const massConverted = 100; // Earth masses converted to helium so far

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Solar Core
        </h3>
        <p className="text-xs text-gray-500">Nuclear Fusion • Main Sequence</p>
      </div>

      <div className="flex-1 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {coreTempF.toLocaleString()}°F
            </div>
            <div className="text-xs text-gray-500">{coreTempK.toLocaleString()}K</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Lifecycle</div>
            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
              {lifecycleProgress.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-500">{age}B yrs old</div>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
          <div className="text-xs text-yellow-600 dark:text-yellow-400">Composition</div>
          <div className="text-base font-bold text-yellow-900 dark:text-yellow-200">
            {hydrogenPercent}% H • {heliumPercent}% He
          </div>
        </div>

        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
          <div className="text-xs text-orange-600 dark:text-orange-400">Fusion Rate</div>
          <div className="text-base font-bold text-orange-900 dark:text-orange-200">
            {hydrogenConverted}M tonnes/sec
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Converted</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              ~{massConverted} Earths
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Remaining</div>
            <div className="font-semibold text-yellow-600 dark:text-yellow-400">
              {lifeRemaining}B yrs
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Solar Physics
      </div>
    </div>
  );
}
