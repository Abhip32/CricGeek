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
    <section id="photos" className="py-8 border-b border-slate-200 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-red-600 rounded-full" />
            <div>
              <h2 className="text-base sm:text-lg font-heading font-black text-slate-900 uppercase tracking-wider">
                Match Photography & Galleries
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                High-definition match photography, iconic moments, and celebrations from Cricbuzz
              </p>
            </div>
          </div>

          <button
            onClick={() => refetchGalleries()}
            disabled={isGalleriesFetching}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-heading font-black uppercase tracking-wider bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors shadow-2xs disabled:opacity-50 self-start sm:self-auto cursor-pointer"
            title="Refresh Galleries"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGalleriesFetching ? 'animate-spin text-red-600' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Galleries Grid */}
        {isGalleriesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs animate-pulse">
                <div className="aspect-[16/10] bg-slate-200" />
                <div className="p-3.5 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : galleries.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-2">
            <Camera className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No Photo Galleries Available</p>
            <p className="text-xs text-slate-500">Check back later for fresh match coverage galleries.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleries.slice(0, 8).map((album: GalleryItem) => (
              <div
                key={album.id}
                onClick={() => handleOpenGallery(album.id)}
                className="group cursor-pointer bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:border-red-500/70 hover:shadow-md transition-all flex flex-col"
              >
                {/* Album Cover */}
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={album.image}
                    alt={album.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-white/20">
                    <ImageIcon className="w-3 h-3 text-red-400" />
                    <span>Album</span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3">
                    <h3 className="text-white font-bold text-xs sm:text-sm leading-snug drop-shadow-md group-hover:text-red-300 transition-colors line-clamp-2">
                      {album.title}
                    </h3>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-red-600 font-bold text-[11px]">
                    <Eye className="w-3 h-3" />
                    <span>View Photos</span>
                  </span>
                  <span className="text-[10px]">Cricbuzz</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Gallery Modal - Clean Light Athletic Design */}
      {selectedGalleryId && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={handleCloseGallery}
        >
          <div 
            className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
              <div className="min-w-0 flex-1 pr-4">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                  {galleryData?.title || 'Cricket Gallery'}
                </h3>
                {activePhotos.length > 0 && (
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Photo {selectedPhotoIndex + 1} of {activePhotos.length}
                  </p>
                )}
              </div>
              <button
                onClick={handleCloseGallery}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Active Photo */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[480px] bg-slate-100 flex items-center justify-center p-3 select-none">
              {isSingleLoading ? (
                <div className="text-slate-700 text-xs font-bold animate-pulse flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-red-600" />
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
                      onClick={handlePrevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/95 text-slate-800 hover:bg-red-600 hover:text-white transition-all border border-slate-200 shadow-md"
                      title="Previous Photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  {selectedPhotoIndex < activePhotos.length - 1 && (
                    <button
                      onClick={handleNextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/95 text-slate-800 hover:bg-red-600 hover:text-white transition-all border border-slate-200 shadow-md"
                      title="Next Photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </>
              ) : (
                <div className="text-slate-500 text-xs">No photos in this album.</div>
              )}
            </div>

            {/* Modal Footer Caption */}
            {activePhotos[selectedPhotoIndex]?.caption && (
              <div className="p-4 bg-white border-t border-slate-200 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {activePhotos[selectedPhotoIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotosSection;
