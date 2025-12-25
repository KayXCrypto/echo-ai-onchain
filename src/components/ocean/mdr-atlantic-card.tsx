'use client';

import { useEffect, useState } from 'react';

interface MDRData {
  current: {
    time: string;
    wave_height: number;
    swell_wave_height: number;
    wave_period: number;
    wave_direction: number;
    temperature: number;
    surface_pressure: number;
  };
  hurricane_warning: {
    active: boolean;
    count: number;
    storms: Array<{
      name: string;
      category: string;
      intensity: string;
    }>;
  } | null;
  location: {
    latitude: number;
    longitude: number;
    name: string;
    description: string;
  };
}

export default function MDRAtlanticCard() {
  const [mdrData, setMdrData] = useState<MDRData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMDRData = async () => {
      try {
        const response = await fetch('/api/weather/mdr-atlantic');
        if (!response.ok) throw new Error('Failed to fetch MDR data');
        const data = await response.json();
        setMdrData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMDRData();
    const interval = setInterval(fetchMDRData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading MDR data...</div>
      </div>
    );
  }

  if (error || !mdrData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load MDR data</div>
      </div>
    );
  }

  const waveHeightM = mdrData.current.wave_height || 0;
  const waveHeightFt = (waveHeightM * 3.28084).toFixed(1);
  const swellHeightM = mdrData.current.swell_wave_height || 0;
  const swellHeightFt = (swellHeightM * 3.28084).toFixed(1);
  const tempF = mdrData.current.temperature?.toFixed(1) || 'N/A';
  const tempC = mdrData.current.temperature
    ? ((mdrData.current.temperature - 32) * 5/9).toFixed(1)
    : 'N/A';
  const pressure = mdrData.current.surface_pressure?.toFixed(1) || 'N/A';
  const wavePeriod = mdrData.current.wave_period?.toFixed(1) || 'N/A';

  // Format last updated time
  const lastUpdated = mdrData.current.time
    ? new Date(mdrData.current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Atlantic MDR
        </h3>
        <p className="text-xs text-gray-500">
          {mdrData.location.latitude}°N {Math.abs(mdrData.location.longitude)}°W • Hurricane Zone
        </p>
      </div>

      <div className="flex-1 space-y-2">
        {mdrData.hurricane_warning?.active && (
          <div className="rounded-lg bg-red-50 p-2 border border-red-200 dark:bg-red-900/20 dark:border-red-800/50">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="text-xs font-semibold text-red-900 dark:text-red-200">
                  Active Hurricane Warning
                </div>
                <div className="text-xs text-red-700 dark:text-red-300">
                  {mdrData.hurricane_warning.count} storm{mdrData.hurricane_warning.count > 1 ? 's' : ''} in region
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Wave Height</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {waveHeightFt} ft
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {waveHeightM.toFixed(1)} m
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Temperature</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {tempF}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {tempC}°C
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Swell Height</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-200">
              {swellHeightFt} ft / {swellHeightM.toFixed(1)} m
            </div>
          </div>

          <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-900/20">
            <div className="text-xs text-cyan-600 dark:text-cyan-400">Surface Pressure</div>
            <div className="text-lg font-bold text-cyan-900 dark:text-cyan-200">
              {pressure} hPa
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {mdrData.hurricane_warning?.active ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/50">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold text-red-200">
              {mdrData.hurricane_warning.count} Active Storm{mdrData.hurricane_warning.count > 1 ? 's' : ''} in MDR
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/50">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-green-200">
              No Tropical Depressions
            </span>
          </div>
        )}

        <div className="text-xs text-gray-400">
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
}
