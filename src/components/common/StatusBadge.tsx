import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const normalized = (status || '').toUpperCase().trim();

  if (normalized.includes('LIVE') || normalized.includes('IN PROGRESS')) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white shadow-xs ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        LIVE
      </span>
    );
  }

  if (normalized.includes('RESULT') || normalized.includes('WON') || normalized.includes('TIED') || normalized.includes('COMPLETED')) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
        RESULT
      </span>
    );
  }

  if (normalized.includes('UPCOMING') || normalized.includes('SCHEDULED') || normalized.includes('PREVIEW')) {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 ${className}`}>
        UPCOMING
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 ${className}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
