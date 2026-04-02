import { ReviewKpiCards } from '@/components/reviews/review-kpi-cards';
import { ReviewSources } from '@/components/reviews/review-sources';
import { RecentReviewsFeed } from '@/components/reviews/recent-reviews-feed';
import { SentimentAnalysis } from '@/components/reviews/sentiment-analysis';
import { SocialMetrics } from '@/components/reviews/social-metrics';
import { reviewSources, reviews, sentimentThemes, socialMetrics } from '@/data/mock';

export const ReviewsPage = () => {
  return (
    <>
      <ReviewKpiCards />

      <div className="mt-4">
        <ReviewSources sources={reviewSources} />
      </div>

      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8">
          <RecentReviewsFeed reviews={reviews} />
        </div>
        <div className="col-span-4 space-y-4">
          <SentimentAnalysis themes={sentimentThemes} />
          <SocialMetrics metrics={socialMetrics} />
        </div>
      </div>
    </>
  );
};
