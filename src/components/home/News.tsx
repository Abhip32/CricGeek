'use client';

import React from 'react';
import { useTopNews } from '@/hooks/useCricketQueries';
import NewsCard from '../common/NewsCard';
import NewsSkeletonCard from '../common/NewsSkeletonCard';
import EmptyState from '../common/EmptyState';
import { Newspaper } from 'lucide-react';

export const News = () => {
  const { data: news = [], isLoading, isFetching, refetch } = useTopNews(8);

  return (
    <section className="py-8 border-b border-slate-200 relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-red-600 rounded-full" />
            <div>
              <h2 className="text-base sm:text-lg font-heading font-black text-slate-900 uppercase tracking-wider">
                Top Cricket Headlines
              </h2>
            </div>
          </div>
          <span className="text-[10px] font-heading font-black uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">
            {isFetching && !isLoading ? 'Updating...' : 'Live Wire Desk'}
          </span>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NewsSkeletonCard />
            <NewsSkeletonCard />
            <NewsSkeletonCard />
            <NewsSkeletonCard />
          </div>
        ) : news.length === 0 ? (
          <EmptyState
            type="news"
            title="No News Available"
            message="Latest articles are currently updating. Please check back shortly."
            actionLabel="Refresh News"
            onAction={() => refetch()}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
