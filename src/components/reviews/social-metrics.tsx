import { Instagram, Facebook } from 'lucide-react';
import type { SocialMetric } from '@/types/dashboard';

const platformConfig: Record<SocialMetric['platform'], { icon: typeof Instagram; label: string; color: string }> = {
  instagram: { icon: Instagram, label: 'Instagram', color: 'text-rose-400' },
  facebook: { icon: Facebook, label: 'Facebook', color: 'text-blue-400' },
};

interface SocialMetricsProps {
  metrics: SocialMetric[];
}

export const SocialMetrics = ({ metrics }: SocialMetricsProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Social Metrics</h3>

      <div className="space-y-4">
        {metrics.map((metric) => {
          const config = platformConfig[metric.platform];
          const Icon = config.icon;

          return (
            <div key={metric.platform} className="p-3 rounded-lg border border-dashboard-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-4 h-4 ${config.color}`} />
                <span className="text-xs font-medium text-white">{config.label}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider">Followers</p>
                  <p className="text-sm font-medium text-white">{metric.followers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider">Engagement</p>
                  <p className="text-sm font-medium text-white">{metric.engagementRate}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider">Recent Likes</p>
                  <p className="text-sm font-medium text-white">{metric.recentPostLikes}</p>
                </div>
                <div>
                  <p className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider">Recent Reach</p>
                  <p className="text-sm font-medium text-white">{metric.recentPostReach.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
