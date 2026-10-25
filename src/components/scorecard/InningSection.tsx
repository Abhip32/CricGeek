'use client';

import React, { useState } from 'react';
import { BattingTable } from './BattingTable';
import { BowlingTable } from './BowlingTable';
import { ScorecardTable } from '@/types/match';
import { ChevronDown } from 'lucide-react';

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
  defaultOpen?: boolean;
}

export const InningSection: React.FC<InningProps> = ({ 
  inning, 
  title, 
  battingTable, 
  bowlingTable,
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const heading = title || inning?.header || battingTable?.title || 'Innings Scorecard';

  const extras = battingTable?.extras || inning?.extras;
  const total = battingTable?.total || inning?.total;
  const didNotBat = battingTable?.didNotBat || inning?.didNotBat || [];
  const fallOfWickets = battingTable?.fallOfWickets || inning?.fallOfWickets || [];

  const totalScore = total?.score || total?.runs;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer select-none border-b border-slate-100"
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
          <span className="w-1.5 h-6 rounded-full bg-red-600 flex-shrink-0" />
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 tracking-tight truncate">
            {heading}
          </h2>
          {totalScore && (
            <span className="ml-1 sm:ml-2 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-red-50 text-red-600 border border-red-200/60 flex-shrink-0">
              {totalScore}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-slate-500 hidden sm:inline-block font-medium">
            {isOpen ? 'Collapse' : 'Expand'}
          </span>
          <div className="p-1 rounded-md text-slate-500 hover:text-red-600 transition-colors">
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-red-600' : ''
              }`}
            />
          </div>
        </div>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Batting Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Batting
            </h3>
            <BattingTable table={battingTable} battingData={inning?.batting} />
          </div>

          {/* Extras and Total Chips */}
          {(extras || total) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {extras && (
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600">Extras</span>
                  <span className="font-bold text-slate-900">
                    {extras.total} {extras.details && <span className="font-normal text-slate-500 text-[11px]">({extras.details})</span>}
                  </span>
                </div>
              )}
              {total && (
                <div className="bg-red-50/70 border border-red-200 p-3 rounded-lg flex items-center justify-between text-xs">
                  <span className="font-bold text-red-800">Total</span>
                  <span className="font-extrabold text-red-700 text-sm">
                    {total.score || total.runs} {total.details && <span className="font-normal text-red-900 text-xs">({total.details})</span>}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Did Not Bat */}
          {didNotBat.length > 0 && (
            <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] mr-1">
                Did Not Bat:
              </span>
              {didNotBat.map((name, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200"
                >
                  {name}
                </span>
              ))}
            </div>
          )}

          {/* Fall of Wickets */}
          {fallOfWickets.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Fall of Wickets
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                {fallOfWickets.map((fow, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[11px] text-slate-800 shadow-2xs"
                  >
                    {fow}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bowling Section */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Bowling
            </h3>
            <BowlingTable table={bowlingTable} bowlingData={inning?.bowling} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InningSection;
