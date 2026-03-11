import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import type { Alert } from '@/types/dashboard';

const alertConfig: Record<Alert['type'], { icon: typeof Info; color: string; bg: string }> = {
  info: { icon: Info, color: 'text-dashboard-info', bg: 'bg-dashboard-info/10' },
  warning: { icon: AlertTriangle, color: 'text-dashboard-warning', bg: 'bg-dashboard-warning/10' },
  success: { icon: CheckCircle, color: 'text-dashboard-success', bg: 'bg-dashboard-success/10' },
  danger: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
};

interface AlertsFeedProps {
  alerts: Alert[];
}

export function AlertsFeed({ alerts }: AlertsFeedProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return `${Math.floor(diffHrs / 24)}d ago`;
  };

  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white">Activity Feed</h3>
        <span className="text-[10px] text-dashboard-text-secondary font-medium px-2 py-1 bg-dashboard-border rounded-full">
          {alerts.filter((a) => !a.read).length} new
        </span>
      </div>

      <div className="space-y-2">
        {alerts.map((alert) => {
          const config = alertConfig[alert.type];
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                alert.read ? 'opacity-50' : 'hover:bg-dashboard-border/50'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-dashboard-text leading-relaxed">{alert.message}</p>
                <p className="text-[10px] text-dashboard-hover mt-1">{formatTime(alert.timestamp)}</p>
              </div>
              {!alert.read && (
                <div className="w-1.5 h-1.5 rounded-full bg-dashboard-accent flex-shrink-0 mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
