import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';

    // Default to 30 days prior to current date
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 30);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const url = `https://api.nasa.gov/DONKI/IPS?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&location=ALL&catalog=ALL&api_key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching IPS data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch IPS data' },
      { status: 500 }
    );
  }
}
