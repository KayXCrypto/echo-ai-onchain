'use client';

import { useEffect, useState } from 'react';

interface GeomagneticStorm {
  gstID: string;
  startTime: string;
  allKpIndex: { observedTime: string; kpIndex: number; source: string }[];
  linkedEvents?: { activityID: string }[];
}

export default function GeomagneticStormsCard() {
  const [storms, setStorms] = useState<GeomagneticStorm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStorms = async () => {
      try {
        const response = await fetch('/api/nasa/geomagnetic-storms');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setStorms(data.events.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStorms();
    const interval = setInterval(fetchStorms, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading storm data...</div>
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

  const getKpSeverity = (kp: number) => {
    if (kp >= 8) return { label: 'SEVERE', color: 'bg-red-500', textColor: 'text-red-600 dark:text-red-400' };
    if (kp >= 6) return { label: 'STRONG', color: 'bg-orange-500', textColor: 'text-orange-600 dark:text-orange-400' };
    if (kp >= 5) return { label: 'MODERATE', color: 'bg-yellow-500', textColor: 'text-yellow-600 dark:text-yellow-400' };
    return { label: 'MINOR', color: 'bg-green-500', textColor: 'text-green-600 dark:text-green-400' };
  };

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Geomagnetic Storms
        </h3>
        <p className="text-xs text-gray-500">GST • DONKI</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Disturbances in Earth's magnetosphere from solar wind, causing auroras and potential power/comm disruptions.
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-2">
        {storms.length === 0 ? (
          <div className="text-sm text-gray-500">No recent geomagnetic storms</div>
        ) : (
          storms.map((storm) => {
            const maxKp = Math.max(...storm.allKpIndex.map(k => k.kpIndex));
            const severity = getKpSeverity(maxKp);

            return (
              <div
                key={storm.gstID}
                className="rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-800 dark:bg-purple-900/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${severity.color}`} />
                    <div className={`text-lg font-bold ${severity.textColor}`}>
                      Kp {maxKp}
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                      {severity.label}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(storm.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>

                <div className="mt-2 text-xs">
                  <span className="text-gray-500">Started:</span>{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date(storm.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
                  </span>
                </div>

                {storm.linkedEvents && storm.linkedEvents.length > 0 && (
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    Linked events: {storm.linkedEvents.length}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}