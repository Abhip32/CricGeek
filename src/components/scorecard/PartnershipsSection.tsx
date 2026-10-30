'use client';

import React, { useState } from 'react';
import { InningsPartnership, InningsPartnershipsGroup } from '@/types/match';
import ImageWithFallback from '../common/ImageWithFallback';
import { Users2, ChevronDown } from 'lucide-react';

interface PartnershipsSectionProps {
  partnerships?: InningsPartnership[];
  inningsGroups?: InningsPartnershipsGroup[];
  teamName?: string;
  defaultOpen?: boolean;
}

export const PartnershipsSection: React.FC<PartnershipsSectionProps> = ({
  partnerships,
  inningsGroups,
  teamName,
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedGroupIdx, setSelectedGroupIdx] = useState(0);

  // Resolve active partnerships list
  const activeGroup = inningsGroups && inningsGroups.length > 0 ? inningsGroups[selectedGroupIdx] : null;
  const list: InningsPartnership[] = activeGroup?.partnerships || partnerships || [];
  const activeTeam = activeGroup?.team || teamName || 'Team';

  if (!list || list.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs transition-all">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full p-4 sm:p-4.5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer select-none border-b border-slate-100"
      >
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
          <div className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100">
            <Users2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span>Partnerships</span>
              {activeTeam && (
                <span className="text-[11px] font-semibold text-slate-500 lowercase first-letter:uppercase">
                  ({activeTeam})
                </span>
              )}
            </h3>
            <span className="text-[11px] text-slate-400 font-normal">
              Wicket-by-wicket run contributions & ball counts
            </span>
          </div>
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

      {isOpen && (
        <div className="p-4 sm:p-5 space-y-4">
          {/* Innings Selector Pills if multiple groups provided */}
          {inningsGroups && inningsGroups.length > 1 && (
            <div className="flex items-center gap-2 pb-1 overflow-x-auto no-scrollbar">
              {inningsGroups.map((group, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGroupIdx(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    selectedGroupIdx === idx
                      ? 'bg-red-600 text-white shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {group.team} ({group.score || `Inn ${group.period}`})
                </button>
              ))}
            </div>
          )}

          {/* Partnerships List */}
          <div className="space-y-4 divide-y divide-slate-100">
            {list.map((item, idx) => {
              const b1 = item.batsmen?.[0];
              const b2 = item.batsmen?.[1];

              const totalRuns = Number(item.runs) || 0;
              const r1 = Number(b1?.runs) || 0;
              const r2 = Number(b2?.runs) || 0;

              // Calculate percentages for the visual dual bar
              let pct1 = totalRuns > 0 ? Math.round((r1 / totalRuns) * 100) : 50;
              let pct2 = totalRuns > 0 ? Math.round((r2 / totalRuns) * 100) : 50;
              if (pct1 + pct2 > 100) pct2 = 100 - pct1;

              const sr1 = b1 && Number(b1.balls) > 0 ? ((r1 / Number(b1.balls)) * 100).toFixed(1) : '-';
              const sr2 = b2 && Number(b2.balls) > 0 ? ((r2 / Number(b2.balls)) * 100).toFixed(1) : '-';

              return (
                <div key={idx} className={idx > 0 ? 'pt-4' : ''}>
                  {/* Wicket Header Bar */}
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono font-bold text-[11px] shadow-2xs">
                        {item.wicketName || `${item.wicketNumber} Wkt`}
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm tabular-nums">
                        {item.runs} runs
                      </span>
                      {item.overs && (
                        <span className="text-slate-500 font-medium text-[11px]">
                          ({item.overs} ov)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                      {item.runRate && (
                        <span>
                          RR: <strong className="text-slate-800">{item.runRate}</strong>
                        </span>
                      )}
                      {item.start && item.end && (
                        <span className="hidden sm:inline text-slate-400">
                          {item.start.runs}/{item.start.wickets} ({item.start.overs} ov) → {item.end.runs}/{item.end.wickets} ({item.end.overs} ov)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dual-tone Visual Bar */}
                  <div className="w-full h-3 rounded-full overflow-hidden bg-slate-100 flex items-center shadow-inner my-2">
                    <div
                      style={{ width: `${pct1}%` }}
                      className="h-full bg-red-600 transition-all duration-300 relative group"
                      title={`${b1?.name || 'Batsman 1'}: ${r1} runs (${pct1}%)`}
                    />
                    <div
                      style={{ width: `${pct2}%` }}
                      className="h-full bg-slate-800 transition-all duration-300 relative group"
                      title={`${b2?.name || 'Batsman 2'}: ${r2} runs (${pct2}%)`}
                    />
                  </div>

                  {/* Batsmen Breakdown Row */}
                  <div className="grid grid-cols-2 gap-3 text-xs pt-0.5">
                    {/* Batsman 1 (Left / Crimson) */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-red-200 bg-red-50">
                        <ImageWithFallback
                          src={b1?.headshot}
                          alt={b1?.name || 'Batsman 1'}
                          width={28}
                          height={28}
                          className="object-cover w-full h-full"
                          fallbackText={b1?.name || 'B1'}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate text-[11px] sm:text-xs">
                          {b1?.name || 'Batter 1'}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                          <strong className="text-red-700 font-bold">{b1?.runs ?? 0}</strong>{' '}
                          <span className="text-slate-400 font-normal">({b1?.balls ?? 0}b)</span>
                          {sr1 !== '-' && (
                            <span className="hidden sm:inline text-slate-400 text-[10px] ml-1">
                              • SR {sr1}
                            </span>
                          )}
                          <span className="text-slate-400 ml-1.5 font-bold">({pct1}%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Batsman 2 (Right / Slate) */}
                    <div className="flex items-center justify-end text-right gap-2.5">
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate text-[11px] sm:text-xs">
                          {b2?.name || 'Batter 2'}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                          <span className="text-slate-400 mr-1.5 font-bold">({pct2}%)</span>
                          {sr2 !== '-' && (
                            <span className="hidden sm:inline text-slate-400 text-[10px] mr-1">
                              SR {sr2} •
                            </span>
                          )}
                          <span className="text-slate-400 font-normal">({b2?.balls ?? 0}b) </span>
                          <strong className="text-slate-900 font-bold">{b2?.runs ?? 0}</strong>
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-slate-300 bg-slate-100">
                        <ImageWithFallback
                          src={b2?.headshot}
                          alt={b2?.name || 'Batsman 2'}
                          width={28}
                          height={28}
                          className="object-cover w-full h-full"
                          fallbackText={b2?.name || 'B2'}
                        />
                      </div>
                      <div className="w-2 h-2 rounded-full bg-slate-800 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnershipsSection;
