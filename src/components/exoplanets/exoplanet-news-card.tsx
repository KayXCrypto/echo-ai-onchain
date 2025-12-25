'use client';

import { useEffect, useState } from 'react';

interface ExoplanetNews {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  planetName?: string;
  hostStar?: string;
  discoveryMethod?: string;
}

interface NewsData {
  news: ExoplanetNews[];
  count: number;
}

export default function ExoplanetNewsCard() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch('/api/nasa/exoplanet-news');
        if (!response.ok) throw new Error('Failed to fetch exoplanet news');
        const data = await response.json();
        setNewsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
    const interval = setInterval(fetchNewsData, 86400000); // Refresh daily
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading exoplanet news...</div>
      </div>
    );
  }

  if (error || !newsData) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load news</div>
      </div>
    );
  }

  // Category badge colors
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    'Habitable Zone': { 
      bg: 'bg-green-500/20', 
      text: 'text-green-700 dark:text-green-400', 
      border: 'border-green-500/50' 
    },
    'Ultra-Hot': { 
      bg: 'bg-red-500/20', 
      text: 'text-red-700 dark:text-red-400', 
      border: 'border-red-500/50' 
    },
    'Gas Giant': { 
      bg: 'bg-orange-500/20', 
      text: 'text-orange-700 dark:text-orange-400', 
      border: 'border-orange-500/50' 
    },
    'Discovery': { 
      bg: 'bg-blue-500/20', 
      text: 'text-blue-700 dark:text-blue-400', 
      border: 'border-blue-500/50' 
    },
    'Transit Method': { 
      bg: 'bg-purple-500/20', 
      text: 'text-purple-700 dark:text-purple-400', 
      border: 'border-purple-500/50' 
    },
    'Radial Velocity': { 
      bg: 'bg-indigo-500/20', 
      text: 'text-indigo-700 dark:text-indigo-400', 
      border: 'border-indigo-500/50' 
    },
    'Research': { 
      bg: 'bg-cyan-500/20', 
      text: 'text-cyan-700 dark:text-cyan-400', 
      border: 'border-cyan-500/50' 
    },
    'Atmospheric Science': { 
      bg: 'bg-teal-500/20', 
      text: 'text-teal-700 dark:text-teal-400', 
      border: 'border-teal-500/50' 
    },
    'Milestone': { 
      bg: 'bg-amber-500/20', 
      text: 'text-amber-700 dark:text-amber-400', 
      border: 'border-amber-500/50' 
    },
  };

  return (
    <div className="flex h-full flex-col space-y-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Exoplanet News Feed
        </h3>
        <p className="text-xs text-gray-500">
          Recent discoveries • {newsData.count} updates
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {newsData.news.map((item) => {
          const colors = categoryColors[item.category] || categoryColors.Discovery;
          
          return (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-3 space-y-2 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.date}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-semibold border ${colors.bg} ${colors.border} ${colors.text} whitespace-nowrap`}>
                  {item.category}
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>

              {(item.planetName || item.hostStar || item.discoveryMethod) && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs pt-1 border-t border-gray-200 dark:border-gray-700">
                  {item.planetName && (
                    <div>
                      <span className="text-gray-500">Planet:</span>
                      <span className="ml-1 font-semibold text-gray-900 dark:text-white">
                        {item.planetName}
                      </span>
                    </div>
                  )}
                  {item.hostStar && (
                    <div>
                      <span className="text-gray-500">Star:</span>
                      <span className="ml-1 font-semibold text-gray-900 dark:text-white">
                        {item.hostStar}
                      </span>
                    </div>
                  )}
                  {item.discoveryMethod && (
                    <div>
                      <span className="text-gray-500">Method:</span>
                      <span className="ml-1 font-semibold text-gray-900 dark:text-white">
                        {item.discoveryMethod}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        Source: NASA Exoplanet Archive
      </div>
    </div>
  );
}

