import { LayoutDashboard, Megaphone, UserPlus, BedDouble, CalendarDays, Settings } from 'lucide-react';
import type { PageId } from '@/types/dashboard';

interface NavItem {
  icon: typeof LayoutDashboard;
  label: string;
  page: PageId | null;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Command Center', page: 'command-center' },
  { icon: Megaphone, label: 'Marketing', page: 'marketing' },
  { icon: UserPlus, label: 'Leads', page: 'leads' },
  { icon: BedDouble, label: 'Rooms', page: null },
  { icon: CalendarDays, label: 'Reservations', page: null },
  { icon: Settings, label: 'Settings', page: null },
];

const pageLabels: Record<PageId, string> = {
  'command-center': 'Command Center',
  marketing: 'Marketing',
  leads: 'Leads',
};

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dashboard-bg border-r border-dashboard-border flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-dashboard-border">
        <h1 className="text-xl font-serif font-medium tracking-[0.04em] text-white">
          Casa Schuck
        </h1>
        <p className="text-[11px] text-dashboard-text-secondary tracking-wider uppercase mt-0.5">
          {pageLabels[currentPage]}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.page === currentPage;
          const isDisabled = item.page === null;

          return (
            <button
              key={item.label}
              onClick={() => item.page && onNavigate(item.page)}
              disabled={isDisabled}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-dashboard-border text-white'
                  : isDisabled
                    ? 'text-dashboard-hover cursor-not-allowed'
                    : 'text-dashboard-text-secondary hover:text-white hover:bg-dashboard-border/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Status */}
      <div className="px-6 py-4 border-t border-dashboard-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-dashboard-success pulse-dot" />
          <span className="text-xs text-dashboard-text-secondary">All systems online</span>
        </div>
      </div>
    </aside>
  );
}
