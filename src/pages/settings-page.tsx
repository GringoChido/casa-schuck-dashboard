import { useState } from 'react';
import { Plug, Bell, Users, Building } from 'lucide-react';
import { integrations, teamMembers } from '@/data/mock';
import type { TeamMember } from '@/types/dashboard';

const roleLabels: Record<TeamMember['role'], string> = {
  owner: 'Owner',
  manager: 'Manager',
  'front-desk': 'Front Desk',
  marketing: 'Marketing',
};

export const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    reviews: true,
    lowOccupancy: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Building className="w-4 h-4 text-dashboard-accent" />
          <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white">Property Info</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Hotel Name', value: 'Casa Schuck Boutique Hotel' },
            { label: 'Address', value: 'Bajada de la Garita 3, Centro, 37700 San Miguel de Allende, Gto.' },
            { label: 'Phone', value: '+52 415 152 0657' },
            { label: 'Email', value: 'info@casaschuck.com' },
            { label: 'Check-in', value: '3:00 PM' },
            { label: 'Check-out', value: '12:00 PM' },
          ].map((field) => (
            <div key={field.label}>
              <p className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium mb-1">{field.label}</p>
              <p className="text-xs text-white">{field.value}</p>
            </div>
          ))}
        </div>

        <button className="mt-4 px-4 py-2 text-[11px] font-medium uppercase tracking-wider border border-dashboard-border rounded-lg text-dashboard-text-secondary hover:text-white hover:border-dashboard-hover transition-colors">
          Edit
        </button>
      </div>

      <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Plug className="w-4 h-4 text-dashboard-accent" />
          <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white">Integrations</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {integrations.map((integration) => (
            <div key={integration.name} className="p-4 rounded-lg border border-dashboard-border/50 hover:border-dashboard-hover transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white">{integration.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  integration.status === 'connected'
                    ? 'text-dashboard-success bg-dashboard-success/10'
                    : 'text-dashboard-text-secondary bg-dashboard-border'
                }`}>
                  {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              <p className="text-[11px] text-dashboard-text-secondary mb-3">{integration.description}</p>
              <button className="text-[10px] font-medium uppercase tracking-wider text-dashboard-accent hover:text-dashboard-accent-light transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-dashboard-accent" />
          <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white">Notifications</h3>
        </div>

        <div className="space-y-3">
          {[
            { key: 'email' as const, label: 'Email alerts', desc: 'Receive booking and check-in notifications via email' },
            { key: 'sms' as const, label: 'SMS alerts', desc: 'Get urgent notifications via text message' },
            { key: 'reviews' as const, label: 'Review notifications', desc: 'Be notified when new reviews are posted' },
            { key: 'lowOccupancy' as const, label: 'Low occupancy warnings', desc: 'Alert when occupancy drops below 40%' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-lg border border-dashboard-border/50">
              <div>
                <p className="text-xs text-white font-medium">{item.label}</p>
                <p className="text-[11px] text-dashboard-text-secondary">{item.desc}</p>
              </div>
              <button
                onClick={() => toggleNotification(item.key)}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  notifications[item.key] ? 'bg-dashboard-success' : 'bg-dashboard-border'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    notifications[item.key] ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-dashboard-accent" />
          <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white">Team Members</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dashboard-border">
                {['Name', 'Role', 'Email', 'Status'].map((h) => (
                  <th key={h} className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium pb-3 pr-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-dashboard-border/50">
                  <td className="py-3 pr-3 text-xs font-medium text-white">{member.name}</td>
                  <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{roleLabels[member.role]}</td>
                  <td className="py-3 pr-3 text-xs text-dashboard-text-secondary">{member.email}</td>
                  <td className="py-3 pr-3">
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                      member.status === 'active'
                        ? 'text-dashboard-success bg-dashboard-success/10'
                        : 'text-dashboard-warning bg-dashboard-warning/10'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
