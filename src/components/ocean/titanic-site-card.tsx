'use client';

import { useEffect, useState } from 'react';

interface TitanicData {
  current: {
    time: string;
    wave_height: number;
    swell_wave_height: number;
    wave_period: number;
    wave_direction: number;
    air_temperature: number;
    surface_pressure: number;
    water_temperature: number;
    water_temperature_c: number;
  };
  iceberg_warning: {
    risk_level: string;
    details: string;
    season: boolean;
  };
  location: {
    latitude: number;
    longitude: number;
    name: string;
    description: string;
    depth: string;
    sank: string;
  };
}

export default function TitanicSiteCard() {
  const [titanicData, setTitanicData] = useState<TitanicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTitanicData = async () => {
      try {
        const response = await fetch('/api/weather/titanic-site');
        if (!response.ok) throw new Error('Failed to fetch Titanic site data');
        const data = await response.json();
        setTitanicData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTitanicData();
    const interval = setInterval(fetchTitanicData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading wreck site data...</div>
      </div>
    );
  }

  if (error || !titanicData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load wreck site data</div>
      </div>
    );
  }

  const waveHeightM = titanicData.current.wave_height || 0;
  const waveHeightFt = (waveHeightM * 3.28084).toFixed(1);
  const swellHeightM = titanicData.current.swell_wave_height || 0;
  const swellHeightFt = (swellHeightM * 3.28084).toFixed(1);
  const airTempF = titanicData.current.air_temperature?.toFixed(1) || 'N/A';
  const airTempC = titanicData.current.air_temperature
    ? ((titanicData.current.air_temperature - 32) * 5/9).toFixed(1)
    : 'N/A';
  const waterTempF = titanicData.current.water_temperature?.toFixed(1) || 'N/A';
  const waterTempC = titanicData.current.water_temperature_c?.toFixed(1) || 'N/A';
  const wavePeriod = titanicData.current.wave_period?.toFixed(1) || 'N/A';

  // Format last updated time
  const lastUpdated = titanicData.current.time
    ? new Date(titanicData.current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  // Iceberg warning colors
  const riskColors = {
    High: { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-200', dot: 'bg-red-500' },
    Moderate: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-200', dot: 'bg-yellow-500' },
    Low: { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-200', dot: 'bg-blue-500' },
  };
  const colors = riskColors[titanicData.iceberg_warning.risk_level as keyof typeof riskColors] || riskColors.Low;

  return (
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          RMS Titanic
        </h3>
        <p className="text-xs text-gray-500">
          {titanicData.location.latitude.toFixed(4)}°N {Math.abs(titanicData.location.longitude).toFixed(4)}°W • {titanicData.location.depth}
        </p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500">Air Temp</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {airTempF}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {airTempC}°C
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Water Temp</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {waterTempF}°F
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {waterTempC}°C
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
            <div className="text-xs text-blue-600 dark:text-blue-400">Wave Height</div>
            <div className="text-lg font-bold text-blue-900 dark:text-blue-200">
              {waveHeightFt} ft / {waveHeightM.toFixed(1)} m
            </div>
          </div>

          <div className="rounded-lg bg-cyan-50 p-2 dark:bg-cyan-900/20">
            <div className="text-xs text-cyan-600 dark:text-cyan-400">Swell Height</div>
            <div className="text-lg font-bold text-cyan-900 dark:text-cyan-200">
              {swellHeightFt} ft / {swellHeightM.toFixed(1)} m
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} border ${colors.border}`}>
          <div className={`w-2 h-2 rounded-full ${colors.dot} ${titanicData.iceberg_warning.risk_level === 'High' ? 'animate-pulse' : ''}`} />
          <span className={`text-xs font-semibold ${colors.text}`}>
            {titanicData.iceberg_warning.risk_level} Iceberg Risk
          </span>
        </div>

        <div className="text-xs text-gray-400">
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
}
