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
  flagA: string;
  flagB: string;
  isLive?: boolean;
  link: string;
  links?: {
    scorecard?: string;
    livescore?: string;
  };
}

export interface SeriesGroup {
  series: string;
  matches: Array<{
    link: string;
    status: string;
    matchInfo: string;
    teams: Team[];
    result: string;
  }>;
}

export interface UpcomingMatch {
  date: string;
  teams: string;
  teamDetails?: Array<{
    name: string;
    flag: string;
  }>;
  venueInfo: string;
  seriesName: string;
  startTime: string;
  link: string;
}

export interface ScorecardTable {
  title: string;
  type: 'Batting' | 'Bowling' | string;
  headers: string[];
  rows: Record<string, string>[];
}

export interface ScorecardSummary {
  matchTitle: string;
  status: string;
  result: string;
  venue: string;
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
    tables: ScorecardTable[];
  };
}
