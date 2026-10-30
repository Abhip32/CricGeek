'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Match } from '@/types/match';
import ImageWithFallback from '../common/ImageWithFallback';
import { ChevronRight, Radio } from 'lucide-react';

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
      return 'Match in progress';
    }
    if (match.status && !match.status.toUpperCase().includes('SCHEDULED') && !match.status.toUpperCase().includes('LIVE')) {
      return match.status;
    }
    return '';
  }, [match, isLive]);

  return (
    <div className="w-[300px] sm:w-[340px] flex-shrink-0 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-red-500 hover:border-l-4 hover:border-l-red-600 hover:shadow-md transition-all duration-150">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 text-xs gap-2 min-w-0">
        <span
          className="font-heading font-black text-slate-500 uppercase tracking-wider truncate flex-1 min-w-0 text-[10px]"
          title={headerTitle}
        >
          {headerTitle}
        </span>
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-heading font-black uppercase tracking-wider bg-red-600 text-white shadow-xs flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
        ) : isResult ? (
          <span className="font-heading font-black text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider flex-shrink-0">
            RESULT
          </span>
        ) : (
          <span className="font-heading font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider flex-shrink-0">
            {match.status || 'SCHEDULED'}
          </span>
        )}
      </div>

      {/* Teams & Scores (The Alchemists Face-Off) */}
      <div className="space-y-2.5 py-1">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-200 flex items-center justify-center">
              <ImageWithFallback
                src={match.flagA}
                alt={match.teamA}
                width={24}
                height={24}
                className="object-contain"
                fallbackText={match.teamA}
              />
            </div>
            <span className="text-xs sm:text-sm font-heading font-black text-slate-900 uppercase tracking-tight truncate" title={match.teamA}>
              {match.teamA}
            </span>
          </div>

          <div className="text-right flex items-center gap-1.5 flex-shrink-0">
            <span className="px-2 py-0.5 rounded bg-slate-100/90 border border-slate-200 font-mono font-black text-xs sm:text-sm text-slate-900 tabular-nums">
              {match.scoreA || '—'}
            </span>
            {match.oversA && (
              <span className="text-[10px] text-slate-400 font-mono">
                ({match.oversA})
              </span>
            )}
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-200 flex items-center justify-center">
              <ImageWithFallback
                src={match.flagB}
                alt={match.teamB}
                width={24}
                height={24}
                className="object-contain"
                fallbackText={match.teamB}
              />
            </div>
            <span className="text-xs sm:text-sm font-heading font-black text-slate-900 uppercase tracking-tight truncate" title={match.teamB}>
              {match.teamB}
            </span>
          </div>

          <div className="text-right flex items-center gap-1.5 flex-shrink-0">
            <span className="px-2 py-0.5 rounded bg-slate-100/90 border border-slate-200 font-mono font-black text-xs sm:text-sm text-slate-900 tabular-nums">
              {match.scoreB || '—'}
            </span>
            {match.oversB && (
              <span className="text-[10px] text-slate-400 font-mono">
                ({match.oversB})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer & Scorecard Link */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <p className="text-xs font-heading font-bold text-red-600 truncate flex-1 min-w-0" title={footerText}>
          {footerText}
        </p>

        <Link
          href={scorecardHref}
          onClick={handleClick}
          className="inline-flex items-center gap-1 text-[11px] font-heading font-black uppercase tracking-wider text-slate-700 hover:text-red-600 group-hover:translate-x-0.5 transition-all flex-shrink-0"
        >
          <span>Scorecard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MatchCarouselCard;
