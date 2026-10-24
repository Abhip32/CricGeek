'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  width = 28,
  height = 28,
  className = '',
  fallbackText
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const cleanSrc = src && !src.includes('lazyimage') && !src.endsWith('.svg') ? src : null;
  const initial = (fallbackText || alt || '?').slice(0, 3).toUpperCase();

  if (!cleanSrc || hasError) {
    return (
      <div
        style={{ width: `${width}px`, height: `${height}px` }}
        className={`flex items-center justify-center rounded-full bg-slate-800 border border-slate-700/60 text-[10px] font-bold text-slate-300 shadow-sm flex-shrink-0 ${className}`}
        title={alt}
      >
        <span>{initial}</span>
      </div>
    );
  }

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`relative overflow-hidden rounded-full flex-shrink-0 bg-slate-800/40 ${className}`}
    >
      <img
        src={cleanSrc}
        alt={alt}
        width={width}
        height={height}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />
    </div>
  );
};

export default ImageWithFallback;
