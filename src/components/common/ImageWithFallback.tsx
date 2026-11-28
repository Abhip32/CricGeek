'use client';

import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setError(false);
  }, [src]);

  // Derive clean, strictly 2-letter monogram initials (e.g. Devon Conway -> DC, India -> IN)
  const initials = React.useMemo(() => {
    const raw = (fallbackText || alt || '').trim();
    if (!raw) return 'CR';

    // Remove qualifiers like (c), (wk), dagger, arrows
    const clean = raw
      .replace(/\s*\(.*?\)/g, '')
      .replace(/\s*†/g, '')
      .replace(/►/g, '')
      .trim();

    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length === 0) return 'CR';

    if (words.length === 1) {
      // Single word: max 2 characters
      return words[0].slice(0, 2).toUpperCase();
    }

    // Multiple words: take first letter of first word and first letter of last word
    const firstChar = words[0][0] || '';
    const lastChar = words[words.length - 1][0] || '';
    return (firstChar + lastChar).toUpperCase();
  }, [alt, fallbackText]);

  // Check if image is missing, failed, or is a generic placeholder
  const isInvalid = !src || 
                    error || 
                    src.includes('lazyimage') || 
                    src.endsWith('.svg') || 
                    src.startsWith('data:image') ||
                    src.includes('default-player-logo');

  if (isInvalid) {
    // Keep font size well within bounds so initials never clip or overflow the container
    const dimension = Math.min(width, height);
    const fontSize = Math.min(32, Math.max(9, Math.floor(dimension * 0.32)));

    return (
      <span
        style={{ width, height, maxWidth: '100%', maxHeight: '100%' }}
        className={`inline-flex flex-shrink-0 items-center justify-center font-heading font-black tracking-wider text-slate-700 rounded-xl bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 select-none overflow-hidden p-1 shadow-inner ${className}`}
        title={alt}
      >
        <span
          style={{ fontSize, lineHeight: 1 }}
          className="truncate"
        >
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
