'use client';

export default function TharsisSandstormCard() {
  // Tharsis Bulge Sand Storms
  const windSpeedKmh = 100; // kilometers per hour (typical for Mars)
  const windSpeedMph = 62; // miles per hour
  const durationDays = 60; // typical storm duration in days
  const coverageKm = 300000; // square kilometers affected
  const tempC = -31; // average degrees Celsius
  const tempF = -24; // average degrees Fahrenheit
  const dustParticleSizeMicrons = 3; // micrometers

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Tharsis Sand Storms
        </h3>
        <p className="text-xs text-gray-500">Volcanic Plateau • Dust Storms</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Wind Speed</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {windSpeedKmh} km/h
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {windSpeedMph} mph
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
          <div className="rounded-lg bg-yellow-50 p-2 dark:bg-yellow-900/20">
            <div className="text-xs text-yellow-600 dark:text-yellow-400">Storm Duration</div>
            <div className="text-lg font-bold text-yellow-900 dark:text-yellow-200">
              ~{durationDays} days
            </div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">
              Can engulf entire planet
            </div>
          </div>

          <div className="rounded-lg bg-orange-50 p-2 dark:bg-orange-900/20">
            <div className="text-xs text-orange-600 dark:text-orange-400">Coverage Area</div>
            <div className="text-lg font-bold text-orange-900 dark:text-orange-200">
              {coverageKm.toLocaleString()} km²
            </div>
          </div>

          <div className="rounded-lg bg-red-50 p-2 dark:bg-red-900/20">
            <div className="text-xs text-red-600 dark:text-red-400">Dust Particle Size</div>
            <div className="text-sm font-semibold text-red-900 dark:text-red-200">
              ~{dustParticleSizeMicrons} micrometers
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
