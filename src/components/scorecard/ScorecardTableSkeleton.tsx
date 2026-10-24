'use client';

import React from 'react';

export const ScorecardTableSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Innings 1 Section Skeleton */}
      <div className="space-y-4">
        {/* Innings Title Bar */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-1.5 h-6 bg-red-600 rounded-full" />
          <div className="h-5 w-48 rounded shimmer-block" />
        </div>

        {/* Batting Table Skeleton */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="border-b border-slate-200 bg-slate-100 px-4 py-3 flex items-center justify-between">
            <div className="h-3.5 w-24 rounded shimmer-block" />
            <div className="flex items-center gap-5 sm:gap-7">
              <div className="h-3.5 w-7 rounded shimmer-block" />
              <div className="h-3.5 w-7 rounded shimmer-block" />
              <div className="h-3.5 w-7 rounded shimmer-block" />
              <div className="h-3.5 w-7 rounded shimmer-block" />
              <div className="h-3.5 w-9 rounded shimmer-block" />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <div className="space-y-1.5 flex-1 max-w-[200px]">
                  <div className="h-4 w-32 rounded shimmer-block" />
                  <div className="h-2.5 w-24 rounded shimmer-block-subtle" />
                </div>
                <div className="flex items-center gap-5 sm:gap-7">
                  <div className="h-4 w-7 rounded shimmer-block" />
                  <div className="h-4 w-7 rounded shimmer-block-subtle" />
                  <div className="h-4 w-7 rounded shimmer-block-subtle" />
                  <div className="h-4 w-7 rounded shimmer-block-subtle" />
                  <div className="h-4 w-9 rounded shimmer-block-subtle" />
                </div>
              </div>
            ))}
          </div>

          {/* Extras & Total Row */}
          <div className="border-t border-slate-200 bg-slate-50/70 p-4 flex items-center justify-between">
            <div className="h-4 w-32 rounded shimmer-block" />
            <div className="h-5 w-24 rounded shimmer-block" />
          </div>
        </div>

        {/* Bowling Table Skeleton */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="border-b border-slate-200 bg-slate-100 px-4 py-3 flex items-center justify-between">
            <div className="h-3.5 w-24 rounded shimmer-block" />
            <div className="flex items-center gap-5 sm:gap-7">
              <div className="h-3.5 w-7 rounded shimmer-block" />
              <div className="h-3.5 w-7 rounded shimmer-block" />
              <div className="h-3.5 w-7 rounded shimmer-block" />
              <div className="h-3.5 w-7 rounded shimmer-block" />
              <div className="h-3.5 w-9 rounded shimmer-block" />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <div className="h-4 w-32 rounded shimmer-block" />
                <div className="flex items-center gap-5 sm:gap-7">
                  <div className="h-4 w-7 rounded shimmer-block" />
                  <div className="h-4 w-7 rounded shimmer-block-subtle" />
                  <div className="h-4 w-7 rounded shimmer-block-subtle" />
                  <div className="h-4 w-7 rounded shimmer-block" />
                  <div className="h-4 w-9 rounded shimmer-block-subtle" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorecardTableSkeleton;
