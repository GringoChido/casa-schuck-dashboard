import { ArrowRight } from 'lucide-react';
import type { FunnelStep } from '@/types/dashboard';

interface BookingFunnelProps {
  steps: FunnelStep[];
}

export const BookingFunnel = ({ steps }: BookingFunnelProps) => {
  const maxValue = steps[0].value;

  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Booking Funnel</h3>

      <div className="flex items-center gap-2">
        {steps.map((step, index) => {
          const widthPercent = Math.max((step.value / maxValue) * 100, 20);

          return (
            <div key={step.label} className="flex items-center gap-2 flex-1">
              <div className="flex-1">
                <div
                  className="rounded-lg bg-dashboard-accent/20 border border-dashboard-accent/30 p-3 text-center transition-colors hover:bg-dashboard-accent/30"
                  style={{ minHeight: `${widthPercent * 0.8 + 20}px` }}
                >
                  <p className="text-lg font-serif font-medium text-white">{step.value.toLocaleString()}</p>
                  <p className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider mt-1">{step.label}</p>
                  {step.conversionFromPrev !== undefined && (
                    <p className="text-[10px] text-dashboard-accent mt-1">{step.conversionFromPrev}%</p>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-dashboard-hover flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
