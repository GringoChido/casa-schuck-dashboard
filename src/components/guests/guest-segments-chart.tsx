import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { GuestSegment } from '@/types/dashboard';

interface GuestSegmentsChartProps {
  data: GuestSegment[];
}

export const GuestSegmentsChart = ({ data }: GuestSegmentsChartProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Guest Segments</h3>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="segment"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8A7D72', fontSize: 10 }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: '#231F1C',
                border: '1px solid #342E29',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#E8E0D8',
              }}
              formatter={(value) => [`${value} guests`]}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
              {data.map((entry) => (
                <Cell key={entry.segment} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
