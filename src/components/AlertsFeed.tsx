import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import type { Alert } from '@/types/dashboard';

const alertConfig: Record<Alert['type'], { icon: typeof Info; color: string; bg: string }> = {
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  success: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
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
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Activity Feed</h3>
        <span className="text-[10px] text-zinc-500 font-medium px-2 py-1 bg-zinc-800 rounded-full">
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
                alert.read ? 'opacity-50' : 'hover:bg-zinc-800/50'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-300 leading-relaxed">{alert.message}</p>
                <p className="text-[10px] text-zinc-600 mt-1">{formatTime(alert.timestamp)}</p>
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
