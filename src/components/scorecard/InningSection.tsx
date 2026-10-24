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
    extras?: { total: number; details: string };
    total?: { runs: number; details: string };
    fallOfWickets?: string[];
  };
  title?: string;
  battingTable?: ScorecardTable;
  bowlingTable?: ScorecardTable;
}

export const InningSection: React.FC<InningProps> = ({ 
  inning, 
  title, 
  battingTable, 
  bowlingTable 
}) => {
  const heading = title || inning?.header || battingTable?.title || 'Innings Scorecard';

  return (
    <div className="mb-10 space-y-6">
      {/* Innings Title Banner */}
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-500" />
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          {heading}
        </h2>
      </div>

      {/* Batting Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
          Batting
        </h3>
        <BattingTable table={battingTable} battingData={inning?.batting} />
      </div>

      {/* Extras and Total if available */}
      {(inning?.extras || inning?.total) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inning.extras && (
            <div className="glass-panel p-4 rounded-xl border border-white/5 flex justify-between items-center text-sm">
              <span className="text-slate-400">Extras</span>
              <span className="font-semibold text-white">
                {inning.extras.total} <span className="text-xs text-slate-500">({inning.extras.details})</span>
              </span>
            </div>
          )}
          {inning.total && (
            <div className="glass-panel p-4 rounded-xl border border-white/5 flex justify-between items-center text-sm">
              <span className="text-slate-400 font-semibold">Total</span>
              <span className="text-base font-bold text-emerald-400">
                {inning.total.runs} <span className="text-xs text-slate-400 font-normal">({inning.total.details})</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Fall of Wickets if available */}
      {inning?.fallOfWickets && inning.fallOfWickets.length > 0 && (
        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Fall of Wickets
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
            {inning.fallOfWickets.join(', ')}
          </p>
        </div>
      )}

      {/* Bowling Section */}
      <div className="space-y-2 pt-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">
          Bowling
        </h3>
        <BowlingTable table={bowlingTable} bowlingData={inning?.bowling} />
      </div>
    </div>
  );
};

export default InningSection;
