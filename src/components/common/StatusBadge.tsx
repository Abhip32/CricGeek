import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const normalized = (status || '').toUpperCase().trim();

  if (normalized.includes('LIVE') || normalized.includes('IN PROGRESS')) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.7)] whitespace-nowrap flex-shrink-0 ${className}`}>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
        </span>
        <span>LIVE</span>
      </span>
    );
  }

  if (normalized.includes('RESULT') || normalized.includes('WON') || normalized.includes('TIED') || normalized.includes('COMPLETED')) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.08] text-slate-300 border border-white/10 whitespace-nowrap flex-shrink-0 ${className}`}>
        RESULT
      </span>
    );
  }

  if (normalized.includes('UPCOMING') || normalized.includes('SCHEDULED') || normalized.includes('PREVIEW')) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 whitespace-nowrap flex-shrink-0 ${className}`}>
        UPCOMING
      </span>
    );
  }

  return (
    <span
      title={status}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.06] text-slate-300 border border-white/[0.08] whitespace-nowrap flex-shrink-0 ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
