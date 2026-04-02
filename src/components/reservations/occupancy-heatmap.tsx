import type { OccupancyDay } from '@/types/dashboard';

interface OccupancyHeatmapProps {
  data: OccupancyDay[];
}

const getHeatColor = (occupancy: number): string => {
  if (occupancy >= 90) return 'bg-dashboard-success';
  if (occupancy >= 70) return 'bg-dashboard-success/70';
  if (occupancy >= 50) return 'bg-dashboard-accent/60';
  if (occupancy >= 30) return 'bg-dashboard-accent/30';
  return 'bg-dashboard-border';
};

export const OccupancyHeatmap = ({ data }: OccupancyHeatmapProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">30-Day Occupancy Heatmap</h3>

      <div className="grid grid-cols-10 gap-1.5">
        {data.map((day) => (
          <div key={day.date} className="group relative">
            <div
              className={`aspect-square rounded-md ${getHeatColor(day.occupancy)} transition-colors cursor-pointer hover:ring-1 hover:ring-white/30`}
            />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
              <div className="bg-dashboard-bg border border-dashboard-border rounded-lg px-2 py-1 text-[10px] text-white whitespace-nowrap">
                {day.date} ({day.dayLabel}) — {day.occupancy}%
              </div>
            </div>
            <p className="text-[8px] text-dashboard-text-secondary text-center mt-0.5">{day.date.replace('Mar ', '')}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-[10px] text-dashboard-text-secondary">Low</span>
        <div className="flex gap-1">
          <div className="w-4 h-3 rounded-sm bg-dashboard-border" />
          <div className="w-4 h-3 rounded-sm bg-dashboard-accent/30" />
          <div className="w-4 h-3 rounded-sm bg-dashboard-accent/60" />
          <div className="w-4 h-3 rounded-sm bg-dashboard-success/70" />
          <div className="w-4 h-3 rounded-sm bg-dashboard-success" />
        </div>
        <span className="text-[10px] text-dashboard-text-secondary">High</span>
      </div>
    </div>
  );
};
