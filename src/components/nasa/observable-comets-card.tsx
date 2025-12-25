'use client';

import { useEffect, useState } from 'react';

interface Comet {
  spkid: string;
  name: string;
  eccentricity: number;
  inclination: number;
  longitudeAscending: number;
  argumentPerihelion: number;
  perihelionDistance: number;
  period: number;
  bestViewing: string;
  nextPerihelion: string;
  daysUntilPerihelion: number;
  visibility: string;
}

interface CometData {
  count: number;
  signature: {
    version: string;
    source: string;
  };
  comets: Comet[];
}

export default function ObservableCometsCard() {
  const [cometData, setCometData] = useState<CometData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchCometData = async () => {
      try {
        const response = await fetch('/api/nasa/observable-comets');
        if (!response.ok) throw new Error('Failed to fetch comet data');
        const data = await response.json();
        setCometData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCometData();
    const interval = setInterval(fetchCometData, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading comet data...</div>
      </div>
    );
  }

  if (error || !cometData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load comet data</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Comet Visibility
        </h3>
        <p className="text-xs text-gray-500">
          Next perihelion passages for major comets
        </p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto max-h-[calc(25rem-8rem)]">
        {cometData.comets.map((comet, index) => {
          const isExpanded = expandedIndex === index;

          // Visibility badge colors
          const visColors = {
            Excellent: { bg: 'bg-green-500/20', text: 'text-green-600 dark:text-green-400', border: 'border-green-500/50' },
            Good: { bg: 'bg-blue-500/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/50' },
            Low: { bg: 'bg-gray-500/20', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-500/50' },
            Sungrazer: { bg: 'bg-orange-500/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500/50' },
          };
          const colors = visColors[comet.visibility as keyof typeof visColors] || visColors.Low;

          return (
            <div
              key={`${comet.spkid}-${index}`}
              className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {comet.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {comet.bestViewing}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                    {comet.nextPerihelion}
                  </div>
                </div>
              </div>
              {isExpanded && (
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <span>Visibility:</span>
                    <div className={`px-2 py-0.5 rounded-full border ${colors.bg} ${colors.border}`}>
                      <span className={`font-semibold ${colors.text}`}>
                        {comet.visibility}
                      </span>
                    </div>
                  </div>
                  <div>Perihelion Distance: {comet.perihelionDistance?.toFixed(2) || 'N/A'} AU</div>
                  <div>Orbital Period: {comet.period.toFixed(1)} years</div>
                  <div>Inclination: {comet.inclination?.toFixed(2) || 'N/A'}°</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        Source: NASA JPL SBDB • Visibility based on perihelion distance
      </div>
    </div>
  );
}
