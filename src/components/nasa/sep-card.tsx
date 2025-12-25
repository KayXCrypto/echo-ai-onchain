'use client';

import { useEffect, useState } from 'react';

export default function SEPCard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/nasa/sep');
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
    <div className="flex h-full flex-col space-y-2">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Solar Energetic Particles
        </h3>
        <p className="text-xs text-gray-500">SEP • DONKI</p>
      </div>

      <div className="flex-1 space-y-2">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          High-energy particles from solar eruptions that can damage satellites, harm astronauts, and disrupt spacecraft electronics.
        </div>

        {events.length > 0 ? (
          <div className="space-y-2">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {events.length} events
            </div>
            <div className="rounded-lg bg-yellow-50 p-2 dark:bg-yellow-900/20">
              <div className="text-xs text-yellow-600 dark:text-yellow-400">Last 30 days</div>
              <div className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
                Radiation hazard monitoring active
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/20 text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              No SEP events in last 30 days
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-400">
        Source: NASA DONKI
      </div>
    </div>
  );
}
