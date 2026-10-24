import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="w-[300px] sm:w-[340px] flex-shrink-0 rounded-xl bg-white border border-slate-200 p-4 shadow-xs animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-3 w-28 bg-slate-200 rounded" />
        <div className="h-4 w-12 bg-slate-200 rounded-full" />
      </div>

      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-200" />
            <div className="h-4 w-24 bg-slate-200 rounded" />
          </div>
          <div className="h-5 w-16 bg-slate-200 rounded" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-200" />
            <div className="h-4 w-24 bg-slate-200 rounded" />
          </div>
          <div className="h-5 w-16 bg-slate-200 rounded" />
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="h-3 w-32 bg-slate-200 rounded" />
        <div className="h-3 w-16 bg-slate-200 rounded" />
      </div>
    </div>
  );
};

export default SkeletonCard;
