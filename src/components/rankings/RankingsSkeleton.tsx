'use client';

import React from 'react';

export const RankingsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Leaderboard Table Skeleton */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="border-b border-slate-200 bg-slate-100 py-3 px-4 flex items-center justify-between text-xs">
          <div className="h-3.5 w-12 rounded shimmer-block" />
          <div className="h-3.5 w-36 rounded shimmer-block" />
          <div className="hidden sm:flex items-center gap-8">
            <div className="h-3.5 w-14 rounded shimmer-block" />
            <div className="h-3.5 w-14 rounded shimmer-block" />
            <div className="h-3.5 w-14 rounded shimmer-block" />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="py-3.5 px-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-7 w-7 rounded-full shimmer-block" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full shimmer-block flex-shrink-0" />
                  <div className="h-4 w-32 sm:w-40 rounded shimmer-block" />
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="hidden sm:block h-3.5 w-8 rounded shimmer-block-subtle" />
                <div className="hidden sm:block h-3.5 w-12 rounded shimmer-block-subtle" />
                <div className="h-4 w-12 rounded shimmer-block" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingsSkeleton;
