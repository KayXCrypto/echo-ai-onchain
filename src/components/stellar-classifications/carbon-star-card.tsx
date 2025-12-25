'use client';

export default function CarbonStarCard() {
  const mass = '1-8 M☉';
  const phase = 'AGB giants';
  const chemistry = 'C > O';
  const process = 'Triple-α + dredge-up';
  const endState = 'PN → CO WD';
  const subclasses = 'C-R, C-N, C-H, C-J';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Carbon Star
        </h3>
        <p className="text-xs text-gray-500">Class C • {subclasses}</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Mass Range</div>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {mass}
            </div>
            <div className="text-xs text-gray-500">{phase}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Chemistry</div>
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {chemistry}
            </div>
            <div className="text-xs text-gray-500">Carbon-rich</div>
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Process</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            {process}
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            s-process in shells
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">End State</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {endState}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            AGB phase ~10⁵-10⁶ yr
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
