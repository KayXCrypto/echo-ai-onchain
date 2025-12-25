import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Calculate date range (today + 30 days)
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 30);

    const dateMin = today.toISOString().split('T')[0];
    const dateMax = futureDate.toISOString().split('T')[0];

    // NASA JPL Close Approach Data API
    // dist-max in AU (0.05 AU = ~7.5 million km = ~19.5 lunar distances)
    const params = new URLSearchParams({
      'date-min': dateMin,
      'date-max': dateMax,
      'dist-max': '0.05', // Within 0.05 AU
      sort: 'dist', // Sort by distance (closest first)
      limit: '15', // Get top 15 closest approaches
    });

    const url = `https://ssd-api.jpl.nasa.gov/cad.api?${params.toString()}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch NEO data');
    }

    const data = await response.json();

    // Transform data into more readable format
    const neos = data.data.map((neo: any[]) => ({
      designation: neo[0], // Object designation
      orbitId: neo[1], // Orbit solution ID
      closeApproachDate: neo[3], // Close approach date (formatted)
      distance: parseFloat(neo[4]), // Distance in AU
      distanceMin: parseFloat(neo[5]), // Min distance in AU
      distanceMax: parseFloat(neo[6]), // Max distance in AU
      velocity: parseFloat(neo[7]), // Relative velocity (km/s)
      magnitude: parseFloat(neo[10]), // Absolute magnitude (H)
    }));

    return NextResponse.json({
      count: data.count,
      total: data.total,
      dateRange: {
        start: dateMin,
        end: dateMax,
      },
      objects: neos,
    });
  } catch (error) {
    console.error('NASA NEO API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
