import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const K2_LAT = 35.8825;
const K2_LON = 76.5133;

export async function GET() {
  try {
    const params = new URLSearchParams({
      latitude: K2_LAT.toString(),
      longitude: K2_LON.toString(),
      current: [
        'temperature_2m',
        'wind_speed_10m',
        'wind_direction_10m',
      ].join(','),
      timezone: 'auto',
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

    const response = await fetch(url, {
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch weather data', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      location: {
        name: 'K2',
        latitude: K2_LAT,
        longitude: K2_LON,
      },
      weather: data,
    });
  } catch (error) {
    console.error('K2 weather API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
