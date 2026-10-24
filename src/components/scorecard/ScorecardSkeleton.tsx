'use client';

import React from 'react';

export const ScorecardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner Skeleton */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2.5">
            <div className="h-6 w-64 sm:w-96 rounded-md shimmer-block" />
            <div className="h-4 w-44 rounded-md shimmer-block" />
          </div>
          <div className="h-6 w-20 rounded-full shimmer-block" />
        </div>

        {/* Score blocks */}
        <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-4 sm:gap-6">
          <div className="md:col-span-5 h-24 rounded-xl shimmer-block-subtle border border-slate-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-8 rounded-md shimmer-block" />
              <div className="h-5 w-28 rounded shimmer-block" />
            </div>
            <div className="space-y-1.5">
              <div className="h-6 w-16 rounded shimmer-block ml-auto" />
              <div className="h-3 w-10 rounded shimmer-block ml-auto" />
            </div>
          </div>

          <div className="md:col-span-1 text-center font-black text-xs text-slate-300">
            VS
          </div>

          <div className="md:col-span-5 h-24 rounded-xl shimmer-block-subtle border border-slate-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-8 rounded-md shimmer-block" />
              <div className="h-5 w-28 rounded shimmer-block" />
            </div>
            <div className="space-y-1.5">
              <div className="h-6 w-16 rounded shimmer-block ml-auto" />
              <div className="h-3 w-10 rounded shimmer-block ml-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-2">
        <div className="h-9 w-28 rounded-lg shimmer-block" />
        <div className="h-9 w-28 rounded-lg shimmer-block-subtle border border-slate-200" />
        <div className="h-9 w-24 rounded-lg shimmer-block-subtle border border-slate-200" />
      </div>

      {/* Innings Table 1 */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="h-5 w-48 rounded-md shimmer-block" />
          <div className="h-4 w-20 rounded shimmer-block" />
        </div>
        <div className="p-4 space-y-3">
          <div className="h-9 rounded-lg shimmer-block" />
          <div className="h-8 rounded-md shimmer-block-subtle" />
          <div className="h-8 rounded-md shimmer-block-subtle" />
          <div className="h-8 rounded-md shimmer-block-subtle" />
          <div className="h-8 rounded-md shimmer-block-subtle" />
          <div className="h-8 rounded-md shimmer-block-subtle" />
        </div>
      </div>

      {/* Innings Table 2 */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="h-5 w-48 rounded-md shimmer-block" />
          <div className="h-4 w-20 rounded shimmer-block" />
        </div>
        <div className="p-4 space-y-3">
          <div className="h-9 rounded-lg shimmer-block" />
          <div className="h-8 rounded-md shimmer-block-subtle" />
          <div className="h-8 rounded-md shimmer-block-subtle" />
          <div className="h-8 rounded-md shimmer-block-subtle" />
          <div className="h-8 rounded-md shimmer-block-subtle" />
        </div>
      </div>
    </div>
  );
};

export default ScorecardSkeleton;
