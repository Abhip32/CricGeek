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
  id?: string;
  date: string;
  startDate?: string | null;
  teams: string;
  teamDetails?: Array<{
    name: string;
    flag: string | null;
    abbreviation?: string;
  }>;
  venueInfo: string;
  groundCity?: string;
  seriesName: string;
  startTime: string;
  category?: 'all' | 'international' | 't20leagues' | 'domestic' | 'women' | string;
  format?: 'TEST' | 'ODI' | 'T20' | string;
  stage?: string;
  status?: string;
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
  toss?: string;
  playerOfTheMatch?: string;
  teams: Array<{
    teamName: string;
    teamLogo: string | null;
    score: string;
    overs: string;
  }>;
}

export interface PartnershipBatsman {
  id: string | null;
  name: string;
  runs: number | string;
  balls: number | string;
  headshot: string | null;
}

export interface InningsPartnership {
  wicketNumber: number | string;
  wicketName: string;
  runs: number;
  overs: string | number;
  runRate: number | string;
  start?: { overs: string; runs: string; wickets: string };
  end?: { overs: string; runs: string; wickets: string };
  batsmen: PartnershipBatsman[];
}

export interface InningsPartnershipsGroup {
  team: string;
  period: number;
  score: string;
  overs: string;
  partnerships: InningsPartnership[];
}

export interface FallOfWicketItem {
  wicketNumber: number;
  wicketOver: number | string;
  runs: number;
  runsScored: number;
  ballsFaced: number;
  fowType: string;
  batsman: {
    id: string | null;
    name: string;
    position?: string;
    headshot: string | null;
  };
}

export interface InningsFowGroup {
  team: string;
  period: number;
  score: string;
  overs: string;
  fallOfWickets: FallOfWicketItem[];
}

export interface DrsReviewSummary {
  team: string;
  period: number;
  reviews: {
    remaining: number;
    reviewsPermitted: number;
    successful: number;
    unsuccessful: number;
  };
}

export interface DrsChallenge {
  day: number | string | null;
  text: string;
  type?: string;
}

export interface SquadPlayer {
  id: string | null;
  name: string;
  fullName?: string;
  position?: string;
  positionAbbr?: string;
  role?: string;
  captain?: boolean;
  wicketkeeper?: boolean;
  starter?: boolean;
  headshot?: string | null;
  image?: string | null;
}

export interface TeamSquadGroup {
  team: {
    id: string | null;
    name: string;
    logo?: string | null;
  };
  playingXI: SquadPlayer[];
  bench: SquadPlayer[];
}

export interface ManhattanOver {
  over: number;
  runs: number;
  wickets: number;
  balls: number;
  bowler: string;
  cumulativeRuns: number;
}

export interface ManhattanInnings {
  period: string;
  team: string;
  totalOvers: number;
  overs: ManhattanOver[];
}

export interface WormTrajectoryPoint {
  over: number;
  score: number;
  wickets: number;
}

export interface WormTrajectory {
  period: string;
  team: string;
  trajectory: WormTrajectoryPoint[];
}

export interface TournamentStanding {
  team: {
    id: string | null;
    name: string;
    abbreviation: string;
    logo: string | null;
    isNational?: boolean;
  };
  rank: number | null;
  points: string | number;
  stats: Record<string, any>;
}

export interface SeriesTeam {
  id: string | null;
  name: string;
  abbreviation: string;
  location?: string;
  logo: string | null;
  raw?: any;
}

export interface TournamentTeamsResponse {
  leagueId: string;
  tournament: string;
  teamsCount: number;
  teams: SeriesTeam[];
}

export interface CricketerProfile {
  id: string;
  name: string;
  fullName: string;
  shortName?: string;
  dateOfBirth?: string | null;
  age?: number | null;
  gender?: string;
  position?: string;
  positionAbbr?: string;
  battingStyle?: string | null;
  battingStyleShort?: string | null;
  bowlingStyle?: string | null;
  bowlingStyleShort?: string | null;
  headshot?: string | null;
  team?: {
    id: string | null;
    name: string;
    abbreviation: string;
    color?: string | null;
    flag?: string | null;
  };
  profileUrl?: string | null;
}

export interface ScorecardResponse {
  message: string;
  tableCount: number;
  data: {
    summary: ScorecardSummary;
    details?: Record<string, string>;
    tables: ScorecardTable[];
    squads?: Record<string, any>;
    partnerships?: InningsPartnershipsGroup[];
    fallOfWickets?: InningsFowGroup[];
    drsReviews?: DrsReviewSummary[];
    leaders?: any[];
    gameInfo?: any;
    notes?: any[];
    debuts?: any[];
    videos?: any[];
    commentary?: any[];
    news?: any;
    raw?: any;
  };
}
