import { BedDouble, DollarSign, TrendingUp, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { KpiData } from '@/types/dashboard';

const iconMap: Record<string, typeof BedDouble> = {
  bed: BedDouble,
  dollar: DollarSign,
  trending: TrendingUp,
  target: Target,
};

interface KpiCardsProps {
  data: KpiData[];
}

export function KpiCards({ data }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((kpi) => {
        const Icon = iconMap[kpi.icon] || TrendingUp;
        const isPositive = kpi.trend === 'up';

        return (
          <div
            key={kpi.label}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                {kpi.label}
              </span>
              <Icon className="w-4 h-4 text-zinc-600" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-semibold text-white">{kpi.value}</span>
              <span
                className={`flex items-center gap-0.5 text-xs font-medium mb-0.5 ${
                  isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {Math.abs(kpi.change)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
