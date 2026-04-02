import { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { LoginPage } from '@/components/auth/login-page';
import { CommandCenter } from '@/pages/command-center';
import { MarketingDashboard } from '@/pages/marketing-dashboard';
import { LeadsPage } from '@/pages/leads-page';
import { ReservationsPage } from '@/pages/reservations-page';
import { GuestsPage } from '@/pages/guests-page';
import { ReviewsPage } from '@/pages/reviews-page';
import { AnalyticsPage } from '@/pages/analytics-page';
import { SettingsPage } from '@/pages/settings-page';
import { alerts } from '@/data/mock';
import type { PageId } from '@/types/dashboard';

const App = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('command-center');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const unreadAlerts = alerts.filter((a: typeof alerts[number]) => !a.read).length;

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="ml-64 p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-serif font-medium tracking-[0.04em] text-white">
              Good morning, Joshua
            </h2>
            <p className="text-sm text-dashboard-text-secondary mt-0.5">{today}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dashboard-text-secondary" />
              <input
                type="text"
                placeholder="Search guests, rooms..."
                className="bg-dashboard-surface border border-dashboard-border rounded-lg pl-9 pr-4 py-2 text-sm text-white
                           placeholder:text-dashboard-hover focus:outline-none focus:border-dashboard-hover w-64"
              />
            </div>

            <button className="relative p-2 rounded-lg bg-dashboard-surface border border-dashboard-border hover:border-dashboard-hover transition-colors">
              <Bell className="w-4 h-4 text-dashboard-text-secondary" />
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-dashboard-accent rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </button>

            <div className="w-8 h-8 rounded-full bg-dashboard-border border border-dashboard-hover flex items-center justify-center text-xs font-medium text-dashboard-text">
              JS
            </div>
          </div>
        </div>

        {currentPage === 'command-center' && <CommandCenter />}
        {currentPage === 'marketing' && <MarketingDashboard />}
        {currentPage === 'leads' && <LeadsPage />}
        {currentPage === 'reservations' && <ReservationsPage />}
        {currentPage === 'guests' && <GuestsPage />}
        {currentPage === 'reviews' && <ReviewsPage />}
        {currentPage === 'analytics' && <AnalyticsPage />}
        {currentPage === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
};

export default App;
