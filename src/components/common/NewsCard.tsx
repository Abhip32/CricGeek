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

  const hasValidImage =
    Boolean(news.image) &&
    !imageError &&
    !news.image?.includes('lazyimage') &&
    !news.image?.endsWith('.svg');

  return (
    <a
      href={news.link || '#'}
      target={news.link ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="group bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 flex gap-3.5 sm:gap-4 hover:border-slate-300 hover:shadow-2xs transition-all duration-150"
    >
      {/* Editorial Thumbnail */}
      <div className="relative w-28 sm:w-40 h-20 sm:h-26 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200/80">
        {hasValidImage ? (
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(max-width: 640px) 112px, 160px"
            className="object-cover group-hover:scale-103 transition-transform duration-200"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-2">
            <Newspaper className="w-6 h-6 text-slate-300" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">
              ESPN
            </span>
          </div>
        )}
      </div>

      {/* Editorial Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="space-y-1">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
            {news.title}
          </h3>
          {news.description && (
            <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed hidden sm:block">
              {news.description}
            </p>
          )}
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
          <span className="font-medium text-slate-600 truncate max-w-[130px]">
            {news.author || 'ESPNcricinfo staff'}
          </span>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>{news.dateTime || news.date || 'Recent'}</span>
            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-red-600 transition-colors" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
