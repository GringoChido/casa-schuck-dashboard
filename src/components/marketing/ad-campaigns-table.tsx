import type { AdCampaign } from '@/types/dashboard';

const platformColors: Record<AdCampaign['platform'], string> = {
  meta: 'text-blue-400 bg-blue-500/10',
  google: 'text-dashboard-success bg-dashboard-success/10',
  tiktok: 'text-purple-400 bg-purple-500/10',
};

const statusColors: Record<AdCampaign['status'], string> = {
  active: 'text-dashboard-success bg-dashboard-success/10',
  paused: 'text-amber-400 bg-amber-500/10',
  completed: 'text-dashboard-text-secondary bg-dashboard-border',
  draft: 'text-blue-400 bg-blue-500/10',
};

const formatCurrency = (n: number) => `$${n.toLocaleString()}`;
const formatNumber = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

interface AdCampaignsTableProps {
  campaigns: AdCampaign[];
}

export const AdCampaignsTable = ({ campaigns }: AdCampaignsTableProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">Ad Campaigns</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dashboard-border">
              {['Campaign', 'Platform', 'Status', 'Budget', 'Spend', 'Impressions', 'Clicks', 'Conv.', 'ROAS'].map((h) => (
                <th key={h} className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium pb-3 pr-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-border/30 transition-colors">
                <td className="py-3 pr-3 text-xs font-medium text-white">{c.name}</td>
                <td className="py-3 pr-3">
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${platformColors[c.platform]}`}>
                    {c.platform}
                  </span>
                </td>
                <td className="py-3 pr-3">
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{formatCurrency(c.budget)}</td>
                <td className="py-3 pr-3 text-xs text-white">{formatCurrency(c.spend)}</td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{formatNumber(c.impressions)}</td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{formatNumber(c.clicks)}</td>
                <td className="py-3 pr-3 text-xs text-white">{c.conversions}</td>
                <td className={`py-3 pr-3 text-xs font-medium ${c.roas >= 3 ? 'text-dashboard-accent' : 'text-dashboard-text-secondary'}`}>
                  {c.roas}x
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
