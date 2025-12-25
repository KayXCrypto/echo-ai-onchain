'use client';

export default function MareTranquillitatisfCard() {
  // Mare Tranquillitatis - Apollo 11 landing site
  const dayTempC = 127;
  const dayTempF = 260;
  const nightTempC = -173;
  const nightTempF = -280;
  const dayTempK = 400;
  const nightTempK = 100;
  const coordinates = "0°41'15\"N 23°26'E";

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Mare Tranquillitatis
        </h3>
        <p className="text-xs text-gray-500">
          Sea of Tranquility • Apollo 11 Landing Site
        </p>
      </div>

      <div className="flex-1 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Day Temperature</div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {dayTempF}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {dayTempC}°C / {dayTempK}K
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Night Temperature</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {nightTempF}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {nightTempC}°C / {nightTempK}K
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-900/20">
            <div className="text-xs text-amber-600 dark:text-amber-400">Historic Moment</div>
            <div className="text-sm font-semibold text-amber-900 dark:text-amber-200 mt-1">
              First Human Moonwalk
            </div>
            <div className="text-xs text-amber-700 dark:text-amber-300 mt-1">
              July 20, 1969 - Neil Armstrong & Buzz Aldrin
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Coordinates</div>
            <div className="text-sm font-semibold text-blue-900 dark:text-blue-200 mt-1">
              {coordinates}
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/20">
            <div className="text-xs text-purple-600 dark:text-purple-400">Temperature Swing</div>
            <div className="text-sm font-semibold text-purple-900 dark:text-purple-200 mt-1">
              540°F (300°C) variation
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA Apollo 11 Mission
      </div>
    </div>
  );
}
