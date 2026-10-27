'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePhotos } from '@/hooks/useCricketQueries';
import { Camera, RefreshCw, X, ChevronLeft, ChevronRight, Eye, Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  link: string;
  source: string;
}

export const PhotosSection = () => {
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

  const activePhotos = galleryData?.photos || [];

  const handleOpenGallery = (id: string) => {
    setSelectedGalleryId(id);
    setSelectedPhotoIndex(0);
  };

  const handleCloseGallery = () => {
    setSelectedGalleryId(null);
    setSelectedPhotoIndex(0);
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotos.length > 0) {
      setSelectedPhotoIndex((prev) => (prev + 1) % activePhotos.length);
    }
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotos.length > 0) {
      setSelectedPhotoIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length);
    }
  };

  return (
    <section id="photos" className="py-10 sm:py-14 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-2xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-red-600 rounded-full" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Match Photography & Galleries
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                High-definition match captures, victory celebrations, and press moments from Cricbuzz
              </p>
            </div>
          </div>

          <button
            onClick={() => refetchGalleries()}
            disabled={isGalleriesFetching}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors shadow-2xs disabled:opacity-50 self-start sm:self-auto"
            title="Refresh Galleries"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGalleriesFetching ? 'animate-spin text-red-600' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Galleries Grid */}
        {isGalleriesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs animate-pulse">
                <div className="aspect-[16/10] bg-slate-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : galleries.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
            <Camera className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No Photo Galleries Available</p>
            <p className="text-xs text-slate-500">Check back later for fresh match coverage galleries.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {galleries.slice(0, 8).map((album: GalleryItem) => (
              <div
                key={album.id}
                onClick={() => handleOpenGallery(album.id)}
                className="group cursor-pointer bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:border-red-500/70 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Album Cover */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={album.image}
                    alt={album.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-600 text-white shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Gallery</span>
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white">
                    Album #{album.id}
                  </div>
                </div>

                {/* Album Meta */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2">
                  <h3
                    className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2"
                    title={album.title}
                  >
                    {album.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-slate-600">Cricbuzz Photography</span>
                    <span className="text-red-600 font-bold group-hover:underline">Explore &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Selected Album */}
      {selectedGalleryId && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={handleCloseGallery}
        >
          <div
            className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90 text-white">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white flex-shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-extrabold text-white truncate">
                    {galleryData?.title || 'Cricket Photo Gallery'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {activePhotos.length > 0 ? `Photo ${selectedPhotoIndex + 1} of ${activePhotos.length}` : 'Loading gallery...'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseGallery}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-400 hover:text-white transition-colors flex items-center justify-center flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[350px] sm:min-h-[500px]">
              {isSingleLoading ? (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <RefreshCw className="w-7 h-7 animate-spin text-red-500" />
                  <span className="text-xs font-semibold">Loading high-resolution photography...</span>
                </div>
              ) : activePhotos.length === 0 ? (
                <div className="text-slate-400 text-center p-6 space-y-1">
                  <ImageIcon className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-sm font-bold">No photos found for this album.</p>
                </div>
              ) : (
                <>
                  <div className="relative w-full h-[360px] sm:h-[500px] flex items-center justify-center">
                    <Image
                      src={activePhotos[selectedPhotoIndex]?.url || activePhotos[selectedPhotoIndex]?.image}
                      alt={activePhotos[selectedPhotoIndex]?.caption || galleryData?.title || 'Cricket Photo'}
                      fill
                      className="object-contain"
                      unoptimized
                      priority
                    />
                  </div>

                  {activePhotos.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevPhoto}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 text-white backdrop-blur-xs flex items-center justify-center transition-all shadow-lg"
                        title="Previous Photo"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextPhoto}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 text-white backdrop-blur-xs flex items-center justify-center transition-all shadow-lg"
                        title="Next Photo"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Photo Caption Strip */}
            {activePhotos[selectedPhotoIndex]?.caption && (
              <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/95 text-xs text-slate-300">
                <p className="line-clamp-2">{activePhotos[selectedPhotoIndex].caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotosSection;
