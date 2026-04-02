import { KpiCards } from '@/components/KpiCards';
import type { KpiData } from '@/types/dashboard';

const reservationKpis: KpiData[] = [
  { label: 'Reservations', value: '28', change: 14, trend: 'up', icon: 'bed' },
  { label: 'Check-ins (7d)', value: '6', change: 20, trend: 'up', icon: 'users' },
  { label: 'Avg Stay', value: '3.8 nights', change: 5, trend: 'up', icon: 'clock' },
  { label: 'Cancellation', value: '3.6%', change: -12, trend: 'up', icon: 'target' },
];

export const ReservationKpiCards = () => {
  return <KpiCards data={reservationKpis} />;
};
