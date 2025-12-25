import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    if (!process.env.NASA_API_KEY) {
      return NextResponse.json(
        { error: 'NASA API key not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'recent'; // 'recent', 'random', or 'range'
    const count = searchParams.get('count') || '30';
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    let url: string;

    if (mode === 'recent' && startDate && endDate) {
      // Fetch date range
      const params = new URLSearchParams({
        api_key: process.env.NASA_API_KEY,
        start_date: startDate,
        end_date: endDate,
      });
      url = `https://api.nasa.gov/planetary/apod?${params.toString()}`;
    } else if (mode === 'random') {
      // Fetch random images
      const params = new URLSearchParams({
        api_key: process.env.NASA_API_KEY,
        count: count,
      });
      url = `https://api.nasa.gov/planetary/apod?${params.toString()}`;
    } else {
      // Default: fetch most recent (last 30 days)
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);

      const params = new URLSearchParams({
        api_key: process.env.NASA_API_KEY,
        start_date: thirtyDaysAgo.toISOString().split('T')[0],
        end_date: today.toISOString().split('T')[0],
      });
      url = `https://api.nasa.gov/planetary/apod?${params.toString()}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch APOD gallery data', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Filter out videos, only return images
    const images = Array.isArray(data)
      ? data.filter((item: any) => item.media_type === 'image')
      : [data].filter((item: any) => item.media_type === 'image');

    // Sort by date descending (most recent first)
    images.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(images);
  } catch (error) {
    console.error('NASA APOD Gallery API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
