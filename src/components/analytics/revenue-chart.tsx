import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { RevenuePoint } from '@/types/dashboard';

interface RevenueChartProps {
  data: RevenuePoint[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Revenue, ADR & RevPAR</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8A7D72', fontSize: 10 }}
              interval={4}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8A7D72', fontSize: 10 }}
              tickFormatter={(v: number) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                background: '#231F1C',
                border: '1px solid #342E29',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#E8E0D8',
              }}
              formatter={(value, name) => [`$${value}`, `${name}`]}
            />
            <Legend
              wrapperStyle={{ fontSize: '10px', color: '#8A7D72' }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#BF754B" strokeWidth={2} dot={false} name="Revenue" />
            <Line type="monotone" dataKey="adr" stroke="#5B7B6A" strokeWidth={1.5} dot={false} name="ADR" strokeDasharray="4 2" />
            <Line type="monotone" dataKey="revpar" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="RevPAR" strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
