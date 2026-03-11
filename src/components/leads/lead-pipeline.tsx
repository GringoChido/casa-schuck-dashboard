import type { PipelineStage } from '@/types/dashboard';

interface LeadPipelineProps {
  stages: PipelineStage[];
}

const formatCurrency = (n: number) => {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n}`;
};

export const LeadPipeline = ({ stages }: LeadPipelineProps) => {
  const totalCount = stages.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Pipeline</h3>

      <div className="flex gap-1 h-10 rounded-lg overflow-hidden mb-4">
        {stages.map((stage) => (
          <div
            key={stage.stage}
            className="flex items-center justify-center transition-all hover:opacity-80 cursor-pointer"
            style={{
              backgroundColor: stage.color,
              width: `${(stage.count / totalCount) * 100}%`,
              minWidth: stage.count > 0 ? '2rem' : '0',
            }}
          >
            <span className="text-[11px] font-bold text-white">{stage.count}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-2">
        {stages.map((stage) => (
          <div key={stage.stage} className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
              <span className="text-[10px] text-dashboard-text-secondary font-medium uppercase tracking-wider">
                {stage.label}
              </span>
            </div>
            <span className="text-xs text-dashboard-text font-medium">{formatCurrency(stage.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
