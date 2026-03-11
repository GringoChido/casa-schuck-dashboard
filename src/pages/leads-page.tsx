import { LeadKpiCards } from '@/components/leads/lead-kpi-cards';
import { LeadPipeline } from '@/components/leads/lead-pipeline';
import { LeadsTable } from '@/components/leads/leads-table';
import { LeadSourceChart } from '@/components/leads/lead-source-chart';
import { LeadActivityFeed } from '@/components/leads/lead-activity-feed';
import { leads, pipelineStages, leadSourceBreakdown, leadActivities } from '@/data/mock';

export const LeadsPage = () => {
  return (
    <>
      <LeadKpiCards />

      <div className="mt-4">
        <LeadPipeline stages={pipelineStages} />
      </div>

      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8">
          <LeadsTable leads={leads} />
        </div>
        <div className="col-span-4 space-y-4">
          <LeadSourceChart data={leadSourceBreakdown} />
          <LeadActivityFeed activities={leadActivities} />
        </div>
      </div>
    </>
  );
};
