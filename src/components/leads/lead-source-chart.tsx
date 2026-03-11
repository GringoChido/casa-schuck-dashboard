import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { LeadSourceBreakdown } from '@/types/dashboard';

interface LeadSourceChartProps {
  data: LeadSourceBreakdown[];
}

export const LeadSourceChart = ({ data }: LeadSourceChartProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Lead Sources</h3>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="source"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8A7D72', fontSize: 10 }}
              width={70}
            />
            <Tooltip
              contentStyle={{
                background: '#231F1C',
                border: '1px solid #342E29',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#E8E0D8',
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={((value: number) => [`${value} leads`]) as any}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={14}>
              {data.map((entry) => (
                <Cell key={entry.source} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
