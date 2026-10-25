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
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <Newspaper className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Top Cricket Headlines
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {isFetching && !isLoading ? 'Updating...' : 'Updated Hourly'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
