import { useState } from 'react';
import { Rocket, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import type { CampaignTypeId, CampaignPayload, CampaignResponse, PlatformResult } from '@/types/campaign';
import { CAMPAIGN_TYPES } from '@/types/campaign';

const CAMPAIGN_OPTIONS: { id: CampaignTypeId; label: string; description: string }[] = [
  { id: 1, label: 'Brand Awareness', description: 'Lifestyle content showcasing Casa Schuck' },
  { id: 2, label: 'Weddings', description: 'Target engaged couples in US & Mexico' },
  { id: 3, label: 'Retreats', description: 'Wellness, yoga & group retreat packages' },
  { id: 4, label: 'Corporate', description: 'Team offsites & executive retreats' },
];

const PLATFORMS = ['meta', 'google', 'whatsapp'] as const;

const statusIcon = (s: PlatformResult['status']) => {
  switch (s) {
    case 'submitted': return <CheckCircle className="w-3.5 h-3.5 text-dashboard-success" />;
    case 'failed': return <AlertTriangle className="w-3.5 h-3.5 text-dashboard-danger" />;
    case 'skipped': return <AlertTriangle className="w-3.5 h-3.5 text-dashboard-warning" />;
  }
};

const API_BASE = import.meta.env.PROD
  ? '/api/campaign-orchestrator'
  : 'http://localhost:8888/.netlify/functions/campaign-orchestrator';

export const CampaignLauncher = () => {
  const [campaignType, setCampaignType] = useState<CampaignTypeId>(1);
  const [budget, setBudget] = useState(50);
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const [platforms, setPlatforms] = useState<Set<typeof PLATFORMS[number]>>(new Set(['meta', 'google']));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CampaignResponse | null>(null);
  const [error, setError] = useState('');

  const togglePlatform = (p: typeof PLATFORMS[number]) => {
    setPlatforms((prev) => {
      const next = new Set(prev);
      next.has(p) ? next.delete(p) : next.add(p);
      return next;
    });
  };

  const deploy = async () => {
    if (!headline.trim() || !body.trim()) {
      setError('Headline and body are required.');
      return;
    }
    if (platforms.size === 0) {
      setError('Select at least one platform.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const payload: CampaignPayload = {
      campaignType,
      budget,
      adCopy: { headlines: [headline], body },
      mediaUrls: [],
      targetPlatforms: [...platforms],
    };

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data: CampaignResponse = await res.json();
      setResult(data);
    } catch (e) {
      setError(`Network error: ${String(e)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dashboard-surface border border-dashboard-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Rocket className="w-4 h-4 text-dashboard-accent" />
        <h3 className="text-sm font-serif font-medium tracking-[0.04em] text-white">Campaign Launcher</h3>
      </div>

      {/* Campaign Type Selector */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {CAMPAIGN_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setCampaignType(opt.id)}
            className={`text-left p-3 rounded-lg border transition-colors ${
              campaignType === opt.id
                ? 'border-dashboard-accent bg-dashboard-accent/10'
                : 'border-dashboard-border hover:border-dashboard-hover'
            }`}
          >
            <span className="text-xs font-medium text-white">{opt.label}</span>
            <p className="text-[10px] text-dashboard-text-secondary mt-0.5">{opt.description}</p>
          </button>
        ))}
      </div>

      {/* Budget */}
      <div className="mb-3">
        <label className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium">
          Daily Budget (USD)
        </label>
        <input
          type="number"
          min={5}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="mt-1 w-full bg-dashboard-bg border border-dashboard-border rounded-lg px-3 py-2 text-sm text-white
                     focus:outline-none focus:border-dashboard-hover"
        />
      </div>

      {/* Ad Copy */}
      <div className="mb-3">
        <label className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium">
          Headline
        </label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="e.g. Escape to San Miguel de Allende"
          className="mt-1 w-full bg-dashboard-bg border border-dashboard-border rounded-lg px-3 py-2 text-sm text-white
                     placeholder:text-dashboard-hover focus:outline-none focus:border-dashboard-hover"
        />
      </div>

      <div className="mb-3">
        <label className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium">
          Body Copy
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Write the ad body text..."
          className="mt-1 w-full bg-dashboard-bg border border-dashboard-border rounded-lg px-3 py-2 text-sm text-white
                     placeholder:text-dashboard-hover focus:outline-none focus:border-dashboard-hover resize-none"
        />
      </div>

      {/* Platform Toggles */}
      <div className="mb-4">
        <label className="text-[10px] text-dashboard-text-secondary uppercase tracking-wider font-medium mb-1.5 block">
          Platforms
        </label>
        <div className="flex gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => togglePlatform(p)}
              className={`text-[10px] font-medium px-3 py-1.5 rounded-full transition-colors ${
                platforms.has(p)
                  ? 'bg-dashboard-accent/20 text-dashboard-accent border border-dashboard-accent/40'
                  : 'bg-dashboard-bg text-dashboard-text-secondary border border-dashboard-border'
              }`}
            >
              {p === 'meta' ? 'Meta (IG/FB)' : p === 'google' ? 'Google Ads' : 'WhatsApp'}
            </button>
          ))}
        </div>
      </div>

      {/* Deploy Button */}
      <button
        onClick={deploy}
        disabled={loading}
        className="w-full py-2.5 rounded-lg bg-dashboard-accent hover:bg-dashboard-accent-light text-white text-sm font-medium
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Deploying...
          </>
        ) : (
          <>
            <Rocket className="w-4 h-4" />
            Deploy {CAMPAIGN_TYPES[campaignType].charAt(0).toUpperCase() + CAMPAIGN_TYPES[campaignType].slice(1)} Campaign
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-3 p-3 rounded-lg bg-dashboard-danger/10 border border-dashboard-danger/30">
          <p className="text-xs text-dashboard-danger">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-3 p-3 rounded-lg bg-dashboard-bg border border-dashboard-border space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className={`w-4 h-4 ${result.success ? 'text-dashboard-success' : 'text-dashboard-warning'}`} />
            <span className="text-xs font-medium text-white">{result.campaignId}</span>
          </div>
          {result.platforms.map((p) => (
            <div key={p.platform} className="flex items-center gap-2 text-[10px]">
              {statusIcon(p.status)}
              <span className="text-dashboard-text-secondary capitalize">{p.platform}</span>
              <span className={`${p.status === 'submitted' ? 'text-dashboard-success' : 'text-dashboard-warning'}`}>
                {p.status}
              </span>
              {p.externalId && <span className="text-dashboard-text-secondary">({p.externalId})</span>}
              {p.error && <span className="text-dashboard-danger truncate max-w-48">{p.error}</span>}
            </div>
          ))}
          <p className="text-[10px] text-dashboard-text-secondary mt-1 break-all">UTM: {result.utmUrl}</p>
        </div>
      )}
    </div>
  );
};
