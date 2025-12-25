'use client';

export default function BlackDwarfCard() {
  const status = 'Hypothetical';
  const progenitor = 'White dwarfs';
  const process = 'Complete cooling';
  const timeline = 'Far future';
  const existence = 'None exist yet';
  const reason = 'Universe not old enough';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Black Dwarf
        </h3>
        <p className="text-xs text-gray-500">{status} • Final WD Stage</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Status</div>
            <div className="text-lg font-bold text-gray-600 dark:text-gray-400">
              {status}
            </div>
            <div className="text-xs text-gray-500">{existence}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Timeline</div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {timeline}
            </div>
            <div className="text-xs text-gray-500">{reason}</div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900/20">
          <div className="text-xs text-gray-600 dark:text-gray-400">Process</div>
          <div className="text-base font-bold text-gray-900 dark:text-gray-200">
            {process}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            WD cools to background temp
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Progenitor</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {progenitor}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Cooled over quadrillions of years
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
