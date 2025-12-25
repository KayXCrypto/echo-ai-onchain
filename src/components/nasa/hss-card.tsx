'use client';

import { useEffect, useState } from 'react';

export default function HSSCard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/nasa/hss');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEvents(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (err) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          High Speed Stream
        </h3>
        <p className="text-xs text-gray-500">HSS • DONKI</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Fast-moving solar wind streams from coronal holes that can trigger geomagnetic storms and auroras.
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-2">
        {events.length > 0 ? (
          <>
            <div className="text-xs text-gray-500">
              {events.length} streams • Last 30 days
            </div>
            {events.slice(0, 8).map((event, index) => (
              <div
                key={event.hssID || index}
                className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20"
              >
                <div className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                  {event.eventTime ? new Date(event.eventTime).toLocaleDateString() : 'Unknown date'}
                </div>
                <div className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                  High speed stream
                </div>
                {event.instruments && (
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    {event.instruments.map((i: any) => i.displayName).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="text-sm text-gray-500">No HSS events in last 30 days</div>
        )}
      </div>

      <div className="text-xs text-gray-400 mt-3">
        Source: NASA DONKI
      </div>
    </div>
  );
}
