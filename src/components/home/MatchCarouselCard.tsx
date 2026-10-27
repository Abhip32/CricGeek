'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Match } from '@/types/match';
import ImageWithFallback from '../common/ImageWithFallback';
import { ChevronRight } from 'lucide-react';

interface MatchCarouselCardProps {
  match: Match;
}

export function getCleanScorecardPath(link?: string): string {
  if (!link) return '/matches';
  let clean = link
    .replace(/^https?:\/\/[^\/]+\//, '')
    .replace(/^cricket\//, '')
    .replace(/\/(full-scorecard|live-cricket-score|match-preview)(\?.*)?$/, '')
    .replace(/^\/+/, '');
  return `/scorecard/${clean}`;
}

export const MatchCarouselCard: React.FC<MatchCarouselCardProps> = ({ match }) => {
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
    if (match.result && !match.result.trim().toUpperCase().includes('LIVE')) {
      return match.result;
    }
    if (match.target) {
      return `Target ${match.target}`;
    }
    if (isLive) {
      return '';
    }
    if (match.status && !match.status.toUpperCase().includes('SCHEDULED') && !match.status.toUpperCase().includes('LIVE')) {
      return match.status;
    }
    return '';
  }, [match, isLive]);

  return (
    <div className="w-[300px] sm:w-[340px] flex-shrink-0 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-red-500/60 hover:shadow-md transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs gap-2 min-w-0">
        <span
          className="font-bold text-slate-500 uppercase tracking-wider truncate flex-1 min-w-0 text-[11px]"
          title={headerTitle}
        >
          {headerTitle}
        </span>
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-2xs flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
        ) : isResult ? (
          <span className="font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full text-[10px] flex-shrink-0">
            RESULT
          </span>
        ) : (
          <span className="font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full text-[10px] flex-shrink-0">
            {match.status || 'FIXTURE'}
          </span>
        )}
      </div>

      {/* Teams & Scores */}
      <div className="py-1 space-y-2.5">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <ImageWithFallback
              src={match.flagA}
              alt={match.teamA}
              width={26}
              height={18}
              className="w-6.5 h-4.5 object-contain flex-shrink-0"
              fallbackText={match.teamA}
            />
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={match.teamA}>
              {match.teamA}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight tabular-nums">
              {match.scoreA || '—'}
            </span>
            {match.oversA && (
              <span className="text-[11px] text-slate-500 font-medium ml-1">
                ({match.oversA})
              </span>
            )}
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <ImageWithFallback
              src={match.flagB}
              alt={match.teamB}
              width={26}
              height={18}
              className="w-6.5 h-4.5 object-contain flex-shrink-0"
              fallbackText={match.teamB}
            />
            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate" title={match.teamB}>
              {match.teamB}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight tabular-nums">
              {match.scoreB || '—'}
            </span>
            {match.oversB && (
              <span className="text-[11px] text-slate-500 font-medium ml-1">
                ({match.oversB})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info & Scorecard Action */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs gap-2 min-w-0">
        <span
          className="text-[11px] font-semibold text-slate-500 truncate flex-1 min-w-0"
          title={footerText}
        >
          {footerText}
        </span>
        <Link
          href={scorecardHref}
          onClick={handleClick}
          className="inline-flex items-center gap-0.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors flex-shrink-0 group-hover:translate-x-0.5"
        >
          <span>Scorecard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MatchCarouselCard;
