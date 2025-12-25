import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Main Development Region (MDR) coordinates: 10-20°N, 20-60°W (using center point)
    const latitude = 15.0;
    const longitude = -40.0;

    // Open-Meteo Marine Weather API for wave data
    const marineParams = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'wave_height,swell_wave_height,wave_period,wave_direction',
      timezone: 'auto',
    });

    const marineUrl = `https://marine-api.open-meteo.com/v1/marine?${marineParams.toString()}`;

    const marineResponse = await fetch(marineUrl, {
      next: { revalidate: 1800 }, // Cache for 30 minutes
    });

    if (!marineResponse.ok) {
      throw new Error('Failed to fetch marine data');
    }

    const marineData = await marineResponse.json();

    // Open-Meteo Weather API for temperature and pressure
    const weatherParams = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,surface_pressure',
      temperature_unit: 'fahrenheit',
      timezone: 'auto',
    });

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?${weatherParams.toString()}`;

    const weatherResponse = await fetch(weatherUrl, {
      next: { revalidate: 1800 },
    });

    let weatherData = null;
    if (weatherResponse.ok) {
      weatherData = await weatherResponse.json();
    }

    // Fetch hurricane/tropical data from NOAA (if available)
    let hurricaneWarning = null;
    try {
      // NOAA National Hurricane Center API
      const nhcResponse = await fetch('https://www.nhc.noaa.gov/CurrentStorms.json', {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (nhcResponse.ok) {
        const nhcData = await nhcResponse.json();
        // Check if any active storms are in the MDR region
        const activeStorms = nhcData.activeStorms || [];
        const mdrStorms = activeStorms.filter((storm: any) => {
          const lat = parseFloat(storm.latitude);
          const lon = parseFloat(storm.longitude);
          return lat >= 10 && lat <= 20 && lon >= -60 && lon <= -20;
        });

        if (mdrStorms.length > 0) {
          hurricaneWarning = {
            active: true,
            count: mdrStorms.length,
            storms: mdrStorms.map((storm: any) => ({
              name: storm.name,
              category: storm.classification,
              intensity: storm.intensity,
            })),
          };
        }
      }
    } catch (nhcError) {
      console.log('NHC data unavailable:', nhcError);
      // Non-critical, continue without hurricane data
    }

    return NextResponse.json({
      current: {
        time: marineData.current.time,
        wave_height: marineData.current.wave_height,
        swell_wave_height: marineData.current.swell_wave_height,
        wave_period: marineData.current.wave_period,
        wave_direction: marineData.current.wave_direction,
        temperature: weatherData?.current?.temperature_2m,
        surface_pressure: weatherData?.current?.surface_pressure,
      },
      hurricane_warning: hurricaneWarning,
      location: {
        latitude,
        longitude,
        name: 'Main Development Region',
        description: 'Atlantic Hurricane MDR',
      },
    });
  } catch (error) {
    console.error('MDR Atlantic API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
