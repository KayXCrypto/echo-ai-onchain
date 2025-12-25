'use client';

import { useEffect, useState } from 'react';

interface NEOObject {
  designation: string;
  orbitId: string;
  closeApproachDate: string;
  distance: number;
  distanceMin: number;
  distanceMax: number;
  velocity: number;
  magnitude: number;
}

interface NEOData {
  count: number;
  total: number;
  dateRange: {
    start: string;
    end: string;
  };
  objects: NEOObject[];
}

export default function NEOUpcomingCard() {
  const [neoData, setNeoData] = useState<NEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchNEOData = async () => {
      try {
        const response = await fetch('/api/nasa/neo');
        if (!response.ok) throw new Error('Failed to fetch NEO data');
        const data = await response.json();
        setNeoData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchNEOData();
    const interval = setInterval(fetchNEOData, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading NEO data...</div>
      </div>
    );
  }

  if (error || !neoData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load NEO data</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Upcoming Approaches
        </h3>
        <p className="text-xs text-gray-500">
          {neoData.count - 1} additional objects within 30 days
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto max-h-[calc(25rem-8rem)]">
        {neoData.objects.slice(1, 10).map((neo, index) => {
          const lunarDist = (neo.distance * 149597870.7 / 384400).toFixed(1);
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={`${neo.designation}-${index}`}
              className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {neo.designation}
                  </div>
                  <div className="text-xs text-gray-500">
                    {neo.closeApproachDate.split(' ')[0]}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {lunarDist} LD
                  </div>
                  <div className="text-xs text-gray-500">
                    {neo.velocity.toFixed(1)} km/s
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>Distance: {(neo.distance * 149597870.7).toFixed(0)} km</div>
                  <div>Magnitude: {neo.magnitude.toFixed(1)} H</div>
                  <div>Range: {(neo.distanceMin * 149597870.7).toFixed(0)} - {(neo.distanceMax * 149597870.7).toFixed(0)} km</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        Source: NASA/JPL SBDB • LD = Lunar Distance (384,400 km)
      </div>
    </div>
  );
}
