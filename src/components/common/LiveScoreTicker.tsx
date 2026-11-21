'use client';

import React from 'react';
import Link from 'next/link';
import { useTicker } from '@/hooks/useCricketQueries';
import ImageWithFallback from '@/components/common/ImageWithFallback';

export default function LiveScoreTicker() {
  const { data: tickerItems, isLoading } = useTicker();

  if (isLoading || !tickerItems || tickerItems.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800/80 text-white text-xs select-none sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center h-10 px-2 sm:px-4">
        {/* Ticker Athletic Pill */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider mr-2 sm:mr-3 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span className="hidden sm:inline">MATCH TICKER</span>
          <span className="sm:hidden">LIVE</span>
        </div>

        {/* Scrolling / Swipeable Matches Track */}
        <div className="flex-1 overflow-x-auto scrollbar-none flex items-center gap-3 sm:gap-4 py-1 touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          {tickerItems.map((match, idx) => {
            const team1 = match.teams?.[0];
            const team2 = match.teams?.[1];
            const isLive = match.isLive;
            const targetScorecard = match.link ? `/scorecard?url=${encodeURIComponent(match.link)}` : '/matches';

            return (
              <Link
                key={match.id || `ticker-${idx}`}
                href={targetScorecard}
                className="flex-shrink-0 inline-flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-md px-3 py-1 transition-all group"
              >
                {/* Status Dot */}
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    isLive ? 'bg-red-500 animate-pulse' : match.isCompleted ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                  title={match.status}
                />

                {/* Team 1 */}
                <div className="flex items-center gap-1.5">
                  {team1?.flag && (
                    <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 bg-slate-800 flex items-center justify-center">
                      <ImageWithFallback
                        src={team1.flag}
                        alt={team1.shortName || team1.name || ''}
                        width={16}
                        height={16}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="font-bold text-slate-200 group-hover:text-white transition-colors">
                    {team1?.shortName || team1?.name || 'T1'}
                  </span>
                  {team1?.score && (
                    <span className="font-semibold text-slate-100 text-[11px] font-mono">
                      {team1.score}
                    </span>
                  )}
                </div>

                <span className="text-slate-500 text-[10px] font-bold">vs</span>

                {/* Team 2 */}
                <div className="flex items-center gap-1.5">
                  {team2?.flag && (
                    <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 bg-slate-800 flex items-center justify-center">
                      <ImageWithFallback
                        src={team2.flag}
                        alt={team2.shortName || team2.name || ''}
                        width={16}
                        height={16}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="font-bold text-slate-200 group-hover:text-white transition-colors">
                    {team2?.shortName || team2?.name || 'T2'}
                  </span>
                  {team2?.score && (
                    <span className="font-semibold text-slate-100 text-[11px] font-mono">
                      {team2.score}
                    </span>
                  )}
                </div>

                {/* Status detail */}
                {(match.statusDetail || match.status) && (
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-300 ml-1 pl-1.5 border-l border-slate-800 max-w-[120px] sm:max-w-[160px] truncate">
                    {match.statusDetail || match.status}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
