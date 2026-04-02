import { KpiCards } from '@/components/KpiCards';
import type { KpiData } from '@/types/dashboard';

const guestKpis: KpiData[] = [
  { label: 'Total Guests', value: '284', change: 11, trend: 'up', icon: 'users' },
  { label: 'Returning %', value: '38%', change: 6, trend: 'up', icon: 'heart' },
  { label: 'VIP Guests', value: '42', change: 15, trend: 'up', icon: 'target' },
  { label: 'Avg NPS', value: '72', change: 4, trend: 'up', icon: 'trending' },
];

export const GuestKpiCards = () => {
  return <KpiCards data={guestKpis} />;
};
