import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // 1-12
    const currentDay = today.getDate();

    // Major meteor showers throughout the year
    const allShowers = [
      {
        name: 'Quadrantids',
        peak: { month: 1, day: 3 },
        active: { start: { month: 12, day: 28 }, end: { month: 1, day: 12 } },
        zhr: 120,
        velocity: 41,
        radiant: 'Boötes',
        parent: '2003 EH1 (asteroid)',
        moonPhase: 'Waning Crescent',
        bestViewing: 'Northern Hemisphere',
      },
      {
        name: 'Lyrids',
        peak: { month: 4, day: 22 },
        active: { start: { month: 4, day: 16 }, end: { month: 4, day: 25 } },
        zhr: 18,
        velocity: 49,
        radiant: 'Lyra',
        parent: 'C/1861 G1 Thatcher',
        moonPhase: 'Waning Gibbous',
        bestViewing: 'Both Hemispheres',
      },
      {
        name: 'Eta Aquarids',
        peak: { month: 5, day: 6 },
        active: { start: { month: 4, day: 19 }, end: { month: 5, day: 28 } },
        zhr: 60,
        velocity: 66,
        radiant: 'Aquarius',
        parent: '1P/Halley',
        moonPhase: 'Waxing Crescent',
        bestViewing: 'Southern Hemisphere',
      },
      {
        name: 'Perseids',
        peak: { month: 8, day: 12 },
        active: { start: { month: 7, day: 17 }, end: { month: 8, day: 24 } },
        zhr: 100,
        velocity: 59,
        radiant: 'Perseus',
        parent: '109P/Swift-Tuttle',
        moonPhase: 'First Quarter',
        bestViewing: 'Northern Hemisphere',
      },
      {
        name: 'Draconids',
        peak: { month: 10, day: 8 },
        active: { start: { month: 10, day: 6 }, end: { month: 10, day: 10 } },
        zhr: 10,
        velocity: 20,
        radiant: 'Draco',
        parent: '21P/Giacobini-Zinner',
        moonPhase: 'Waxing Crescent',
        bestViewing: 'Northern Hemisphere',
      },
      {
        name: 'Orionids',
        peak: { month: 10, day: 21 },
        active: { start: { month: 10, day: 2 }, end: { month: 11, day: 7 } },
        zhr: 20,
        velocity: 66,
        radiant: 'Orion',
        parent: '1P/Halley',
        moonPhase: 'Waning Gibbous',
        bestViewing: 'Both Hemispheres',
      },
      {
        name: 'Leonids',
        peak: { month: 11, day: 17 },
        active: { start: { month: 11, day: 6 }, end: { month: 11, day: 30 } },
        zhr: 15,
        velocity: 71,
        radiant: 'Leo',
        parent: '55P/Tempel-Tuttle',
        moonPhase: 'Waning Gibbous',
        bestViewing: 'Both Hemispheres',
      },
      {
        name: 'Geminids',
        peak: { month: 12, day: 14 },
        active: { start: { month: 12, day: 4 }, end: { month: 12, day: 17 } },
        zhr: 150,
        velocity: 35,
        radiant: 'Gemini',
        parent: '3200 Phaethon (asteroid)',
        moonPhase: 'Full Moon',
        bestViewing: 'Both Hemispheres',
      },
      {
        name: 'Ursids',
        peak: { month: 12, day: 22 },
        active: { start: { month: 12, day: 17 }, end: { month: 12, day: 26 } },
        zhr: 10,
        velocity: 33,
        radiant: 'Ursa Minor',
        parent: '8P/Tuttle',
        moonPhase: 'Waning Crescent',
        bestViewing: 'Northern Hemisphere',
      },
    ];

    // Calculate days until/since peak for each shower
    const showersWithStatus = allShowers.map(shower => {
      const peakDate = new Date(today.getFullYear(), shower.peak.month - 1, shower.peak.day);
      const startDate = new Date(today.getFullYear(), shower.active.start.month - 1, shower.active.start.day);
      const endDate = new Date(today.getFullYear(), shower.active.end.month - 1, shower.active.end.day);

      // Handle year transitions
      if (shower.active.start.month > shower.active.end.month) {
        if (currentMonth <= shower.active.end.month) {
          startDate.setFullYear(today.getFullYear() - 1);
          peakDate.setFullYear(today.getFullYear() - 1);
        } else {
          endDate.setFullYear(today.getFullYear() + 1);
        }
      }

      const daysToPeak = Math.round((peakDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const isActive = today >= startDate && today <= endDate;

      return {
        ...shower,
        daysToPeak,
        isActive,
        peakDate: peakDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };
    });

    // Sort by days to peak (closest first)
    showersWithStatus.sort((a, b) => Math.abs(a.daysToPeak) - Math.abs(b.daysToPeak));

    // Get active showers
    const activeShowers = showersWithStatus.filter(s => s.isActive);

    // Get next 5 upcoming showers
    const upcomingShowers = showersWithStatus.filter(s => s.daysToPeak > 0).slice(0, 5);

    return NextResponse.json({
      active: activeShowers,
      upcoming: upcomingShowers,
      all: showersWithStatus,
    });
  } catch (error) {
    console.error('Meteor showers API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
