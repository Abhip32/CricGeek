interface DetailsTabProps {
  scoreData: { matchInfo?: { details: Record<string, string> } } | null;
  loading: boolean;
}

export const DetailsTab = ({ scoreData, loading }: DetailsTabProps) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-700">
        <tbody>
          {Object.entries(scoreData?.matchInfo?.details || {}).map(([key, value]) => (
            <tr key={key} className="border-t border-gray-700">
              <td className="p-3 font-medium  w-1/4">{key}</td>
              <td className="p-3 ">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 