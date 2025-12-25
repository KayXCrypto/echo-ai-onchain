import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Types for the comprehensive daily report payload
interface DailyReportPayload {
  date: string;
  generatedAt: string;

  // 🌤️ Local/Earth Weather
  earthWeather: {
    everest: {
      tempC: number;
      tempF: number;
      windKmh: number;
      conditions: string;
    } | null;
    extremes: {
      hottest: { location: string; tempF: number } | null;
      coldest: { location: string; tempF: number } | null;
      windiest: { location: string; windMph: number } | null;
    };
  };

  // 🌊 Ocean & Wave Conditions
  oceanConditions: {
    drakePassage: {
      waveHeightM: number;
      waveHeightFt: number;
      swellPeriod: number;
    } | null;
    nazare: {
      waveHeightM: number;
      waveHeightFt: number;
    } | null;
    titanicSite: {
      icebergRisk: string;
      waterTempC: number;
    } | null;
  };

  // ☀️ Solar Activity
  solarActivity: {
    solarFlares: {
      count: number;
      strongest: string | null;
    };
    cme: {
      count: number;
    };
    geomagneticStorms: {
      count: number;
      strongestKp: number | null;
    };
  };

  // 🪨 Near-Earth Objects
  nearEarthObjects: {
    count: number;
    closestApproach: {
      designation: string;
      date: string;
      distanceLunar: number;
      velocityKmS: number;
    } | null;
  };

  // ☄️ Meteor Showers
  meteorShowers: {
    active: Array<{
      name: string;
      daysToPeak: number;
      zhr: number;
    }>;
    nextUp: {
      name: string;
      peakDate: string;
      zhr: number;
    } | null;
  };

  // 🔭 Exoplanet Discoveries
  exoplanets: {
    featured: {
      name: string;
      hostStar: string;
      tempK: number;
      weatherType: string;
      description: string;
    } | null;
    recentDiscoveries: number;
  };

  // 🤯 Absurd Forecast (random extreme weather fact)
  absurdForecast: {
    location: string;
    fact: string;
    source: string;
  };

  // 🔴 Mars Weather
  marsWeather: {
    available: boolean;
    solDate: string | null;
    tempHighC: number | null;
    tempLowC: number | null;
  };

  // ☄️ Comets
  comets: {
    upcoming: Array<{
      name: string;
      nextPerihelion: string;
      daysUntilPerihelion: number;
      visibility: string;
    }>;
    nearestApproach: {
      name: string;
      nextPerihelion: string;
      daysUntilPerihelion: number;
    } | null;
  };
}

