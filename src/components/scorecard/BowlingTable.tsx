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

interface BowlingTableProps {
  bowlingData: BowlingRow[];
}

export const BowlingTable = ({ bowlingData }: BowlingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700">
        <thead>
          <tr className="border-b border-gray-700 bg-white text-zinc-950">
            <th className="p-3 text-left ">Bowler</th>
            <th className="p-3 text-right ">O</th>
            <th className="p-3 text-right ">M</th>
            <th className="p-3 text-right ">R</th>
            <th className="p-3 text-right ">W</th>
            <th className="p-3 text-right ">NB</th>
            <th className="p-3 text-right ">WD</th>
            <th className="p-3 text-right ">ECO</th>
          </tr>
        </thead>
        <tbody>
          {bowlingData.map((row, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="p-3  font-medium">{row.name}</td>
              <td className="p-3 text-right ">{row.overs}</td>
              <td className="p-3 text-right ">{row.maidens}</td>
              <td className="p-3 text-right ">{row.runs}</td>
              <td className="p-3 text-right ">{row.wickets}</td>
              <td className="p-3 text-right ">{row.noBalls}</td>
              <td className="p-3 text-right ">{row.wides}</td>
              <td className="p-3 text-right ">{row.economy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 