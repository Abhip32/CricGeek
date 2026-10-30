import React from 'react';

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = '' }) => {
  return (
    <div className={`w-full rounded-xl bg-white border border-slate-200 p-4 shadow-2xs space-y-3 relative overflow-hidden ${className}`}>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
        <div className="h-3.5 w-32 rounded shimmer-block" />
        <div className="h-4 w-14 rounded-full shimmer-block" />
      </div>

      {/* Teams & Scores Face-Off Layout */}
      <div className="space-y-3 py-1">
        {/* Team 1 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-6 h-6 rounded-full shimmer-block flex-shrink-0" />
            <div className="h-4 w-28 rounded shimmer-block" />
          </div>
          <div className="h-5 w-16 rounded shimmer-block flex-shrink-0" />
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-6 h-6 rounded-full shimmer-block flex-shrink-0" />
            <div className="h-4 w-28 rounded shimmer-block" />
          </div>
          <div className="h-5 w-16 rounded shimmer-block flex-shrink-0" />
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="h-3 w-40 rounded shimmer-block" />
        <div className="h-3 w-16 rounded shimmer-block" />
      </div>
    </div>
  );
};

export default SkeletonCard;
