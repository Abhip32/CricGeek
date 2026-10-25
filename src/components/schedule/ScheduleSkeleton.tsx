'use client';

import React from 'react';

export const ScheduleSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Date Group 1 Skeleton */}
      <div className="space-y-4">
        {/* Date Header Banner */}
        <div className="flex items-center gap-2.5 border-b border-slate-200 pb-2">
          <div className="w-4 h-4 rounded shimmer-block" />
          <div className="h-4 w-32 rounded shimmer-block" />
          <div className="h-4 w-16 rounded-full shimmer-block" />
        </div>

        {/* Fixtures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              {/* Header: Series & Match Pill */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="h-3.5 w-28 rounded shimmer-block" />
                <div className="h-4 w-16 rounded-full shimmer-block" />
              </div>

              {/* Teams & Flags */}
              <div className="space-y-3 py-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md shimmer-block flex-shrink-0" />
                  <div className="h-4 w-36 rounded shimmer-block" />
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md shimmer-block flex-shrink-0" />
                  <div className="h-4 w-28 rounded shimmer-block" />
                </div>
              </div>

              {/* Footer: Venue & Time */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded shimmer-block" />
                  <div className="h-3.5 w-32 rounded shimmer-block" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded shimmer-block" />
                  <div className="h-3.5 w-14 rounded shimmer-block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSkeleton;
