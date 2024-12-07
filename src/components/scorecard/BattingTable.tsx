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
      <table className="min-w-full bg-black border border-gray-700">
        <thead>
          <tr className="border-b border-gray-700 bg-red-600">
            <th className="p-3 text-left text-white">Batter</th>
            <th className="p-3 text-left text-white">Dismissal</th>
            <th className="p-3 text-right text-white">R</th>
            <th className="p-3 text-right text-white">B</th>
            <th className="p-3 text-right text-white">4s</th>
            <th className="p-3 text-right text-white">6s</th>
            <th className="p-3 text-right text-white">SR</th>
          </tr>
        </thead>
        <tbody>
          {battingData.map((row, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="p-3 text-white font-medium">{row.name}</td>
              <td className="p-3 text-gray-300">{row.dismissal.replace('► ►', '').trim()}</td>
              <td className="p-3 text-right text-white">{row.runs}</td>
              <td className="p-3 text-right text-gray-300">{row.balls}</td>
              <td className="p-3 text-right text-gray-300">{row.fours}</td>
              <td className="p-3 text-right text-gray-300">{row.sixes}</td>
              <td className="p-3 text-right text-gray-300">{row.strikeRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 