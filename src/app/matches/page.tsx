'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { cricketApi } from '@/services/api';
import { Match, UpcomingMatch } from '@/types/match';
import MatchCard from '@/components/matches/MatchCard';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import SkeletonCard from '@/components/home/SkeletonCard';
import EmptyState from '@/components/common/EmptyState';
import Hero from '@/components/home/hero';
import { Search, Flame, Clock, Calendar, RefreshCw, X } from 'lucide-react';

function MatchesContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'live' ? 'live' : 'recent';

  const [activeTab, setActiveTab] = useState<'live' | 'recent' | 'upcoming'>(initialTab);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<UpcomingMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const fetchData = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const [live, recent, upcoming] = await Promise.all([
        cricketApi.getLiveMatches(),
        cricketApi.getRecentMatches(),
        cricketApi.getUpcomingMatches()
      ]);

      setLiveMatches(live || []);
      setRecentMatches(recent || []);
      setUpcomingMatches(upcoming || []);
    } catch (err) {
      console.warn('Failed to fetch matches:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentMatches = activeTab === 'live' ? liveMatches : recentMatches;

  const filteredMatches = useMemo(() => {
    return currentMatches.filter((m) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        m.teamA.toLowerCase().includes(q) ||
        m.teamB.toLowerCase().includes(q) ||
        m.series.toLowerCase().includes(q) ||
        (m.matchInfo && m.matchInfo.toLowerCase().includes(q));

      const matchesFormat =
        selectedFormat === 'all' ||
        (selectedFormat === 't20' && (m.series.toLowerCase().includes('t20') || m.matchInfo?.toLowerCase().includes('t20'))) ||
        (selectedFormat === 'odi' && (m.series.toLowerCase().includes('odi') || m.matchInfo?.toLowerCase().includes('odi') || m.matchInfo?.toLowerCase().includes('one-day'))) ||
        (selectedFormat === 'test' && (m.series.toLowerCase().includes('test') || m.matchInfo?.toLowerCase().includes('test'))) ||
        (selectedFormat === 'women' && (m.series.toLowerCase().includes('women') || m.teamA.toLowerCase().includes('women') || m.teamB.toLowerCase().includes('women')));

      return matchesSearch && matchesFormat;
    });
  }, [currentMatches, searchQuery, selectedFormat]);

  const filteredUpcoming = useMemo(() => {
    return upcomingMatches.filter((u) => {
      const q = searchQuery.toLowerCase();
      return (
        !q ||
        u.teams.toLowerCase().includes(q) ||
        u.seriesName.toLowerCase().includes(q) ||
        u.venueInfo.toLowerCase().includes(q)
      );
    });
  }, [upcomingMatches, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Hero
        image="/images/matchInfoHeader.jpg"
        heading="Cricket Match Center"
        subtitle="Live scores, completed fixture results, and upcoming tournament schedules."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        {/* Refresh & Controls Bar */}
        <div className="flex justify-end">
          <button
            onClick={() => fetchData(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors shadow-2xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-600' : ''}`} />
            <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Tab Navigation: Live / Recent / Upcoming */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {[
              { id: 'live', label: 'Live Now', count: liveMatches.length, icon: Flame },
              { id: 'recent', label: 'Recent Results', count: recentMatches.length, icon: Clock },
              { id: 'upcoming', label: 'Upcoming Fixtures', count: upcomingMatches.length, icon: Calendar },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                    isActive ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teams or series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : activeTab === 'upcoming' ? (
          filteredUpcoming.length === 0 ? (
            <EmptyState
              type="schedule"
              title="No Upcoming Matches Found"
              message="No scheduled matches match your search criteria."
              onRetry={fetchData}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUpcoming.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-wider truncate">
                      {item.seriesName || 'Series'}
                    </span>
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      {item.startTime || 'TBD'}
                    </span>
                  </div>

                  <div className="space-y-2 py-1">
                    {item.teamDetails && item.teamDetails.length >= 2 ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <ImageWithFallback
                            src={item.teamDetails[0].flag}
                            alt={item.teamDetails[0].name}
                            width={26}
                            height={26}
                            fallbackText={item.teamDetails[0].name}
                          />
                          <span className="text-sm font-bold text-slate-900 truncate">
                            {item.teamDetails[0].name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <ImageWithFallback
                            src={item.teamDetails[1].flag}
                            alt={item.teamDetails[1].name}
                            width={26}
                            height={26}
                            fallbackText={item.teamDetails[1].name}
                          />
                          <span className="text-sm font-bold text-slate-900 truncate">
                            {item.teamDetails[1].name}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <h3 className="text-sm font-bold text-slate-900">{item.teams}</h3>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate max-w-[200px]" title={item.venueInfo}>
                      {item.venueInfo || 'Venue TBA'}
                    </span>
                    <span className="font-semibold text-slate-700">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : filteredMatches.length === 0 ? (
          <EmptyState
            type={activeTab === 'live' ? 'live' : 'matches'}
            title={activeTab === 'live' ? 'No Live Matches Active' : 'No Matches Found'}
            message={
              activeTab === 'live'
                ? 'There are no active live matches right now. Check out completed results or upcoming fixtures.'
                : 'No match records match your current filters.'
            }
            actionLabel={activeTab === 'live' ? 'View Recent Matches' : 'Reset Search'}
            onAction={() => {
              if (activeTab === 'live') setActiveTab('recent');
              else setSearchQuery('');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MatchesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-4">
          <div className="h-10 w-64 bg-slate-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      }
    >
      <MatchesContent />
    </Suspense>
  );
}
