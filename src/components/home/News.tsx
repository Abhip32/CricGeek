'use client';

import React, { useEffect, useState } from 'react';
import NewsCard from '@/components/common/NewsCard';
import NewsSkeletonCard from '@/components/common/NewsSkeletonCard';
import EmptyState from '@/components/common/EmptyState';
import { cricketApi } from '@/services/api';
import { NewsItem } from '@/types/news';
import { RefreshCw } from 'lucide-react';

export const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await cricketApi.getTopNews(6);
      setNews(response);
    } catch (error) {
      console.warn('Failed to fetch news:', error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Top Stories & Match Previews
        </span>
        <button
          onClick={fetchNews}
          disabled={loading}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          <span className="hidden sm:inline">Refresh News</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <NewsSkeletonCard key={index} />
          ))
        ) : news.length > 0 ? (
          news.map((item, index) => (
            <NewsCard
              key={item.id || index}
              {...item}
            />
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState
              type="news"
              title="No news articles right now"
              message="Failed to load recent news articles. Check your connection or click below to retry."
              onRetry={fetchNews}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
