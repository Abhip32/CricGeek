'use client';

import { useQuery } from '@tanstack/react-query';
import { cricketApi } from '@/services/api';
import { Match, UpcomingMatch, ScorecardResponse } from '@/types/match';
import { NewsItem } from '@/types/news';

/**
 * Hook for live matches
 */
export function useLiveMatches(league?: string) {
  return useQuery<Match[]>({
    queryKey: ['matches', 'live', league || 'all'],
    queryFn: () => cricketApi.getLiveMatches(league),
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for recently completed matches
 */
export function useRecentMatches(league?: string) {
  return useQuery<Match[]>({
    queryKey: ['matches', 'recent', league || 'all'],
    queryFn: () => cricketApi.getRecentMatches(league),
    staleTime: 1000 * 60 * 10,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for upcoming fixtures
 */
export function useUpcomingMatches(date?: string, category?: string, format?: string) {
  return useQuery<UpcomingMatch[]>({
    queryKey: ['matches', 'upcoming', date || 'all', category || 'all', format || 'all'],
    queryFn: () => cricketApi.getUpcomingMatches(date, category, format),
    staleTime: 1000 * 60 * 15,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for tournament schedule & fixtures feed
 */
export function useSchedule(date?: string, category?: string, format?: string) {
  return useQuery<UpcomingMatch[]>({
    queryKey: ['schedule', date || 'all', category || 'all', format || 'all'],
    queryFn: () => cricketApi.getSchedule(date, category, format),
    staleTime: 1000 * 60 * 15,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for cricket headlines (global or tournament-specific)
 */
export function useTopNews(limit: number = 8, leagueId?: string) {
  return useQuery<NewsItem[]>({
    queryKey: ['news', limit, leagueId || 'global'],
    queryFn: () => cricketApi.getTopNews(limit, leagueId),
    staleTime: 1000 * 60 * 15,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for match-specific news
 */
export function useMatchNews(leagueId?: string) {
  return useQuery<NewsItem[]>({
    queryKey: ['match_news', leagueId || 'global'],
    queryFn: () => cricketApi.getTopNews(8, leagueId),
    enabled: Boolean(leagueId),
    staleTime: 1000 * 60 * 15,
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
    staleTime: 1000 * 60 * 60,
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
    staleTime: 1000 * 60 * 60,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for match scorecard
 */
export function useScorecard(matchUrl?: string, _isLive?: boolean) {
  return useQuery<ScorecardResponse | null>({
    queryKey: ['scorecard', matchUrl || 'latest'],
    queryFn: () => cricketApi.getScoreCard(matchUrl),
    staleTime: 1000 * 60 * 5,
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
 * Hook for ball-by-ball commentary
 */
export function useCommentary(matchUrl?: string, isLive?: boolean, limit: number = 100, page: number = 1) {
  return useQuery<any>({
    queryKey: ['commentary', matchUrl || '', limit, page],
    queryFn: () => (matchUrl ? cricketApi.getCommentary(matchUrl, limit, page) : Promise.resolve([])),
    enabled: Boolean(matchUrl),
    staleTime: isLive ? 1000 * 15 : 1000 * 60 * 5,
    refetchInterval: isLive ? 15000 : false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for wicket-by-wicket partnerships
 */
export function usePartnerships(matchUrl?: string) {
  return useQuery<any>({
    queryKey: ['partnerships', matchUrl || ''],
    queryFn: () => (matchUrl ? cricketApi.getPartnerships(matchUrl) : Promise.resolve(null)),
    enabled: Boolean(matchUrl),
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for Fall of Wickets
 */
export function useFallOfWickets(matchUrl?: string) {
  return useQuery<any>({
    queryKey: ['fow', matchUrl || ''],
    queryFn: () => (matchUrl ? cricketApi.getFallOfWickets(matchUrl) : Promise.resolve(null)),
    enabled: Boolean(matchUrl),
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for DRS Reviews
 */
export function useDrsReviews(matchUrl?: string) {
  return useQuery<any>({
    queryKey: ['drs', matchUrl || ''],
    queryFn: () => (matchUrl ? cricketApi.getDrsReviews(matchUrl) : Promise.resolve(null)),
    enabled: Boolean(matchUrl),
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for over-by-over Manhattan chart
 */
export function useManhattan(matchUrl?: string) {
  return useQuery<any>({
    queryKey: ['manhattan', matchUrl || ''],
    queryFn: () => (matchUrl ? cricketApi.getManhattan(matchUrl) : Promise.resolve(null)),
    enabled: Boolean(matchUrl),
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for Worm cumulative trajectory chart
 */
export function useWorm(matchUrl?: string) {
  return useQuery<any>({
    queryKey: ['worm', matchUrl || ''],
    queryFn: () => (matchUrl ? cricketApi.getWorm(matchUrl) : Promise.resolve(null)),
    enabled: Boolean(matchUrl),
    staleTime: 1000 * 60 * 5,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for tournament standings / points table
 */
export function useStandings(leagueId?: string) {
  return useQuery<any>({
    queryKey: ['standings', leagueId || ''],
    queryFn: () => (leagueId ? cricketApi.getStandings(leagueId) : Promise.resolve(null)),
    enabled: Boolean(leagueId),
    staleTime: 1000 * 60 * 10,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for active tournament/series list
 */
export function useSeriesList() {
  return useQuery<any>({
    queryKey: ['series_list'],
    queryFn: () => cricketApi.getSeriesList(),
    staleTime: 1000 * 60 * 15,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for player search
 */
export function usePlayerSearch(query: string, limit: number = 10) {
  return useQuery<any>({
    queryKey: ['player_search', query, limit],
    queryFn: () => (query.trim() ? cricketApi.searchPlayers(query, limit) : Promise.resolve([])),
    enabled: Boolean(query && query.trim().length >= 2),
    staleTime: 1000 * 60 * 15,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for player profile
 */
export function usePlayerProfile(id?: string) {
  return useQuery<any>({
    queryKey: ['player_profile', id || ''],
    queryFn: () => (id ? cricketApi.getPlayerById(id) : Promise.resolve(null)),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 60,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for match details, toss, officials, and venue
 */
export function useMatchInfo(matchUrl?: string) {
  return useQuery<any>({
    queryKey: ['match_info', matchUrl || ''],
    queryFn: () => (matchUrl ? cricketApi.getMatchInfo(matchUrl) : Promise.resolve(null)),
    enabled: Boolean(matchUrl),
    staleTime: 1000 * 60 * 10,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for pitch report, weather, and captain preview quotes
 */
export function useMatchPreview(matchUrl?: string) {
  return useQuery<any>({
    queryKey: ['match_preview', matchUrl || ''],
    queryFn: () => (matchUrl ? cricketApi.getMatchPreview(matchUrl) : Promise.resolve(null)),
    enabled: Boolean(matchUrl),
    staleTime: 1000 * 60 * 30,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

/**
 * Hook for high-definition cricket photo galleries
 */
export function usePhotos(galleryId?: string) {
  return useQuery<any>({
    queryKey: ['photos', galleryId || 'main'],
    queryFn: () => cricketApi.getPhotos(galleryId),
    staleTime: 1000 * 60 * 30,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
