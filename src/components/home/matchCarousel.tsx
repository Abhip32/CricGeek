'use client';

import React, { useRef } from 'react';
import { useLiveMatches, useRecentMatches } from '@/hooks/useCricketQueries';
import MatchCarouselCard from './MatchCarouselCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from '../common/EmptyState';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

export const MatchCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // React Query hooks with auto-polling on live matches
  const { data: liveMatches, isLoading: isLiveLoading } = useLiveMatches();
  const { data: recentMatches, isLoading: isRecentLoading } = useRecentMatches();

  const hasLive = Array.isArray(liveMatches) && liveMatches.length > 0;
  const isLiveActive = hasLive;
  const matches = hasLive ? liveMatches : (recentMatches || []);
  const loading = isLiveLoading || (!hasLive && isRecentLoading);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 border-b border-slate-200 relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 flex-shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-heading font-black text-slate-900 tracking-wide uppercase whitespace-nowrap">
              {isLiveActive ? 'Live Match Center' : 'Recent Matches & Results'}
            </h2>
            <span className="text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 flex-shrink-0">
              {matches.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => handleScroll('left')}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors shadow-2xs"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors shadow-2xs"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Scroll Container */}
        {loading ? (
          <div className="flex gap-4 overflow-x-hidden py-1">
            <SkeletonCard className="w-[300px] sm:w-[340px] flex-shrink-0" />
            <SkeletonCard className="w-[300px] sm:w-[340px] flex-shrink-0" />
            <SkeletonCard className="w-[300px] sm:w-[340px] flex-shrink-0" />
            <SkeletonCard className="w-[300px] sm:w-[340px] flex-shrink-0" />
          </div>
        ) : matches.length === 0 ? (
          <EmptyState
            type="live"
            title="No Active Matches"
            message="There are no ongoing live matches right now. Check back soon or view upcoming fixtures."
            actionLabel="View Schedule"
            onAction={() => window.location.href = '/schedule'}
          />
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none scroll-smooth"
          >
            {matches.map((match) => (
              <MatchCarouselCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MatchCarousel;
