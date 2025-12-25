import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // MPC API endpoint for recent NEO discoveries
    // Get top 10 NEOs by number (more recent discoveries have higher numbers)
    const params = new URLSearchParams({
      limit: '10',
      order_by: '-number',
      neo: '1', // Only Near-Earth Objects
    });

    const url = `https://minorplanetcenter.net/web_service/search_orbits?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: 'Basic ' + Buffer.from('mpc_ws:mpc!!ws_').toString('base64'),
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch MPC data');
    }

    const xmlText = await response.text();

    // Simple XML parsing for orbit elements
    const parseXMLField = (xml: string, field: string): string => {
      const regex = new RegExp(`<${field}[^>]*>([^<]*)<\/${field}>`, 'i');
      const match = xml.match(regex);
      return match ? match[1] : '';
    };

    const orbits = xmlText.match(/<orbit>[\s\S]*?<\/orbit>/g) || [];
    const data = orbits.map(orbit => ({
      name: parseXMLField(orbit, 'name'),
      number: parseXMLField(orbit, 'number'),
      designation: parseXMLField(orbit, 'designation'),
      absolute_magnitude: parseXMLField(orbit, 'absolute-magnitude'),
      semimajor_axis: parseXMLField(orbit, 'semimajor-axis'),
      eccentricity: parseXMLField(orbit, 'eccentricity'),
      inclination: parseXMLField(orbit, 'inclination'),
      earth_moid: parseXMLField(orbit, 'earth-moid'),
      updated_at: parseXMLField(orbit, 'updated-at'),
    }));

    // Transform data
    const discoveries = data.map((obj: any) => ({
      name: obj.name || obj.designation || 'Unknown',
      number: obj.number,
      designation: obj.designation,
      discoveryDate: obj.updated_at,
      magnitude: parseFloat(obj.absolute_magnitude || 0),
      semimajorAxis: parseFloat(obj.semimajor_axis || 0), // AU
      eccentricity: parseFloat(obj.eccentricity || 0),
      inclination: parseFloat(obj.inclination || 0), // degrees
      earthMOID: parseFloat(obj.earth_moid || 0), // AU - Minimum Orbit Intersection Distance
    }));

    return NextResponse.json({
      count: discoveries.length,
      discoveries,
    });
  } catch (error) {
    console.error('MPC API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
