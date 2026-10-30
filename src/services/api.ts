import {
  Match,
  SeriesGroup,
  UpcomingMatch,
  ScorecardResponse,
  InningsPartnershipsGroup,
  InningsFowGroup,
  DrsReviewSummary,
  ManhattanInnings,
  WormTrajectory,
  TournamentStanding,
  TournamentTeamsResponse,
  CricketerProfile
} from '@/types/match';
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
  getLiveMatches: async (league?: string): Promise<Match[]> => {
    try {
      const url = league
        ? `${API_BASE_URL}/getLive?league=${encodeURIComponent(league)}`
        : `${API_BASE_URL}/getLive`;
      const response = await fetch(url, { next: { revalidate: 30 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return normalizeSeriesMatches(data);
    } catch (error) {
      console.warn('getLiveMatches failed:', error);
      return [];
    }
  },

  /**
   * Fetches recently completed match results
   */
  getRecentMatches: async (league?: string): Promise<Match[]> => {
    try {
      const url = league
        ? `${API_BASE_URL}/getRecent?league=${encodeURIComponent(league)}`
        : `${API_BASE_URL}/getRecent`;
      const response = await fetch(url, { next: { revalidate: 120 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return normalizeSeriesMatches(data);
    } catch (error) {
      console.warn('getRecentMatches failed:', error);
      return [];
    }
  },

  /**
   * Fetches upcoming fixtures with optional date, category, and format filters
   */
  getUpcomingMatches: async (
    date?: string,
    category?: string,
    format?: string
  ): Promise<UpcomingMatch[]> => {
    try {
      const params = new URLSearchParams();
      if (date && date !== 'all') params.set('date', date);
      if (category && category !== 'all') params.set('category', category);
      if (format && format !== 'all') params.set('format', format);

      const qs = params.toString();
      const url = qs ? `${API_BASE_URL}/getUpcoming?${qs}` : `${API_BASE_URL}/getUpcoming`;
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
   * Fetches tournament schedule & fixtures feed
   */
  getSchedule: async (
    date?: string,
    category?: string,
    format?: string
  ): Promise<UpcomingMatch[]> => {
    try {
      const params = new URLSearchParams();
      if (date && date !== 'all') params.set('date', date);
      if (category && category !== 'all') params.set('category', category);
      if (format && format !== 'all') params.set('format', format);

      const qs = params.toString();
      const url = qs ? `${API_BASE_URL}/getSchedule?${qs}` : `${API_BASE_URL}/getSchedule`;
      const response = await fetch(url, { next: { revalidate: 600 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.warn('getSchedule failed:', error);
      return [];
    }
  },

  /**
   * Fetches latest cricket news (global or league-specific)
   */
  getTopNews: async (limit: number = 8, leagueId?: string): Promise<NewsItem[]> => {
    try {
      const url = leagueId
        ? `${API_BASE_URL}/getNews?leagueId=${encodeURIComponent(leagueId)}`
        : `${API_BASE_URL}/getNews`;
      const response = await fetch(url, { next: { revalidate: 300 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) return [];

      return data.slice(0, limit).map((item, idx) => ({
        id: item.id || idx,
        title: item.title || item.headline || '',
        headline: item.headline || item.title || '',
        description: item.description || '',
        dateTime: item.dateTime || item.date || 'Recent',
        author: item.author || 'ESPNcricinfo staff',
        image: item.image || '',
        link: item.link || '',
        raw: item
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
   * Fetches Playing XI and full squads
   */
  getSquads: async (matchUrl?: string) => {
    try {
      const url = matchUrl
        ? `${API_BASE_URL}/match/squads?url=${encodeURIComponent(matchUrl)}`
        : `${API_BASE_URL}/match/squads`;
      const response = await fetch(url, { next: { revalidate: 600 } });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getSquads failed:', error);
      return null;
    }
  },

  /**
   * Fetches ball-by-ball commentary stream with pagination
   */
  getCommentary: async (matchUrl?: string, limit: number = 100, page: number = 1) => {
    try {
      const params = new URLSearchParams();
      if (matchUrl) params.set('url', matchUrl);
      params.set('limit', String(limit));
      params.set('page', String(page));

      const response = await fetch(`${API_BASE_URL}/getCommentary?${params.toString()}`, {
        next: { revalidate: 30 }
      });
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.warn('getCommentary failed:', error);
      return [];
    }
  },

  /**
   * Fetches wicket-by-wicket partnerships
   */
  getPartnerships: async (matchUrl?: string): Promise<{ innings: InningsPartnershipsGroup[] } | null> => {
    try {
      const url = matchUrl
        ? `${API_BASE_URL}/match/partnerships?url=${encodeURIComponent(matchUrl)}`
        : `${API_BASE_URL}/match/partnerships`;
      const response = await fetch(url, { next: { revalidate: 45 } });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getPartnerships failed:', error);
      return null;
    }
  },

  /**
   * Fetches official Fall of Wickets (FOW)
   */
  getFallOfWickets: async (matchUrl?: string): Promise<{ innings: InningsFowGroup[] } | null> => {
    try {
      const url = matchUrl
        ? `${API_BASE_URL}/match/fow?url=${encodeURIComponent(matchUrl)}`
        : `${API_BASE_URL}/match/fow`;
      const response = await fetch(url, { next: { revalidate: 45 } });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getFallOfWickets failed:', error);
      return null;
    }
  },

  /**
   * Fetches DRS review stats and challenge history
   */
  getDrsReviews: async (matchUrl?: string) => {
    try {
      const url = matchUrl
        ? `${API_BASE_URL}/match/drs?url=${encodeURIComponent(matchUrl)}`
        : `${API_BASE_URL}/match/drs`;
      const response = await fetch(url, { next: { revalidate: 45 } });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getDrsReviews failed:', error);
      return null;
    }
  },

  /**
   * Fetches match details, toss, officials, and venue
   */
  getMatchInfo: async (matchUrl?: string) => {
    try {
      const url = matchUrl
        ? `${API_BASE_URL}/match/info?url=${encodeURIComponent(matchUrl)}`
        : `${API_BASE_URL}/match/info`;
      const response = await fetch(url, { next: { revalidate: 600 } });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getMatchInfo failed:', error);
      return null;
    }
  },

  /**
   * Fetches Pitch Report and captain toss quotes
   */
  getMatchPreview: async (matchUrl?: string) => {
    try {
      const url = matchUrl
        ? `${API_BASE_URL}/match/preview?url=${encodeURIComponent(matchUrl)}`
        : `${API_BASE_URL}/match/preview`;
      const response = await fetch(url, { next: { revalidate: 1800 } });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getMatchPreview failed:', error);
      return null;
    }
  },

  /**
   * Fetches over-by-over runs and wickets for Manhattan bar chart
   */
  getManhattan: async (matchUrl?: string): Promise<{ innings: ManhattanInnings[] } | null> => {
    try {
      const url = matchUrl
        ? `${API_BASE_URL}/match/manhattan?url=${encodeURIComponent(matchUrl)}`
        : `${API_BASE_URL}/match/manhattan`;
      const response = await fetch(url, { next: { revalidate: 45 } });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getManhattan failed:', error);
      return null;
    }
  },

  /**
   * Fetches cumulative run trajectories for Worm chart
   */
  getWorm: async (matchUrl?: string): Promise<{ trajectories: WormTrajectory[] } | null> => {
    try {
      const url = matchUrl
        ? `${API_BASE_URL}/match/worm?url=${encodeURIComponent(matchUrl)}`
        : `${API_BASE_URL}/match/worm`;
      const response = await fetch(url, { next: { revalidate: 45 } });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getWorm failed:', error);
      return null;
    }
  },

  /**
   * Fetches active tournaments and bilateral series list
   */
  getSeriesList: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getSeries`, { next: { revalidate: 600 } });
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.warn('getSeriesList failed:', error);
      return [];
    }
  },

  /**
   * Fetches tournament points table / standings
   */
  getStandings: async (leagueId: string): Promise<{ tournament: string; standings: TournamentStanding[] } | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/getStandings?leagueId=${encodeURIComponent(leagueId)}`, {
        next: { revalidate: 300 }
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getStandings failed:', error);
      return null;
    }
  },

  /**
   * Fetches tournament participating teams
   */
  getSeriesTeams: async (leagueId: string): Promise<TournamentTeamsResponse | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/getSeriesTeams?leagueId=${encodeURIComponent(leagueId)}`, {
        next: { revalidate: 600 }
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getSeriesTeams failed:', error);
      return null;
    }
  },

  /**
   * Search for cricketers by name
   */
  searchPlayers: async (query: string, limit: number = 10) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/player/search?query=${encodeURIComponent(query)}&limit=${limit}`,
        { next: { revalidate: 900 } }
      );
      if (!response.ok) return [];
      const data = await response.json();
      return data.players || [];
    } catch (error) {
      console.warn('searchPlayers failed:', error);
      return [];
    }
  },

  /**
   * Fetches detailed player profile
   */
  getPlayerById: async (id: string): Promise<CricketerProfile | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/player/${encodeURIComponent(id)}`, {
        next: { revalidate: 3600 }
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('getPlayerById failed:', error);
      return null;
    }
  },

  /**
   * Universal search across players, teams, leagues, and articles
   */
  universalSearch: async (query: string, type?: string, limit: number = 10) => {
    try {
      let url = `${API_BASE_URL}/search?query=${encodeURIComponent(query)}&limit=${limit}`;
      if (type) url += `&type=${encodeURIComponent(type)}`;
      const response = await fetch(url, { next: { revalidate: 600 } });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.warn('universalSearch failed:', error);
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
   * Fetches high-definition cricket photo galleries
   */
  getPhotos: async (galleryId?: string) => {
    try {
      const url = galleryId
        ? `${API_BASE_URL}/getPhotos?id=${encodeURIComponent(galleryId)}`
        : `${API_BASE_URL}/getPhotos`;
      const response = await fetch(url, { next: { revalidate: 1800 } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('getPhotos failed:', error);
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
  getMatchNews: async (leagueId?: string) => cricketApi.getTopNews(10, leagueId)
};
