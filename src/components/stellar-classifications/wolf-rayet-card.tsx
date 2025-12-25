'use client';

export default function WolfRayetCard() {
  const initialMass = '≳20-25+ M☉';
  const coreProcess = 'Core He or heavier';
  const lifePhase = '<1 Myr in WR phase';
  const endState = 'Type Ib/Ic SN → NS/BH';
  const subclasses = 'WN, WC, WO';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Wolf-Rayet Star
        </h3>
        <p className="text-xs text-gray-500">Evolved Massive • {subclasses}</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Initial Mass</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {initialMass}
            </div>
            <div className="text-xs text-gray-500">Stripped envelope</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">WR Phase</div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {lifePhase}
            </div>
            <div className="text-xs text-gray-500">Million years</div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
          <div className="text-xs text-blue-600 dark:text-blue-400">Core Process</div>
          <div className="text-base font-bold text-blue-900 dark:text-blue-200">
            {coreProcess}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Late burning up to Si
          </div>
        </div>

        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Characteristics</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200">
            Strong stellar winds
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">
            {endState}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Source: Stellar Classification
      </div>
    </div>
  );
}
