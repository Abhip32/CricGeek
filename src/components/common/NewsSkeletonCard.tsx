import React from 'react';

export const NewsSkeletonCard: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 flex gap-3.5 sm:gap-4 shadow-2xs overflow-hidden">
      {/* Thumbnail shimmer */}
      <div className="w-28 sm:w-44 h-24 sm:h-30 flex-shrink-0 rounded-lg shimmer-block border border-slate-200/80" />

      {/* Editorial Content shimmer */}
      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5 space-y-2">
        <div className="space-y-2">
          <div className="h-3.5 w-20 rounded shimmer-block" />
          <div className="h-4 w-11/12 rounded shimmer-block" />
          <div className="h-3.5 w-3/4 rounded shimmer-block-subtle hidden sm:block" />
        </div>
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="h-3 w-24 rounded shimmer-block" />
          <div className="h-3 w-16 rounded shimmer-block" />
        </div>
      </div>
    </div>
  );
};

export default NewsSkeletonCard;
