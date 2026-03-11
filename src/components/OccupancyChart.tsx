import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { OccupancyPoint } from '@/types/dashboard';

interface OccupancyChartProps {
  data: OccupancyPoint[];
}

export function OccupancyChart({ data }: OccupancyChartProps) {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white">Occupancy & Revenue</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-dashboard-accent" />
            <span className="text-[10px] text-dashboard-text-secondary">Occupancy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-dashboard-success" />
            <span className="text-[10px] text-dashboard-text-secondary">Revenue</span>
          </div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BF754B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#BF754B" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5B7B6A" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#5B7B6A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8A7D72', fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8A7D72', fontSize: 10 }}
              domain={[0, 100]}
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
              formatter={((value: number, name: string) =>
                name === 'occupancy' ? [`${value}%`, 'Occupancy'] : [`$${value}`, 'Revenue']
              ) as any}
            />
            <Area
              type="monotone"
              dataKey="occupancy"
              stroke="#BF754B"
              strokeWidth={2}
              fill="url(#occupancyGradient)"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#5B7B6A"
              strokeWidth={1.5}
              fill="url(#revenueGradient)"
              yAxisId={0}
              hide
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
