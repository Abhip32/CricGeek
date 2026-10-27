'use client';

import React from 'react';
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

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs hover:border-red-500/70 hover:shadow-md transition-all flex flex-col justify-between space-y-3.5 group">
      {/* Top ESPN Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600 text-white flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          ) : isResult ? (
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex-shrink-0">
              RESULT
            </span>
          ) : (
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex-shrink-0">
              UPCOMING
            </span>
          )}

          <span className="text-slate-300 font-bold">•</span>

          <span className="text-xs font-semibold text-slate-600 truncate" title={match.matchInfo || match.series}>
            {match.matchInfo || match.series}
          </span>
        </div>

        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate max-w-[140px]" title={match.series}>
          {match.series}
        </span>
      </div>

      {/* Teams & Real-Time Scores */}
      <div className="space-y-3 py-1">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-6 rounded overflow-hidden flex-shrink-0 border border-slate-200 bg-slate-50 flex items-center justify-center">
              <ImageWithFallback
                src={match.flagA}
                alt={match.teamA}
                width={32}
                height={22}
                fallbackText={match.teamA}
              />
            </div>
            <span className="text-sm sm:text-base font-bold text-slate-900 truncate" title={match.teamA}>
              {match.teamA}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {match.scoreA || '—'}
            </span>
            {match.oversA && (
              <span className="text-xs text-slate-500 font-medium ml-1.5">
                ({match.oversA})
              </span>
            )}
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-6 rounded overflow-hidden flex-shrink-0 border border-slate-200 bg-slate-50 flex items-center justify-center">
              <ImageWithFallback
                src={match.flagB}
                alt={match.teamB}
                width={32}
                height={22}
                fallbackText={match.teamB}
              />
            </div>
            <span className="text-sm sm:text-base font-bold text-slate-900 truncate" title={match.teamB}>
              {match.teamB}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {match.scoreB || '—'}
            </span>
            {match.oversB && (
              <span className="text-xs text-slate-500 font-medium ml-1.5">
                ({match.oversB})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Result & Scorecard CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        <p
          className={`font-semibold truncate flex-1 min-w-0 ${
            isLive ? 'text-red-600' : 'text-slate-700'
          }`}
          title={match.result || match.target || match.matchInfo}
        >
          {match.result || (match.target ? `Target ${match.target}` : match.status || 'Match Scheduled')}
        </p>

        <Link
          href={scorecardHref}
          onClick={handleClick}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all flex-shrink-0"
        >
          <span>Scorecard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MatchCard;
