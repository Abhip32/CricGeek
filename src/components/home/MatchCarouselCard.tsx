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
    <div className="w-[320px] sm:w-[350px] flex-shrink-0 bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs hover:border-red-500/60 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group">
      {/* Top Header - Consistent with MatchCard & Upcoming Fixtures */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs gap-2 min-w-0">
        <span
          className="font-bold text-slate-500 uppercase tracking-wider truncate flex-1 min-w-0"
          title={headerTitle}
        >
          {headerTitle}
        </span>
        {isLive ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white flex-shrink-0 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
        ) : isResult ? (
          <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 text-[10px] flex-shrink-0">
            RESULT
          </span>
        ) : (
          <span className="font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 text-[10px] flex-shrink-0">
            {match.status || 'FIXTURE'}
          </span>
        )}
      </div>

      {/* Teams & Scores */}
      <div className="py-1 space-y-2.5">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
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
            <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
              {match.scoreA || '—'}
            </span>
            {match.oversA && (
              <span className="text-[10px] text-slate-500 font-medium ml-1">
                ({match.oversA})
              </span>
            )}
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
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
            <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
              {match.scoreB || '—'}
            </span>
            {match.oversB && (
              <span className="text-[10px] text-slate-500 font-medium ml-1">
                ({match.oversB})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Consistent Scorecard Action */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {footerText ? (
            <p
              className={`font-semibold truncate ${
                isLive ? 'text-red-600' : 'text-slate-700'
              }`}
              title={footerText}
            >
              {footerText}
            </p>
          ) : match.matchInfo ? (
            <span className="text-slate-500 truncate text-[11px]" title={match.matchInfo}>
              {match.matchInfo}
            </span>
          ) : (
            <span className="text-slate-400 text-[11px]">Match center</span>
          )}
        </div>

        {!isUpcoming && (
          <Link
            href={scorecardHref}
            onClick={handleClick}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all flex-shrink-0"
          >
            <span>Scorecard</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MatchCarouselCard;
