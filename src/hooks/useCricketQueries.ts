'use client';

import { useQuery } from '@tanstack/react-query';
import { cricketApi } from '@/services/api';
import { Match, UpcomingMatch, ScorecardResponse } from '@/types/match';
import { NewsItem } from '@/types/news';

/**
 * Hook for live matches with auto-polling every 15s
 */
export function useLiveMatches(refetchInterval: number | false = 15000) {
  return useQuery<Match[]>({
    queryKey: ['matches', 'live'],
    queryFn: () => cricketApi.getLiveMatches(),
    staleTime: 10000,
    refetchInterval,
  });
}

/**
 * Hook for recently completed matches
 */
export function useRecentMatches() {
  return useQuery<Match[]>({
    queryKey: ['matches', 'recent'],
    queryFn: () => cricketApi.getRecentMatches(),
    staleTime: 1000 * 60, // 1 min
  });
}

/**
 * Hook for upcoming tournament and series fixtures
 */
export function useUpcomingMatches(date?: string) {
  return useQuery<UpcomingMatch[]>({
    queryKey: ['matches', 'upcoming', date || 'all'],
    queryFn: () => cricketApi.getUpcomingMatches(date),
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}

/**
 * Hook for top cricket headlines
 */
export function useTopNews(limit: number = 8) {
  return useQuery<NewsItem[]>({
    queryKey: ['news', limit],
    queryFn: () => cricketApi.getTopNews(limit),
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}

/**
 * Hook for ICC team rankings
 */
export function useTeamRankings() {
  return useQuery<any>({
    queryKey: ['rankings', 'teams'],
    queryFn: () => cricketApi.getTeamRankings(),
    staleTime: 1000 * 60 * 30, // 30 mins
  });
}

/**
 * Hook for ICC player rankings
 */
export function usePlayerRankings() {
  return useQuery<any>({
    queryKey: ['rankings', 'players'],
    queryFn: () => cricketApi.getPlayerRankings(),
    staleTime: 1000 * 60 * 30, // 30 mins
  });
}

/**
 * Hook for match scorecard
 */
export function useScorecard(matchUrl?: string, isLive: boolean = false) {
  return useQuery<ScorecardResponse | null>({
    queryKey: ['scorecard', matchUrl || 'latest'],
    queryFn: () => cricketApi.getScoreCard(matchUrl),
    staleTime: isLive ? 10000 : 1000 * 60,
    refetchInterval: isLive ? 15000 : false,
  });
}

/**
 * Hook for match squads and lineups
 */
export function useSquads(matchUrl?: string) {
  return useQuery<any>({
    queryKey: ['squads', matchUrl || ''],
    queryFn: () => (matchUrl ? cricketApi.getSquads(matchUrl) : Promise.resolve(null)),
    enabled: Boolean(matchUrl),
    staleTime: 1000 * 60 * 10,
  });
}

/**
 * Hook for ball-by-ball commentary
 */
export function useCommentary(matchUrl?: string, isLive: boolean = false) {
  return useQuery<any>({
    queryKey: ['commentary', matchUrl || ''],
    queryFn: () => (matchUrl ? cricketApi.getCommentary(matchUrl) : Promise.resolve(null)),
    enabled: Boolean(matchUrl),
    staleTime: 10000,
    refetchInterval: isLive ? 15000 : false,
  });
}
