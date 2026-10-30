'use client';

import React, { useState } from 'react';
import { BattingTable } from './BattingTable';
import { BowlingTable } from './BowlingTable';
import { ScorecardTable, InningsPartnership, FallOfWicketItem, DrsReviewSummary } from '@/types/match';
import PartnershipsSection from './PartnershipsSection';
import DrsSection from './DrsSection';
import { ChevronDown, Users, Activity, FileSpreadsheet } from 'lucide-react';

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
  const [activeView, setActiveView] = useState<'scorecard' | 'partnerships' | 'fow'>('scorecard');

  const heading = title || inning?.header || battingTable?.title || 'Innings Scorecard';

  const extras = battingTable?.extras || inning?.extras;
  const total = battingTable?.total || inning?.total;
  const didNotBat = battingTable?.didNotBat || inning?.didNotBat || [];
  const fallOfWickets = battingTable?.fallOfWickets || inning?.fallOfWickets || [];

  const totalScore = total?.score || total?.runs;
  const hasPartnerships = Boolean(partnerships && partnerships.length > 0);
  const hasFow = Boolean((richFow && richFow.length > 0) || (fallOfWickets && fallOfWickets.length > 0));
  const fowCount = richFow?.length || fallOfWickets?.length || 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all">
      {/* Innings Card Header with Rightmost Segmented Pills */}
      <div className="w-full p-3.5 sm:p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 bg-white hover:bg-slate-50/50 transition-colors">
        {/* Left: Indicator, Team Heading & Total Score */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 sm:gap-3 min-w-0 cursor-pointer select-none flex-1"
        >
          <span className="w-1.5 h-6 rounded-full bg-red-600 flex-shrink-0" />
          <h2 className="text-sm sm:text-base md:text-lg font-heading font-black text-slate-900 tracking-wide uppercase truncate">
            {heading}
          </h2>
          {totalScore && (
            <span className="ml-1 sm:ml-2 px-2.5 py-0.5 rounded-full text-xs font-mono font-black bg-red-50 text-red-600 border border-red-200/80 flex-shrink-0">
              {totalScore}
            </span>
          )}
        </div>

        {/* Rightmost: View Toggle Pills & Accordion Chevron */}
        <div className="flex items-center justify-between md:justify-end gap-2.5 sm:gap-3 flex-shrink-0">
          {/* Segmented Toggle Pills: Scorecard | Partnerships | FOW */}
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('scorecard');
                setIsOpen(true);
              }}
              className={`px-3 py-1 rounded-md text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'scorecard'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Scorecard</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveView('partnerships');
                setIsOpen(true);
              }}
              className={`px-3 py-1 rounded-md text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'partnerships'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Partnership</span>
              {hasPartnerships && (
                <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                  activeView === 'partnerships' ? 'bg-red-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {partnerships!.length}
                </span>
              )}
            </button>

            {hasFow && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveView('fow');
                  setIsOpen(true);
                }}
                className={`px-3 py-1 rounded-md text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'fow'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>FOW</span>
                {fowCount > 0 && (
                  <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                    activeView === 'fow' ? 'bg-red-700 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {fowCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Collapse/Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Collapse innings' : 'Expand innings'}
            className="flex items-center gap-1 px-2 py-1.5 rounded-md text-slate-500 hover:text-red-600 hover:bg-slate-100 transition-colors cursor-pointer select-none"
          >
            <span className="text-xs font-heading font-bold uppercase tracking-wider hidden lg:inline">
              {isOpen ? 'Collapse' : 'Expand'}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-red-600' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* VIEW 1: SCORECARD (Batting & Bowling) */}
          {activeView === 'scorecard' && (
            <div className="space-y-6">
              {/* Batting Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-red-600 rounded-full" />
                  <h3 className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider">
                    Batting
                  </h3>
                </div>
                <BattingTable table={battingTable} battingData={inning?.batting} squads={squads} />
              </div>

              {/* Extras and Total Chips */}
              {(extras || total) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {extras && (
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between text-xs">
                      <span className="font-heading font-bold text-slate-700 uppercase tracking-wide">Extras</span>
                      <span className="font-black text-slate-900 font-mono">
                        {extras.total} {extras.details && <span className="font-normal text-slate-500 text-[11px] font-sans">({extras.details})</span>}
                      </span>
                    </div>
                  )}
                  {total && (
                    <div className="bg-red-50/70 border border-red-200 p-3 rounded-lg flex items-center justify-between text-xs">
                      <span className="font-heading font-black text-red-800 uppercase tracking-wide">Total</span>
                      <span className="font-black text-red-700 text-sm font-mono">
                        {total.score || total.runs} {total.details && <span className="font-normal text-red-900 text-xs font-sans">({total.details})</span>}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Did Not Bat */}
              {didNotBat.length > 0 && (
                <div className="pt-1 flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="font-heading font-black text-slate-500 uppercase tracking-wider text-[11px] mr-1">
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

              {/* Fall of Wickets summary line */}
              {hasFow && (
                <div className="bg-slate-50 border border-slate-200 p-3 sm:p-3.5 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-slate-800 uppercase tracking-wider text-[11px] block">
                      Fall of Wickets
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveView('fow')}
                      className="text-[11px] font-heading font-bold text-red-600 hover:text-red-700 uppercase tracking-wider cursor-pointer"
                    >
                      View Timeline →
                    </button>
                  </div>
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

              {/* Bowling Section */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-red-600 rounded-full" />
                  <h3 className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider">
                    Bowling
                  </h3>
                </div>
                <BowlingTable table={bowlingTable} bowlingData={inning?.bowling} squads={squads} />
              </div>

              {/* Innings DRS Reviews */}
              {drsReviews && drsReviews.length > 0 && (
                <DrsSection drsReviews={drsReviews} teamName={heading} />
              )}
            </div>
          )}

          {/* VIEW 2: PARTNERSHIPS */}
          {activeView === 'partnerships' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-red-600 rounded-full" />
                  <h3 className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider">
                    Partnership Crease Breakdown • {heading}
                  </h3>
                </div>
                {hasPartnerships && (
                  <span className="text-xs font-mono font-black text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                    {partnerships!.length} Wickets
                  </span>
                )}
              </div>

              {hasPartnerships ? (
                <PartnershipsSection
                  partnerships={partnerships}
                  teamName={heading}
                  defaultOpen={true}
                  hideAccordion={true}
                />
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-heading font-bold text-slate-700">
                    No Partnership Records Available
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Partnership trajectories and batsman contributions will populate automatically as wickets fall in this innings.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: FALL OF WICKETS */}
          {activeView === 'fow' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-3.5 bg-red-600 rounded-full" />
                  <h3 className="text-xs font-heading font-black text-slate-900 uppercase tracking-wider">
                    Fall of Wickets Timeline • {heading}
                  </h3>
                </div>
                {fowCount > 0 && (
                  <span className="text-xs font-mono font-black text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                    {fowCount} Dismissals
                  </span>
                )}
              </div>

              {richFow && richFow.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {richFow.map((f, i) => (
                    <div 
                      key={i} 
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 hover:border-red-400 hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-heading font-black text-red-600 uppercase tracking-wider">
                          {f.wicketNumber}{f.wicketNumber === 1 ? 'st' : f.wicketNumber === 2 ? 'nd' : f.wicketNumber === 3 ? 'rd' : 'th'} Wicket
                        </span>
                        <span className="text-xs font-mono font-black text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          {f.runs} runs
                        </span>
                      </div>
                      <div className="mt-2 text-sm font-heading font-black text-slate-900 truncate">
                        {f.batsman?.name || `Wicket ${f.wicketNumber}`}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-1 flex items-center justify-between">
                        <span>Over {f.wicketOver} ov</span>
                        {f.batsman?.id && (
                          <span className="text-[10px] text-slate-400">ID: {f.batsman.id}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : fallOfWickets && fallOfWickets.length > 0 ? (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <div className="flex flex-wrap gap-2">
                    {fallOfWickets.map((fow, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-bold text-slate-800 shadow-xs">
                        {fow}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Activity className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-heading font-bold text-slate-700">No Wickets Fallen</p>
                  <p className="text-xs text-slate-500 mt-1">This innings has not lost any wickets yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InningSection;
