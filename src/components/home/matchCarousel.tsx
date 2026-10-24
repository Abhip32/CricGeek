'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cricketApi } from '@/services/api';
import { Match } from '@/types/match';
import MatchCarouselCard from './MatchCarouselCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from '../common/EmptyState';
import { ChevronLeft, ChevronRight, Radio } from 'lucide-react';
import Link from 'next/link';

export const MatchCarousel = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      // First try live matches
      const live = await cricketApi.getLiveMatches();
      if (live && live.length > 0) {
        setMatches(live);
        setIsLiveActive(true);
      } else {
        // Fall back to recent matches
        const recent = await cricketApi.getRecentMatches();
        setMatches(recent || []);
        setIsLiveActive(false);
      }
    } catch (err) {
      console.warn('Carousel fetch error:', err);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-slate-50 py-8 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isLiveActive ? 'bg-red-600 animate-pulse' : 'bg-slate-400'}`} />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {isLiveActive ? 'Live Matches' : 'Recent Matches'}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
              {matches.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/matches"
              className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors mr-2"
            >
              View All Matches →
            </Link>

            <button
              onClick={() => handleScroll('left')}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Scroll Container */}
        {loading ? (
          <div className="flex gap-4 overflow-x-hidden py-1">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
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
            className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none scroll-smooth"
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
