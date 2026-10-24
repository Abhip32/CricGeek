'use client';

import React from 'react';

export const ScorecardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-5 w-64 sm:w-96 bg-slate-200 rounded-md" />
            <div className="h-3.5 w-40 bg-slate-100 rounded-md" />
          </div>
          <div className="h-6 w-16 bg-slate-200 rounded-full" />
        </div>

        {/* Score blocks */}
        <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-4">
          <div className="md:col-span-5 h-20 bg-slate-100 rounded-xl" />
          <div className="md:col-span-1 h-6 w-8 mx-auto bg-slate-100 rounded-md" />
          <div className="md:col-span-5 h-20 bg-slate-100 rounded-xl" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-2">
        <div className="h-9 w-28 bg-slate-200 rounded-lg" />
        <div className="h-9 w-28 bg-slate-100 rounded-lg" />
        <div className="h-9 w-24 bg-slate-100 rounded-lg" />
      </div>

      {/* Innings Table 1 */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
        <div className="h-5 w-48 bg-slate-200 rounded-md" />
        <div className="space-y-2.5">
          <div className="h-8 bg-slate-100 rounded-lg" />
          <div className="h-8 bg-slate-50 rounded-lg" />
          <div className="h-8 bg-slate-50 rounded-lg" />
          <div className="h-8 bg-slate-50 rounded-lg" />
          <div className="h-8 bg-slate-50 rounded-lg" />
        </div>
      </div>

      {/* Innings Table 2 */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-xs">
        <div className="h-5 w-48 bg-slate-200 rounded-md" />
        <div className="space-y-2.5">
          <div className="h-8 bg-slate-100 rounded-lg" />
          <div className="h-8 bg-slate-50 rounded-lg" />
          <div className="h-8 bg-slate-50 rounded-lg" />
          <div className="h-8 bg-slate-50 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ScorecardSkeleton;
