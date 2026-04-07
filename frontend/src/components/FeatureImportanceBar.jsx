import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function FeatureImportanceBar({ data }) {
  // data is { feature_name: importance }
  const chartData = Object.entries(data || {})
    .map(([name, imp]) => ({ name, importance: imp }))
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 5);

  return (
    <div className="h-56 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fill: '#6B7A99' }} axisLine={false} tickLine={false} />
          <Tooltip 
            formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 24px rgba(26,60,110,0.08)' }}
          />
          <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#1A3C6E" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
