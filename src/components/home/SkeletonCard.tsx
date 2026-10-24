import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="w-[280px] sm:w-[320px] lg:w-[340px] flex-shrink-0 rounded-xl bg-white border border-slate-200 p-4 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-3 w-28 rounded shimmer-block" />
        <div className="h-4 w-14 rounded-full shimmer-block" />
      </div>

      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-5 rounded-md shimmer-block" />
            <div className="h-4 w-24 rounded shimmer-block" />
          </div>
          <div className="h-5 w-16 rounded shimmer-block" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-5 rounded-md shimmer-block" />
            <div className="h-4 w-24 rounded shimmer-block" />
          </div>
          <div className="h-5 w-16 rounded shimmer-block" />
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="h-3 w-32 rounded shimmer-block" />
        <div className="h-3 w-16 rounded shimmer-block" />
      </div>
    </div>
  );
};

export default SkeletonCard;
