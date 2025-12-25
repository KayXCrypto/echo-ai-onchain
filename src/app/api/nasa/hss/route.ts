import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 30);
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const url = `https://api.nasa.gov/DONKI/HSS?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&api_key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching HSS data:', error);
    return NextResponse.json({ error: 'Failed to fetch HSS data' }, { status: 500 });
  }
}
