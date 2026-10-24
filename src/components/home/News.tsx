'use client';

import React, { useEffect, useState } from 'react';
import { cricketApi } from '@/services/api';
import { NewsItem } from '@/types/news';
import NewsCard from '../common/NewsCard';
import NewsSkeletonCard from '../common/NewsSkeletonCard';
import EmptyState from '../common/EmptyState';
import { Newspaper } from 'lucide-react';

export const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await cricketApi.getTopNews(8);
      setNews(data || []);
    } catch (err) {
      console.warn('Failed to fetch news:', err);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

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
            Updated Hourly
          </span>
        </div>

        {/* News Grid */}
        {loading ? (
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
            onAction={fetchNews}
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
