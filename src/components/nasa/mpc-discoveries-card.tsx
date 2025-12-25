'use client';

import { useEffect, useState } from 'react';

interface Discovery {
  name: string;
  number: number;
  designation: string;
  discoveryDate: string;
  magnitude: number;
  semimajorAxis: number;
  eccentricity: number;
  inclination: number;
  earthMOID: number;
}

interface MPCData {
  count: number;
  discoveries: Discovery[];
}

export default function MPCDiscoveriesCard() {
  const [mpcData, setMpcData] = useState<MPCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchMPCData = async () => {
      try {
        const response = await fetch('/api/nasa/mpc-recent');
        if (!response.ok) throw new Error('Failed to fetch MPC data');
        const data = await response.json();
        setMpcData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMPCData();
    const interval = setInterval(fetchMPCData, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading MPC data...</div>
      </div>
    );
  }

  if (error || !mpcData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load MPC data</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Recent NEO Updates
        </h3>
        <p className="text-xs text-gray-500">
          {mpcData.count} recently updated NEOs
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto max-h-[calc(25rem-8rem)]">
        {mpcData.discoveries.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-8">
            No NEO data available
          </div>
        ) : (
          mpcData.discoveries.map((discovery, index) => {
            const isExpanded = expandedIndex === index;
            const moidLD = (discovery.earthMOID * 149597870.7 / 384400).toFixed(2);

            return (
              <div
                key={`${discovery.designation}-${index}`}
                className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {discovery.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Discovered: {new Date(discovery.discoveryDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">MOID</div>
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {moidLD} LD
                    </div>
                  </div>
                </div>
                {isExpanded && (
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div>Designation: {discovery.designation}</div>
                    <div>Magnitude: {discovery.magnitude.toFixed(1)} H</div>
                    <div>Semi-major Axis: {discovery.semimajorAxis.toFixed(3)} AU</div>
                    <div>Eccentricity: {discovery.eccentricity.toFixed(4)}</div>
                    <div>Inclination: {discovery.inclination.toFixed(2)}°</div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="text-xs text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        Source: Minor Planet Center • MOID = Minimum Orbit Intersection Distance
      </div>
    </div>
  );
}
