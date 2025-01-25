import { BattingTable } from "./BattingTable";
import { BowlingTable } from "./BowlingTable";
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

interface InningProps {
  inning: {
    header: string;
    batting: BattingRow[];
    bowling: BowlingRow[];
    extras: { total: number; details: string };
    total: { runs: number; details: string };
    fallOfWickets: string[];
  };
}

export const InningSection = ({ inning }: InningProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{inning.header}</h2>
      
      <div className="space-y-6">
        <BattingTable battingData={inning.batting} />
        
        {/* Extras and Total */}
        <div className=" border border-gray-700 p-4 rounded-lg space-y-2">
          <div className="flex justify-between ">
            <span>Extras</span>
            <span>{inning.extras.total} ({inning.extras.details})</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{inning.total.runs} ({inning.total.details})</span>
          </div>
        </div>

        {/* Fall of Wickets */}
        <div className=" border border-gray-700 p-4 rounded-lg">
          <h3 className=" font-bold mb-2">Fall of Wickets</h3>
          <p className="">{inning.fallOfWickets.join(', ')}</p>
        </div>

        <BowlingTable bowlingData={inning.bowling} />
      </div>
    </div>
  );
}; 