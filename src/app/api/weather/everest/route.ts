import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Mount Everest summit coordinates
const EVEREST_LAT = 27.9881;
const EVEREST_LON = 86.9250;

export async function GET() {
  try {
    // Build Open-Meteo API URL
    const params = new URLSearchParams({
      latitude: EVEREST_LAT.toString(),
      longitude: EVEREST_LON.toString(),
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
      next: { revalidate: 1800 }, // Cache for 30 minutes
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
        name: 'Mount Everest Summit',
        latitude: EVEREST_LAT,
        longitude: EVEREST_LON,
        elevation: 8849, // meters
      },
      weather: data,
    });
  } catch (error) {
    console.error('Everest weather API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}