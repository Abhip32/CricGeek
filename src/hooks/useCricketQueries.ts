'use client';

import { useQuery } from '@tanstack/react-query';
import { cricketApi } from '@/services/api';
import { Match, UpcomingMatch, ScorecardResponse } from '@/types/match';
import { NewsItem } from '@/types/news';

/**
 * Hook for live matches (Polling completely disabled to save server capacity)
 */
export function useLiveMatches() {
  return useQuery<Match[]>({
    queryKey: ['matches', 'live'],
    queryFn: () => cricketApi.getLiveMatches(),
    staleTime: 1000 * 60 * 5, // 5 mins
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for recently completed matches
 */
export function useRecentMatches() {
  return useQuery<Match[]>({
    queryKey: ['matches', 'recent'],
    queryFn: () => cricketApi.getRecentMatches(),
    staleTime: 1000 * 60 * 10, // 10 mins
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for upcoming fixtures directly from official ESPN API
 */
export function useUpcomingMatches(date?: string, category?: string, format?: string) {
  return useQuery<UpcomingMatch[]>({
    queryKey: ['matches', 'upcoming', date || 'all', category || 'all', format || 'all'],
    queryFn: () => cricketApi.getUpcomingMatches(date, category, format),
    staleTime: 1000 * 60 * 15, // 15 mins
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for official tournament schedule & fixtures feed
 */
export function useSchedule(date?: string, category?: string, format?: string) {
  return useQuery<UpcomingMatch[]>({
    queryKey: ['schedule', date || 'all', category || 'all', format || 'all'],
    queryFn: () => cricketApi.getSchedule(date, category, format),
    staleTime: 1000 * 60 * 15, // 15 mins
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for top cricket headlines
 */
export function useTopNews(limit: number = 8) {
  return useQuery<NewsItem[]>({
    queryKey: ['news', limit],
    queryFn: () => cricketApi.getTopNews(limit),
    staleTime: 1000 * 60 * 15, // 15 mins
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for ICC team rankings
 */
export function useTeamRankings() {
  return useQuery<any>({
    queryKey: ['rankings', 'teams'],
    queryFn: () => cricketApi.getTeamRankings(),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for ICC player rankings
 */
export function usePlayerRankings() {
  return useQuery<any>({
    queryKey: ['rankings', 'players'],
    queryFn: () => cricketApi.getPlayerRankings(),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for match scorecard (Polling completely disabled to save server capacity)
 */
export function useScorecard(matchUrl?: string, _isLive?: boolean) {
  return useQuery<ScorecardResponse | null>({
    queryKey: ['scorecard', matchUrl || 'latest'],
    queryFn: () => cricketApi.getScoreCard(matchUrl),
    staleTime: 1000 * 60 * 5, // 5 mins
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
    staleTime: 1000 * 60 * 30,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for ball-by-ball commentary (Polling completely disabled)
 */
export function useCommentary(matchUrl?: string, _isLive?: boolean) {
  return useQuery<any>({
    queryKey: ['commentary', matchUrl || ''],
    queryFn: () => (matchUrl ? cricketApi.getCommentary(matchUrl) : Promise.resolve(null)),
    enabled: Boolean(matchUrl),
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
