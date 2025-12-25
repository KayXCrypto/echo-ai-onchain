'use client';

import { useEffect, useState } from 'react';

interface Shower {
  name: string;
  peak: { month: number; day: number };
  active: { start: { month: number; day: number }; end: { month: number; day: number } };
  zhr: number;
  velocity: number;
  radiant: string;
  parent: string;
  moonPhase: string;
  bestViewing: string;
  daysToPeak: number;
  isActive: boolean;
  peakDate: string;
}

interface MeteorShowerData {
  active: Shower[];
  upcoming: Shower[];
  all: Shower[];
}

export default function MeteorShowersCard() {
  const [showerData, setShowerData] = useState<MeteorShowerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchShowerData = async () => {
      try {
        const response = await fetch('/api/nasa/meteor-showers');
        if (!response.ok) throw new Error('Failed to fetch meteor shower data');
        const data = await response.json();
        setShowerData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchShowerData();
    const interval = setInterval(fetchShowerData, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading meteor shower data...</div>
      </div>
    );
  }

  if (error || !showerData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load meteor shower data</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Meteor Showers
        </h3>
        <p className="text-xs text-gray-500">
          {showerData.active.length > 0
            ? `${showerData.active.length} active now`
            : `Next: ${showerData.upcoming[0]?.name || 'N/A'}`}
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(25rem-8rem)]">
        {/* Active Showers */}
        {showerData.active.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
              Active Now
            </div>
            {showerData.active.map((shower, index) => (
              <div
                key={`active-${shower.name}`}
                className="rounded-lg bg-green-50 p-3 border border-green-200 dark:bg-green-900/20 dark:border-green-800/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-bold text-green-900 dark:text-green-200">
                      {shower.name}
                    </div>
                    <div className="text-xs text-green-700 dark:text-green-300">
                      Peak: {shower.peakDate} ({shower.daysToPeak === 0 ? 'Today!' : `${Math.abs(shower.daysToPeak)} days ${shower.daysToPeak > 0 ? 'away' : 'ago'}`})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-600 dark:text-green-400">ZHR</div>
                    <div className="text-lg font-bold text-green-900 dark:text-green-200">
                      {shower.zhr}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
                  <div>🌟 Radiant: {shower.radiant}</div>
                  <div>🌍 Best: {shower.bestViewing}</div>
                  <div>🚀 {shower.velocity} km/s • ☄️ {shower.parent}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming Showers */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            {showerData.active.length > 0 ? 'Upcoming' : 'Upcoming Showers'}
          </div>
          {showerData.upcoming.map((shower, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={`upcoming-${shower.name}`}
                className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {shower.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Peak: {shower.peakDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {shower.daysToPeak} days
                    </div>
                    <div className="text-xs text-gray-500">
                      ZHR {shower.zhr}
                    </div>
                  </div>
                </div>
                {isExpanded && (
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div>Radiant: {shower.radiant}</div>
                    <div>Best Viewing: {shower.bestViewing}</div>
                    <div>Velocity: {shower.velocity} km/s</div>
                    <div>Parent: {shower.parent}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-xs text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        ZHR = Zenith Hourly Rate (meteors/hour at peak)
      </div>
    </div>
  );
}
