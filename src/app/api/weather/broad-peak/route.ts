import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const LAT = 35.8117;
const LON = 76.5669;

export async function GET() {
  try {
    const params = new URLSearchParams({
      latitude: LAT.toString(),
      longitude: LON.toString(),
      current: ['temperature_2m', 'wind_speed_10m', 'wind_direction_10m'].join(','),
      timezone: 'auto',
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ location: { name: 'Broad Peak', latitude: LAT, longitude: LON }, weather: data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
