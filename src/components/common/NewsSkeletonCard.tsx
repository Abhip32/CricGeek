import React from 'react';

export const NewsSkeletonCard = () => {
  return (
    <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs animate-pulse flex flex-col sm:flex-row">
      <div className="w-full sm:w-48 h-44 sm:h-auto bg-slate-200 flex-shrink-0" />
      <div className="p-4 flex-1 space-y-3">
        <div className="h-3 w-20 bg-slate-200 rounded" />
        <div className="h-5 w-5/6 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-2/3 bg-slate-200 rounded" />
        <div className="pt-2 flex items-center justify-between">
          <div className="h-3 w-24 bg-slate-200 rounded" />
          <div className="h-3 w-16 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default NewsSkeletonCard;
