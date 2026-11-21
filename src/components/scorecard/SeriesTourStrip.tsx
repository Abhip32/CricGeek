'use client';

import React from 'react';
import Link from 'next/link';
import { useSeriesFixtures } from '@/hooks/useCricketQueries';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { Calendar, ChevronRight, Trophy } from 'lucide-react';
import { SeriesFixtureItem } from '@/types/match';

interface SeriesTourStripProps {
  leagueId?: string;
  currentEventId?: string;
  className?: string;
}

export const SeriesTourStrip: React.FC<SeriesTourStripProps> = ({
  leagueId,
  currentEventId,
  className = ''
}) => {
  const { data: tourData, isLoading } = useSeriesFixtures(leagueId);

  if (isLoading || !tourData || !tourData.fixtures || tourData.fixtures.length <= 1) {
    return null;
  }

  const fixtures = tourData.fixtures;

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xs ${className}`}>
      {/* Strip Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-red-600" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
            {tourData.seriesName} Tour Tracker
          </h3>
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {fixtures.length} Matches
          </span>
        </div>
      </div>

      {/* Fixtures Horizontal Scroll Track */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {fixtures.map((m: SeriesFixtureItem, idx: number) => {
          const isCurrent = currentEventId && String(m.eventId) === String(currentEventId);
          const team1 = m.teams[0] || { name: 'Team 1', score: '' };
          const team2 = m.teams[1] || { name: 'Team 2', score: '' };

          return (
            <div
              key={m.id || idx}
              className={`flex-shrink-0 w-56 sm:w-64 p-3 rounded-xl border transition-all ${
                isCurrent
                  ? 'border-red-600 bg-red-50/30 shadow-2xs'
                  : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {/* Match Header */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 truncate">
                  Match {m.matchNumber || idx + 1}
                </span>
                {m.isLive ? (
                  <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-red-600 bg-red-100 border border-red-200 px-1.5 py-0.2 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                    LIVE
                  </span>
                ) : m.isCompleted ? (
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-600 bg-slate-200 px-1.5 py-0.2 rounded">
                    FT
                  </span>
                ) : (
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded">
                    Upcoming
                  </span>
                )}
              </div>

              {/* Competitors & Scores */}
              <div className="space-y-1 mb-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 truncate pr-2">
                    {team1.name}
                  </span>
                  <span className="font-mono font-black text-slate-800 tabular-nums">
                    {team1.score || '-'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 truncate pr-2">
                    {team2.name}
                  </span>
                  <span className="font-mono font-black text-slate-800 tabular-nums">
                    {team2.score || '-'}
                  </span>
                </div>
              </div>

              {/* Status or Date */}
              <p className="text-[10px] font-bold text-slate-500 truncate">
                {m.statusText || m.date || m.venue}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeriesTourStrip;
