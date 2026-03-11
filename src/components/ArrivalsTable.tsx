import { Clock, Users } from 'lucide-react';
import type { Arrival } from '@/types/dashboard';

const sourceColors: Record<Arrival['source'], string> = {
  direct: 'text-emerald-400 bg-emerald-500/10',
  'booking.com': 'text-blue-400 bg-blue-500/10',
  airbnb: 'text-rose-400 bg-rose-500/10',
  expedia: 'text-amber-400 bg-amber-500/10',
};

const statusColors: Record<Arrival['status'], string> = {
  confirmed: 'text-emerald-400',
  pending: 'text-amber-400',
  'checked-in': 'text-blue-400',
};

interface ArrivalsTableProps {
  arrivals: Arrival[];
}

export function ArrivalsTable({ arrivals }: ArrivalsTableProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-zinc-500" />
          Upcoming Arrivals
        </h3>
        <span className="text-xs text-zinc-500">{arrivals.length} guests</span>
      </div>

      <div className="space-y-3">
        {arrivals.map((arrival) => (
          <div
            key={arrival.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {/* Avatar placeholder */}
            <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-300 flex-shrink-0">
              {arrival.guest.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white truncate">
                  {arrival.guest}
                </span>
                <span className={`text-[10px] font-medium ${statusColors[arrival.status]}`}>
                  {arrival.status}
                </span>
              </div>
              <p className="text-xs text-zinc-400 truncate">
                {arrival.room} &middot; {arrival.checkIn} &rarr; {arrival.checkOut}
              </p>
              {arrival.specialRequests && (
                <p className="text-[11px] text-amber-400/70 truncate mt-0.5">
                  {arrival.specialRequests}
                </p>
              )}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="flex items-center gap-1 text-xs text-zinc-500">
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
