import { Instagram, Facebook, Music, Image, Video, Layers, Smartphone } from 'lucide-react';
import type { ScheduledPost } from '@/types/dashboard';

const platformIcons: Record<ScheduledPost['platform'], typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music,
};

const typeIcons: Record<ScheduledPost['type'], typeof Image> = {
  image: Image,
  video: Video,
  carousel: Layers,
  story: Smartphone,
};

const statusColors: Record<ScheduledPost['status'], string> = {
  scheduled: 'text-dashboard-success bg-dashboard-success/10',
  draft: 'text-amber-400 bg-amber-500/10',
  published: 'text-dashboard-text-secondary bg-dashboard-border',
};

interface ContentCalendarProps {
  posts: ScheduledPost[];
}

export const ContentCalendar = ({ posts }: ContentCalendarProps) => {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Content Calendar</h3>

      <div className="space-y-2">
        {posts.map((post) => {
          const PlatformIcon = platformIcons[post.platform];
          const TypeIcon = typeIcons[post.type];

          return (
            <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-dashboard-border/50 transition-colors cursor-pointer">
              <PlatformIcon className="w-4 h-4 text-dashboard-text-secondary flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-dashboard-text leading-relaxed truncate">{post.content}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-dashboard-text-secondary">{formatDate(post.scheduledDate)}</span>
                  <TypeIcon className="w-3 h-3 text-dashboard-hover" />
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColors[post.status]}`}>
                    {post.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
