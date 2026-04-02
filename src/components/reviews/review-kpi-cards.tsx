import { KpiCards } from '@/components/KpiCards';
import type { KpiData } from '@/types/dashboard';

const reviewKpis: KpiData[] = [
  { label: 'Avg Rating', value: '4.8', change: 2, trend: 'up', icon: 'trending' },
  { label: 'Total Reviews', value: '156', change: 18, trend: 'up', icon: 'users' },
  { label: 'Response Rate', value: '92%', change: 5, trend: 'up', icon: 'target' },
  { label: 'Positive', value: '89%', change: 3, trend: 'up', icon: 'heart' },
];

export const ReviewKpiCards = () => {
  return <KpiCards data={reviewKpis} />;
};
