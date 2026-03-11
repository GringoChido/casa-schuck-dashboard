import { KpiCards } from '@/components/KpiCards';
import { RoomGrid } from '@/components/RoomGrid';
import { OccupancyChart } from '@/components/OccupancyChart';
import { AlertsFeed } from '@/components/AlertsFeed';
import { ArrivalsTable } from '@/components/ArrivalsTable';
import { rooms, arrivals, alerts, kpis, occupancyData } from '@/data/mock';

export const CommandCenter = () => {
  return (
    <>
      <KpiCards data={kpis} />

      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8 space-y-4">
          <RoomGrid rooms={rooms} />
          <OccupancyChart data={occupancyData} />
        </div>
        <div className="col-span-4">
          <AlertsFeed alerts={alerts} />
        </div>
      </div>

      <div className="mt-4">
        <ArrivalsTable arrivals={arrivals} />
      </div>
    </>
  );
};
