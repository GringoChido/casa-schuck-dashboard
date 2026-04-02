import type { Guest } from '@/types/dashboard';

const statusColors: Record<Guest['status'], string> = {
  'first-time': 'text-dashboard-info bg-dashboard-info/10',
  returning: 'text-dashboard-accent bg-dashboard-accent/10',
  vip: 'text-dashboard-success bg-dashboard-success/10',
  lapsed: 'text-dashboard-text-secondary bg-dashboard-border',
};

interface GuestsTableProps {
  guests: Guest[];
}

export const GuestsTable = ({ guests }: GuestsTableProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Guest Directory</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dashboard-border">
              {['Name', 'Email', 'Stays', 'Last Visit', 'Status', 'Lifetime Value', 'Room Pref'].map((h) => (
                <th key={h} className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium pb-3 pr-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-border/30 transition-colors cursor-pointer">
                <td className="py-3 pr-3 text-xs font-medium text-white">{guest.name}</td>
                <td className="py-3 pr-3 text-[11px] text-dashboard-text-secondary truncate max-w-36">{guest.email}</td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary text-center">{guest.totalStays}</td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{guest.lastVisit}</td>
                <td className="py-3 pr-3">
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusColors[guest.status]}`}>
                    {guest.status}
                  </span>
                </td>
                <td className="py-3 pr-3 text-xs font-medium text-white">${guest.lifetimeValue.toLocaleString()}</td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{guest.roomPreference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
