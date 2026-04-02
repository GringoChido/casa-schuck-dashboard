import { KpiCards } from '@/components/KpiCards';
import type { KpiData } from '@/types/dashboard';

const analyticsKpis: KpiData[] = [
  { label: 'Monthly Visitors', value: '12.4K', change: 22, trend: 'up', icon: 'users' },
  { label: 'Booking Conv.', value: '3.8%', change: 8, trend: 'up', icon: 'target' },
  { label: 'Top Page', value: '/rooms', change: 0, trend: 'flat', icon: 'eye' },
  { label: 'Avg Session', value: '2m 48s', change: 12, trend: 'up', icon: 'clock' },
];

export const AnalyticsKpiCards = () => {
  return <KpiCards data={analyticsKpis} />;
};
