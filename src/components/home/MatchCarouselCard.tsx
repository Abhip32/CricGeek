'use client';

import React from 'react';
import Link from 'next/link';
import { Match } from '@/types/match';
import ImageWithFallback from '../common/ImageWithFallback';
import StatusBadge from '../common/StatusBadge';
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

  return (
    <div className="w-[300px] sm:w-[340px] flex-shrink-0 bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
      {/* Series Title & Status */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 gap-2 min-w-0">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate flex-1 min-w-0" title={match.series}>
          {match.series || 'Match Fixture'}
        </span>
        <StatusBadge status={match.status} />
      </div>

      {/* Teams & Scores */}
      <div className="py-3 space-y-2.5">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <ImageWithFallback
              src={match.flagA}
              alt={match.teamA}
              width={28}
              height={20}
              fallbackText={match.teamA}
            />
            <span className="text-sm font-bold text-slate-800 truncate">
              {match.teamA}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-sm font-extrabold text-slate-900">
              {match.scoreA || '—'}
            </span>
            {match.oversA && (
              <span className="text-[11px] text-slate-500 font-medium ml-1.5">
                {match.oversA}
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
              width={28}
              height={20}
              fallbackText={match.teamB}
            />
            <span className="text-sm font-bold text-slate-800 truncate">
              {match.teamB}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-sm font-extrabold text-slate-900">
              {match.scoreB || '—'}
            </span>
            {match.oversB && (
              <span className="text-[11px] text-slate-500 font-medium ml-1.5">
                {match.oversB}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Match Result / Note & Action */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <p className="text-slate-600 font-medium truncate max-w-[200px]" title={match.result || match.target}>
          {match.result || (match.target ? `Target ${match.target}` : match.matchInfo || 'Match Scheduled')}
        </p>

        <Link
          href={scorecardHref}
          onClick={handleClick}
          className="inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-700 transition-colors flex-shrink-0 ml-2"
        >
          <span>Scorecard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MatchCarouselCard;
