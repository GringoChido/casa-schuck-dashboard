import type { Reservation } from '@/types/dashboard';

const statusColors: Record<Reservation['status'], string> = {
  confirmed: 'text-dashboard-info bg-dashboard-info/10',
  pending: 'text-dashboard-warning bg-dashboard-warning/10',
  'checked-in': 'text-dashboard-success bg-dashboard-success/10',
  'checked-out': 'text-dashboard-text-secondary bg-dashboard-border',
  cancelled: 'text-dashboard-danger bg-dashboard-danger/10',
};

const sourceColors: Record<Reservation['source'], string> = {
  direct: 'text-dashboard-success',
  'booking.com': 'text-dashboard-info',
  airbnb: 'text-red-400',
  expedia: 'text-dashboard-warning',
};

interface ReservationsTableProps {
  reservations: Reservation[];
}

export const ReservationsTable = ({ reservations }: ReservationsTableProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">All Reservations</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dashboard-border">
              {['Guest', 'Room', 'Check-in', 'Check-out', 'Nights', 'Rate', 'Total', 'Source', 'Status'].map((h) => (
                <th key={h} className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium pb-3 pr-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-border/30 transition-colors cursor-pointer">
                <td className="py-3 pr-3 text-xs font-medium text-white">{res.guest}</td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{res.room}</td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{res.checkIn}</td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{res.checkOut}</td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary text-center">{res.nights}</td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">${res.ratePerNight}</td>
                <td className="py-3 pr-3 text-xs font-medium text-white">${res.total.toLocaleString()}</td>
                <td className="py-3 pr-3">
                  <span className={`text-[11px] font-medium ${sourceColors[res.source]}`}>
                    {res.source}
                  </span>
                </td>
                <td className="py-3 pr-3">
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusColors[res.status]}`}>
                    {res.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
