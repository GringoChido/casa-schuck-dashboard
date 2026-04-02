import { Star, MessageSquare } from 'lucide-react';
import type { Review } from '@/types/dashboard';

const sourceLabels: Record<Review['source'], string> = {
  google: 'Google',
  tripadvisor: 'TripAdvisor',
  'booking.com': 'Booking.com',
};

const sourceColors: Record<Review['source'], string> = {
  google: 'text-dashboard-info',
  tripadvisor: 'text-dashboard-success',
  'booking.com': 'text-dashboard-accent',
};

interface RecentReviewsFeedProps {
  reviews: Review[];
}

export const RecentReviewsFeed = ({ reviews }: RecentReviewsFeedProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Recent Reviews</h3>

      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="p-3 rounded-lg border border-dashboard-border/50 hover:bg-dashboard-border/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-medium uppercase tracking-wider ${sourceColors[review.source]}`}>
                  {sourceLabels[review.source]}
                </span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < review.rating ? 'text-dashboard-warning fill-dashboard-warning' : 'text-dashboard-border'}`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-dashboard-text-secondary">{review.date}</span>
            </div>

            <p className="text-xs text-white font-medium mb-1">{review.guestName}</p>
            <p className="text-[11px] text-dashboard-text leading-relaxed">{review.excerpt}</p>

            <div className="flex items-center justify-between mt-3">
              {review.replied ? (
                <span className="text-[10px] text-dashboard-success">Replied</span>
              ) : (
                <button className="flex items-center gap-1 text-[10px] text-dashboard-accent hover:text-dashboard-accent-light transition-colors">
                  <MessageSquare className="w-3 h-3" />
                  Reply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
