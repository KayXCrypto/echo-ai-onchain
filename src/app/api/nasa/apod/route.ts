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

    const params = new URLSearchParams({
      api_key: process.env.NASA_API_KEY,
    });

    const url = `https://api.nasa.gov/planetary/apod?${params.toString()}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour (APOD updates daily)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch APOD data', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('NASA APOD API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}