'use client';

import React from 'react';

export default function NewsSkeletonCard() {
  return (
    <div className="relative flex flex-col sm:flex-row gap-4 rounded-2xl glass-card p-4 border border-white/5 overflow-hidden">
      <div className="absolute inset-0 animate-shimmer" />
      <div className="w-full sm:w-1/3 h-44 sm:h-auto rounded-xl bg-slate-800/80 flex-shrink-0" />
      <div className="w-full sm:w-2/3 flex flex-col justify-between py-1 space-y-3">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-slate-800/80 rounded" />
          <div className="h-5 w-5/6 bg-slate-800/80 rounded-md" />
          <div className="h-4 w-full bg-slate-800/80 rounded" />
          <div className="h-4 w-3/4 bg-slate-800/80 rounded" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-3 w-28 bg-slate-800/80 rounded" />
          <div className="h-3 w-16 bg-slate-800/80 rounded" />
        </div>
      </div>
    </div>
  );
}
