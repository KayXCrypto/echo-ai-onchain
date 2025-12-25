'use client';

import { useEffect, useState } from 'react';

interface WaveData {
  current: {
    time: string;
    wave_height: number;
    wave_period: number;
    swell_wave_height: number;
    swell_wave_period: number;
  };
}

export default function NazareWavesCard() {
  const [waveData, setWaveData] = useState<WaveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWaveData = async () => {
      try {
        const response = await fetch('/api/weather/nazare-waves');
        if (!response.ok) throw new Error('Failed to fetch wave data');
        const data = await response.json();
        setWaveData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchWaveData();
    const interval = setInterval(fetchWaveData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading wave data...</div>
      </div>
    );
  }

  if (error || !waveData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load wave data</div>
      </div>
    );
  }

  const waveHeightM = waveData.current.wave_height || 0;
  const waveHeightFt = waveHeightM * 3.28084;
  const swellHeightM = waveData.current.swell_wave_height || 0;
  const swellHeightFt = swellHeightM * 3.28084;
  const wavePeriod = waveData.current.wave_period || 0;
  const swellPeriod = waveData.current.swell_wave_period || 0;

  const recordWaveHeightM = 26.2;
  const recordWaveHeightFt = 86;

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Nazaré
        </h3>
        <p className="text-xs text-gray-500">
          Atlantic Ocean • World record big wave surfing
        </p>
        <p className="text-xs text-gray-500">
          39.6°N 9.1°W
        </p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Current Wave</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {waveHeightFt.toFixed(1)} ft
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {waveHeightM.toFixed(1)} m
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Record Wave</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {recordWaveHeightFt} ft
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {recordWaveHeightM} m
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Swell Height</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-200">
              {swellHeightFt.toFixed(1)} ft / {swellHeightM.toFixed(1)} m
            </div>
          </div>

          <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-900/20">
            <div className="text-xs text-cyan-600 dark:text-cyan-400">Wave Period</div>
            <div className="text-lg font-bold text-cyan-900 dark:text-cyan-200">
              {wavePeriod.toFixed(1)} seconds
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-900/20">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Swell Period</div>
            <div className="text-lg font-bold text-indigo-900 dark:text-indigo-200">
              {swellPeriod.toFixed(1)} seconds
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Updated {waveData.current.time ? new Date(waveData.current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}
      </div>
    </div>
  );
}
