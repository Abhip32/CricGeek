'use client';

import React from 'react';
import Link from 'next/link';
import { Match } from '@/types/match';
import ImageWithFallback from '../common/ImageWithFallback';
import StatusBadge from '../common/StatusBadge';
import { MapPin, ChevronRight, Trophy } from 'lucide-react';
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
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div className="min-w-0">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider truncate block">
            {match.series || 'Match'}
          </span>
          {match.matchInfo && (
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
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
            <span className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {match.teamA}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              {match.scoreA || '—'}
            </span>
            {match.oversA && (
              <span className="text-xs text-slate-500 font-medium ml-1.5">
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
            <span className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {match.teamB}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              {match.scoreB || '—'}
            </span>
            {match.oversB && (
              <span className="text-xs text-slate-500 font-medium ml-1.5">
                {match.oversB}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Result & Scorecard Button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        <p className="text-slate-600 font-medium truncate" title={match.result || match.target}>
          {match.result ? (
            <span className="font-semibold text-slate-800">{match.result}</span>
          ) : match.target ? (
            <span className="text-slate-700">Target {match.target}</span>
          ) : (
            <span className="text-slate-500">Upcoming Fixture</span>
          )}
        </p>

        <Link
          href={scorecardHref}
          onClick={handleClick}
          className="inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-700 transition-colors flex-shrink-0"
        >
          <span>Scorecard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MatchCard;
