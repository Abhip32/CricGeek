'use client';

import React, { useEffect, useState, use } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { cricketApi } from '@/services/api';
import { ScorecardResponse, Match } from '@/types/match';
import MiniScoreCard from '@/components/scorecard/MiniScoreCard';
import TabNavigation from '@/components/scorecard/TabNavigation';
import ScorecardTab from '@/components/scorecard/ScorecardTab';
import DetailsTab from '@/components/scorecard/DetailsTab';
import SquadsTab from '@/components/scorecard/SquadsTab';
import CommentaryTab from '@/components/scorecard/CommentaryTab';
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
  const matchUrl = React.useMemo(() => {
    const qUrl = searchParams.get('url');
    if (qUrl) return qUrl;
    if (slug.length > 0) {
      return `/${slug.join('/')}`;
    }
    return undefined;
  }, [slug, searchParams]);

  const [scoreData, setScoreData] = useState<ScorecardResponse | null>(null);
  const [squadsData, setSquadsData] = useState<any>(null);
  const [commentaryData, setCommentaryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('scorecard');
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const [scoreRes, squadsRes, commRes] = await Promise.all([
        cricketApi.getScoreCard(matchUrl),
        matchUrl ? cricketApi.getSquads(matchUrl) : Promise.resolve(null),
        matchUrl ? cricketApi.getCommentary(matchUrl) : Promise.resolve(null)
      ]);

      if (scoreRes && scoreRes.data) {
        setScoreData(scoreRes);
      } else {
        setError('Scorecard data could not be retrieved.');
      }
      setSquadsData(squadsRes);
      setCommentaryData(commRes);
    } catch (err: any) {
      console.error('Failed to load scorecard:', err);
      setError('Unable to load scorecard. Please check the match link and try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [matchUrl]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'scorecard':
        return <ScorecardTab scoreData={scoreData} loading={loading} />;
      case 'details':
        return <DetailsTab scoreData={scoreData} loading={loading} />;
      case 'squads':
        return <SquadsTab squadsData={squadsData} loading={loading} />;
      case 'commentary':
        return <CommentaryTab commentaryData={commentaryData} loading={loading} />;
      default:
        return <ScorecardTab scoreData={scoreData} loading={loading} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation & Controls Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/matches"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-red-600 transition-transform group-hover:-translate-x-1" />
            <span>Back to Matches</span>
          </Link>

          <button
            onClick={() => fetchData(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-colors shadow-2xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-red-600' : ''}`} />
            <span>{refreshing ? 'Updating...' : 'Refresh Scorecard'}</span>
          </button>
        </div>

        {/* Loading State Skeleton when no data is loaded yet */}
        {loading && !scoreData && !matchProp ? (
          <ScorecardSkeleton />
        ) : error && !scoreData && !matchProp ? (
          <EmptyState
            type="scorecard"
            title="Scorecard Unavailable"
            message={error}
            actionLabel="Try Again"
            onAction={() => fetchData()}
          />
        ) : (
          <div className="space-y-6">
            {/* Header Hero Scorecard Banner */}
            <MiniScoreCard 
              summary={scoreData?.data?.summary} 
              matchProp={matchProp}
            />

            {/* Tab Navigation */}
            <TabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              hasSquads={Boolean(squadsData && (squadsData.team1 || squadsData.team2 || squadsData.squads))}
              hasCommentary={Boolean(commentaryData && Array.isArray(commentaryData) && commentaryData.length > 0)}
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
