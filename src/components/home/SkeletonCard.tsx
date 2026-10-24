import React from 'react';

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = '' }) => {
  return (
    <div className={`w-full rounded-2xl bg-white/[0.035] backdrop-blur-xl border border-white/[0.07] p-5 shadow-lg space-y-4 ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="h-3.5 w-32 rounded shimmer-block" />
        <div className="h-4 w-16 rounded-full shimmer-block" />
      </div>

      <div className="space-y-3.5 py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-5 rounded-md shimmer-block" />
            <div className="h-4 w-28 rounded shimmer-block" />
          </div>
          <div className="h-5 w-20 rounded shimmer-block" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-5 rounded-md shimmer-block" />
            <div className="h-4 w-28 rounded shimmer-block" />
          </div>
          <div className="h-5 w-20 rounded shimmer-block" />
        </div>
      </div>

      <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
        <div className="h-3 w-36 rounded shimmer-block" />
        <div className="h-3 w-16 rounded shimmer-block" />
      </div>
    </div>
  );
};

export default SkeletonCard;
