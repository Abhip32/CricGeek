'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { NewsItem } from '@/types/news';
import { Newspaper, ExternalLink, Clock } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

function formatNewsTime(dateStr?: string): string {
  if (!dateStr) return 'Recent';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;

    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins >= 0 && diffMins < 2) return 'Just now';
    if (diffMins > 0 && diffMins < 60) return `${diffMins}m ago`;
    if (diffHours > 0 && diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays > 1 && diffDays < 7) return `${diffDays}d ago`;

    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return 'Recent';
  }
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [imageError, setImageError] = useState(false);

  const hasValidImage =
    Boolean(news.image) &&
    !imageError &&
    !news.image?.includes('lazyimage') &&
    !news.image?.endsWith('.svg');

  const rawAuthor = (news.author || '').trim();
  const displayAuthor = !rawAuthor || /espn/i.test(rawAuthor) ? 'Cricket Desk' : rawAuthor;
  const timeFormatted = formatNewsTime(news.dateTime || news.date);

  return (
    <a
      href={news.link || '#'}
      target={news.link ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="group bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 flex gap-3.5 sm:gap-4 hover:border-red-500 hover:shadow-md transition-all duration-150"
    >
      {/* Editorial Thumbnail */}
      <div className="relative w-28 sm:w-44 h-24 sm:h-30 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200/90">
        {hasValidImage ? (
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(max-width: 640px) 112px, 176px"
            className="object-cover group-hover:scale-105 transition-transform duration-250"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-2">
            <Newspaper className="w-6 h-6 text-slate-300" />
            <span className="text-[9px] font-heading font-black text-slate-400 uppercase tracking-wider mt-1">
              CRICGEEK
            </span>
          </div>
        )}
      </div>

      {/* Editorial Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-heading font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
              CRICKET NEWS
            </span>
          </div>

          <h3 className="text-xs sm:text-sm font-heading font-black text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug uppercase tracking-tight">
            {news.title}
          </h3>

          {news.description && (
            <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed hidden sm:block">
              {news.description}
            </p>
          )}
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
          <span className="font-heading font-bold text-slate-700 truncate max-w-[140px] uppercase text-[10px] tracking-wider">
            {displayAuthor}
          </span>
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{timeFormatted}</span>
            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-red-600 transition-colors ml-1" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
