import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface ExoplanetNews {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  planetName?: string;
  hostStar?: string;
  discoveryMethod?: string;
}

export async function GET() {
  try {
    // Query NASA Exoplanet Archive for recent discoveries (last 2 years)
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const yearThreshold = twoYearsAgo.getFullYear();

    const query = `select pl_name,hostname,disc_year,disc_facility,discoverymethod,pl_eqt,pl_rade,pl_masse,pl_orbper,sy_dist from ps where disc_year >= ${yearThreshold} and default_flag=1 order by disc_year desc,pl_name asc`;
    
    const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodeURIComponent(query)}&format=json`;

    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error('Failed to fetch exoplanet news data');
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      // Return fallback news if API fails
      return NextResponse.json({
        news: generateFallbackNews(),
        count: 5,
      });
    }

    // Process recent discoveries into news items
    const newsItems: ExoplanetNews[] = data.slice(0, 15).map((planet: any, index: number) => {
      const eqTemp = planet.pl_eqt || 0;
      const radius = planet.pl_rade || 0;
      
      // Generate interesting description based on planet properties
      let category = 'Discovery';
      let description = '';

      if (eqTemp >= 175 && eqTemp <= 270 && radius >= 0.5 && radius <= 2.0) {
        category = 'Habitable Zone';
        description = `Potentially habitable world discovered in the habitable zone of ${planet.hostname}. Temperature: ${eqTemp.toFixed(0)}K, Size: ${radius.toFixed(2)}× Earth.`;
      } else if (eqTemp > 2000) {
        category = 'Ultra-Hot';
        description = `Extreme ultra-hot exoplanet found orbiting ${planet.hostname}. Surface temperatures exceed ${eqTemp.toFixed(0)}K - hot enough to vaporize rock.`;
      } else if (radius > 10) {
        category = 'Gas Giant';
        description = `Massive gas giant ${planet.pl_name} discovered around ${planet.hostname}. ${radius.toFixed(1)}× Jupiter's radius.`;
      } else if (planet.discoverymethod === 'Transit') {
        category = 'Transit Method';
        description = `${planet.pl_name} detected via transit method around ${planet.hostname}. Orbital period: ${planet.pl_orbper?.toFixed(1) || 'N/A'} days.`;
      } else if (planet.discoverymethod === 'Radial Velocity') {
        category = 'Radial Velocity';
        description = `${planet.pl_name} found through stellar wobble around ${planet.hostname}. Distance: ${planet.sy_dist?.toFixed(1) || 'N/A'} light-years.`;
      } else {
        description = `New exoplanet ${planet.pl_name} discovered orbiting ${planet.hostname} using ${planet.discoverymethod}.`;
      }

      return {
        id: `${planet.pl_name}-${planet.disc_year}`,
        title: `${planet.pl_name} Confirmed`,
        date: `${planet.disc_year}`,
        category,
        description,
        planetName: planet.pl_name,
        hostStar: planet.hostname,
        discoveryMethod: planet.discoverymethod,
      };
    });

    return NextResponse.json({
      news: newsItems,
      count: newsItems.length,
    });
  } catch (error) {
    console.error('Exoplanet News API error:', error);
    
    // Return fallback news on error
    return NextResponse.json({
      news: generateFallbackNews(),
      count: 5,
    });
  }
}

function generateFallbackNews(): ExoplanetNews[] {
  return [
    {
      id: 'fallback-1',
      title: 'TRAPPIST-1 System Analysis',
      date: '2024',
      category: 'Research',
      description: 'Ongoing analysis of the TRAPPIST-1 system reveals potential atmospheric signatures on multiple planets in the habitable zone.',
    },
    {
      id: 'fallback-2',
      title: 'Proxima Centauri b Studies',
      date: '2024',
      category: 'Habitable Zone',
      description: 'Latest observations of Proxima Centauri b, our nearest exoplanet neighbor, show intriguing possibilities for liquid water.',
    },
    {
      id: 'fallback-3',
      title: 'Hot Jupiter Atmospheres',
      date: '2024',
      category: 'Atmospheric Science',
      description: 'JWST observations reveal detailed atmospheric compositions of ultra-hot Jupiter exoplanets, including vaporized metals.',
    },
    {
      id: 'fallback-4',
      title: 'Mini-Neptune Discoveries',
      date: '2024',
      category: 'Discovery',
      description: 'TESS mission continues to find mini-Neptunes in nearby star systems, expanding our understanding of planetary formation.',
    },
    {
      id: 'fallback-5',
      title: 'Exoplanet Archive Milestone',
      date: '2024',
      category: 'Milestone',
      description: 'NASA Exoplanet Archive now contains over 5,600 confirmed exoplanets across thousands of star systems.',
    },
  ];
}

