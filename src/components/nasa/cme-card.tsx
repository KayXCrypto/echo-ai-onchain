'use client';

import { useEffect, useState } from 'react';

interface CME {
  activityID: string;
  startTime: string;
  sourceLocation?: string;
  note?: string;
  instruments: { displayName: string }[];
  cmeAnalyses?: {
    speed: number;
    type: string;
    latitude: number;
    longitude: number;
  }[];
}

export default function CMECard() {
  const [cmes, setCMEs] = useState<CME[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCMEs = async () => {
      try {
        const response = await fetch('/api/nasa/cme');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCMEs(data.events.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCMEs();
    const interval = setInterval(fetchCMEs, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading CME data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load data</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Coronal Mass Ejections
        </h3>
        <p className="text-xs text-gray-500">CME • DONKI</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Massive plasma and magnetic field eruptions from the Sun that can trigger geomagnetic storms on Earth.
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-2">
        {cmes.length === 0 ? (
          <div className="text-sm text-gray-500">No recent CMEs detected</div>
        ) : (
          cmes.map((cme) => {
            const analysis = cme.cmeAnalyses?.[0];
            return (
              <div
                key={cme.activityID}
                className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20"
              >
                <div className="flex items-start justify-between">
                  <div className="font-semibold text-yellow-900 dark:text-yellow-200">
                    CME Event
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(cme.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>

                {analysis && (
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Speed:</span>{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {analysis.speed.toLocaleString()} km/s
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {analysis.type}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  {new Date(cme.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}