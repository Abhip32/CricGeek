'use client';

import React, { useEffect, useState } from 'react';
import { cricketApi } from '@/services/api';
import { Match } from '@/types/match';
import MatchCarouselCard from './MatchCarouselCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from '@/components/common/EmptyState';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function MatchCarousel() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRecentFallback, setIsRecentFallback] = useState(false);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      // 1. Try live matches first
      const liveData = await cricketApi.getLiveMatches();
      if (liveData && liveData.length > 0) {
        setMatches(liveData);
        setIsRecentFallback(false);
      } else {
        // 2. If no active live matches, load recent matches so carousel is never blank!
        const recentData = await cricketApi.getRecentMatches();
        setMatches(recentData.slice(0, 10));
        setIsRecentFallback(true);
      }
    } catch (err) {
      console.warn('Failed to load match carousel:', err);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="relative">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {isRecentFallback ? 'Recent Fixture Highlights' : 'Active Live Matches'}
          </span>
          {isRecentFallback && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700/60">
              Recent Matches
            </span>
          )}
        </div>
        <button
          onClick={fetchMatches}
          disabled={loading}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
          title="Refresh match data"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : matches.length > 0 ? (
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {matches.map((match, index) => (
              <CarouselItem key={match.id || index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <MatchCarouselCard match={match} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4 bg-slate-900/90 border border-white/10 text-white hover:bg-emerald-500 hover:text-black transition-all" />
          <CarouselNext className="hidden sm:flex -right-4 bg-slate-900/90 border border-white/10 text-white hover:bg-emerald-500 hover:text-black transition-all" />
        </Carousel>
      ) : (
        <EmptyState
          type="live"
          title="No live matches right now"
          message="There are no matches currently in play. Check out recent match results or upcoming fixtures."
          onRetry={fetchMatches}
        />
      )}
    </div>
  );
}
