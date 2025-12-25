'use client';

import { useEffect, useState } from 'react';

interface Planet {
  name: string;
  hostStar: string;
  spectralType: string;
  equilibriumTemp: number;
  radius: number;
  mass: number;
  orbitalPeriod: number;
  distance: number;
  discoveryMethod: string;
  discoveryYear: number;
  weatherClass: string;
  weatherDescription: string;
}

interface ExoplanetData {
  systemName: string;
  systemIndex: number;
  totalSystems: number;
  planetCount: number;
  planets: Planet[];
}

export default function ExoplanetSystemOfWeekCard() {
  const [exoplanetData, setExoplanetData] = useState<ExoplanetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const fetchExoplanetData = async (index?: number) => {
    try {
      setLoading(true);
      const url = index !== undefined 
        ? `/api/nasa/exoplanet-featured?index=${index}`
        : '/api/nasa/exoplanet-featured';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch exoplanet data');
      const data = await response.json();
      setExoplanetData(data);
      setCurrentIndex(data.systemIndex);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExoplanetData();
  }, []);

  const handlePrevious = () => {
    if (currentIndex !== null && exoplanetData) {
      const newIndex = (currentIndex - 1 + exoplanetData.totalSystems) % exoplanetData.totalSystems;
      fetchExoplanetData(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex !== null && exoplanetData) {
      const newIndex = (currentIndex + 1) % exoplanetData.totalSystems;
      fetchExoplanetData(newIndex);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error || !exoplanetData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load data</div>
      </div>
    );
  }

  const weatherColors: Record<string, { bg: string; text: string; dot: string }> = {
    Inferno: { bg: 'bg-red-500/20', text: 'text-red-700 dark:text-red-300', dot: 'bg-red-500' },
    'Hot Jupiter': { bg: 'bg-orange-500/20', text: 'text-orange-700 dark:text-orange-300', dot: 'bg-orange-500' },
    Stormy: { bg: 'bg-purple-500/20', text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-500' },
    Temperate: { bg: 'bg-green-500/20', text: 'text-green-700 dark:text-green-300', dot: 'bg-green-500' },
    Cold: { bg: 'bg-blue-500/20', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
    Frozen: { bg: 'bg-cyan-500/20', text: 'text-cyan-700 dark:text-cyan-300', dot: 'bg-cyan-500' },
    Unknown: { bg: 'bg-gray-500/20', text: 'text-gray-700 dark:text-gray-300', dot: 'bg-gray-500' },
  };

  const firstPlanet = exoplanetData.planets[0];

  if (!firstPlanet) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">No planet data available for this system</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            System of the Day
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {exoplanetData.systemIndex + 1} of {exoplanetData.totalSystems}
            </span>
            <div className="flex gap-1">
              <button
                onClick={handlePrevious}
                disabled={loading}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                aria-label="Previous system"
              >
                <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={loading}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                aria-label="Next system"
              >
                <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="text-center py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {exoplanetData.systemName}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {firstPlanet.spectralType || 'Unknown'} • {firstPlanet.distance?.toFixed(1) || 'Unknown'} ly • {exoplanetData.planetCount} planets
          </div>
        </div>
      </div>

      {/* Planets List */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
        {exoplanetData.planets.map((planet, index) => {
          const colors = weatherColors[planet.weatherClass as keyof typeof weatherColors] || weatherColors.Unknown;
          
          return (
            <div
              key={`${planet.name}-${index}`}
              className={`rounded-lg border ${colors.bg} p-2 space-y-1.5`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full ${colors.dot} flex-shrink-0`}></div>
                  <div className="font-bold text-sm text-gray-900 dark:text-white truncate">
                    {planet.name}
                  </div>
                </div>
                <span className={`text-xs font-semibold ${colors.text} flex-shrink-0 ml-2`}>
                  {planet.weatherClass}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded p-1">
                  <div className="text-gray-500 dark:text-gray-400">Temp</div>
                  {planet.equilibriumTemp ? (
                    <>
                      <div className="font-bold text-gray-900 dark:text-white text-xs">{planet.equilibriumTemp.toFixed(0)}K</div>
                      <div className="text-gray-500 dark:text-gray-400 text-[10px]">
                        {(planet.equilibriumTemp - 273.15).toFixed(0)}°C / {((planet.equilibriumTemp - 273.15) * 9/5 + 32).toFixed(0)}°F
                      </div>
                    </>
                  ) : (
                    <div className="font-bold text-gray-500 dark:text-gray-400">N/A</div>
                  )}
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded p-1">
                  <div className="text-gray-500 dark:text-gray-400">Size</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {planet.radius ? `${planet.radius.toFixed(1)}R⊕` : 'N/A'}
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded p-1">
                  <div className="text-gray-500 dark:text-gray-400">Period</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {planet.orbitalPeriod 
                      ? planet.orbitalPeriod < 1 
                        ? `${(planet.orbitalPeriod * 24).toFixed(0)}h`
                        : planet.orbitalPeriod < 365
                        ? `${planet.orbitalPeriod.toFixed(0)}d`
                        : `${(planet.orbitalPeriod / 365).toFixed(1)}y`
                      : 'N/A'
                    }
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded p-1">
                  <div className="text-gray-500 dark:text-gray-400">Year</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {planet.discoveryYear || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
        NASA Exoplanet Archive
      </div>
    </div>
  );
}
