'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { usePhotos } from '@/hooks/useCricketQueries';
import Hero from '@/components/home/hero';
import EmptyState from '@/components/common/EmptyState';
import { Camera, Search, RefreshCw, X, ChevronLeft, ChevronRight, Eye, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  link: string;
  source: string;
}

export default function PhotosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);

  const {
    data: galleries = [],
    isLoading: isGalleriesLoading,
    isFetching: isGalleriesFetching,
    refetch: refetchGalleries
  } = usePhotos();

  const {
    data: galleryData,
    isLoading: isSingleLoading
  } = usePhotos(selectedGalleryId || undefined);

  const filteredGalleries: GalleryItem[] = useMemo(() => {
    if (!Array.isArray(galleries)) return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return galleries;
    return galleries.filter((g) => g.title.toLowerCase().includes(q));
  }, [galleries, searchQuery]);

  const activePhotos = galleryData?.photos || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero
        image="/images/newsHeader.jpg"
        heading="Cricket Photo Galleries"
        subtitle="Exclusive high-definition match photography, iconic moments, player celebrations, and press galleries sourced from Cricbuzz."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        {/* Controls Bar: Search & Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Latest Match Photography
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                {galleries.length} Galleries Available
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search photo albums or series..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => refetchGalleries()}
              disabled={isGalleriesFetching}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors shadow-2xs disabled:opacity-50 flex-shrink-0"
              title="Refresh Galleries"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGalleriesFetching ? 'animate-spin text-red-600' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {isGalleriesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs animate-pulse">
                <div className="h-52 bg-slate-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredGalleries.length === 0 ? (
          <EmptyState
            type="matches"
            title="No Photo Galleries Found"
            message="No cricket albums match your current search query."
            actionLabel="Reset Search"
            onAction={() => setSearchQuery('')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGalleries.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => {
                  setSelectedGalleryId(item.id);
                  setSelectedPhotoIndex(0);
                }}
                className="group cursor-pointer bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:border-red-500/70 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-black tracking-wider uppercase flex items-center gap-1.5 border border-white/20">
                    <ImageIcon className="w-3.5 h-3.5 text-red-400" />
                    <span>Album</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-extrabold text-sm sm:text-base leading-snug drop-shadow-md group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-red-600 font-bold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Album</span>
                  </span>
                  <span>Source: Cricbuzz</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Gallery Modal */}
      {selectedGalleryId && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-white">
              <div className="min-w-0 flex-1 pr-4">
                <h3 className="font-extrabold text-sm sm:text-base text-white truncate">
                  {galleryData?.title || 'Cricket Gallery'}
                </h3>
                {activePhotos.length > 0 && (
                  <p className="text-xs text-slate-400 font-medium">
                    Photo {selectedPhotoIndex + 1} of {activePhotos.length}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedGalleryId(null)}
                className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Active Photo */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[480px] bg-black flex items-center justify-center p-2">
              {isSingleLoading ? (
                <div className="text-white text-xs font-bold animate-pulse flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-red-500" />
                  <span>Loading full resolution photos...</span>
                </div>
              ) : activePhotos.length > 0 ? (
                <>
                  <div className="relative w-full h-[320px] sm:h-[450px]">
                    <Image
                      src={activePhotos[selectedPhotoIndex]?.url}
                      alt={activePhotos[selectedPhotoIndex]?.caption || 'Cricket Photo'}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  {/* Navigation Arrows */}
                  {selectedPhotoIndex > 0 && (
                    <button
                      onClick={() => setSelectedPhotoIndex(prev => prev - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors border border-white/20"
                      title="Previous Photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  {selectedPhotoIndex < activePhotos.length - 1 && (
                    <button
                      onClick={() => setSelectedPhotoIndex(prev => prev + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors border border-white/20"
                      title="Next Photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </>
              ) : (
                <div className="text-slate-400 text-xs">No photos in this album.</div>
              )}
            </div>

            {/* Modal Footer Caption */}
            {activePhotos[selectedPhotoIndex]?.caption && (
              <div className="p-3.5 bg-slate-900 border-t border-white/10 text-xs text-slate-300 font-medium leading-relaxed">
                {activePhotos[selectedPhotoIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
