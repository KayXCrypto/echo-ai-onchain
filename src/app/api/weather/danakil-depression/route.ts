import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Danakil Depression (Dallol), Ethiopia coordinates
    const latitude = 14.2417;
    const longitude = 40.3;

    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.append('latitude', latitude.toString());
    url.searchParams.append('longitude', longitude.toString());
    url.searchParams.append('current', 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure');
    url.searchParams.append('daily', 'temperature_2m_max,temperature_2m_min');
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
    console.error('Error fetching Danakil Depression weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
