import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ChannelMixEntry } from '@/types/dashboard';

interface ChannelMixChartProps {
  data: ChannelMixEntry[];
}

export const ChannelMixChart = ({ data }: ChannelMixChartProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Channel Mix</h3>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={75}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#231F1C',
                border: '1px solid #342E29',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#E8E0D8',
              }}
              formatter={(value) => [`${value}%`]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 mt-2">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-dashboard-text-secondary">{entry.name}</span>
            </div>
            <span className="text-xs font-medium text-white">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
