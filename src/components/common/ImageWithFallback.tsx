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
      <span
        style={{ width, height }}
        className={`inline-flex flex-shrink-0 items-center justify-center font-bold text-slate-600 rounded bg-slate-100 ${className}`}
        title={alt}
      >
        <span style={{ fontSize: Math.max(9, Math.floor(Math.min(width, height) * 0.45)) }}>
          {initials}
        </span>
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
      className={`object-contain inline-block flex-shrink-0 ${className}`}
      onError={() => setError(true)}
      unoptimized
      title={alt}
    />
  );
};

export default ImageWithFallback;
