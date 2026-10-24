import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const normalized = (status || '').toUpperCase().trim();

  if (normalized.includes('LIVE') || normalized.includes('IN PROGRESS')) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600 text-white shadow-2xs whitespace-nowrap flex-shrink-0 ${className}`}>
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
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/80 whitespace-nowrap flex-shrink-0 ${className}`}>
        RESULT
      </span>
    );
  }

  if (normalized.includes('UPCOMING') || normalized.includes('SCHEDULED') || normalized.includes('PREVIEW')) {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 whitespace-nowrap flex-shrink-0 ${className}`}>
        UPCOMING
      </span>
    );
  }

  // Handle detailed upcoming strings like "Tomorrow, 8:30 AM" or "Today, 7:00 PM" without awkward multi-line line-breaks
  return (
    <span
      title={status}
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100/90 text-slate-700 border border-slate-200/80 whitespace-nowrap flex-shrink-0 ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
