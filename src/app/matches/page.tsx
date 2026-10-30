'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLiveMatches, useRecentMatches, useUpcomingMatches } from '@/hooks/useCricketQueries';
import MatchCard from '@/components/matches/MatchCard';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import SkeletonCard from '@/components/home/SkeletonCard';
import EmptyState from '@/components/common/EmptyState';
import Hero from '@/components/home/hero';
import TournamentStandings from '@/components/common/TournamentStandings';
import { Flame, Clock, Calendar, RefreshCw, MapPin, Trophy } from 'lucide-react';
import { getCleanScorecardPath } from '@/components/home/MatchCarouselCard';
import { Match } from '@/types/match';

function MatchesContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab: 'live' | 'recent' | 'upcoming' | 'standings' =
    tabParam === 'recent'
      ? 'recent'
      : tabParam === 'upcoming'
      ? 'upcoming'
      : tabParam === 'standings'
      ? 'standings'
      : 'live';

  const [activeTab, setActiveTab] = useState<'live' | 'recent' | 'upcoming' | 'standings'>(initialTab);
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  // React Query hooks with automatic cache and live background polling
  const {
    data: liveMatches = [],
    isLoading: isLiveLoading,
    isFetching: isLiveFetching,
    refetch: refetchLive
  } = useLiveMatches();

  const {
    data: recentMatches = [],
    isLoading: isRecentLoading,
    isFetching: isRecentFetching,
    refetch: refetchRecent
  } = useRecentMatches();

  const {
    data: upcomingMatches = [],
    isLoading: isUpcomingLoading,
    isFetching: isUpcomingFetching,
    refetch: refetchUpcoming
  } = useUpcomingMatches();

  const isTabLoading =
    activeTab === 'live'
      ? isLiveLoading
      : activeTab === 'recent'
      ? isRecentLoading
      : isUpcomingLoading;

  const isRefreshing = isLiveFetching || isRecentFetching || isUpcomingFetching;

  useEffect(() => {
    const currentTab = searchParams.get('tab');
    if (currentTab === 'live' || currentTab === 'recent' || currentTab === 'upcoming' || currentTab === 'standings') {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  const handleManualRefresh = async () => {
    if (activeTab === 'live') {
      await refetchLive();
    } else if (activeTab === 'recent') {
      await refetchRecent();
    } else {
      await refetchUpcoming();
    }
  };

  const currentMatches = activeTab === 'live' ? liveMatches : recentMatches;

  const filteredMatches = useMemo(() => {
    return currentMatches.filter((m) => {
      const matchesFormat =
        selectedFormat === 'all' ||
        (selectedFormat === 't20' && (m.series.toLowerCase().includes('t20') || m.matchInfo?.toLowerCase().includes('t20'))) ||
        (selectedFormat === 'odi' && (m.series.toLowerCase().includes('odi') || m.matchInfo?.toLowerCase().includes('odi') || m.matchInfo?.toLowerCase().includes('one-day'))) ||
        (selectedFormat === 'test' && (m.series.toLowerCase().includes('test') || m.matchInfo?.toLowerCase().includes('test'))) ||
        (selectedFormat === 'women' && (m.series.toLowerCase().includes('women') || m.teamA.toLowerCase().includes('women') || m.teamB.toLowerCase().includes('women')));

      return matchesFormat;
    });
  }, [currentMatches, selectedFormat]);

  // Group matches by Series (ESPN Cricinfo Layout)
  const groupedMatches = useMemo(() => {
    const groups: Record<string, Match[]> = {};
    filteredMatches.forEach((m) => {
      const s = m.series || 'Cricket Matches';
      if (!groups[s]) groups[s] = [];
      groups[s].push(m);
    });
    return groups;
  }, [filteredMatches]);

  const filteredUpcoming = useMemo(() => {
    return upcomingMatches;
  }, [upcomingMatches]);

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <Hero
        image="/images/matchInfoHeader.jpg"
        heading="Cricket Match Center"
        subtitle="Live match scores, completed fixture results, and upcoming tournament schedules in real time."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Navigation Tabs & Refresh */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          {/* Responsive Segmented Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 w-full md:w-auto">
            {[
              { id: 'live', label: 'LIVE MATCHES', count: liveMatches.length, icon: Flame },
              { id: 'recent', label: 'RECENT RESULTS', count: recentMatches.length, icon: Clock },
              { id: 'upcoming', label: 'UPCOMING FIXTURES', count: upcomingMatches.length, icon: Calendar },
              { id: 'standings', label: 'POINTS TABLE', count: null, icon: Trophy },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg font-heading font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex-shrink-0 ${
                        isActive ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Refresh Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-heading font-black uppercase tracking-wider bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors shadow-2xs disabled:opacity-50 flex-shrink-0 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-red-600' : ''}`} />
              <span>{isRefreshing ? 'Updating...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {isTabLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : activeTab === 'standings' ? (
          <div className="space-y-6">
            <TournamentStandings showHeader={true} />
          </div>
        ) : activeTab === 'upcoming' ? (
          filteredUpcoming.length === 0 ? (
            <EmptyState
              type="schedule"
              title="No Upcoming Matches Found"
              message="No scheduled matches match your search criteria."
              onRetry={handleManualRefresh}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {filteredUpcoming.map((item, idx) => {
                const scorecardHref = getCleanScorecardPath(item.link);
                const team1 = item.teamDetails?.[0];
                const team2 = item.teamDetails?.[1];

                return (
                  <div
                    key={idx}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs hover:border-red-500/60 hover:shadow-md transition-all flex flex-col justify-between space-y-3.5 group"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                      <span className="font-bold text-slate-500 uppercase tracking-wider truncate flex-1 min-w-0" title={item.seriesName}>
                        {item.seriesName || 'Series'}
                      </span>
                      <span className="font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 flex-shrink-0">
                        {item.startTime || 'Fixture'}
                      </span>
                    </div>

                    <div className="space-y-2 py-1">
                      {team1 && team2 ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2.5">
                            <ImageWithFallback
                              src={team1.flag}
                              alt={team1.name}
                              width={26}
                              height={18}
                              className="w-6.5 h-4.5 object-contain flex-shrink-0"
                              fallbackText={team1.name}
                            />
                            <span className="text-sm font-bold text-slate-900 truncate">
                              {team1.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <ImageWithFallback
                              src={team2.flag}
                              alt={team2.name}
                              width={26}
                              height={18}
                              className="w-6.5 h-4.5 object-contain flex-shrink-0"
                              fallbackText={team2.name}
                            />
                            <span className="text-sm font-bold text-slate-900 truncate">
                              {team2.name}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <h3 className="text-sm font-bold text-slate-900">{item.teams}</h3>
                      )}
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                        <span className="truncate" title={item.venueInfo}>
                          {item.venueInfo || 'Venue TBA'}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">
                        {item.date || 'Upcoming'}
                      </span>
                    </div>
                  </div>
                );
              })}
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
          <div className="space-y-8">
            {Object.entries(groupedMatches).map(([seriesTitle, matches]) => (
              <div key={seriesTitle} className="space-y-3.5">
                {/* Series Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-4.5 bg-red-600 rounded-full" />
                    <h2 className="text-sm sm:text-base font-heading font-black text-slate-900 uppercase tracking-wider">
                      {seriesTitle}
                    </h2>
                  </div>
                  <span className="text-[10px] font-heading font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 tracking-wider">
                    {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                  </span>
                </div>

                {/* Match Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {matches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
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
