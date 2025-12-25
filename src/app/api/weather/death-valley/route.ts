import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Death Valley - Furnace Creek (lowest point in North America)
const DEATH_VALLEY_LAT = 36.4625;
const DEATH_VALLEY_LON = -116.8672;

export async function GET() {
  try {
    const params = new URLSearchParams({
      latitude: DEATH_VALLEY_LAT.toString(),
      longitude: DEATH_VALLEY_LON.toString(),
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'precipitation',
        'weather_code',
        'wind_speed_10m',
        'wind_direction_10m',
        'pressure_msl',
      ].join(','),
      hourly: [
        'temperature_2m',
        'wind_speed_10m',
      ].join(','),
      timezone: 'auto',
      forecast_days: '7',
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
        name: 'Death Valley',
        latitude: DEATH_VALLEY_LAT,
        longitude: DEATH_VALLEY_LON,
        elevation: -86, // meters below sea level
      },
      ...data,
    });
  } catch (error) {
    console.error('Death Valley weather API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}