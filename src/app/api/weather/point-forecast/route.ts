import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface WindyPointForecastRequest {
  lat: number;
  lon: number;
  model?: string;
  parameters?: string[];
  levels?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: WindyPointForecastRequest = await req.json();

    const { lat, lon, model = 'gfs', parameters = ['wind', 'temp', 'dewpoint', 'rh', 'pressure'], levels = ['surface'] } = body;

    // Validate required parameters
    if (lat === undefined || lon === undefined) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // Validate API key exists
    if (!process.env.WINDY_API_KEY) {
      return NextResponse.json(
        { error: 'Windy API key not configured' },
        { status: 500 }
      );
    }

    // Make request to Windy API
    const response = await fetch('https://api.windy.com/api/point-forecast/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: Number(lat.toFixed(2)),
        lon: Number(lon.toFixed(2)),
        model,
        parameters,
        levels,
        key: process.env.WINDY_API_KEY,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch weather data', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Point forecast API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const model = searchParams.get('model') || 'gfs';
    const parameters = searchParams.get('parameters')?.split(',') || ['wind', 'temp', 'dewpoint', 'rh', 'pressure'];

    if (!lat || !lon) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // Validate API key exists
    if (!process.env.WINDY_API_KEY) {
      return NextResponse.json(
        { error: 'Windy API key not configured' },
        { status: 500 }
      );
    }

    // Make request to Windy API
    const response = await fetch('https://api.windy.com/api/point-forecast/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: Number(parseFloat(lat).toFixed(2)),
        lon: Number(parseFloat(lon).toFixed(2)),
        model,
        parameters,
        levels: ['surface'],
        key: process.env.WINDY_API_KEY,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch weather data', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Point forecast API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}