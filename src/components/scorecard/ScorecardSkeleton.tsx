'use client';

import React from 'react';

export const ScorecardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner Skeleton (Match Header) */}
      <div className="bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 sm:p-7 space-y-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2.5">
            <div className="h-6 w-64 sm:w-96 rounded-lg shimmer-block" />
            <div className="h-4 w-44 rounded-lg shimmer-block-subtle" />
          </div>
          <div className="h-6 w-20 rounded-full shimmer-block" />
        </div>

        {/* Score blocks */}
        <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-4 sm:gap-6">
          <div className="md:col-span-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-8 rounded-md shimmer-block" />
              <div className="h-5 w-32 rounded shimmer-block" />
            </div>
            <div className="space-y-1.5 text-right">
              <div className="h-6 w-20 rounded shimmer-block ml-auto" />
              <div className="h-3.5 w-12 rounded shimmer-block-subtle ml-auto" />
            </div>
          </div>

          <div className="md:col-span-1 text-center font-black text-xs text-slate-500">
            VS
          </div>

          <div className="md:col-span-5 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-8 rounded-md shimmer-block" />
              <div className="h-5 w-32 rounded shimmer-block" />
            </div>
            <div className="space-y-1.5 text-right">
              <div className="h-6 w-20 rounded shimmer-block ml-auto" />
              <div className="h-3.5 w-12 rounded shimmer-block-subtle ml-auto" />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div className="h-4 w-60 rounded shimmer-block-subtle" />
          <div className="h-4 w-28 rounded-full shimmer-block" />
        </div>
      </div>

      {/* Navigation Tabs Skeleton */}
      <div className="flex gap-2">
        <div className="h-9 w-28 rounded-xl shimmer-block" />
        <div className="h-9 w-28 rounded-xl shimmer-block-subtle border border-white/10" />
        <div className="h-9 w-24 rounded-xl shimmer-block-subtle border border-white/10" />
        <div className="h-9 w-28 rounded-xl shimmer-block-subtle border border-white/10" />
      </div>

      {/* Innings 1 Section */}
      <div className="space-y-4">
        {/* Innings Title Bar */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-1.5 h-6 bg-red-600 rounded-full" />
          <div className="h-5 w-44 rounded shimmer-block" />
        </div>

        {/* Batting Table Skeleton */}
        <div className="bg-white/[0.035] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-lg">
          <div className="border-b border-white/[0.06] bg-white/[0.03] px-4 py-3 flex items-center justify-between">
            <div className="h-3.5 w-20 rounded shimmer-block" />
            <div className="flex items-center gap-6">
              <div className="h-3.5 w-8 rounded shimmer-block" />
              <div className="h-3.5 w-8 rounded shimmer-block" />
              <div className="h-3.5 w-8 rounded shimmer-block" />
              <div className="h-3.5 w-8 rounded shimmer-block" />
              <div className="h-3.5 w-10 rounded shimmer-block" />
            </div>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <div className="space-y-1.5 flex-1 max-w-[200px]">
                  <div className="h-4 w-32 rounded shimmer-block" />
                  <div className="h-2.5 w-24 rounded shimmer-block-subtle" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-4 w-8 rounded shimmer-block" />
                  <div className="h-4 w-8 rounded shimmer-block-subtle" />
                  <div className="h-4 w-8 rounded shimmer-block-subtle" />
                  <div className="h-4 w-8 rounded shimmer-block-subtle" />
                  <div className="h-4 w-10 rounded shimmer-block-subtle" />
                </div>
              </div>
            ))}
          </div>

          {/* Extras & Total Rows */}
          <div className="border-t border-white/[0.06] bg-white/[0.02] p-4 flex items-center justify-between">
            <div className="h-4 w-32 rounded shimmer-block" />
            <div className="h-5 w-24 rounded shimmer-block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorecardSkeleton;
