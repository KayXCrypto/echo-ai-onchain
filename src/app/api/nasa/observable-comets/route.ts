import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface CometData {
  spkid: string;
  name: string;
  eccentricity: number;
  inclination: number;
  perihelionDistance: number;
  argumentPerihelion: number;
  longitudeAscending: number;
  period: number;
  bestViewing: string;
  nextPerihelion: string;
  daysUntilPerihelion: number;
  visibility: string;
}

export async function GET() {
  try {
    // Query JPL Small-Body Database for numbered periodic comets with orbital period data
    const url = `https://ssd-api.jpl.nasa.gov/sbdb_query.api?fields=full_name,e,i,q,w,om,per,tp&sb-kind=c&sb-ns=n&sb-xfrag=1&limit=100`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comet data');
    }

    const data = await response.json();

    if (!data.data) {
      throw new Error('No comet data returned');
    }

    const today = new Date();
    const currentJD = 2440587.5 + (today.getTime() / 86400000); // Convert to Julian Date

    // Transform data
    const comets: CometData[] = data.data.map((comet: any[], index: number): CometData => {
      const inclination = parseFloat(comet[2]) || 0;
      const perihelionDistance = parseFloat(comet[3]) || 0;
      const periodDays = parseFloat(comet[6]) || 0; // Period in days
      const lastPerihelionJD = parseFloat(comet[7]) || 0; // Julian Date of last perihelion passage

      // Determine best viewing hemisphere based on inclination
      let bestViewing = 'Both Hemispheres';
      if (inclination > 60 && inclination < 120) {
        bestViewing = 'Northern Hemisphere';
      } else if (inclination > 120) {
        bestViewing = 'Southern Hemisphere';
      }

      // Calculate next perihelion passage
      let nextPerihelionJD = lastPerihelionJD;
      if (periodDays > 0 && lastPerihelionJD > 0) {
        // Keep adding periods until we get a future date
        while (nextPerihelionJD < currentJD) {
          nextPerihelionJD += periodDays;
        }
      }

      // Convert JD back to regular date
      const nextPerihelionDate = new Date((nextPerihelionJD - 2440587.5) * 86400000);
      const daysUntilPerihelion = Math.round((nextPerihelionJD - currentJD));

      // Estimate visibility: comets are typically visible weeks before/after perihelion
      // Best visibility when q < 1.5 AU (close to Sun but not too close)
      let visibility = 'Low';
      if (perihelionDistance < 1.5) {
        visibility = 'Good';
      }
      if (perihelionDistance < 1.0) {
        visibility = 'Excellent';
      }
      if (perihelionDistance < 0.3) {
        visibility = 'Sungrazer'; // Too close to Sun, difficult to observe
      }

      return {
        spkid: `comet-${index}`,
        name: comet[0].trim(),
        eccentricity: parseFloat(comet[1]) || 0,
        inclination,
        perihelionDistance,
        argumentPerihelion: parseFloat(comet[4]) || 0,
        longitudeAscending: parseFloat(comet[5]) || 0,
        period: periodDays / 365.25, // Convert to years for display
        bestViewing,
        nextPerihelion: nextPerihelionDate.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        }),
        daysUntilPerihelion,
        visibility,
      };
    });

    // Sort by days until perihelion (soonest first)
    comets.sort((a, b) => a.daysUntilPerihelion - b.daysUntilPerihelion);

    return NextResponse.json({
      count: comets.length,
      signature: data.signature,
      comets,
    });
  } catch (error) {
    console.error('Observable comets API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