async function fetchWithTimeout(url: string, timeout = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// Absurd but real weather facts for the daily report
const ABSURD_FORECASTS = [
  {
    location: "WASP-76b",
    fact: "Iron rain expected in the evening hemisphere. Dayside temps exceed 2,400°C, vaporizing iron which condenses and falls as molten metal rain on the cooler nightside.",
    source: "ESO/VLT observations 2020"
  },
  {
    location: "Venus",
    fact: "Sulfuric acid drizzle at altitude, 460°C surface temps, and 90x Earth's atmospheric pressure. Your umbrella would dissolve, then you would too.",
    source: "NASA Venus Fact Sheet"
  },
  {
    location: "HD 189733b",
    fact: "Glass rain falling sideways at 5,400 mph. The blue color comes from silicate particles in the atmosphere, which rain down in the planet's violent winds.",
    source: "Hubble Space Telescope 2013"
  },
  {
    location: "Neptune",
    fact: "Diamond hailstorms in the deep atmosphere. Extreme pressure compresses carbon into diamonds that fall toward the core like hail.",
    source: "Nature Physics 2017"
  },
  {
    location: "Titan",
    fact: "Methane rain fills hydrocarbon lakes. Current conditions: -179°C with occasional methane drizzle. Bring a very warm coat.",
    source: "Cassini-Huygens Mission"
  },
  {
    location: "Jupiter's Great Red Spot",
    fact: "A storm larger than Earth, raging for at least 400 years. Winds exceed 400 mph. Today's forecast: still spinning, still angry.",
    source: "NASA Juno Mission"
  },
  {
    location: "55 Cancri e",
    fact: "This lava world has a permanent magma ocean on its dayside. Surface temp: 2,000°C. Sunscreen SPF: incalculable.",
    source: "Spitzer Space Telescope"
  },
  {
    location: "Kepler-7b",
    fact: "Clouds made of silicate rock vapor. This gas giant has reflective clouds that are essentially vaporized stone floating in the sky.",
    source: "Kepler Mission 2013"
  },
  {
    location: "OGLE-2016-BLG-1195Lb",
    fact: "An 'iceball' planet at -220°C, colder than Pluto despite being similar mass to Earth. The ultimate cold snap.",
    source: "NASA Spitzer/Ground observations 2017"
  },
  {
    location: "Proxima Centauri b",
    fact: "Potential 'eyeball Earth' - if tidally locked, one side eternally faces its red dwarf star while the other freezes in permanent darkness.",
    source: "Various exoplanet studies"
  },
  {
    location: "Earth: Atacama Desert",
    fact: "Some weather stations here have never recorded rain. Ever. Average annual rainfall: 0.04 inches. Mars is jealous.",
    source: "Chilean Meteorological Service"
  },
  {
    location: "Earth: Antarctica (Vostok)",
    fact: "Record low: -89.2°C (-128.6°F). At these temps, thrown boiling water freezes before hitting the ground.",
    source: "Soviet Antarctic Expedition 1983"
  },
  {
    location: "Earth: Mount Washington",
    fact: "Wind gust record of 231 mph held for 62 years. Current conditions: probably windy. Always windy.",
    source: "Mount Washington Observatory"
  },
  {
    location: "Earth: Danakil Depression",
    fact: "Average year-round temp of 94°F makes this the hottest inhabited place on Earth. Locals wonder why you're complaining about summer.",
    source: "Ethiopian Meteorological Agency"
  }
];

async function compileReport(baseUrl: string): Promise<DailyReportPayload> {
  const today = new Date();

  // Fetch all data sources in parallel
  const [
    apodRes,
    solarFlaresRes,
    cmeRes,
    geomagRes,
    neoRes,
    meteorRes,
    exoplanetFeaturedRes,
    exoplanetNewsRes,
    marsRes,
    everestRes,
    deathValleyRes,
    vostokRes,
    drakeRes,
    nazareRes,
    titanicRes,
    danakilRes,
    cometsRes,
  ] = await Promise.allSettled([
    fetchWithTimeout(`${baseUrl}/api/nasa/apod`),
    fetchWithTimeout(`${baseUrl}/api/nasa/solar-flares`),
    fetchWithTimeout(`${baseUrl}/api/nasa/cme`),
    fetchWithTimeout(`${baseUrl}/api/nasa/geomagnetic-storms`),
    fetchWithTimeout(`${baseUrl}/api/nasa/neo`),
    fetchWithTimeout(`${baseUrl}/api/nasa/meteor-showers`),
    fetchWithTimeout(`${baseUrl}/api/nasa/exoplanet-featured`),
    fetchWithTimeout(`${baseUrl}/api/nasa/exoplanet-news`),
    fetchWithTimeout(`${baseUrl}/api/nasa/mars-weather`),
    fetchWithTimeout(`${baseUrl}/api/weather/everest`),
    fetchWithTimeout(`${baseUrl}/api/weather/death-valley`),
    fetchWithTimeout(`${baseUrl}/api/weather/vostok-station`),
    fetchWithTimeout(`${baseUrl}/api/weather/drake-passage`),
    fetchWithTimeout(`${baseUrl}/api/weather/nazare-waves`),
    fetchWithTimeout(`${baseUrl}/api/weather/titanic-site`),
    fetchWithTimeout(`${baseUrl}/api/weather/danakil-depression`),
    fetchWithTimeout(`${baseUrl}/api/nasa/observable-comets`),
  ]);

  // Process Everest weather - structure is data.weather.current
  let everest: DailyReportPayload['earthWeather']['everest'] = null;
  if (everestRes.status === 'fulfilled' && everestRes.value.ok) {
    const data = await everestRes.value.json();
    const current = data.weather?.current;
    if (current) {
      everest = {
        tempC: current.temperature_2m,
        tempF: Math.round(current.temperature_2m * 9/5 + 32),
        windKmh: current.wind_speed_10m,
        conditions: 'Clear', // Would need weather code mapping
      };
    }
  }

  // Process extreme weather locations for hottest/coldest/windiest
  let hottest: { location: string; tempF: number } | null = null;
  let coldest: { location: string; tempF: number } | null = null;
  let windiest: { location: string; windMph: number } | null = null;

  // Death Valley (likely hottest) - structure is data.weather.current
  if (deathValleyRes.status === 'fulfilled' && deathValleyRes.value.ok) {
    const data = await deathValleyRes.value.json();
    const temp = data.weather?.current?.temperature_2m;
    if (temp !== undefined) {
      const tempF = Math.round(temp * 9/5 + 32);
      if (hottest === null) {
        hottest = { location: 'Death Valley', tempF };
      } else {
        const currentHottest: { location: string; tempF: number } = hottest;
        if (tempF > currentHottest.tempF) {
          hottest = { location: 'Death Valley', tempF };
        }
      }
    }
  }

  // Danakil Depression
  if (danakilRes.status === 'fulfilled' && danakilRes.value.ok) {
    const data = await danakilRes.value.json();
    const temp = data.weather?.current?.temperature_2m || data.current?.temperature_2m;
    if (temp !== undefined) {
      const tempF = Math.round(temp * 9/5 + 32);
      if (hottest === null) {
        hottest = { location: 'Danakil Depression', tempF };
      } else {
        const currentHottest: { location: string; tempF: number } = hottest;
        if (tempF > currentHottest.tempF) {
          hottest = { location: 'Danakil Depression', tempF };
        }
      }
    }
  }

  // Vostok (likely coldest)
  if (vostokRes.status === 'fulfilled' && vostokRes.value.ok) {
    const data = await vostokRes.value.json();
    const temp = data.weather?.current?.temperature_2m || data.current?.temperature_2m;
    if (temp !== undefined) {
      const tempF = Math.round(temp * 9/5 + 32);
      coldest = { location: 'Vostok Station', tempF };
    }
  }

  // Everest for wind
  if (everest && everest.windKmh) {
    windiest = { location: 'Mt. Everest', windMph: Math.round(everest.windKmh * 0.621) };
  }

  // Process Drake Passage - structure is data.current_wave
  let drakePassage: DailyReportPayload['oceanConditions']['drakePassage'] = null;
  if (drakeRes.status === 'fulfilled' && drakeRes.value.ok) {
    const data = await drakeRes.value.json();
    const wave = data.current_wave;
    if (wave?.wave_height) {
      drakePassage = {
        waveHeightM: wave.wave_height,
        waveHeightFt: Math.round(wave.wave_height * 3.281),
        swellPeriod: wave.wave_period || 0,
      };
    }
  }

  // Process Nazaré waves - structure is data.current
  let nazare: DailyReportPayload['oceanConditions']['nazare'] = null;
  if (nazareRes.status === 'fulfilled' && nazareRes.value.ok) {
    const data = await nazareRes.value.json();
    const waveHeight = data.current?.wave_height;
    if (waveHeight) {
      nazare = {
        waveHeightM: waveHeight,
        waveHeightFt: Math.round(waveHeight * 3.281),
      };
    }
  }

  // Process Titanic site
  let titanicSite: DailyReportPayload['oceanConditions']['titanicSite'] = null;
  if (titanicRes.status === 'fulfilled' && titanicRes.value.ok) {
    const data = await titanicRes.value.json();
    titanicSite = {
      icebergRisk: data.icebergRisk?.level || 'Unknown',
      waterTempC: data.waterTemperature?.surface || 0,
    };
  }

  // Process Solar Flares
  let solarFlares = { count: 0, strongest: null as string | null };
  if (solarFlaresRes.status === 'fulfilled' && solarFlaresRes.value.ok) {
    const data = await solarFlaresRes.value.json();
    const events = data.events || [];
    solarFlares = {
      count: events.length,
      strongest: events.length > 0 ? events.reduce((max: any, e: any) =>
        (e.classType > (max?.classType || '')) ? e : max, null)?.classType || null : null,
    };
  }

  // Process CME
  let cme = { count: 0 };
  if (cmeRes.status === 'fulfilled' && cmeRes.value.ok) {
    const data = await cmeRes.value.json();
    cme = { count: (data.events || []).length };
  }

  // Process Geomagnetic Storms
  let geomagneticStorms = { count: 0, strongestKp: null as number | null };
  if (geomagRes.status === 'fulfilled' && geomagRes.value.ok) {
    const data = await geomagRes.value.json();
    const events = data.events || [];
    geomagneticStorms = {
      count: events.length,
      strongestKp: events.length > 0
        ? Math.max(...events.map((e: any) => e.kpIndex || 0))
        : null,
    };
  }

  // Process NEO
  let nearEarthObjects: DailyReportPayload['nearEarthObjects'] = {
    count: 0,
    closestApproach: null,
  };
  if (neoRes.status === 'fulfilled' && neoRes.value.ok) {
    const data = await neoRes.value.json();
    const objects = data.objects || [];
    const closest = objects[0];
    nearEarthObjects = {
      count: data.count || objects.length,
      closestApproach: closest ? {
        designation: closest.designation,
        date: closest.closeApproachDate,
        distanceLunar: closest.distance * 389.17,
        velocityKmS: closest.velocity,
      } : null,
    };
  }

  // Process Meteor Showers
  let meteorShowers: DailyReportPayload['meteorShowers'] = {
    active: [],
    nextUp: null,
  };
  if (meteorRes.status === 'fulfilled' && meteorRes.value.ok) {
    const data = await meteorRes.value.json();
    meteorShowers = {
      active: (data.active || []).slice(0, 3).map((s: any) => ({
        name: s.name,
        daysToPeak: s.daysToPeak,
        zhr: s.zhr,
      })),
      nextUp: data.upcoming?.[0] ? {
        name: data.upcoming[0].name,
        peakDate: data.upcoming[0].peakDate,
        zhr: data.upcoming[0].zhr,
      } : null,
    };
  }

  // Process Exoplanets
  let exoplanets: DailyReportPayload['exoplanets'] = {
    featured: null,
    recentDiscoveries: 0,
  };
  if (exoplanetFeaturedRes.status === 'fulfilled' && exoplanetFeaturedRes.value.ok) {
    const data = await exoplanetFeaturedRes.value.json();
    if (data.system?.planets?.[0]) {
      const planet = data.system.planets[0];
      exoplanets.featured = {
        name: planet.name,
        hostStar: data.system.starName || planet.hostStar,
        tempK: planet.equilibriumTemp || 0,
        weatherType: planet.weatherType || 'Unknown',
        description: planet.description || `A ${planet.weatherType || 'mysterious'} world`,
      };
    }
  }
  if (exoplanetNewsRes.status === 'fulfilled' && exoplanetNewsRes.value.ok) {
    const data = await exoplanetNewsRes.value.json();
    exoplanets.recentDiscoveries = data.discoveries?.length || data.news?.length || 0;
  }

  // Process Mars Weather
  let marsWeather: DailyReportPayload['marsWeather'] = {
    available: false,
    solDate: null,
    tempHighC: null,
    tempLowC: null,
  };
  if (marsRes.status === 'fulfilled' && marsRes.value.ok) {
    const data = await marsRes.value.json();
    if (data.sol_keys?.length > 0) {
      const latestSol = data.sol_keys[data.sol_keys.length - 1];
      const solData = data[latestSol];
      marsWeather = {
        available: true,
        solDate: latestSol,
        tempHighC: solData?.AT?.mx || null,
        tempLowC: solData?.AT?.mn || null,
      };
    }
  }

  // Process Comets
  let comets: DailyReportPayload['comets'] = {
    upcoming: [],
    nearestApproach: null,
  };
  if (cometsRes.status === 'fulfilled' && cometsRes.value.ok) {
    const data = await cometsRes.value.json();
    const cometList = data.comets || [];
    // Sort by days until perihelion and get top 3 with good/excellent visibility
    const goodComets = cometList
      .filter((c: any) => c.visibility === 'Good' || c.visibility === 'Excellent')
      .sort((a: any, b: any) => a.daysUntilPerihelion - b.daysUntilPerihelion)
      .slice(0, 3);

    comets = {
      upcoming: goodComets.map((c: any) => ({
        name: c.name,
        nextPerihelion: c.nextPerihelion,
        daysUntilPerihelion: c.daysUntilPerihelion,
        visibility: c.visibility,
      })),
      nearestApproach: cometList[0] ? {
        name: cometList[0].name,
        nextPerihelion: cometList[0].nextPerihelion,
        daysUntilPerihelion: cometList[0].daysUntilPerihelion,
      } : null,
    };
  }

  // Pick a random absurd forecast
  const absurdForecast = ABSURD_FORECASTS[Math.floor(Math.random() * ABSURD_FORECASTS.length)];

  return {
    date: today.toISOString().split('T')[0],
    generatedAt: today.toISOString(),
    earthWeather: {
      everest,
      extremes: { hottest, coldest, windiest },
    },
    oceanConditions: {
      drakePassage,
      nazare,
      titanicSite,
    },
    solarActivity: {
      solarFlares,
      cme,
      geomagneticStorms,
    },
    nearEarthObjects,
    meteorShowers,
    exoplanets,
    absurdForecast,
    marsWeather,
    comets,
  };
}

// Format the report as a human-readable message
function formatReportForMessage(report: DailyReportPayload): string {
  const lines: string[] = [];

  lines.push(`🌌 THE INTERSTELLAR BULLETIN`);
  lines.push(`📅 ${report.date}`);
  lines.push('');

  // 🌤️ Earth Weather Highlights
  lines.push(`🌤️ EARTH WEATHER`);
  if (report.earthWeather.everest) {
    lines.push(`• Everest Summit: ${report.earthWeather.everest.tempF}°F, winds ${Math.round(report.earthWeather.everest.windKmh * 0.621)} mph`);
  }
  if (report.earthWeather.extremes.hottest) {
    lines.push(`• Hottest: ${report.earthWeather.extremes.hottest.location} at ${report.earthWeather.extremes.hottest.tempF}°F`);
  }
  if (report.earthWeather.extremes.coldest) {
    lines.push(`• Coldest: ${report.earthWeather.extremes.coldest.location} at ${report.earthWeather.extremes.coldest.tempF}°F`);
  }
  lines.push('');

  // 🌊 Ocean Conditions
  lines.push(`🌊 OCEAN CONDITIONS`);
  if (report.oceanConditions.drakePassage) {
    lines.push(`• Drake Passage: ${report.oceanConditions.drakePassage.waveHeightFt}ft waves`);
  }
  if (report.oceanConditions.nazare) {
    lines.push(`• Nazaré: ${report.oceanConditions.nazare.waveHeightFt}ft waves`);
  }
  if (report.oceanConditions.titanicSite) {
    lines.push(`• Titanic Site: Iceberg risk ${report.oceanConditions.titanicSite.icebergRisk.toLowerCase()}`);
  }
  lines.push('');

  // ☀️ Solar Activity
  lines.push(`☀️ SOLAR ACTIVITY`);
  if (report.solarActivity.solarFlares.count > 0) {
    lines.push(`• ${report.solarActivity.solarFlares.count} solar flares (30 days)`);
    if (report.solarActivity.solarFlares.strongest) {
      lines.push(`• Strongest: Class ${report.solarActivity.solarFlares.strongest}`);
    }
  } else {
    lines.push(`• Solar activity: Quiet`);
  }
  if (report.solarActivity.cme.count > 0) {
    lines.push(`• ${report.solarActivity.cme.count} CMEs detected`);
  }
  if (report.solarActivity.geomagneticStorms.count > 0) {
    lines.push(`• ${report.solarActivity.geomagneticStorms.count} geomagnetic storms`);
  }
  lines.push('');

  // 🪨 NEOs
  lines.push(`🪨 NEAR-EARTH OBJECTS`);
  lines.push(`• ${report.nearEarthObjects.count} close approaches (next 30 days)`);
  if (report.nearEarthObjects.closestApproach) {
    const neo = report.nearEarthObjects.closestApproach;
    lines.push(`• Closest: ${neo.designation}`);
    lines.push(`  ${neo.distanceLunar.toFixed(1)} lunar distances on ${neo.date}`);
  }
  lines.push('');

  // ☄️ Meteor Showers
  lines.push(`☄️ METEOR SHOWERS`);
  if (report.meteorShowers.active.length > 0) {
    report.meteorShowers.active.forEach(s => {
      const status = s.daysToPeak === 0 ? 'PEAK TODAY!' :
        s.daysToPeak > 0 ? `peak in ${s.daysToPeak}d` : `${Math.abs(s.daysToPeak)}d past peak`;
      lines.push(`• ${s.name}: ${status} (ZHR ${s.zhr})`);
    });
  } else if (report.meteorShowers.nextUp) {
    lines.push(`• Next: ${report.meteorShowers.nextUp.name} on ${report.meteorShowers.nextUp.peakDate}`);
  } else {
    lines.push(`• No major activity`);
  }
  lines.push('');

  // 🔭 Exoplanets
  lines.push(`🔭 EXOPLANET SPOTLIGHT`);
  if (report.exoplanets.featured) {
    const p = report.exoplanets.featured;
    lines.push(`• ${p.name} (${p.hostStar})`);
    lines.push(`  ${p.weatherType} world, ${p.tempK}K`);
  }
  if (report.exoplanets.recentDiscoveries > 0) {
    lines.push(`• ${report.exoplanets.recentDiscoveries} recent discoveries`);
  }
  lines.push('');

  // 🔴 Mars Weather (if available)
  if (report.marsWeather.available) {
    lines.push(`🔴 MARS WEATHER (Sol ${report.marsWeather.solDate})`);
    if (report.marsWeather.tempHighC && report.marsWeather.tempLowC) {
      lines.push(`• High: ${report.marsWeather.tempHighC}°C / Low: ${report.marsWeather.tempLowC}°C`);
    }
    lines.push('');
  }

  // ☄️ Comets
  if (report.comets.upcoming.length > 0 || report.comets.nearestApproach) {
    lines.push(`☄️ COMETS`);
    if (report.comets.nearestApproach && report.comets.nearestApproach.daysUntilPerihelion <= 30) {
      const c = report.comets.nearestApproach;
      lines.push(`• ${c.name} approaching! Perihelion in ${c.daysUntilPerihelion} days`);
    }
    report.comets.upcoming.slice(0, 2).forEach(c => {
      lines.push(`• ${c.name}: ${c.nextPerihelion} (${c.visibility} visibility)`);
    });
    lines.push('');
  }

  // 🤯 Absurd Forecast
  lines.push(`🤯 ABSURD FORECAST`);
  lines.push(`${report.absurdForecast.location}:`);
  lines.push(`${report.absurdForecast.fact}`);
  lines.push('');

  lines.push(`🚀 Stay curious, space cadet!`);
  lines.push(`— The Interstellar Weather Bureau`);

  return lines.join('\n');
}

// GET: Compile and return the daily report (for Whiskers to fetch and broadcast)
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const report = await compileReport(baseUrl);

    return NextResponse.json({
      ...report,
      formattedMessage: formatReportForMessage(report),
    });
  } catch (error) {
    console.error('Daily report compilation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to compile daily report',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST: Compile report and send to Mr. Whiskers message bus
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, sendToWhiskers = true } = body;

    // Require a phone number - this is who receives the daily report
    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'phoneNumber is required. This is the recipient\'s phone number.' },
        { status: 400 }
      );
    }

    // Build target for Mr. Whiskers message bus
    const target = {
      type: 'phone_number' as const,
      phoneNumber,
    };

    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // Compile the report
    const report = await compileReport(baseUrl);

    if (!sendToWhiskers) {
      return NextResponse.json({
        success: true,
        report,
        formattedMessage: formatReportForMessage(report),
        message: 'Report compiled but not sent to Whiskers (sendToWhiskers=false)'
      });
    }

    // Send to Mr. Whiskers message bus
    const whiskerPayload = {
      target,
      source: 'IWB-daily-report',
      payload: {
        type: 'daily-interstellar-bulletin',
        report,
        formattedMessage: formatReportForMessage(report),
      },
    };

    const whiskerResponse = await fetch('https://mrwhiskers.chat/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(whiskerPayload),
    });

    if (!whiskerResponse.ok) {
      const errorText = await whiskerResponse.text();
      return NextResponse.json(
        {
          error: 'Failed to send to Mr. Whiskers',
          details: errorText,
          report,
        },
        { status: whiskerResponse.status }
      );
    }

    const whiskerResult = await whiskerResponse.json();

    return NextResponse.json({
      success: true,
      report,
      whiskerResponse: whiskerResult,
    });
  } catch (error) {
    console.error('Daily report POST error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process daily report',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
