'use client';

import React from 'react';

interface StatusBadgeProps {
  status?: string;
  isLive?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status = '', isLive = false }) => {
  const upper = status.toUpperCase().trim();

  const isActuallyLive = isLive || upper.includes('LIVE') || upper.includes('IN PROGRESS') || upper.includes('OVER');
  const isResult = upper.includes('RESULT') || upper.includes('WON') || upper.includes('TIED');
  const isBreak = upper.includes('BREAK') || upper.includes('DELAY') || upper.includes('RAIN');

  if (isActuallyLive) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        LIVE
      </span>
    );
  }

  if (isBreak) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
        {status}
      </span>
    );
  }

  if (isResult) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60">
        RESULT
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
      {status || 'UPCOMING'}
    </span>
  );
};

export default StatusBadge;
