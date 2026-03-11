import { Instagram, Facebook, Music, Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import type { SocialPlatform } from '@/types/dashboard';

interface RecentPost {
  id: string;
  platform: SocialPlatform['platform'];
  content: string;
  publishedDate: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
}

const platformIcons: Record<SocialPlatform['platform'], typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music,
};

const formatNumber = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
};

const recentPosts: RecentPost[] = [
  { id: 'rp1', platform: 'instagram', content: 'Sunset over the rooftop terrace — the magic of San Miguel at golden hour', publishedDate: '2026-03-09', likes: 2400, comments: 89, shares: 45, reach: 12800 },
  { id: 'rp2', platform: 'facebook', content: 'Spring getaway packages now available — book direct and save 15%', publishedDate: '2026-03-08', likes: 340, comments: 28, shares: 890, reach: 8900 },
  { id: 'rp3', platform: 'tiktok', content: 'POV: Waking up in a 200-year-old colonial boutique hotel in Mexico', publishedDate: '2026-03-07', likes: 8100, comments: 234, shares: 1200, reach: 14000 },
  { id: 'rp4', platform: 'instagram', content: 'Chef Luis preparing traditional Mexican breakfast in the courtyard kitchen', publishedDate: '2026-03-06', likes: 1800, comments: 56, shares: 32, reach: 9200 },
];

export const RecentPosts = () => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Recent Posts</h3>

      <div className="space-y-3">
        {recentPosts.map((post) => {
          const PlatformIcon = platformIcons[post.platform];

          return (
            <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg bg-dashboard-border/50 hover:bg-dashboard-border transition-colors cursor-pointer">
              <PlatformIcon className="w-4 h-4 text-dashboard-text-secondary flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-dashboard-text leading-relaxed truncate">{post.content}</p>
                <p className="text-[10px] text-dashboard-text-secondary mt-1">{post.publishedDate}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="flex items-center gap-1 text-[10px] text-dashboard-text-secondary">
                  <Heart className="w-3 h-3" /> {formatNumber(post.likes)}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-dashboard-text-secondary">
                  <MessageCircle className="w-3 h-3" /> {post.comments}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-dashboard-text-secondary">
                  <Share2 className="w-3 h-3" /> {formatNumber(post.shares)}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-dashboard-accent">
                  <Eye className="w-3 h-3" /> {formatNumber(post.reach)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
