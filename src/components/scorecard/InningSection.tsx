'use client';

import React, { useState } from 'react';
import { BattingTable } from './BattingTable';
import { BowlingTable } from './BowlingTable';
import { ScorecardTable, InningsPartnership, FallOfWicketItem, DrsReviewSummary } from '@/types/match';
import PartnershipsSection from './PartnershipsSection';
import DrsSection from './DrsSection';
import ImageWithFallback from '../common/ImageWithFallback';
import { ChevronDown, ShieldAlert } from 'lucide-react';

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
  squads?: Record<string, any[]> | null;
  partnerships?: InningsPartnership[];
  richFow?: FallOfWicketItem[];
  drsReviews?: DrsReviewSummary[];
  defaultOpen?: boolean;
}

export const InningSection: React.FC<InningProps> = ({ 
  inning, 
  title, 
  battingTable, 
  bowlingTable,
  squads,
  partnerships,
  richFow,
  drsReviews,
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
            <span className="ml-1 sm:ml-2 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-red-50 text-red-600 border border-red-200/60 flex-shrink-0 font-mono">
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
        <div className="p-4 sm:p-6 space-y-6">
          {/* Batting Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Batting
            </h3>
            <BattingTable table={battingTable} battingData={inning?.batting} squads={squads} />
          </div>

          {/* Extras and Total Chips */}
          {(extras || total) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {extras && (
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600">Extras</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {extras.total} {extras.details && <span className="font-normal text-slate-500 text-[11px] font-sans">({extras.details})</span>}
                  </span>
                </div>
              )}
              {total && (
                <div className="bg-red-50/70 border border-red-200 p-3 rounded-lg flex items-center justify-between text-xs">
                  <span className="font-bold text-red-800">Total</span>
                  <span className="font-extrabold text-red-700 text-sm font-mono">
                    {total.score || total.runs} {total.details && <span className="font-normal text-red-900 text-xs font-sans">({total.details})</span>}
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

          {/* Fall of Wickets (Clean ESPNcricinfo editorial inline format) */}
          {((richFow && richFow.length > 0) || (fallOfWickets && fallOfWickets.length > 0)) && (
            <div className="bg-slate-50 border border-slate-200 p-3 sm:p-3.5 rounded-lg text-xs space-y-1">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                Fall of Wickets
              </span>
              <div className="text-slate-700 text-xs leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
                {richFow && richFow.length > 0
                  ? richFow.map((f, i) => (
                      <span key={i} className="inline-flex items-center">
                        <strong className="text-slate-900 font-mono font-bold">{f.runs}-{f.wicketNumber}</strong>
                        <span className="text-slate-600 ml-1">
                          ({f.batsman?.name || `Wkt ${f.wicketNumber}`}, {f.wicketOver} ov)
                        </span>
                        {i < richFow.length - 1 && <span className="text-slate-300 ml-1.5">,</span>}
                      </span>
                    ))
                  : fallOfWickets.map((fow, i) => (
                      <span key={i} className="inline-flex items-center">
                        <span className="font-mono text-slate-800">{fow}</span>
                        {i < fallOfWickets.length - 1 && <span className="text-slate-300 ml-1.5">,</span>}
                      </span>
                    ))}
              </div>
            </div>
          )}

          {/* Innings Partnerships Section */}
          {partnerships && partnerships.length > 0 && (
            <PartnershipsSection
              partnerships={partnerships}
              teamName={heading}
              defaultOpen={true}
            />
          )}

          {/* Innings DRS Reviews */}
          {drsReviews && drsReviews.length > 0 && (
            <DrsSection drsReviews={drsReviews} teamName={heading} />
          )}

          {/* Bowling Section */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Bowling
            </h3>
            <BowlingTable table={bowlingTable} bowlingData={inning?.bowling} squads={squads} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InningSection;
