import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Atacama Desert, Chile coordinates (Yungay region - driest spot)
    const latitude = -24.5;
    const longitude = -69.25;

    // Get current weather and recent data
    const currentUrl = new URL('https://api.open-meteo.com/v1/forecast');
    currentUrl.searchParams.append('latitude', latitude.toString());
    currentUrl.searchParams.append('longitude', longitude.toString());
    currentUrl.searchParams.append('current', 'temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,cloud_cover,wind_speed_10m');
    currentUrl.searchParams.append('daily', 'precipitation_sum,rain_sum,precipitation_hours');
    currentUrl.searchParams.append('timezone', 'auto');
    currentUrl.searchParams.append('temperature_unit', 'fahrenheit');
    currentUrl.searchParams.append('wind_speed_unit', 'mph');
    currentUrl.searchParams.append('precipitation_unit', 'inch');

    // Get historical data for the last decade
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 10);

    const historicalUrl = new URL('https://archive-api.open-meteo.com/v1/archive');
    historicalUrl.searchParams.append('latitude', latitude.toString());
    historicalUrl.searchParams.append('longitude', longitude.toString());
    historicalUrl.searchParams.append('start_date', startDate.toISOString().split('T')[0]);
    historicalUrl.searchParams.append('end_date', endDate.toISOString().split('T')[0]);
    historicalUrl.searchParams.append('daily', 'precipitation_sum');
    historicalUrl.searchParams.append('timezone', 'auto');
    historicalUrl.searchParams.append('precipitation_unit', 'inch');

    const [currentResponse, historicalResponse] = await Promise.all([
      fetch(currentUrl.toString()),
      fetch(historicalUrl.toString())
    ]);

    if (!currentResponse.ok) {
      throw new Error(`Open-Meteo API error: ${currentResponse.status}`);
    }

    if (!historicalResponse.ok) {
      throw new Error(`Open-Meteo Archive API error: ${historicalResponse.status}`);
    }

    const currentData = await currentResponse.json();
    const historicalData = await historicalResponse.json();

    // Calculate yearly precipitation totals
    const yearlyPrecipitation = new Map<number, number>();
    if (historicalData.daily && historicalData.daily.time && historicalData.daily.precipitation_sum) {
      historicalData.daily.time.forEach((date: string, index: number) => {
        const year = new Date(date).getFullYear();
        const precip = historicalData.daily.precipitation_sum[index] || 0;
        yearlyPrecipitation.set(year, (yearlyPrecipitation.get(year) || 0) + precip);
      });
    }

    // Convert to array and sort by year
    const yearlyData = Array.from(yearlyPrecipitation.entries())
      .map(([year, total]) => ({ year, total }))
      .sort((a, b) => b.year - a.year);

    return NextResponse.json({
      ...currentData,
      historical: {
        yearlyPrecipitation: yearlyData,
        decadeTotal: yearlyData.reduce((sum, item) => sum + item.total, 0),
        decadeAverage: yearlyData.length > 0 ? yearlyData.reduce((sum, item) => sum + item.total, 0) / yearlyData.length : 0
      }
    });
  } catch (error) {
    console.error('Error fetching Atacama Desert weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
