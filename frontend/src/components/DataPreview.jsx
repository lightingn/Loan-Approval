export default function DataPreview({ columns, data, missingValues }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden mt-6">
      <div className="p-4 border-b border-gray-100 bg-background flex justify-between items-center">
        <h3 className="font-semibold text-primary">Data Preview (Top 5 rows)</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-muted">
          <thead className="text-xs text-text uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map(col => (
                <th key={col} className="px-4 py-3 font-semibold whitespace-nowrap">
                  {col}
                  {missingValues[col] > 0 && (
                    <span className="block text-[10px] text-accent mt-0.5">
                      {missingValues[col]} missing
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="bg-white border-b border-gray-50 hover:bg-gray-50">
                {columns.map(col => (
                  <td key={`${idx}-${col}`} className="px-4 py-2 whitespace-nowrap">
                    {row[col]?.toString() || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
