import { ArrowUpRight, Minus } from 'lucide-react';
import type { ReviewSourceData } from '@/types/dashboard';

const sourceLabels: Record<ReviewSourceData['source'], string> = {
  google: 'Google',
  tripadvisor: 'TripAdvisor',
  'booking.com': 'Booking.com',
};

const sourceColors: Record<ReviewSourceData['source'], string> = {
  google: 'text-dashboard-info',
  tripadvisor: 'text-dashboard-success',
  'booking.com': 'text-dashboard-accent',
};

interface ReviewSourcesProps {
  sources: ReviewSourceData[];
}

export const ReviewSources = ({ sources }: ReviewSourcesProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {sources.map((source) => (
        <div key={source.source} className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5 hover:border-dashboard-hover transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-medium uppercase tracking-wider ${sourceColors[source.source]}`}>
              {sourceLabels[source.source]}
            </span>
            {source.trend === 'up' ? (
              <ArrowUpRight className="w-3.5 h-3.5 text-dashboard-success" />
            ) : (
              <Minus className="w-3.5 h-3.5 text-dashboard-text-secondary" />
            )}
          </div>
          <p className="text-2xl font-serif font-medium tracking-[0.02em] text-white">{source.ratingLabel}</p>
          <p className="text-xs text-dashboard-text-secondary mt-1">{source.totalReviews} reviews</p>
        </div>
      ))}
    </div>
  );
};
