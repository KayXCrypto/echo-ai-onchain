'use client';

import { useEffect, useState } from 'react';

interface InSightData {
  sol: string;
  earthDate: string;
  tempHighC: number;
  tempLowC: number;
  windSpeedAvg: number;
  pressureAvg: number;
  season: string;
}

export default function MarsInSightCard() {
  const [data, setData] = useState<InSightData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/nasa/mars-weather');
        if (!response.ok) throw new Error('Failed to fetch Mars weather');
        const json = await response.json();

        if (json.sol_keys?.length > 0) {
          const latestSol = json.sol_keys[json.sol_keys.length - 1];
          const solData = json[latestSol];

          setData({
            sol: latestSol,
            earthDate: solData.Last_UTC ? new Date(solData.Last_UTC).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            }) : 'Oct 2020',
            tempHighC: solData.AT?.mx || 0,
            tempLowC: solData.AT?.mn || 0,
            windSpeedAvg: solData.HWS?.av || 0,
            pressureAvg: solData.PRE?.av || 0,
            season: solData.Season || 'Unknown',
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading InSight data...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load InSight data</div>
      </div>
    );
  }

  const tempHighF = (data.tempHighC * 9/5) + 32;
  const tempLowF = (data.tempLowC * 9/5) + 32;
  const windMph = data.windSpeedAvg * 2.237;

  return (
    <div className="flex h-full flex-col space-y-1.5">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Mars InSight Lander
        </h3>
        <p className="text-xs text-gray-500">Elysium Planitia • 4.5°N 135.6°E</p>
      </div>

      <div className="flex-1 space-y-1.5">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-gray-500">High Temp</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {Math.round(tempHighF)}°F / {Math.round(data.tempHighC)}°C
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Low Temp</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {Math.round(tempLowF)}°F / {Math.round(data.tempLowC)}°C
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-orange-50 px-2 py-1.5 dark:bg-orange-900/20">
          <div className="text-xs text-orange-600 dark:text-orange-400">Wind Speed</div>
          <div className="text-base font-bold text-orange-900 dark:text-orange-200">
            {windMph.toFixed(1)} mph ({data.windSpeedAvg.toFixed(1)} m/s)
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 px-2 py-1.5 dark:bg-amber-900/20">
          <div className="text-xs text-amber-600 dark:text-amber-400">Atmospheric Pressure</div>
          <div className="text-base font-bold text-amber-900 dark:text-amber-200">
            {data.pressureAvg.toFixed(0)} Pa
          </div>
          <div className="text-xs text-amber-700 dark:text-amber-300">~0.7% of Earth's sea level</div>
        </div>

        <div className="rounded-lg bg-red-50 px-2 py-1.5 dark:bg-red-900/20">
          <div className="text-xs text-red-600 dark:text-red-400">Martian Season (Sol {data.sol})</div>
          <div className="text-base font-bold text-red-900 dark:text-red-200 capitalize">
            {data.season}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Archive ({data.earthDate}) • Mission ended Dec 2022
      </div>
    </div>
  );
}
