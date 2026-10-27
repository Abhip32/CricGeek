'use client';

import React from 'react';
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

  return (
    <div className="w-[320px] sm:w-[350px] flex-shrink-0 bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs hover:border-red-500/60 hover:shadow-md transition-all flex flex-col justify-between group">
      {/* ESPN Top Header: Status & Match Context */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {isLive ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600 text-white flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          ) : isResult ? (
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex-shrink-0">
              RESULT
            </span>
          ) : (
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex-shrink-0">
              UPCOMING
            </span>
          )}

          <span className="text-slate-300 font-bold">•</span>

          <span className="text-[11px] font-semibold text-slate-600 truncate" title={match.matchInfo || match.series}>
            {match.matchInfo || match.series}
          </span>
        </div>

        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate max-w-[90px]" title={match.series}>
          {match.series}
        </span>
      </div>

      {/* ESPN Teams & Real-Time Scores */}
      <div className="py-3 space-y-2.5">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <ImageWithFallback
              src={match.flagA}
              alt={match.teamA}
              width={24}
              height={17}
              className="w-6 h-4.5 object-contain flex-shrink-0"
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
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium ml-1.5">
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
              width={24}
              height={17}
              className="w-6 h-4.5 object-contain flex-shrink-0"
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
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium ml-1.5">
                ({match.oversB})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ESPN Bottom Result Line & Quick Scorecard Link */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <p
          className={`font-semibold truncate max-w-[210px] sm:max-w-[230px] ${
            isLive ? 'text-red-600' : 'text-slate-700'
          }`}
          title={match.result || match.target || match.matchInfo}
        >
          {match.result || (match.target ? `Target ${match.target}` : match.status || 'Match Scheduled')}
        </p>

        <Link
          href={scorecardHref}
          onClick={handleClick}
          className="inline-flex items-center gap-0.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors flex-shrink-0 ml-1 group-hover:translate-x-0.5"
        >
          <span>Scorecard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MatchCarouselCard;
