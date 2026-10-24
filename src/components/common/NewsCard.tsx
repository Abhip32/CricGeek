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
      className="group flex flex-col sm:flex-row bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative w-full sm:w-44 h-40 sm:h-auto flex-shrink-0 bg-slate-100 overflow-hidden">
        {hasValidImage ? (
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(max-width: 640px) 100vw, 176px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4">
            <Newspaper className="w-8 h-8 text-slate-300 mb-1" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Cricket News
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
        <div className="space-y-1.5">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
            {news.title}
          </h3>
          {news.description && (
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {news.description}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="font-semibold text-slate-700 truncate max-w-[140px]">
            {news.author || 'Cricket Desk'}
          </span>
          <div className="flex items-center gap-1 text-slate-500">
            <span>{news.dateTime || 'Recent'}</span>
            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-red-600 transition-colors" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
