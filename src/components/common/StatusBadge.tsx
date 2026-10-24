import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const normalized = (status || '').toUpperCase().trim();

  if (normalized.includes('LIVE') || normalized.includes('IN PROGRESS')) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.35)] backdrop-blur-md whitespace-nowrap flex-shrink-0 ${className}`}>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
        </span>
        <span>LIVE</span>
      </span>
    );
  }

  if (normalized.includes('RESULT') || normalized.includes('WON') || normalized.includes('TIED') || normalized.includes('COMPLETED')) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/[0.06] text-slate-300 border border-white/10 backdrop-blur-md whitespace-nowrap flex-shrink-0 ${className}`}>
        RESULT
      </span>
    );
  }

  if (normalized.includes('UPCOMING') || normalized.includes('SCHEDULED') || normalized.includes('PREVIEW')) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30 backdrop-blur-md whitespace-nowrap flex-shrink-0 ${className}`}>
        UPCOMING
      </span>
    );
  }

  // Handle detailed upcoming strings like "Tomorrow, 8:30 AM" or "Today, 7:00 PM"
  return (
    <span
      title={status}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/[0.06] text-slate-300 border border-white/10 backdrop-blur-md whitespace-nowrap flex-shrink-0 ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
