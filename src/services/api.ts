import { Match, SeriesGroup, UpcomingMatch, ScorecardResponse } from '@/types/match';
import { NewsItem } from '@/types/news';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

/**
 * Normalizes raw backend series-grouped matches into clean Match objects
 */
function normalizeSeriesMatches(seriesData: any[]): Match[] {
  if (!Array.isArray(seriesData)) return [];

  const flattened: Match[] = [];

  seriesData.forEach((seriesBlock, sIdx) => {
    const seriesTitle = seriesBlock.series || seriesBlock.title || 'Cricket Series';
    const matchesList = seriesBlock.matches || (Array.isArray(seriesBlock) ? seriesBlock : []);

    if (Array.isArray(matchesList)) {
      matchesList.forEach((m, mIdx) => {
        const teams = m.teams || [];
        const team1 = teams[0] || {};
        const team2 = teams[1] || {};

        const teamA = team1.name || m.teamA || 'Team 1';
        const teamB = team2.name || m.teamB || 'Team 2';

        const scoreA = team1.score || team1.fullScore || m.scoreA || '';
        const scoreB = team2.score || team2.fullScore || m.scoreB || '';

        const flagA = team1.flag || m.flagA || '';
        const flagB = team2.flag || m.flagB || '';

        const statusRaw = m.status || '';
        const statusUpper = statusRaw.toUpperCase();
        const isLive =
          statusUpper.includes('LIVE') ||
          statusUpper.includes('STUMPS') ||
          statusUpper.includes('TEA') ||
          statusUpper.includes('LUNCH') ||
          statusUpper.includes('INNINGS BREAK') ||
          statusUpper.includes('RUNNING') ||
          statusUpper.includes('DELAYED') ||
          (!statusUpper.includes('RESULT') &&
            !statusUpper.includes('FINAL') &&
            !statusUpper.includes('WON') &&
            !statusUpper.includes('CONCLUDED') &&
            !m.result);

        flattened.push({
          id: `${sIdx}-${mIdx}-${teamA}-${teamB}`.replace(/\s+/g, '-').toLowerCase(),
          series: seriesTitle,
          title: `${teamA} vs ${teamB}`,
          matchInfo: m.matchInfo || '',
          teamA,
          teamB,
          scoreA,
          scoreB,
          oversA: team1.overs || '',
          oversB: team2.overs || '',
          target: team2.target || team1.target || '',
          status: statusRaw || (isLive ? 'LIVE' : 'UPCOMING'),
          result: m.result || '',
          flagA,
          flagB,
          isLive,
          link: m.link || '',
          links: {
            scorecard: m.link,
            livescore: m.link
          }
        });
      });
    }
  });

  return flattened;
}

export const cricketApi = {
  /**
   * Fetches real-time live matches
   */
  getLiveMatches: async (): Promise<Match[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/getLive`, { next: { revalidate: 30 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return normalizeSeriesMatches(data);
    } catch (error) {
      console.warn('getLiveMatches failed, returning empty array:', error);
      return [];
    }
  },

  /**
   * Fetches recently completed match results
   */
  getRecentMatches: async (): Promise<Match[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/getRecent`, { next: { revalidate: 120 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return normalizeSeriesMatches(data);
    } catch (error) {
      console.warn('getRecentMatches failed:', error);
      return [];
    }
  },

  /**
   * Fetches upcoming fixtures
   */
  getUpcomingMatches: async (date?: string): Promise<UpcomingMatch[]> => {
    try {
      const url = date 
        ? `${API_BASE_URL}/getUpcoming?date=${encodeURIComponent(date)}`
        : `${API_BASE_URL}/getUpcoming`;
      const response = await fetch(url, { next: { revalidate: 300 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.warn('getUpcomingMatches failed:', error);
      return [];
    }
  },

  /**
   * Alias for getUpcomingMatches for schedule page
   */
  getSchedule: async (date?: string): Promise<UpcomingMatch[]> => {
    return cricketApi.getUpcomingMatches(date);
  },

  /**
   * Fetches top news articles
   */
  getTopNews: async (limit: number = 6): Promise<NewsItem[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/getNews`, { next: { revalidate: 300 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) return [];

      return data.slice(0, limit).map((item, idx) => ({
        id: item.id || idx,
        title: item.title || item.news_title || item.headline || '',
        description: item.description || item.news_content || '',
        dateTime: item.dateTime || item.date || item.pubDate || 'Recent',
        author: item.author || 'Cricket Desk',
        image: item.image || item.news_img || '',
        link: item.link || '',
        headline: item.title || item.news_headline || ''
      }));
    } catch (error) {
      console.warn('getTopNews failed:', error);
      return [];
    }
  },

  /**
   * Fetches full match scorecard
   */
  getScoreCard: async (matchUrl?: string): Promise<ScorecardResponse | null> => {
    try {
      const url = matchUrl 
        ? `${API_BASE_URL}/getScorecard?url=${encodeURIComponent(matchUrl)}`
        : `${API_BASE_URL}/getScorecard`;
      const response = await fetch(url, { next: { revalidate: 45 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('getScoreCard failed:', error);
      return null;
    }
  },

  /**
   * Fetches ICC Team Rankings
   */
  getTeamRankings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rankings/icc-team-ranking`, { next: { revalidate: 1800 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('getTeamRankings failed:', error);
      return [];
    }
  },

  /**
   * Fetches ICC Player Rankings
   */
  getPlayerRankings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rankings/icc-player-ranking`, { next: { revalidate: 1800 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('getPlayerRankings failed:', error);
      return [];
    }
  },

  /**
   * Backward compatibility alias helpers
   */
  getBattingRankings: async () => cricketApi.getPlayerRankings(),
  getBowlingRankings: async () => cricketApi.getPlayerRankings(),
  getAllRounderRankings: async () => cricketApi.getPlayerRankings(),
  getMiniScoreCard: async (url: string) => cricketApi.getScoreCard(url),
  getSquads: async (url: string) => null,
  getCommentary: async (url: string) => null,
  getMatchNews: async (url: string) => []
};
