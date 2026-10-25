'use client';

import React from 'react';

export const RankingsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top 3 Podium Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col items-center text-center space-y-3">
          <div className="w-8 h-8 rounded-full shimmer-block" />
          <div className="w-11 h-7 rounded-md shimmer-block" />
          <div className="h-4 w-28 rounded shimmer-block" />
          <div className="h-3.5 w-20 rounded shimmer-block" />
        </div>

        {/* 1st Place (Champion) */}
        <div className="order-1 md:order-2 bg-white border-2 border-amber-200 rounded-xl p-5 shadow-sm flex flex-col items-center text-center space-y-3 relative">
          <div className="h-5 w-32 rounded-full shimmer-block -mt-2" />
          <div className="w-10 h-10 rounded-full shimmer-block" />
          <div className="w-14 h-9 rounded-md shimmer-block" />
          <div className="h-5 w-36 rounded shimmer-block" />
          <div className="h-4 w-24 rounded shimmer-block" />
        </div>

        {/* 3rd Place */}
        <div className="order-3 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col items-center text-center space-y-3">
          <div className="w-8 h-8 rounded-full shimmer-block" />
          <div className="w-11 h-7 rounded-md shimmer-block" />
          <div className="h-4 w-28 rounded shimmer-block" />
          <div className="h-3.5 w-20 rounded shimmer-block" />
        </div>
      </div>

      {/* Leaderboard Table Skeleton */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
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
                <div className="h-4 w-5 rounded shimmer-block" />
                <div className="flex items-center gap-3">
                  <div className="w-7 h-5 rounded shimmer-block flex-shrink-0" />
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
