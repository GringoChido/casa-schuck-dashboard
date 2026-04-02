import { LayoutDashboard, Megaphone, UserPlus, CalendarDays, Users, Star, BarChart3, Settings } from 'lucide-react';
import type { PageId } from '@/types/dashboard';

interface NavItem {
  icon: typeof LayoutDashboard;
  label: string;
  page: PageId;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Command Center', page: 'command-center' },
  { icon: Megaphone, label: 'Marketing', page: 'marketing' },
  { icon: UserPlus, label: 'Leads', page: 'leads' },
  { icon: CalendarDays, label: 'Reservations', page: 'reservations' },
  { icon: Users, label: 'Guests', page: 'guests' },
  { icon: Star, label: 'Reviews', page: 'reviews' },
  { icon: BarChart3, label: 'Analytics', page: 'analytics' },
  { icon: Settings, label: 'Settings', page: 'settings' },
];

const pageLabels: Record<PageId, string> = {
  'command-center': 'Command Center',
  marketing: 'Marketing',
  leads: 'Leads',
  reservations: 'Reservations',
  guests: 'Guest Intelligence',
  reviews: 'Social & Reviews',
  analytics: 'Analytics',
  settings: 'Settings',
};

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dashboard-bg border-r border-dashboard-border flex flex-col z-50">
      <div className="px-6 py-5 border-b border-dashboard-border">
        <h1 className="text-xl font-serif font-medium tracking-[0.04em] text-white">
          Casa Schuck
        </h1>
        <p className="text-[11px] text-dashboard-text-secondary tracking-wider uppercase mt-0.5">
          {pageLabels[currentPage]}
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.page === currentPage;

          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-dashboard-border text-white'
                  : 'text-dashboard-text-secondary hover:text-white hover:bg-dashboard-border/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-dashboard-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-dashboard-success pulse-dot" />
          <span className="text-xs text-dashboard-text-secondary">All systems online</span>
        </div>
      </div>
    </aside>
  );
};
