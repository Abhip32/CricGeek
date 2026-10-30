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

          {/* Fall of Wickets (Rich cards or pill list) */}
          {richFow && richFow.length > 0 ? (
            <div className="bg-slate-50 border border-slate-200 p-3.5 sm:p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  Fall of Wickets
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {richFow.length} wickets
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {richFow.map((f, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 p-2.5 rounded-lg flex items-center justify-between gap-2 shadow-2xs hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                        <ImageWithFallback
                          src={f.batsman?.headshot}
                          alt={f.batsman?.name || 'Batsman'}
                          width={28}
                          height={28}
                          className="object-cover w-full h-full"
                          fallbackText={f.batsman?.name || 'W'}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-xs truncate">
                          {f.batsman?.name || `Wicket ${f.wicketNumber}`}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {f.runsScored !== undefined && (
                            <span>{f.runsScored} ({f.ballsFaced || 0}b)</span>
                          )}
                          {f.fowType && (
                            <span className="text-slate-400 text-[10px] ml-1 truncate block">
                              {f.fowType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="font-mono font-extrabold text-red-600 text-xs">
                        {f.runs}/{f.wicketNumber}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {f.wicketOver} ov
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : fallOfWickets.length > 0 ? (
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
          ) : null}

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
