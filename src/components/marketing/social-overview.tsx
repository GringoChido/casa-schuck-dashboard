import { Instagram, Facebook, Music, ArrowUpRight } from 'lucide-react';
import type { SocialPlatform } from '@/types/dashboard';

const platformConfig: Record<SocialPlatform['platform'], { icon: typeof Instagram; color: string; bg: string; label: string }> = {
  instagram: { icon: Instagram, color: 'text-rose-400', bg: 'bg-rose-500/10', label: 'Instagram' },
  facebook: { icon: Facebook, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Facebook' },
  tiktok: { icon: Music, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'TikTok' },
};

const formatNumber = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
};

interface SocialOverviewProps {
  platforms: SocialPlatform[];
}

export const SocialOverview = ({ platforms }: SocialOverviewProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Social Media</h3>

      <div className="grid grid-cols-3 gap-3">
        {platforms.map((p) => {
          const config = platformConfig[p.platform];
          const Icon = config.icon;

          return (
            <div key={p.platform} className="bg-dashboard-border/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <span className="text-xs font-medium text-white">{config.label}</span>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-lg font-serif font-medium text-white">{formatNumber(p.followers)}</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ArrowUpRight className="w-3 h-3 text-dashboard-success" />
                    <span className="text-[10px] text-dashboard-success">+{formatNumber(p.followersChange)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-dashboard-text-secondary">Engagement</span>
                  <span className="text-white font-medium">{p.engagementRate}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-dashboard-text-secondary">Posts</span>
                  <span className="text-white font-medium">{p.postsThisMonth}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-dashboard-text-secondary">Top</span>
                  <span className="text-dashboard-accent font-medium">{p.topPostMetric}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
