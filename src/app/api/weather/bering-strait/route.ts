import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Bering Strait coordinates (between Alaska and Russia)
const BERING_STRAIT_LAT = 65.8;
const BERING_STRAIT_LON = -168.9;

export async function GET() {
  try {
    // Fetch atmospheric weather data
    const weatherParams = new URLSearchParams({
      latitude: BERING_STRAIT_LAT.toString(),
      longitude: BERING_STRAIT_LON.toString(),
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'precipitation',
        'weather_code',
        'wind_speed_10m',
        'wind_direction_10m',
      ].join(','),
      hourly: [
        'temperature_2m',
        'wind_speed_10m',
      ].join(','),
      timezone: 'auto',
      forecast_days: '7',
    });

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?${weatherParams.toString()}`;

    // Fetch marine weather data (waves and swell)
    const marineParams = new URLSearchParams({
      latitude: BERING_STRAIT_LAT.toString(),
      longitude: BERING_STRAIT_LON.toString(),
      hourly: [
        'wave_height',
        'wave_direction',
        'wave_period',
        'swell_wave_height',
        'swell_wave_direction',
        'swell_wave_period',
      ].join(','),
      timezone: 'auto',
      forecast_days: '7',
    });

    const marineUrl = `https://marine-api.open-meteo.com/v1/marine?${marineParams.toString()}`;

    // Fetch both in parallel
    const [weatherResponse, marineResponse] = await Promise.all([
      fetch(weatherUrl, { next: { revalidate: 1800 } }),
      fetch(marineUrl, { next: { revalidate: 1800 } }),
    ]);

    if (!weatherResponse.ok) {
      const errorText = await weatherResponse.text();
      return NextResponse.json(
        { error: 'Failed to fetch weather data', details: errorText },
        { status: weatherResponse.status }
      );
    }

    if (!marineResponse.ok) {
      const errorText = await marineResponse.text();
      return NextResponse.json(
        { error: 'Failed to fetch marine data', details: errorText },
        { status: marineResponse.status }
      );
    }

    const weatherData = await weatherResponse.json();
    const marineData = await marineResponse.json();

    // Get current wave conditions (latest hour)
    const currentWaveIndex = 0;
    const currentWave = {
      wave_height: marineData.hourly.wave_height[currentWaveIndex],
      wave_direction: marineData.hourly.wave_direction[currentWaveIndex],
      wave_period: marineData.hourly.wave_period[currentWaveIndex],
      swell_wave_height: marineData.hourly.swell_wave_height[currentWaveIndex],
      swell_wave_direction: marineData.hourly.swell_wave_direction[currentWaveIndex],
      swell_wave_period: marineData.hourly.swell_wave_period[currentWaveIndex],
    };

    return NextResponse.json({
      location: {
        name: 'Bering Strait',
        latitude: BERING_STRAIT_LAT,
        longitude: BERING_STRAIT_LON,
      },
      weather: weatherData,
      marine: marineData,
      current_wave: currentWave,
    });
  } catch (error) {
    console.error('Bering Strait weather API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
