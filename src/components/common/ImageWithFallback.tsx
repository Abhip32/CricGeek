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
  width = 32,
  height = 24,
  className = '',
  fallbackText
}) => {
  const [error, setError] = useState(false);

  // Derive clean 2-3 letter monogram initials from team name
  const initials = React.useMemo(() => {
    if (fallbackText) return fallbackText.slice(0, 3).toUpperCase();
    if (!alt) return 'TM';
    const words = alt.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
    return words.slice(0, 3).map(w => w[0]).join('').toUpperCase();
  }, [alt, fallbackText]);

  // Check if image is missing, is a lazy loader SVG placeholder, or failed
  const isInvalid = !src || 
                    error || 
                    src.includes('lazyimage') || 
                    src.endsWith('.svg') || 
                    src.startsWith('data:image');

  if (isInvalid) {
    return (
      <div
        style={{ width, height }}
        className={`flex-shrink-0 rounded-md bg-white/[0.08] border border-white/15 flex items-center justify-center font-bold text-slate-200 tracking-wider shadow-sm ${className}`}
        title={alt}
      >
        <span style={{ fontSize: Math.max(9, Math.floor(Math.min(width, height) * 0.45)) }}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ width, height }}
      className={`relative flex-shrink-0 overflow-hidden rounded-md border border-white/15 bg-white/[0.04] shadow-sm ${className}`}
      title={alt}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  );
};

export default ImageWithFallback;
