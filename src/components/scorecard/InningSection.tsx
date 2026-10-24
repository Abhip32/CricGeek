'use client';

import React from 'react';
import { BattingTable } from './BattingTable';
import { BowlingTable } from './BowlingTable';
import { ScorecardTable } from '@/types/match';

interface InningProps {
  inning?: {
    header?: string;
    batting?: any[];
    bowling?: any[];
    extras?: { total: number | string; details: string };
    total?: { runs?: number | string; score?: string; details: string };
    didNotBat?: string[];
    fallOfWickets?: string[];
  };
  title?: string;
  battingTable?: ScorecardTable & { extras?: any; total?: any; didNotBat?: string[]; fallOfWickets?: string[] };
  bowlingTable?: ScorecardTable;
}

export const InningSection: React.FC<InningProps> = ({ 
  inning, 
  title, 
  battingTable, 
  bowlingTable 
}) => {
  const heading = title || inning?.header || battingTable?.title || 'Innings Scorecard';

  const extras = battingTable?.extras || inning?.extras;
  const total = battingTable?.total || inning?.total;
  const didNotBat = battingTable?.didNotBat || inning?.didNotBat || [];
  const fallOfWickets = battingTable?.fallOfWickets || inning?.fallOfWickets || [];

  return (
    <div className="w-full bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-lg space-y-5">
      {/* Innings Title */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] pb-3">
        <span className="w-1.5 h-5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] flex-shrink-0" />
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          {heading}
        </h2>
      </div>

      {/* Batting Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Batting
        </h3>
        <BattingTable table={battingTable} battingData={inning?.batting} />
      </div>

      {/* Extras and Total Chips */}
      {(extras || total) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {extras && (
            <div className="bg-white/[0.03] border border-white/[0.06] p-3.5 rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400">Extras</span>
              <span className="font-bold text-white">
                {extras.total} {extras.details && <span className="font-normal text-slate-400 text-[11px]">({extras.details})</span>}
              </span>
            </div>
          )}
          {total && (
            <div className="bg-red-500/10 border border-red-500/30 p-3.5 rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold text-red-300">Total</span>
              <span className="font-extrabold text-red-400 text-sm">
                {total.score || total.runs} {total.details && <span className="font-normal text-red-200/70 text-xs">({total.details})</span>}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Did Not Bat */}
      {didNotBat.length > 0 && (
        <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px] mr-1">
            Did Not Bat:
          </span>
          {didNotBat.map((name, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full bg-white/[0.05] text-slate-300 font-medium text-xs border border-white/10"
            >
              {name}
            </span>
          ))}
        </div>
      )}

      {/* Fall of Wickets */}
      {fallOfWickets.length > 0 && (
        <div className="bg-white/[0.03] border border-white/[0.06] p-3.5 rounded-xl space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Fall of Wickets
          </span>
          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            {fallOfWickets.map((fow, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-lg bg-white/[0.05] border border-white/10 font-mono text-[11px] text-white"
              >
                {fow}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Bowling Section */}
      <div className="space-y-2 pt-2 border-t border-white/[0.06]">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Bowling
        </h3>
        <BowlingTable table={bowlingTable} bowlingData={inning?.bowling} />
      </div>
    </div>
  );
};

export default InningSection;
