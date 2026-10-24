'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NewsItem } from '@/types/news';
import { Clock, User, ArrowUpRight, Image as ImageIcon } from 'lucide-react';

export const NewsCard: React.FC<NewsItem> = ({
  title,
  description,
  image,
  headline,
  author = 'Cricket Desk',
  dateTime = 'Recent',
  link
}) => {
  const [imageError, setImageError] = useState(false);
  const displayTitle = title || headline || 'Cricket Update';
  const displayDesc = description || '';

  const cleanImage = image && !image.includes('lazyimage') && !image.endsWith('.svg') ? image : null;

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (link) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full group"
        >
          {children}
        </a>
      );
    }
    return <div className="h-full group">{children}</div>;
  };

  return (
    <CardWrapper>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col sm:flex-row h-full rounded-2xl glass-card border border-white/[0.08] hover:border-emerald-500/40 overflow-hidden transition-all duration-300"
      >
        {/* Article Image Container */}
        <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-slate-900 flex-shrink-0">
          {cleanImage && !imageError ? (
            <img
              src={cleanImage}
              alt={displayTitle}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800/80 p-4 text-slate-500">
              <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
              <span className="text-[11px] font-semibold">CricGeek News</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
        </div>

        {/* Content Container */}
        <div className="flex-1 p-5 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            {/* Meta row */}
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <Clock className="w-3 h-3" />
                {dateTime}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <User className="w-3 h-3 text-slate-400" />
                <span className="truncate max-w-[120px]">{author}</span>
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
              {displayTitle}
            </h3>

            {/* Description */}
            {displayDesc && (
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {displayDesc}
              </p>
            )}
          </div>

          {/* Action indicator */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-emerald-400 transition-colors">
            <span>Read full coverage</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </motion.article>
    </CardWrapper>
  );
};

export default NewsCard;
