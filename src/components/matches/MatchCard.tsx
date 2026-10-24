'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Match } from '@/types/match';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import StatusBadge from '@/components/common/StatusBadge';
import { ChevronRight, Trophy, MapPin } from 'lucide-react';

interface MatchCardProps extends Match {
  type?: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  series,
  title,
  matchInfo,
  teamA,
  teamB,
  scoreA,
  scoreB,
  oversA,
  oversB,
  status,
  result,
  flagA,
  flagB,
  link,
  isLive,
  type
}) => {
  const scorecardHref = link 
    ? `/scorecard?url=${encodeURIComponent(link)}`
    : '/scorecard';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl glass-card p-5 border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Top Header: Series Name & Status Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block truncate">
              {series || 'International Cricket'}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5 truncate">
              <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="truncate">{matchInfo?.replace('Today - Today', '') || 'Match Fixture'}</span>
            </div>
          </div>
          <StatusBadge status={status} isLive={isLive} />
        </div>

        {/* Teams and Scores Breakdown */}
        <div className="space-y-3.5 bg-slate-900/50 p-3.5 rounded-xl border border-white/[0.04]">
          {/* Team A */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <ImageWithFallback
                src={flagA}
                alt={teamA}
                fallbackText={teamA}
                width={32}
                height={32}
              />
              <span className="text-sm font-bold text-white truncate">
                {teamA}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-sm font-black text-white block">
                {scoreA || '-'}
              </span>
              {oversA && (
                <span className="text-[10px] text-slate-400 font-medium block">
                  {oversA}
                </span>
              )}
            </div>
          </div>

          {/* Team B */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <ImageWithFallback
                src={flagB}
                alt={teamB}
                fallbackText={teamB}
                width={32}
                height={32}
              />
              <span className="text-sm font-bold text-white truncate">
                {teamB}
              </span>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-sm font-black text-white block">
                {scoreB || '-'}
              </span>
              {oversB && (
                <span className="text-[10px] text-slate-400 font-medium block">
                  {oversB}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Result summary banner */}
        {result && (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400/90 bg-emerald-500/[0.07] px-3 py-1.5 rounded-lg border border-emerald-500/15">
            <Trophy className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{result}</span>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <Link
          href={scorecardHref}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-emerald-500 hover:text-black hover:shadow-md hover:shadow-emerald-500/20 transition-all duration-200"
        >
          <span>Full Scorecard</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
          CricGeek Feed
        </span>
      </div>
    </motion.div>
  );
};

export default MatchCard;
