'use client';

import { useEffect, useState } from 'react';

export default function RBECard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/nasa/rbe');
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
          Radiation Belt Enhancement
        </h3>
        <p className="text-xs text-gray-500">RBE • DONKI</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Increased radiation in Van Allen belts from solar activity, posing risks to satellites and astronauts in orbit.
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-2">
        {events.length > 0 ? (
          <>
            <div className="text-xs text-gray-500">
              {events.length} events • Last 30 days
            </div>
            {events.slice(0, 8).map((event, index) => (
              <div
                key={event.rbeID || index}
                className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20"
              >
                <div className="text-xs font-semibold text-red-900 dark:text-red-200">
                  {event.eventTime ? new Date(event.eventTime).toLocaleDateString() : 'Unknown date'}
                </div>
                <div className="mt-1 text-xs text-red-700 dark:text-red-300">
                  Van Allen belt enhancement
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-sm text-gray-500">No RBE events in last 30 days</div>
        )}
      </div>

      <div className="text-xs text-gray-400 mt-3">
        Source: NASA DONKI
      </div>
    </div>
  );
}
