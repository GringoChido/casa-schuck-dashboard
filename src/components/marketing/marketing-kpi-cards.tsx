import { KpiCards } from '@/components/KpiCards';
import type { MarketingKpi } from '@/types/dashboard';

interface MarketingKpiCardsProps {
  data: MarketingKpi[];
}

export const MarketingKpiCards = ({ data }: MarketingKpiCardsProps) => {
  return <KpiCards data={data} />;
};
