interface BattingRow {
  name: string;
  dismissal: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

interface BattingTableProps {
  battingData: BattingRow[];
}

export const BattingTable = ({ battingData }: BattingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700">
        <thead>
          <tr className="border-b border-gray-700 text-zinc-950 bg-white">
            <th className="p-3 text-left">Batter</th>
            <th className="p-3 text-left">Dismissal</th>
            <th className="p-3 text-right">R</th>
            <th className="p-3 text-right">B</th>
            <th className="p-3 text-right">4s</th>
            <th className="p-3 text-right">6s</th>
            <th className="p-3 text-right">SR</th>
          </tr>
        </thead>
        <tbody>
          {battingData.map((row, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="p-3  font-medium">{row.name}</td>
              <td className="p-3 ">{row.dismissal?.replace('► ►', '').trim()}</td>
              <td className="p-3 text-right ">{row.runs}</td>
              <td className="p-3 text-right ">{row.balls}</td>
              <td className="p-3 text-right ">{row.fours}</td>
              <td className="p-3 text-right ">{row.sixes}</td>
              <td className="p-3 text-right ">{row.strikeRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 