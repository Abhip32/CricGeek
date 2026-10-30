'use client';

import React, { useState } from 'react';
import { InningsPartnership, InningsPartnershipsGroup } from '@/types/match';
import { ChevronDown } from 'lucide-react';

interface PartnershipsSectionProps {
  partnerships?: InningsPartnership[];
  inningsGroups?: InningsPartnershipsGroup[];
  teamName?: string;
  defaultOpen?: boolean;
  hideAccordion?: boolean;
}

export const PartnershipsSection: React.FC<PartnershipsSectionProps> = ({
  partnerships,
  inningsGroups,
  teamName,
  defaultOpen = false,
  hideAccordion = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedGroupIdx, setSelectedGroupIdx] = useState(0);

  const activeGroup = inningsGroups && inningsGroups.length > 0 ? inningsGroups[selectedGroupIdx] : null;
  const list: InningsPartnership[] = activeGroup?.partnerships || partnerships || [];
  const activeTeam = activeGroup?.team || teamName || 'Team';

  if (!list || list.length === 0) {
    return null;
  }

  const renderContent = () => (
    <div className={`space-y-3 ${hideAccordion ? '' : 'p-3 sm:p-4 border-t border-slate-100'}`}>
      {/* Innings Selector Pills if multiple groups provided */}
      {inningsGroups && inningsGroups.length > 1 && (
        <div className="flex items-center gap-1.5 pb-1 overflow-x-auto no-scrollbar">
          {inningsGroups.map((group, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedGroupIdx(idx)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all whitespace-nowrap ${
                selectedGroupIdx === idx
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {group.team} ({group.score || `Inn ${group.period}`})
            </button>
          ))}
        </div>
      )}

      {/* Compact ESPNcricinfo Partnership Rows */}
      <div className="space-y-3 divide-y divide-slate-100">
        {list.map((item, idx) => {
          const b1 = item.batsmen?.[0];
          const b2 = item.batsmen?.[1];

          const totalRuns = Number(item.runs) || 0;
          const r1 = Number(b1?.runs) || 0;
          const r2 = Number(b2?.runs) || 0;

          let pct1 = totalRuns > 0 ? Math.round((r1 / totalRuns) * 100) : 50;
          let pct2 = totalRuns > 0 ? Math.round((r2 / totalRuns) * 100) : 50;
          if (pct1 + pct2 > 100) pct2 = 100 - pct1;

          return (
            <div key={idx} className={idx > 0 ? 'pt-3' : ''}>
              {/* Row: Wicket Meta Header */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-heading font-black text-red-600 uppercase text-[11px] tracking-wider">
                  {item.wicketName ? `${item.wicketName} Wicket` : `${item.wicketNumber}th Wicket`}
                </span>
                <span className="font-mono text-slate-600 text-xs">
                  <strong className="text-slate-900 font-black">{item.runs} runs</strong> ({item.overs} ov)
                  {item.runRate && <span className="text-slate-400 ml-1.5">• RR {item.runRate}</span>}
                </span>
              </div>

              {/* Proportional Dual Bar */}
              <div className="w-full h-2 rounded-full overflow-hidden bg-slate-100 flex items-center mb-1.5 border border-slate-200/50">
                <div
                  style={{ width: `${pct1}%` }}
                  className="h-full bg-red-600 transition-all duration-200"
                />
                <div
                  style={{ width: `${pct2}%` }}
                  className="h-full bg-slate-800 transition-all duration-200"
                />
              </div>

              {/* Batters contribution text */}
              <div className="flex items-center justify-between text-xs">
                <div className="truncate max-w-[48%] flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                  <span className="font-bold text-slate-900 truncate text-[11px]">{b1?.name || 'Batter 1'}</span>
                  <span className="font-mono text-slate-500 font-bold text-[11px] flex-shrink-0">
                    {b1?.runs ?? 0} <span className="font-normal text-slate-400">({b1?.balls ?? 0}b)</span>
                  </span>
                </div>

                <div className="truncate max-w-[48%] flex items-center justify-end gap-1.5 text-right">
                  <span className="font-mono text-slate-500 font-bold text-[11px] flex-shrink-0">
                    {b2?.runs ?? 0} <span className="font-normal text-slate-400">({b2?.balls ?? 0}b)</span>
                  </span>
                  <span className="font-bold text-slate-900 truncate text-[11px]">{b2?.name || 'Batter 2'}</span>
                  <div className="w-2 h-2 rounded-full bg-slate-800 flex-shrink-0" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (hideAccordion) {
    return renderContent();
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-all">
      {/* Sleek Accordion Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            Partnerships
          </span>
          {activeTeam && (
            <span className="text-[11px] text-slate-400 font-medium">
              ({activeTeam})
            </span>
          )}
          <span className="text-[10px] text-slate-400 font-mono">
            • {list.length} Wickets
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="text-[11px] font-medium hidden sm:inline">
            {isOpen ? 'Hide' : 'Show'}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-150 ${
              isOpen ? 'rotate-180 text-red-600' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && renderContent()}
    </div>
  );
};

export default PartnershipsSection;
