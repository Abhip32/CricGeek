'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Match } from '@/types/match';
import ImageWithFallback from '../common/ImageWithFallback';
import { ChevronRight } from 'lucide-react';
import { getCleanScorecardPath } from '../home/MatchCarouselCard';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const scorecardHref = getCleanScorecardPath(match.link);

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('cricgeek_active_match', JSON.stringify(match));
      } catch (e) {
        // ignore
      }
    }
  };

  const isLive = Boolean(match.isLive || match.status?.toUpperCase().includes('LIVE'));
  const isResult = Boolean(match.result || match.status?.toUpperCase().includes('RESULT') || match.status?.toUpperCase().includes('CONCLUDED'));
  const isUpcoming = !isLive && !isResult && Boolean(match.status?.toUpperCase().includes('UPCOMING') || match.status?.toUpperCase().includes('SCHEDULED'));

  const headerTitle = useMemo(() => {
    return match.series || match.matchInfo || `${match.teamA} vs ${match.teamB}`;
  }, [match]);

  const footerText = useMemo(() => {
    const res = (match.result || '').trim();
    if (
      res &&
      !res.toUpperCase().includes('LIVE') &&
      res.toLowerCase() !== 'final' &&
      res.toLowerCase() !== 'result'
    ) {
      return res;
    }
    if (match.target) {
      return `Target ${match.target}`;
    }
    if (match.matchInfo && match.matchInfo !== headerTitle) {
      return match.matchInfo;
    }
    return isLive ? 'Live match in progress' : '';
  }, [match, headerTitle, isLive]);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between space-y-3.5 relative overflow-hidden group hover:border-red-500 hover:border-l-4 hover:border-l-red-600 hover:shadow-md transition-all duration-150">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 text-xs gap-2 min-w-0">
        <span
          className="font-heading font-black text-slate-500 uppercase tracking-wider truncate flex-1 min-w-0 text-[10px]"
          title={headerTitle}
        >
          {headerTitle}
        </span>
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-heading font-black uppercase tracking-wider bg-red-600 text-white shadow-2xs flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
        ) : isResult ? (
          <span className="font-heading font-black text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider flex-shrink-0">
            RESULT
          </span>
        ) : (
          <span className="font-heading font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider flex-shrink-0">
            {match.status || 'FIXTURE'}
          </span>
        )}
      </div>

      {/* Teams & Scores */}
      <div className="space-y-3 py-1">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-200 flex items-center justify-center">
              <ImageWithFallback
                src={match.flagA}
                alt={match.teamA}
                width={28}
                height={28}
                className="object-contain"
                fallbackText={match.teamA}
              />
            </div>
            <span className="text-sm sm:text-base font-heading font-black text-slate-900 uppercase tracking-tight truncate" title={match.teamA}>
              {match.teamA}
            </span>
          </div>

          <div className="text-right flex items-center gap-1.5 flex-shrink-0">
            <span className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono font-black text-sm sm:text-base text-slate-900 tabular-nums">
              {match.scoreA || '—'}
            </span>
            {match.oversA && (
              <span className="text-xs text-slate-400 font-mono">
                ({match.oversA})
              </span>
            )}
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-200 flex items-center justify-center">
              <ImageWithFallback
                src={match.flagB}
                alt={match.teamB}
                width={28}
                height={28}
                className="object-contain"
                fallbackText={match.teamB}
              />
            </div>
            <span className="text-sm sm:text-base font-heading font-black text-slate-900 uppercase tracking-tight truncate" title={match.teamB}>
              {match.teamB}
            </span>
          </div>

          <div className="text-right flex items-center gap-1.5 flex-shrink-0">
            <span className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono font-black text-sm sm:text-base text-slate-900 tabular-nums">
              {match.scoreB || '—'}
            </span>
            {match.oversB && (
              <span className="text-xs text-slate-400 font-mono">
                ({match.oversB})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer & Scorecard Link */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-3">
        <p className="text-xs sm:text-sm font-heading font-bold text-red-600 truncate flex-1 min-w-0" title={footerText}>
          {footerText}
        </p>

        <Link
          href={scorecardHref}
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-white hover:bg-red-600 font-heading font-black text-xs uppercase tracking-wider transition-colors shadow-2xs flex-shrink-0"
        >
          <span>Scorecard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MatchCard;
