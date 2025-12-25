import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Featured exoplanet systems with interesting characteristics
    const featuredSystems = [
      'TRAPPIST-1',          // 7 planets, 3 in habitable zone
      'Proxima Cen',         // Closest exoplanet system
      'Kepler-186',          // First Earth-size in habitable zone
      'TOI-700',             // TESS habitable zone discovery
      'LHS 1140',            // Super-Earth ocean world
      '55 Cnc',              // Hot super-Earth around bright star
      'HD 189733',           // Hot Jupiter with mapped atmosphere
      'WASP-12',             // Ultra-hot Jupiter being consumed
      'Kepler-16',           // Circumbinary planet (Tatooine)
      'HAT-P-7',             // Hot Jupiter with weather patterns
      'Wolf 1069',           // Red dwarf with habitable zone planet
      'GJ 667 C',            // Triple star system with planets
      'Kepler-442',          // Super-Earth in habitable zone
      'HD 40307',            // 6 planets including super-Earth
      'GJ 163',              // Potentially habitable
      'Kepler-62',           // 5 planets, 2 in habitable zone
      'K2-18',               // Water vapor detected
      'Ross 128',            // Quiet red dwarf with planet
      'tau Cet',             // Sun-like star with planets
      'WASP-121',            // Ultra-hot Jupiter
      'HD 219134',           // 6 planets, only 6.5 ly away
      'L 98-59',             // 5 rocky planets, 10.6 ly
      'GJ 357',              // 3 planets, potentially habitable
      'HR 8799',             // 4 directly imaged giant planets
      '51 Peg',              // First exoplanet discovery (1995)
      'ups And',             // First multi-planet system
      'HD 10180',            // 6+ planets via radial velocity
      'HD 110067',           // Perfect resonance chain
      'TOI-178',             // 6 planets in orbital resonance
      'Kepler-90',           // 8 planets (most like Solar System)
      'TOI-270',             // Mini-Neptune system
      'WASP-47',             // Hot Jupiter with neighbors
      'TOI-1136',            // Young planetary system
      'HD 191939',           // 6-planet system around Sun-like star
      'GJ 9827',             // Mini-Neptunes transitioning
      'TOI-451',             // Young system with 4 planets
      'HD 108236',           // Sub-Neptune resonance chain
      'Kepler-11',           // Tightly packed 6-planet system
      'TOI-500',             // Multi-planet TESS discovery
    ];

    // Check if specific index is requested
    const { searchParams } = new URL(request.url);
    const indexParam = searchParams.get('index');
    
    let systemIndex: number;
    if (indexParam !== null) {
      // Use specified index
      systemIndex = parseInt(indexParam) % featuredSystems.length;
    } else {
      // Rotate based on day of year
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
      systemIndex = dayOfYear % featuredSystems.length;
    }
    
    const featuredSystem = featuredSystems[systemIndex];

    // Query NASA Exoplanet Archive TAP service - use default_flag=1 to get only one entry per planet
    const query = `select pl_name,hostname,st_spectype,pl_eqt,pl_rade,pl_masse,pl_orbper,sy_dist,discoverymethod,disc_year from ps where hostname like '${featuredSystem}%' and default_flag=1 order by pl_orbper asc`;

    const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodeURIComponent(query)}&format=json`;

    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours (1 day)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch exoplanet data');
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error('No exoplanet data found for featured system');
    }

    // Process planets with weather classification
    const planets = data.map((planet: any) => {
      const eqTemp = planet.pl_eqt || null;
      const radius = planet.pl_rade || 0;

      // Classify exoplanet weather
      let weatherClass = 'Unknown';
      let weatherDescription = '';

      if (eqTemp && eqTemp > 2000) {
        weatherClass = 'Inferno';
        weatherDescription = 'Ultra-hot Jupiter with vaporized rock atmosphere';
      } else if (eqTemp && eqTemp > 1200) {
        weatherClass = 'Hot Jupiter';
        weatherDescription = 'Scorching gas giant with extreme winds';
      } else if (eqTemp && eqTemp > 500) {
        weatherClass = 'Stormy';
        weatherDescription = 'Hot world with potential extreme weather';
      } else if (eqTemp && eqTemp >= 175 && eqTemp <= 270) {
        weatherClass = 'Temperate';
        weatherDescription = 'Within habitable zone range';
      } else if (eqTemp && eqTemp < 175 && eqTemp > 50) {
        weatherClass = 'Cold';
        weatherDescription = 'Frigid world, possibly icy';
      } else if (eqTemp && eqTemp <= 50) {
        weatherClass = 'Frozen';
        weatherDescription = 'Extremely cold, frozen atmosphere';
      } else if (!eqTemp) {
        weatherClass = 'Unknown';
        weatherDescription = 'Temperature data not available';
      }

      return {
        name: planet.pl_name,
        hostStar: planet.hostname,
        spectralType: planet.st_spectype || 'Unknown',
        equilibriumTemp: eqTemp,
        radius: radius,
        mass: planet.pl_masse,
        orbitalPeriod: planet.pl_orbper,
        distance: planet.sy_dist,
        discoveryMethod: planet.discoverymethod,
        discoveryYear: planet.disc_year,
        weatherClass,
        weatherDescription,
      };
    });

    return NextResponse.json({
      systemName: featuredSystem,
      systemIndex: systemIndex,
      totalSystems: featuredSystems.length,
      planetCount: planets.length,
      planets,
    });
  } catch (error) {
    console.error('Exoplanet Featured API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
