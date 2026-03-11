import type { Room } from '@/types/dashboard';

const statusConfig: Record<Room['status'], { bg: string; text: string; label: string }> = {
  occupied: { bg: 'bg-dashboard-success/10', text: 'text-dashboard-success', label: 'Occupied' },
  vacant: { bg: 'bg-dashboard-border', text: 'text-dashboard-text-secondary', label: 'Vacant' },
  maintenance: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Maintenance' },
  arriving: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Arriving Today' },
  departing: { bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'Departing' },
};

interface RoomGridProps {
  rooms: Room[];
}

export function RoomGrid({ rooms }: RoomGridProps) {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white">Room Status</h3>
        <div className="flex items-center gap-3">
          {(['occupied', 'vacant', 'arriving', 'maintenance'] as const).map((status) => (
            <div key={status} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${statusConfig[status].text.replace('text-', 'bg-')}`} />
              <span className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider">
                {statusConfig[status].label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {rooms.map((room) => {
          const config = statusConfig[room.status];
          return (
            <div
              key={room.id}
              className={`${config.bg} border border-dashboard-border rounded-lg p-3 hover:border-dashboard-hover transition-colors cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-white truncate">
                  {room.name}
                </span>
                <span className={`text-[10px] font-medium ${config.text}`}>
                  {config.label}
                </span>
              </div>
              {room.guest ? (
                <p className="text-[11px] text-dashboard-text-secondary truncate">{room.guest}</p>
              ) : (
                <p className="text-[11px] text-dashboard-hover">—</p>
              )}
              {room.rate && (
                <p className="text-[11px] text-dashboard-text-secondary mt-1">${room.rate}/night</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
