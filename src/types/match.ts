export interface Match {
  title: string;
  series: string;
  matchInfo: string;
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  status: string;
  flagA: string;
  flagB: string;
  links: {
    scorecard: string | undefined;
    livescore: string | undefined;
  }
}

export interface MatchLinks {
    livescore: string;
    scorecard: string;
    fullcommentary: string;
    news: string;
}
  
