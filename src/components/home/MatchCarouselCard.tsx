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
  if (!link) return '/matches?tab=live';
  const clean = link
    .replace(/^https?:\/\/(www\.)?espncricinfo\.com\//, '')
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
    <div className="w-[300px] sm:w-[340px] flex-shrink-0 bg-white/[0.035] hover:bg-white/[0.075] backdrop-blur-xl border border-white/[0.08] hover:border-red-500/40 rounded-2xl p-4.5 shadow-lg hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.65),0_0_24px_rgba(220,38,38,0.22)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
      {/* Series Title & Status */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06] gap-2 min-w-0">
        <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-300 uppercase tracking-wider truncate flex-1 min-w-0" title={match.series}>
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
            <span className="text-sm font-bold text-slate-100 truncate">
              {match.teamA}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-sm font-extrabold text-white">
              {match.scoreA || '—'}
            </span>
            {match.oversA && (
              <span className="text-[11px] text-slate-400 font-medium ml-1.5">
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
            <span className="text-sm font-bold text-slate-100 truncate">
              {match.teamB}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-sm font-extrabold text-white">
              {match.scoreB || '—'}
            </span>
            {match.oversB && (
              <span className="text-[11px] text-slate-400 font-medium ml-1.5">
                {match.oversB}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Match Result / Note & Action */}
      <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
        <p className="text-slate-300 font-medium truncate max-w-[200px]" title={match.result || match.target}>
          {match.result || (match.target ? `Target ${match.target}` : match.matchInfo || 'Match Scheduled')}
        </p>

        <Link
          href={scorecardHref}
          onClick={handleClick}
          className="inline-flex items-center gap-1 font-bold text-red-400 hover:text-red-300 transition-colors flex-shrink-0 ml-2 group-hover:translate-x-0.5"
        >
          <span>Scorecard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default MatchCarouselCard;
