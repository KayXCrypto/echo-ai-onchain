'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DotBackground from '@/components/ui/dot-background';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface APODImage {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
}

type GalleryMode = 'recent' | 'random';

export default function GalleryPage() {
  const [images, setImages] = useState<APODImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<APODImage | null>(null);
  const [mode, setMode] = useState<GalleryMode>('recent');

  const fetchGallery = async (galleryMode: GalleryMode) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/nasa/apod-gallery?mode=${galleryMode}&count=30`);
      if (!response.ok) {
        throw new Error('Failed to fetch gallery');
      }
      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery('recent');
  }, []);

  const handleModeChange = (newMode: GalleryMode) => {
    setMode(newMode);
    fetchGallery(newMode);
  };

  if (loading) {
    return (
      <DotBackground>
        <div className="min-h-screen p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Astronomy Gallery</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg bg-white/10" />
            ))}
          </div>
        </div>
      </DotBackground>
    );
  }

  if (error) {
    return (
      <DotBackground>
        <div className="min-h-screen p-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Error Loading Gallery</h1>
            <p className="text-neutral-400">{error}</p>
          </div>
        </div>
      </DotBackground>
    );
  }

  return (
    <DotBackground>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Astronomy Gallery</h1>
              <p className="text-neutral-400 text-lg">
                Explore the universe through NASA's Astronomy Picture of the Day collection
              </p>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              <Button
                onClick={() => handleModeChange('recent')}
                variant={mode === 'recent' ? 'default' : 'outline'}
                className={mode === 'recent'
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Recent (30 days)
              </Button>
              <Button
                onClick={() => handleModeChange('random')}
                variant={mode === 'random' ? 'default' : 'outline'}
                className={mode === 'random'
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Random
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, idx) => (
              <div
                key={`${image.date}-${idx}`}
                className="group relative overflow-hidden rounded-lg border border-white/[0.1] bg-black/20 backdrop-blur-sm cursor-pointer transition-all hover:border-white/[0.3] hover:scale-[1.02]"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                    {image.title}
                  </h3>
                  <p className="text-neutral-400 text-xs">{image.date}</p>
                  {image.copyright && (
                    <p className="text-neutral-500 text-xs mt-1">© {image.copyright}</p>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] overflow-auto bg-black/50 backdrop-blur-xl rounded-xl border border-white/[0.1] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.hdurl || selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h2>
                <p className="text-neutral-400 text-sm mb-4">{selectedImage.date}</p>
                {selectedImage.copyright && (
                  <p className="text-neutral-400 text-sm mb-4">
                    Copyright: {selectedImage.copyright}
                  </p>
                )}
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {selectedImage.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </DotBackground>
  );
}
