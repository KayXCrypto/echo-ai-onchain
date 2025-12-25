'use client';

export default function TitanCard() {
  // Saturn's Titan moon data from NASA Cassini
  const temperature = -290; // °F average surface
  const temperatureC = -179; // °C
  const atmosphere = 'Thick'; // 1.5× Earth's pressure
  const atmosphereType = 'Nitrogen';
  const methaneRain = 'Yes'; // Methane weather cycle
  const lakesCount = 'Hundreds'; // Liquid methane lakes
  const diameter = 3200; // miles - larger than Mercury
  const earthSize = '50%'; // Larger than Mercury

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Titan
        </h3>
        <p className="text-xs text-gray-500">Saturn's Moon • Only moon with thick atmosphere</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {temperature}°F
            </div>
            <div className="text-xs text-gray-500">{temperatureC}°C</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Size</div>
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {diameter.toLocaleString()} mi
            </div>
            <div className="text-xs text-gray-500">Larger than Mercury</div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Atmosphere</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {atmosphere} • {atmosphereType}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            1.5× Earth's pressure
          </div>
        </div>

        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="text-xs text-purple-600 dark:text-purple-400">Methane Lakes</div>
          <div className="text-base font-bold text-purple-900 dark:text-purple-200">
            {lakesCount}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Liquid methane & ethane
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Weather</div>
            <div className="font-semibold text-gray-900 dark:text-white">
              Methane rain
            </div>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-800/50">
            <div className="text-gray-500">Only moon</div>
            <div className="font-semibold text-orange-600 dark:text-orange-400">
              With clouds
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Cassini
      </div>
    </div>
  );
}


