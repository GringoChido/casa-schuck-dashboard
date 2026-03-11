import type { Lead } from '@/types/dashboard';

const statusColors: Record<Lead['status'], string> = {
  new: 'text-blue-400 bg-blue-500/10',
  contacted: 'text-dashboard-accent bg-dashboard-accent/10',
  qualified: 'text-dashboard-terracotta bg-dashboard-terracotta/10',
  proposal: 'text-dashboard-dusty-rose bg-dashboard-dusty-rose/10',
  won: 'text-dashboard-success bg-dashboard-success/10',
  lost: 'text-dashboard-text-secondary bg-dashboard-border',
};

const sourceColors: Record<Lead['source'], string> = {
  instagram: 'text-rose-400',
  facebook: 'text-blue-400',
  'google-ads': 'text-dashboard-success',
  direct: 'text-dashboard-accent',
  referral: 'text-dashboard-dusty-rose',
  'booking.com': 'text-dashboard-info',
  tiktok: 'text-purple-400',
};

const formatInquiry = (type: Lead['inquiryType']) => {
  const labels: Record<Lead['inquiryType'], string> = {
    'room-booking': 'Room',
    event: 'Event',
    wedding: 'Wedding',
    retreat: 'Retreat',
    group: 'Group',
    corporate: 'Corporate',
  };
  return labels[type];
};

interface LeadsTableProps {
  leads: Lead[];
}

export const LeadsTable = ({ leads }: LeadsTableProps) => {
  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white mb-4">All Leads</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dashboard-border">
              {['Name', 'Source', 'Type', 'Status', 'Date', 'Value'].map((h) => (
                <th key={h} className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium pb-3 pr-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-border/30 transition-colors cursor-pointer">
                <td className="py-3 pr-3">
                  <div>
                    <span className="text-xs font-medium text-white">{lead.name}</span>
                    <p className="text-[10px] text-dashboard-text-secondary truncate max-w-48">{lead.email}</p>
                  </div>
                </td>
                <td className="py-3 pr-3">
                  <span className={`text-[11px] font-medium ${sourceColors[lead.source]}`}>
                    {lead.source}
                  </span>
                </td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{formatInquiry(lead.inquiryType)}</td>
                <td className="py-3 pr-3">
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusColors[lead.status]}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{lead.date}</td>
                <td className="py-3 pr-3 text-xs font-medium text-white">${lead.estimatedValue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
