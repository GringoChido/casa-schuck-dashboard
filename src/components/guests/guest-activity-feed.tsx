import { CalendarDays, Mail, FileText, Star } from 'lucide-react';
import type { GuestActivity } from '@/types/dashboard';

const activityConfig: Record<GuestActivity['type'], { icon: typeof Mail; color: string; bg: string }> = {
  booking: { icon: CalendarDays, color: 'text-dashboard-success', bg: 'bg-dashboard-success/10' },
  email: { icon: Mail, color: 'text-dashboard-info', bg: 'bg-dashboard-info/10' },
  note: { icon: FileText, color: 'text-dashboard-accent', bg: 'bg-dashboard-accent/10' },
  review: { icon: Star, color: 'text-dashboard-warning', bg: 'bg-dashboard-warning/10' },
};

interface GuestActivityFeedProps {
  activities: GuestActivity[];
}

export const GuestActivityFeed = ({ activities }: GuestActivityFeedProps) => {
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
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Recent Activity</h3>

      <div className="space-y-2">
        {activities.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-dashboard-border/50 transition-colors cursor-pointer">
              <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-dashboard-accent font-medium">{activity.guestName}</p>
                <p className="text-[11px] text-dashboard-text leading-relaxed">{activity.action}</p>
                <p className="text-[10px] text-dashboard-hover mt-1">{formatTime(activity.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
