import { MarketingKpiCards } from '@/components/marketing/marketing-kpi-cards';
import { SocialOverview } from '@/components/marketing/social-overview';
import { AdCampaignsTable } from '@/components/marketing/ad-campaigns-table';
import { ChannelPerformanceChart } from '@/components/marketing/channel-performance-chart';
import { ContentCalendar } from '@/components/marketing/content-calendar';
import { RecentPosts } from '@/components/marketing/recent-posts';
import { CampaignLauncher } from '@/components/marketing/campaign-launcher';
import { marketingKpis, socialPlatforms, adCampaigns, channelPerformance, scheduledPosts } from '@/data/mock';

export const MarketingDashboard = () => {
  return (
    <>
      <MarketingKpiCards data={marketingKpis} />

      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8 space-y-4">
          <SocialOverview platforms={socialPlatforms} />
          <AdCampaignsTable campaigns={adCampaigns} />
        </div>
        <div className="col-span-4 space-y-4">
          <CampaignLauncher />
          <ChannelPerformanceChart data={channelPerformance} />
          <ContentCalendar posts={scheduledPosts} />
        </div>
      </div>

      <div className="mt-4">
        <RecentPosts />
      </div>
    </>
  );
};
