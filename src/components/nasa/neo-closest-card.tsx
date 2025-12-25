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

export default function NEOClosestCard() {
  const [neoData, setNeoData] = useState<NEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const closestNEO = neoData.objects[0];
  const distanceLunar = (closestNEO.distance * 149597870.7 / 384400).toFixed(2);
  const distanceKm = (closestNEO.distance * 149597870.7).toFixed(0);

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Closest Approach
        </h3>
        <p className="text-xs text-gray-500">
          Nearest object in next 30 days
        </p>
      </div>

      <div className="flex-1 space-y-3">
        <div className="rounded-lg bg-orange-50 p-4 border-2 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800/50">
          <div className="text-center space-y-3">
            <div>
              <div className="text-xs text-orange-600 dark:text-orange-400">Object</div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-200">
                {closestNEO.designation}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-orange-600 dark:text-orange-400">Distance</div>
                <div className="text-xl font-bold text-orange-900 dark:text-orange-200">
                  {distanceLunar} LD
                </div>
                <div className="text-xs text-orange-700 dark:text-orange-300">
                  {distanceKm} km
                </div>
              </div>

              <div>
                <div className="text-xs text-orange-600 dark:text-orange-400">Velocity</div>
                <div className="text-xl font-bold text-orange-900 dark:text-orange-200">
                  {closestNEO.velocity.toFixed(1)}
                </div>
                <div className="text-xs text-orange-700 dark:text-orange-300">
                  km/s
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs text-orange-600 dark:text-orange-400">Approach Date</div>
              <div className="text-lg font-bold text-orange-900 dark:text-orange-200">
                {closestNEO.closeApproachDate}
              </div>
            </div>

            <div className="pt-2 border-t border-orange-200 dark:border-orange-800">
              <div className="text-xs text-orange-700 dark:text-orange-300">
                Magnitude: {closestNEO.magnitude.toFixed(1)} H
              </div>
              <div className="text-xs text-orange-700 dark:text-orange-300">
                Range: {(closestNEO.distanceMin * 149597870.7).toFixed(0)} - {(closestNEO.distanceMax * 149597870.7).toFixed(0)} km
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        Source: NASA/JPL SBDB Close Approach Data
      </div>
    </div>
  );
}
