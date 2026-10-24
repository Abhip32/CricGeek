import React from 'react';

export const NewsSkeletonCard = () => {
  return (
    <div className="rounded-2xl bg-white/[0.035] border border-white/[0.07] overflow-hidden shadow-lg flex flex-col sm:flex-row">
      <div className="w-full sm:w-48 h-44 sm:h-auto shimmer-block flex-shrink-0" />
      <div className="p-4.5 flex-1 space-y-3">
        <div className="h-3 w-20 rounded shimmer-block" />
        <div className="h-5 w-5/6 rounded shimmer-block" />
        <div className="h-4 w-full rounded shimmer-block-subtle" />
        <div className="h-4 w-2/3 rounded shimmer-block-subtle" />
        <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
          <div className="h-3 w-24 rounded shimmer-block-subtle" />
          <div className="h-3 w-16 rounded shimmer-block-subtle" />
        </div>
      </div>
    </div>
  );
};

export default NewsSkeletonCard;
