'use client';

import React, { useEffect, useState, use, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useScorecard, useSquads, useCommentary } from '@/hooks/useCricketQueries';
import { ScorecardResponse, Match } from '@/types/match';
import MiniScoreCard from '@/components/scorecard/MiniScoreCard';
import TabNavigation from '@/components/scorecard/TabNavigation';
import ScorecardTab from '@/components/scorecard/ScorecardTab';
import DetailsTab from '@/components/scorecard/DetailsTab';
import SquadsTab from '@/components/scorecard/SquadsTab';
import CommentaryTab from '@/components/scorecard/CommentaryTab';
import ChartsTab from '@/components/scorecard/ChartsTab';
import MvpTab from '@/components/scorecard/MvpTab';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ScorecardSkeleton from '@/components/scorecard/ScorecardSkeleton';
import EmptyState from '@/components/common/EmptyState';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScorecardCatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug || [];
  const searchParams = useSearchParams();

  // If match was stored in sessionStorage on click, load it immediately as a prop
  const [matchProp, setMatchProp] = useState<Match | null>(null);
  const [activeTab, setActiveTab] = useState('scorecard');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('cricgeek_active_match');
        if (stored) {
          setMatchProp(JSON.parse(stored));
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Construct match URL from clean slug or query param
  const matchUrl = useMemo(() => {
    const qUrl = searchParams.get('url');
    if (qUrl) return qUrl;
    if (slug.length > 0) {
      return `/${slug.join('/')}`;
    }
    return undefined;
  }, [slug, searchParams]);

  const isLive = useMemo(() => {
    const rawStatus = matchProp?.status || '';
    return rawStatus.toUpperCase().includes('LIVE');
  }, [matchProp]);

  // React Query hooks with automatic cache and background polling for live matches
  const {
    data: scoreData,
    isLoading: isScoreLoading,
    isFetching: isScoreFetching,
    error: scoreError,
    refetch: refetchScore
  } = useScorecard(matchUrl, isLive);

  const {
    data: squadsData,
    isLoading: isSquadsLoading,
    isFetching: isSquadsFetching,
    refetch: refetchSquads
  } = useSquads(matchUrl);

  const {
    data: commentaryData,
    isLoading: isCommLoading,
    isFetching: isCommFetching,
    refetch: refetchComm
  } = useCommentary(matchUrl, isLive);

  const loading = isScoreLoading;
  const refreshing = isScoreFetching || isSquadsFetching || isCommFetching;

  const handleRefresh = async () => {
    await Promise.all([refetchScore(), refetchSquads(), refetchComm()]);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'scorecard':
        return <ScorecardTab scoreData={scoreData} loading={isScoreLoading} />;
      case 'commentary': {
        const resolvedComm =
          commentaryData && Array.isArray(commentaryData) && commentaryData.length > 0
            ? commentaryData
            : (scoreData as any)?.data?.commentary;
        return <CommentaryTab commentaryData={resolvedComm} loading={isCommLoading} />;
      }
      case 'charts':
        return <ChartsTab matchUrl={matchUrl} scoreData={scoreData} />;
      case 'mvp':
        return <MvpTab scoreData={scoreData} loading={isScoreLoading} />;
      case 'details':
        return <DetailsTab scoreData={scoreData} matchUrl={matchUrl} loading={isScoreLoading} />;
      case 'squads': {
        const rawSquads = (scoreData as any)?.data?.squads;
        const squadTeams = rawSquads ? Object.keys(rawSquads) : [];
        const resolvedSquads = squadTeams.length >= 2
          ? {
              team1: { name: squadTeams[0], players: rawSquads[squadTeams[0]] },
              team2: { name: squadTeams[1], players: rawSquads[squadTeams[1]] }
            }
          : squadsData;
        return <SquadsTab squadsData={resolvedSquads} loading={isScoreLoading} />;
      }
      default:
        return <ScorecardTab scoreData={scoreData} loading={isScoreLoading} />;
    }
  };

  const errorMessage = scoreError
    ? 'Unable to load scorecard. Please check the match link and try again.'
    : null;

  const seriesTitle =
    (scoreData?.data?.summary as any)?.series ||
    scoreData?.data?.summary?.matchTitle ||
    matchProp?.series ||
    'Series';
  const matchTitle = scoreData?.data?.summary?.teams
    ? `${scoreData.data.summary.teams[0]?.teamName || ''} vs ${scoreData.data.summary.teams[1]?.teamName || ''}`
    : matchProp
    ? `${matchProp.teamA} vs ${matchProp.teamB}`
    : 'Match';

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Loading State Skeleton when no data is loaded yet */}
        {loading && !scoreData && !matchProp ? (
          <ScorecardSkeleton />
        ) : errorMessage && !scoreData && !matchProp ? (
          <EmptyState
            type="scorecard"
            title="Scorecard Unavailable"
            message={errorMessage}
            actionLabel="Try Again"
            onAction={handleRefresh}
          />
        ) : (
          <div className="space-y-6">
            {/* Header Hero Scorecard Banner */}
            <MiniScoreCard 
              summary={scoreData?.data?.summary} 
              matchProp={matchProp}
              squads={(scoreData as any)?.data?.squads}
              leaders={(scoreData as any)?.data?.leaders}
              tables={(scoreData as any)?.data?.tables}
              onRefresh={handleRefresh}
              isRefreshing={refreshing}
            />

            {/* Tab Navigation */}
            <TabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              hasSquads={true}
              hasCommentary={true}
            />

            {/* Tab Content */}
            {loading && !scoreData ? (
              <ScorecardTab scoreData={null} loading={true} />
            ) : (
              <div className="min-h-[400px]">
                {renderActiveTab()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
