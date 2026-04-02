import { GuestKpiCards } from '@/components/guests/guest-kpi-cards';
import { GuestsTable } from '@/components/guests/guests-table';
import { GuestSegmentsChart } from '@/components/guests/guest-segments-chart';
import { GuestActivityFeed } from '@/components/guests/guest-activity-feed';
import { guests, guestSegments, guestActivities } from '@/data/mock';

export const GuestsPage = () => {
  return (
    <>
      <GuestKpiCards />

      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8">
          <GuestsTable guests={guests} />
        </div>
        <div className="col-span-4 space-y-4">
          <GuestSegmentsChart data={guestSegments} />
          <GuestActivityFeed activities={guestActivities} />
        </div>
      </div>
    </>
  );
};
