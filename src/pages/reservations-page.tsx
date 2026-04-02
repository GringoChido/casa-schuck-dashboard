import { ReservationKpiCards } from '@/components/reservations/reservation-kpi-cards';
import { ReservationsTable } from '@/components/reservations/reservations-table';
import { OccupancyHeatmap } from '@/components/reservations/occupancy-heatmap';
import { ChannelMixChart } from '@/components/reservations/channel-mix-chart';
import { reservations, occupancyHeatmap, channelMix } from '@/data/mock';

export const ReservationsPage = () => {
  return (
    <>
      <ReservationKpiCards />

      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8">
          <OccupancyHeatmap data={occupancyHeatmap} />
        </div>
        <div className="col-span-4">
          <ChannelMixChart data={channelMix} />
        </div>
      </div>

      <div className="mt-4">
        <ReservationsTable reservations={reservations} />
      </div>
    </>
  );
};
