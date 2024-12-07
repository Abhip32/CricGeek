import { InningSection } from './InningSection';
interface BattingRow {
  name: string;
  dismissal: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

interface BowlingRow {
  name: string;
  overs: string;
  maidens: number;
  runs: number;
  wickets: number;
  noBalls: number;
  wides: number;
  economy: number;
}

interface Inning {
  header: string;
  batting: BattingRow[];
  bowling: BowlingRow[];
  extras: { total: number; details: string };
  total: { runs: number; details: string };
  fallOfWickets: string[];
}

interface ScorecardTabProps {
  scoreData: { innings: Inning[] } | null;
  loading: boolean;
}

export const ScorecardTab = ({ scoreData, loading }: ScorecardTabProps) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {scoreData?.innings?.map((inning, index) => (
        <InningSection key={index} inning={inning} />
      ))}
    </div>
  );
};

// Create sub-components for BattingTable, BowlingTable, etc. 