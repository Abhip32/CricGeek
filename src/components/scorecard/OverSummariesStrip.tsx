'use client';

import React from 'react';
import { useOvers } from '@/hooks/useCricketQueries';
import { Layers, Activity, ChevronRight, X } from 'lucide-react';

interface OverSummariesStripProps {
  matchUrl?: string;
  selectedOver?: number | null;
  onSelectOver?: (overNum: number | null) => void;
  className?: string;
}

export const OverSummariesStrip: React.FC<OverSummariesStripProps> = ({
  matchUrl,
  selectedOver = null,
  onSelectOver,
  className = ''
}) => {
  const { data: oversData, isLoading } = useOvers(matchUrl);

  if (isLoading || !oversData || !oversData.overs || oversData.overs.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-2xs space-y-2.5 ${className}`}>
      {/* Header with Title and Clear Action */}
      <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-red-600 rounded-full flex-shrink-0" />
          <span className="font-heading font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-red-600" />
            <span>Over Summaries ({oversData.oversCount} ovs)</span>
          </span>
        </div>

        {selectedOver !== null && onSelectOver && (
          <button
            onClick={() => onSelectOver(null)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
          >
            <span>Clear Filter (Ov {selectedOver})</span>
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Over Chips Track */}
      <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1 touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch]">
        {oversData.overs.map((ov) => {
          const isSelected = selectedOver === ov.overNumber;
          return (
            <button
              key={`${ov.period}_${ov.overNumber}`}
              onClick={() => onSelectOver && onSelectOver(isSelected ? null : ov.overNumber)}
              className={`flex-shrink-0 p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-red-600 text-white border-red-600 shadow-sm scale-[1.02]'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Over & Run stats header */}
              <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
                <span className="font-black">Over {ov.overNumber}</span>
                <span className={`text-[11px] font-bold font-mono ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                  {ov.runs} {ov.runs === 1 ? 'run' : 'runs'}
                </span>
                {ov.wickets > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-black uppercase tracking-wider ${
                      isSelected ? 'bg-white text-red-600' : 'bg-red-600 text-white'
                    }`}
                  >
                    {ov.wickets} {ov.wickets === 1 ? 'Wkt' : 'Wkts'}
                  </span>
                )}
              </div>

              {/* Ball breakdown chips */}
              <div className="flex items-center gap-1">
                {ov.balls.slice(0, 8).map((b, bIdx) => (
                  <span
                    key={bIdx}
                    className={`w-5 h-5 rounded text-[10px] flex items-center justify-center font-mono font-bold ${
                      b === 'W'
                        ? isSelected
                          ? 'bg-white text-red-600 shadow-xs'
                          : 'bg-red-600 text-white shadow-xs'
                        : b === '4' || b === '6'
                        ? isSelected
                          ? 'bg-red-800 text-white'
                          : 'bg-purple-100 text-purple-800 border border-purple-200 font-extrabold'
                        : isSelected
                        ? 'bg-red-700 text-white'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Bowler attribution */}
              {ov.bowler && (
                <div className={`text-[10px] truncate max-w-[140px] mt-1 font-medium ${isSelected ? 'text-red-100' : 'text-slate-400'}`}>
                  {ov.bowler}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OverSummariesStrip;
