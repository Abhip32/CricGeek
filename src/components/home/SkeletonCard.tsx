'use client';

import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="min-w-[300px] sm:min-w-[360px] w-full p-5 rounded-2xl glass-card border border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 animate-shimmer" />
      <div className="flex flex-col gap-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="h-3.5 w-32 bg-slate-800/80 rounded-md" />
          <div className="h-4 w-14 bg-slate-800/80 rounded-full" />
        </div>

        {/* Team 1 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-slate-800/80" />
            <div className="h-4 w-24 bg-slate-800/80 rounded-md" />
          </div>
          <div className="h-4 w-16 bg-slate-800/80 rounded-md" />
        </div>

        {/* Team 2 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-slate-800/80" />
            <div className="h-4 w-24 bg-slate-800/80 rounded-md" />
          </div>
          <div className="h-4 w-16 bg-slate-800/80 rounded-md" />
        </div>

        {/* Result footer */}
        <div className="pt-2 border-t border-slate-800/50 flex justify-between items-center">
          <div className="h-3 w-40 bg-slate-800/80 rounded-md" />
          <div className="h-3 w-12 bg-slate-800/80 rounded-md" />
        </div>
      </div>
    </div>
  );
}
