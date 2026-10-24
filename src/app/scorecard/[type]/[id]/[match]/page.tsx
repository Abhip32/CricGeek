'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { cricketApi } from '@/services/api';
import { ScorecardResponse } from '@/types/match';
import MiniScoreCard from '@/components/scorecard/MiniScoreCard';
import TabNavigation from '@/components/scorecard/TabNavigation';
import ScorecardTab from '@/components/scorecard/ScorecardTab';
import DetailsTab from '@/components/scorecard/DetailsTab';
import SquadsTab from '@/components/scorecard/SquadsTab';
import CommentaryTab from '@/components/scorecard/CommentaryTab';
import EmptyState from '@/components/common/EmptyState';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DynamicScorecardPage() {
  const params = useParams();
  const type = params?.type as string;
  const id = params?.id as string;
  const match = params?.match as string;

  const [scoreData, setScoreData] = useState<ScorecardResponse | null>(null);
  const [squadsData, setSquadsData] = useState<any>(null);
  const [commentaryData, setCommentaryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('scorecard');
  const [error, setError] = useState<string | null>(null);

  const matchUrl = type && id && match ? `/${type}/${id}/${match}` : undefined;

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
    if (matchUrl) {
      fetchData();
    }
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
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Controls Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/matches"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-emerald-400" />
            <span>Back to Matches</span>
          </Link>

          <button
            onClick={() => fetchData(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Updating...' : 'Refresh Score'}</span>
          </button>
        </div>

        {/* Loading State Skeleton */}
        {loading ? (
          <div className="space-y-6">
            <div className="h-64 rounded-2xl glass-panel bg-white/5 animate-pulse" />
            <div className="h-12 w-96 rounded-xl glass-panel bg-white/5 animate-pulse" />
            <div className="h-80 rounded-2xl glass-panel bg-white/5 animate-pulse" />
          </div>
        ) : error && !scoreData ? (
          <EmptyState
            title="Scorecard Unavailable"
            description={error}
            actionLabel="Try Again"
            onAction={() => fetchData()}
          />
        ) : (
          <div className="space-y-8">
            {/* Header Hero Scorecard Banner */}
            <MiniScoreCard summary={scoreData?.data?.summary} />

            {/* Tab Navigation */}
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {renderActiveTab()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
