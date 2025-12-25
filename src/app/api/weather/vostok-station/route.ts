import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Vostok Station, Antarctica coordinates
    const latitude = -78.4587;
    const longitude = 106.8357;

    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.append('latitude', latitude.toString());
    url.searchParams.append('longitude', longitude.toString());
    url.searchParams.append('current', 'temperature_2m,wind_speed_10m,wind_direction_10m,surface_pressure');
    url.searchParams.append('daily', 'temperature_2m_max,temperature_2m_min,sunrise,sunset');
    url.searchParams.append('timezone', 'auto');
    url.searchParams.append('temperature_unit', 'fahrenheit');
    url.searchParams.append('wind_speed_unit', 'mph');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Vostok Station weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
