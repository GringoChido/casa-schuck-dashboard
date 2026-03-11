import { KpiCards } from '@/components/KpiCards';
import type { KpiData } from '@/types/dashboard';

const leadKpis: KpiData[] = [
  { label: 'Total Leads', value: '47', change: 12, trend: 'up', icon: 'users' },
  { label: 'Conversion', value: '24%', change: 3, trend: 'up', icon: 'target' },
  { label: 'Avg Response', value: '2.4h', change: -18, trend: 'up', icon: 'clock' },
  { label: 'Pipeline', value: '$42.8K', change: 8, trend: 'up', icon: 'wallet' },
];

export const LeadKpiCards = () => {
  return <KpiCards data={leadKpis} />;
};
