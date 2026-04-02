import { AnalyticsKpiCards } from '@/components/analytics/analytics-kpi-cards';
import { TrafficSourcesChart } from '@/components/analytics/traffic-sources-chart';
import { BookingFunnel } from '@/components/analytics/booking-funnel';
import { RevenueChart } from '@/components/analytics/revenue-chart';
import { trafficSources, bookingFunnel, revenueData } from '@/data/mock';

export const AnalyticsPage = () => {
  return (
    <>
      <AnalyticsKpiCards />

      <div className="mt-4">
        <BookingFunnel steps={bookingFunnel} />
      </div>

      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8">
          <RevenueChart data={revenueData} />
        </div>
        <div className="col-span-4">
          <TrafficSourcesChart data={trafficSources} />
        </div>
      </div>
    </>
  );
};
