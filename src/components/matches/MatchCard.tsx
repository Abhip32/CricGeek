'use client';

import React from 'react';
import Link from 'next/link';
import { Match } from '@/types/match';
import ImageWithFallback from '../common/ImageWithFallback';
import StatusBadge from '../common/StatusBadge';
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

  return (
    <div className="w-full bg-white/[0.035] hover:bg-white/[0.075] backdrop-blur-xl border border-white/[0.08] hover:border-red-500/40 rounded-2xl p-5 shadow-lg hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.65),0_0_25px_rgba(220,38,38,0.25)] transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1 group">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] gap-3 min-w-0">
        <div className="min-w-0 flex-1">
          <span className="text-xs font-bold text-slate-400 group-hover:text-slate-300 uppercase tracking-wider truncate block" title={match.series}>
            {match.series || 'Match'}
          </span>
          {match.matchInfo && (
            <p className="text-[11px] text-slate-400 truncate mt-0.5" title={match.matchInfo}>
              {match.matchInfo}
            </p>
          )}
        </div>
        <StatusBadge status={match.status} />
      </div>

      {/* Teams & Scores */}
      <div className="space-y-3 py-1">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <ImageWithFallback
              src={match.flagA}
              alt={match.teamA}
              width={32}
              height={22}
              fallbackText={match.teamA}
            />
            <span className="text-sm sm:text-base font-bold text-slate-100 truncate">
              {match.teamA}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-base sm:text-lg font-extrabold text-white">
              {match.scoreA || '—'}
            </span>
            {match.oversA && (
              <span className="text-xs text-slate-400 font-medium ml-1.5">
                {match.oversA}
              </span>
            )}
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <ImageWithFallback
              src={match.flagB}
              alt={match.teamB}
              width={32}
              height={22}
              fallbackText={match.teamB}
            />
            <span className="text-sm sm:text-base font-bold text-slate-100 truncate">
              {match.teamB}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-base sm:text-lg font-extrabold text-white">
              {match.scoreB || '—'}
            </span>
            {match.oversB && (
              <span className="text-xs text-slate-400 font-medium ml-1.5">
                {match.oversB}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Result & Scorecard Button */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3 text-xs">
        <p className="text-slate-300 font-medium truncate" title={match.result || match.target}>
          {match.result ? (
            <span className="font-semibold text-slate-200">{match.result}</span>
          ) : match.target ? (
            <span className="text-slate-300">Target {match.target}</span>
          ) : (
            <span className="text-slate-400">Upcoming Fixture</span>
          )}
        </p>

        <Link
          href={scorecardHref}
          onClick={handleClick}
          className="inline-flex items-center gap-1 font-bold text-red-400 hover:text-red-300 transition-colors flex-shrink-0 group-hover:translate-x-0.5"
        >
          <span>Scorecard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MatchCard;
