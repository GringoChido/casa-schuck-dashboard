import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ChannelPerformance } from '@/types/dashboard';

interface ChannelPerformanceChartProps {
  data: ChannelPerformance[];
}

export const ChannelPerformanceChart = ({ data }: ChannelPerformanceChartProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Lead Sources</h3>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="leads"
              nameKey="channel"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell key={entry.channel} fill={entry.color} />
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={((value: number, name: string) => [`${value} leads`, name]) as any}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        {data.map((d) => (
          <div key={d.channel} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-[11px] text-dashboard-text-secondary truncate">{d.channel}</span>
            <span className="text-[11px] text-white font-medium ml-auto">{d.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
