'use client';

import React from 'react';
import { DrsReviewSummary } from '@/types/match';
import { ShieldCheck, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface DrsSectionProps {
  drsReviews?: DrsReviewSummary[];
  teamName?: string;
}

export const DrsSection: React.FC<DrsSectionProps> = ({ drsReviews, teamName }) => {
  if (!drsReviews || drsReviews.length === 0) {
    return null;
  }

  // Filter for specific team if provided
  const items = teamName
    ? drsReviews.filter((d) => d.team?.toLowerCase() === teamName.toLowerCase())
    : drsReviews;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-slate-200 text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
            DRS Decision Review System
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">Umpire Review Allocation</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, idx) => {
          const rev = item.reviews;
          if (!rev) return null;

          const remaining = rev.remaining ?? 0;
          const total = rev.reviewsPermitted ?? 2;
          const successful = rev.successful ?? 0;
          const unsuccessful = rev.unsuccessful ?? 0;

          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between gap-3 shadow-2xs"
            >
              <div>
                <div className="text-xs font-bold text-slate-900 truncate max-w-[140px]">
                  {item.team}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-0.5 text-emerald-600 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    +{successful}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-red-600 font-medium">
                    <XCircle className="w-3 h-3" />
                    -{unsuccessful}
                  </span>
                </div>
              </div>

              {/* Remaining Quota Badges */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.max(total, 2) }).map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className={`w-2.5 h-2.5 rounded-full border ${
                        dotIdx < remaining
                          ? 'bg-emerald-500 border-emerald-600 shadow-2xs'
                          : 'bg-slate-200 border-slate-300'
                      }`}
                      title={dotIdx < remaining ? 'Review Available' : 'Review Used'}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-600">
                  {remaining}/{total} Left
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DrsSection;
