import { Bell, Search } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { KpiCards } from '@/components/KpiCards';
import { RoomGrid } from '@/components/RoomGrid';
import { ArrivalsTable } from '@/components/ArrivalsTable';
import { AlertsFeed } from '@/components/AlertsFeed';
import { OccupancyChart } from '@/components/OccupancyChart';
import { rooms, arrivals, alerts, kpis, occupancyData } from '@/data/mock';

function App() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const unreadAlerts = alerts.filter((a: typeof alerts[number]) => !a.read).length;

  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar />

      {/* Main content */}
      <main className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Good morning, Joshua
            </h2>
            <p className="text-sm text-zinc-500 mt-0.5">{today}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search guests, rooms..."
                className="bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white
                           placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <Bell className="w-4 h-4 text-zinc-400" />
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-dashboard-accent rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-300">
              JS
            </div>
          </div>
        </div>

        {/* KPIs */}
        <KpiCards data={kpis} />

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-4 mt-4">
          {/* Left column: Room grid + Chart */}
          <div className="col-span-8 space-y-4">
            <RoomGrid rooms={rooms} />
            <OccupancyChart data={occupancyData} />
          </div>

          {/* Right column: Alerts feed */}
          <div className="col-span-4">
            <AlertsFeed alerts={alerts} />
          </div>
        </div>

        {/* Arrivals */}
        <div className="mt-4">
          <ArrivalsTable arrivals={arrivals} />
        </div>
      </main>
    </div>
  );
}

export default App;
