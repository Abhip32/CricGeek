'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Match } from '@/types/match';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import StatusBadge from '@/components/common/StatusBadge';
import { ChevronRight, ExternalLink } from 'lucide-react';

export const MatchCarouselCard: React.FC<{ match: Match }> = ({ match }) => {
  const scorecardHref = match.link 
    ? `/scorecard?url=${encodeURIComponent(match.link)}`
    : '/scorecard';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative h-full rounded-2xl glass-card p-5 border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Top Header: Series & Status Badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block truncate">
              {match.series || 'Cricket Series'}
            </span>
            <span className="text-[11px] text-slate-400 truncate block mt-0.5">
              {match.matchInfo || 'Match Details'}
            </span>
          </div>
          <StatusBadge status={match.status} isLive={match.isLive} />
        </div>

        {/* Teams and Scores Container */}
        <div className="space-y-3 py-1">
          {/* Team A */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <ImageWithFallback
                src={match.flagA}
                alt={match.teamA}
                fallbackText={match.teamA}
                width={30}
                height={30}
              />
              <span className="text-sm font-bold text-white truncate max-w-[130px] sm:max-w-[150px]">
                {match.teamA}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-sm font-black text-white block">
                {match.scoreA || '-'}
              </span>
              {match.oversA && (
                <span className="text-[10px] text-slate-400 block font-medium">
                  {match.oversA}
                </span>
              )}
            </div>
          </div>

          {/* Team B */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <ImageWithFallback
                src={match.flagB}
                alt={match.teamB}
                fallbackText={match.teamB}
                width={30}
                height={30}
              />
              <span className="text-sm font-bold text-white truncate max-w-[130px] sm:max-w-[150px]">
                {match.teamB}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-sm font-black text-white block">
                {match.scoreB || '-'}
              </span>
              {match.oversB && (
                <span className="text-[10px] text-slate-400 block font-medium">
                  {match.oversB}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Result or Target text */}
        {(match.result || match.target) && (
          <div className="pt-2 border-t border-white/[0.06]">
            <p className="text-xs text-slate-300 font-medium truncate">
              {match.result || (match.target ? `Target: ${match.target}` : '')}
            </p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <Link
          href={scorecardHref}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors"
        >
          <span>Scorecard & Stats</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
        <span className="text-[10px] text-slate-400 font-medium uppercase">
          Live Feed
        </span>
      </div>
    </motion.div>
  );
};

export default MatchCarouselCard;
