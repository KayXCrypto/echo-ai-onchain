'use client';

import { useEffect, useState } from 'react';

interface SolarFlare {
  flrID: string;
  beginTime: string;
  peakTime: string;
  endTime: string;
  classType: string;
  sourceLocation?: string;
  activeRegionNum?: number;
}

export default function SolarFlaresCard() {
  const [flares, setFlares] = useState<SolarFlare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlares = async () => {
      try {
        const response = await fetch('/api/nasa/solar-flares');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setFlares(data.events.slice(0, 8)); // Show last 8 flares
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchFlares();
    const interval = setInterval(fetchFlares, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading solar activity...</div>
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

  const getFlareIntensity = (classType: string) => {
    const letter = classType.charAt(0);
    if (letter === 'X') return { color: 'bg-red-500', label: 'EXTREME', textColor: 'text-red-600 dark:text-red-400' };
    if (letter === 'M') return { color: 'bg-orange-500', label: 'STRONG', textColor: 'text-orange-600 dark:text-orange-400' };
    if (letter === 'C') return { color: 'bg-yellow-500', label: 'MODERATE', textColor: 'text-yellow-600 dark:text-yellow-400' };
    return { color: 'bg-blue-500', label: 'WEAK', textColor: 'text-blue-600 dark:text-blue-400' };
  };

  const calculateDuration = (start: string, end: string) => {
    const durationMs = new Date(end).getTime() - new Date(start).getTime();
    const minutes = Math.floor(durationMs / 60000);
    return `${minutes}m`;
  };

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Solar Flares
        </h3>
        <p className="text-xs text-gray-500">FLR • DONKI</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Intense bursts of electromagnetic radiation from sunspots, classified by X-ray intensity (C, M, X classes).
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-2">
        {flares.length === 0 ? (
          <div className="text-sm text-gray-500">No recent solar flares</div>
        ) : (
          flares.map((flare) => {
            const intensity = getFlareIntensity(flare.classType);
            return (
              <div
                key={flare.flrID}
                className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${intensity.color}`} />
                    <div className={`text-lg font-bold ${intensity.textColor}`}>
                      {flare.classType}
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                      {intensity.label}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(flare.peakTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Peak:</span>{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(flare.peakTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>{' '}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {calculateDuration(flare.beginTime, flare.endTime)}
                    </span>
                  </div>
                </div>
                {flare.activeRegionNum && (
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    Active Region: {flare.activeRegionNum}
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