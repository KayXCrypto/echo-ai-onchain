import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!process.env.NASA_API_KEY) {
      return NextResponse.json(
        { error: 'NASA API key not configured' },
        { status: 500 }
      );
    }

    // Get geomagnetic storms from last 30 days
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const params = new URLSearchParams({
      startDate,
      endDate,
      api_key: process.env.NASA_API_KEY,
    });

    const url = `https://api.nasa.gov/DONKI/GST?${params.toString()}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch geomagnetic storm data', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      events: data,
      period: {
        start: startDate,
        end: endDate,
      },
    });
  } catch (error) {
    console.error('NASA Geomagnetic Storm API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}