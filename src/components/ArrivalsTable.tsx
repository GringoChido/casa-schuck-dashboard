import { Clock, Users } from 'lucide-react';
import type { Arrival } from '@/types/dashboard';

const sourceColors: Record<Arrival['source'], string> = {
  direct: 'text-dashboard-success bg-dashboard-success/10',
  'booking.com': 'text-blue-400 bg-blue-500/10',
  airbnb: 'text-rose-400 bg-rose-500/10',
  expedia: 'text-amber-400 bg-amber-500/10',
};

const statusColors: Record<Arrival['status'], string> = {
  confirmed: 'text-dashboard-success',
  pending: 'text-amber-400',
  'checked-in': 'text-blue-400',
};

interface ArrivalsTableProps {
  arrivals: Arrival[];
}

export function ArrivalsTable({ arrivals }: ArrivalsTableProps) {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-dashboard-text-secondary" />
          Upcoming Arrivals
        </h3>
        <span className="text-xs text-dashboard-text-secondary">{arrivals.length} guests</span>
      </div>

      <div className="space-y-3">
        {arrivals.map((arrival) => (
          <div
            key={arrival.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-dashboard-border/50 hover:bg-dashboard-border transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-dashboard-hover flex items-center justify-center text-xs font-medium text-dashboard-text flex-shrink-0">
              {arrival.guest.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white truncate">
                  {arrival.guest}
                </span>
                <span className={`text-[10px] font-medium ${statusColors[arrival.status]}`}>
                  {arrival.status}
                </span>
              </div>
              <p className="text-xs text-dashboard-text-secondary truncate">
                {arrival.room} &middot; {arrival.checkIn} &rarr; {arrival.checkOut}
              </p>
              {arrival.specialRequests && (
                <p className="text-[11px] text-dashboard-accent/70 truncate mt-0.5">
                  {arrival.specialRequests}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="flex items-center gap-1 text-xs text-dashboard-text-secondary">
                <Users className="w-3 h-3" />
                {arrival.guests}
              </span>
              <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${sourceColors[arrival.source]}`}>
                {arrival.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
