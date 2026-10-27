export interface Team {
  name: string;
  flag: string | null;
  score?: string;
  overs?: string;
  target?: string;
  fullScore?: string;
}

export interface Match {
  id?: string;
  series: string;
  title?: string;
  matchInfo: string;
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  oversA?: string;
  oversB?: string;
  target?: string;
  status: string;
  result: string;
  flagA: string | null;
  flagB: string | null;
  isLive?: boolean;
  link: string;
  links?: {
    scorecard?: string;
    livescore?: string;
  };
  raw?: any;
}

export interface SeriesGroup {
  series: string;
  matches: Array<{
    link: string;
    status: string;
    matchInfo: string;
    teams: Team[];
    result: string;
    raw?: any;
  }>;
}

export interface UpcomingMatch {
  date: string;
  teams: string;
  teamDetails?: Array<{
    name: string;
    flag: string | null;
  }>;
  venueInfo: string;
  seriesName: string;
  startTime: string;
  link: string;
  matchInfo?: string;
  raw?: any;
}

export interface ScorecardTable {
  title: string;
  type: 'Batting' | 'Bowling' | string;
  headers: string[];
  rows: Record<string, string>[];
  extras?: { total: number | string; details: string };
  total?: { score?: string; runs?: number | string; details: string };
  didNotBat?: string[];
  fallOfWickets?: string[];
}

export interface ScorecardSummary {
  matchTitle: string;
  status: string;
  result: string;
  venue: string;
  playerOfTheMatch?: string;
  teams: Array<{
    teamName: string;
    teamLogo: string | null;
    score: string;
    overs: string;
  }>;
}

export interface ScorecardResponse {
  message: string;
  tableCount: number;
  data: {
    summary: ScorecardSummary;
    details?: Record<string, string>;
    tables: ScorecardTable[];
    squads?: Record<string, any[]>;
    leaders?: any[];
    gameInfo?: any;
    raw?: any;
  };
}
