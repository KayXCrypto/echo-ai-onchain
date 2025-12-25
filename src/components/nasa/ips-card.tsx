'use client';

import { useEffect, useState } from 'react';

interface IPSEvent {
  activityID: string;
  eventTime: string;
  location: string;
  catalog: string;
}

export default function IPSCard() {
  const [events, setEvents] = useState<IPSEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/nasa/ips');
        if (!response.ok) throw new Error('Failed to fetch IPS data');
        const data = await response.json();
        setEvents(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading IPS data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">Failed to load data</div>
      </div>
    );
  }

  const recentEvent = events[0];

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Interplanetary Shock
        </h3>
        <p className="text-xs text-gray-500">IPS • DONKI</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Shockwaves traveling through space caused by CMEs or solar wind interactions, affecting spacecraft and satellites.
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-2">
        {events.length > 0 ? (
          <>
            <div className="text-xs text-gray-500">
              {events.length} events • Last 30 days
            </div>
            {events.map((event) => (
              <div
                key={event.activityID}
                className="rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-800 dark:bg-purple-900/20"
              >
                <div className="text-xs font-semibold text-purple-900 dark:text-purple-200">
                  {new Date(event.eventTime).toLocaleDateString()} {new Date(event.eventTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="mt-1 text-xs text-purple-700 dark:text-purple-300">
                  Location: {event.location}
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  {event.catalog}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-sm text-gray-500">No IPS events in last 30 days</div>
        )}
      </div>

      <div className="text-xs text-gray-400 mt-3">
        Source: NASA DONKI
      </div>
    </div>
  );
}
