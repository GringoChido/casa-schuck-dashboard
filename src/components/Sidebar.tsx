import { LayoutDashboard, BedDouble, CalendarDays, BarChart3, MessageSquare, Settings } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Command Center', active: true },
  { icon: BedDouble, label: 'Rooms', active: false },
  { icon: CalendarDays, label: 'Reservations', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: MessageSquare, label: 'Messages', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-zinc-800">
        <h1 className="text-lg font-semibold tracking-tight text-white">
          Casa Schuck
        </h1>
        <p className="text-[11px] text-zinc-500 tracking-wider uppercase mt-0.5">
          Command Center
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              item.active
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Status */}
      <div className="px-6 py-4 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
          <span className="text-xs text-zinc-500">All systems online</span>
        </div>
      </div>
    </aside>
  );
}
