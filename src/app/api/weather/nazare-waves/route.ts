import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Nazaré, Portugal coordinates
    const latitude = 39.6;
    const longitude = -9.07;

    const url = new URL('https://marine-api.open-meteo.com/v1/marine');
    url.searchParams.append('latitude', latitude.toString());
    url.searchParams.append('longitude', longitude.toString());
    url.searchParams.append('hourly', 'wave_height,wave_period,swell_wave_height,swell_wave_period');
    url.searchParams.append('current', 'wave_height,wave_period,swell_wave_height,swell_wave_period');
    url.searchParams.append('timezone', 'auto');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Open-Meteo API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Nazaré wave data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wave data' },
      { status: 500 }
    );
  }
}
