'use client';

import React, { useState } from 'react';
import { useTopNews } from '@/hooks/useCricketQueries';
import NewsCard from '../common/NewsCard';
import NewsSkeletonCard from '../common/NewsSkeletonCard';
import EmptyState from '../common/EmptyState';
import { Newspaper, Globe, Flame } from 'lucide-react';

const COUNTRY_OPTIONS = [
  { id: 'global', label: 'Global', flagUrl: null },
  { id: 'india', label: 'India', flagUrl: 'https://flagcdn.com/w40/in.png' },
  { id: 'australia', label: 'Australia', flagUrl: 'https://flagcdn.com/w40/au.png' },
  { id: 'england', label: 'England', flagUrl: 'https://flagcdn.com/w40/gb-eng.png' },
  { id: 'pakistan', label: 'Pakistan', flagUrl: 'https://flagcdn.com/w40/pk.png' },
  { id: 'south-africa', label: 'South Africa', flagUrl: 'https://flagcdn.com/w40/za.png' },
  { id: 'new-zealand', label: 'New Zealand', flagUrl: 'https://flagcdn.com/w40/nz.png' },
  { id: 'west-indies', label: 'West Indies', flagUrl: 'https://a.espncdn.com/i/teamlogos/cricket/500/4.png' },
  { id: 'sri-lanka', label: 'Sri Lanka', flagUrl: 'https://flagcdn.com/w40/lk.png' },
  { id: 'bangladesh', label: 'Bangladesh', flagUrl: 'https://flagcdn.com/w40/bd.png' },
];

export const News = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('global');
  const { data: news = [], isLoading, isFetching, refetch } = useTopNews(8, selectedCountry);
  const activeCountry = COUNTRY_OPTIONS.find((c) => c.id === selectedCountry) || COUNTRY_OPTIONS[0];

  return (
    <section className="py-8 border-b border-slate-200 relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-red-600 rounded-full" />
            <div>
              <h2 className="text-base sm:text-lg font-heading font-black text-slate-900 uppercase tracking-wider flex items-center gap-2.5">
                <span>Cricket Headlines</span>
                {activeCountry.id !== 'global' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                    {activeCountry.flagUrl && (
                      <img
                        src={activeCountry.flagUrl}
                        alt={activeCountry.label}
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <span>{activeCountry.label}</span>
                  </span>
                )}
              </h2>
            </div>
          </div>
          <span className="text-[10px] font-heading font-black uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 self-start sm:self-center">
            {isFetching && !isLoading ? 'Updating Feed...' : 'Live Wire Desk • ESPN Official'}
          </span>
        </div>

        {/* Country Filter Pills with Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          {COUNTRY_OPTIONS.map((c) => {
            const isSelected = selectedCountry === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-xs scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                {c.flagUrl ? (
                  <img
                    src={c.flagUrl}
                    alt={c.label}
                    width={16}
                    height={16}
                    className="w-4 h-4 rounded-full object-cover flex-shrink-0 border border-black/10"
                  />
                ) : (
                  <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                )}
                <span>{c.label}</span>
              </button>
            );
          })}
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
            message={`Articles for ${COUNTRY_OPTIONS.find(c => c.id === selectedCountry)?.label || selectedCountry} are currently updating. Please check back shortly.`}
            actionLabel="Refresh News"
            onAction={() => refetch()}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                countryName={activeCountry.id !== 'global' ? activeCountry.label : undefined}
                countryFlagUrl={activeCountry.id !== 'global' ? activeCountry.flagUrl : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
