'use client';

export default function BlueDwarfCard() {
  const status = 'Hypothetical';
  const progenitor = 'Old red dwarfs';
  const process = 'H exhaustion';
  const timeline = 'Far future';
  const existence = 'None yet';
  const evolution = 'Heat & brighten → WD';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Blue Dwarf
        </h3>
        <p className="text-xs text-gray-500">{status} • Future Red Dwarf Stage</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Status</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {status}
            </div>
            <div className="text-xs text-gray-500">{existence}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Timeline</div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {timeline}
            </div>
            <div className="text-xs text-gray-500">Universe too young</div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Evolution</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {evolution}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Shift bluer before WD phase
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Process</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            {progenitor}
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            Very old M dwarfs exhaust H
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
