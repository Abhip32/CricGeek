'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { NewsItem } from '@/types/news';
import { Newspaper, ExternalLink } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = news.image && 
                       !imageError && 
                       !news.image.includes('lazyimage') && 
                       !news.image.endsWith('.svg');

  return (
    <a
      href={news.link || '#'}
      target={news.link ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="group flex flex-col sm:flex-row bg-white/[0.035] hover:bg-white/[0.075] backdrop-blur-xl border border-white/[0.08] hover:border-red-500/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.65),0_0_24px_rgba(220,38,38,0.22)] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative w-full sm:w-48 h-44 sm:h-auto flex-shrink-0 bg-white/[0.03] overflow-hidden">
        {hasValidImage ? (
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(max-width: 640px) 100vw, 192px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.02] text-slate-500 p-4">
            <Newspaper className="w-8 h-8 text-slate-600 mb-1" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Cricket News
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-2.5">
        <div className="space-y-1.5">
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
            {news.title}
          </h3>
          {news.description && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {news.description}
            </p>
          )}
        </div>

        <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
          <span className="truncate max-w-[150px] font-medium">
            {news.author || 'ESPN Cricinfo'}
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-red-400 group-hover:text-red-300 transition-colors">
            <span>Read Story</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
