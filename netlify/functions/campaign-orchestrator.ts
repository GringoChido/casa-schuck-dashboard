// Campaign Orchestrator — Netlify Serverless Function
// Handles POST requests from the Casa Schuck dashboard to deploy ad campaigns
// across Google Ads, Meta (IG/FB), and WhatsApp Business.

import type { Context } from '@netlify/functions';

// ─── Types (inlined to avoid path alias issues in Netlify Functions) ────────

const CAMPAIGN_TYPES = {
  1: 'brand',
  2: 'weddings',
  3: 'retreats',
  4: 'corporate',
} as const;

type CampaignTypeId = keyof typeof CAMPAIGN_TYPES;

interface AdCopyPayload {
  headlines: string[];
  body: string;
  callToAction?: string;
}

interface CampaignPayload {
  campaignType: CampaignTypeId;
  budget: number;
  adCopy: AdCopyPayload;
  mediaUrls: string[];
  targetPlatforms?: ('google' | 'meta' | 'whatsapp')[];
  destinationUrl?: string;
  startDate?: string;
  endDate?: string;
}

interface PlatformResult {
  platform: 'google' | 'meta' | 'whatsapp';
  status: 'submitted' | 'failed' | 'skipped';
  externalId?: string;
  error?: string;
}

interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
}

// ─── UTM Engine ────────────────────────────────────────────────────────────

const UTM_MAP: Record<CampaignTypeId, UTMParams> = {
  1: { utm_source: 'paid', utm_medium: 'social', utm_campaign: 'casa-schuck-brand-awareness', utm_content: 'brand' },
  2: { utm_source: 'paid', utm_medium: 'social', utm_campaign: 'casa-schuck-weddings', utm_content: 'weddings' },
  3: { utm_source: 'paid', utm_medium: 'social', utm_campaign: 'casa-schuck-retreats', utm_content: 'retreats' },
  4: { utm_source: 'paid', utm_medium: 'social', utm_campaign: 'casa-schuck-corporate', utm_content: 'corporate' },
};

const appendUTM = (baseUrl: string, campaignType: CampaignTypeId): string => {
  const url = new URL(baseUrl);
  const params = UTM_MAP[campaignType];
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
};

// ─── Token Refresh ─────────────────────────────────────────────────────────

const refreshGoogleToken = async (): Promise<string | null> => {
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token;
  } catch {
    return null;
  }
};

const validateMetaToken = async (token: string): Promise<boolean> => {
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/me?access_token=${token}`);
    return res.ok;
  } catch {
    return false;
  }
};

// ─── Platform Dispatchers ──────────────────────────────────────────────────

const dispatchMeta = async (
  payload: CampaignPayload,
  destinationUrl: string
): Promise<PlatformResult> => {
  const token = process.env.META_TOKEN;
  const accountId = process.env.META_AD_ACCOUNT_ID;

  if (!token || !accountId) {
    return { platform: 'meta', status: 'skipped', error: 'Missing META_TOKEN or META_AD_ACCOUNT_ID' };
  }

  const valid = await validateMetaToken(token);
  if (!valid) {
    return { platform: 'meta', status: 'failed', error: 'META_TOKEN is invalid or expired' };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/act_${accountId}/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        name: `Casa Schuck — ${payload.adCopy.headlines[0]}`,
        objective: 'OUTCOME_TRAFFIC',
        status: 'PAUSED',
        special_ad_categories: ['HOUSING'],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return { platform: 'meta', status: 'failed', error: JSON.stringify(err) };
    }

    const data = await res.json();

    // Create ad set
    await fetch(`https://graph.facebook.com/v21.0/act_${accountId}/adsets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        campaign_id: data.id,
        name: `${payload.adCopy.headlines[0]} — Ad Set`,
        daily_budget: Math.round(payload.budget * 100),
        billing_event: 'IMPRESSIONS',
        optimization_goal: 'LINK_CLICKS',
        status: 'PAUSED',
        targeting: { geo_locations: { countries: ['MX', 'US'] }, age_min: 25, age_max: 65 },
      }),
    });

    // Create ad creative
    await fetch(`https://graph.facebook.com/v21.0/act_${accountId}/adcreatives`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        name: `${payload.adCopy.headlines[0]} — Creative`,
        object_story_spec: {
          link_data: {
            link: destinationUrl,
            message: payload.adCopy.body,
            name: payload.adCopy.headlines[0],
            call_to_action: { type: payload.adCopy.callToAction ?? 'LEARN_MORE' },
          },
        },
      }),
    });

    return { platform: 'meta', status: 'submitted', externalId: data.id };
  } catch (e) {
    return { platform: 'meta', status: 'failed', error: String(e) };
  }
};

const dispatchGoogle = async (
  payload: CampaignPayload,
  destinationUrl: string
): Promise<PlatformResult> => {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;

  if (!customerId || !developerToken) {
    return { platform: 'google', status: 'skipped', error: 'Missing GOOGLE_ADS_CUSTOMER_ID or GOOGLE_ADS_DEVELOPER_TOKEN' };
  }

  const accessToken = await refreshGoogleToken();
  if (!accessToken) {
    return { platform: 'google', status: 'failed', error: 'Google OAuth token refresh failed' };
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'developer-token': developerToken,
  };

  try {
    // Create budget
    const budgetRes = await fetch(
      `https://googleads.googleapis.com/v18/customers/${customerId}/campaignBudgets:mutate`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          operations: [{
            create: {
              name: `Casa Schuck — ${payload.adCopy.headlines[0]} Budget`,
              amountMicros: String(payload.budget * 1_000_000),
              deliveryMethod: 'STANDARD',
            },
          }],
        }),
      }
    );

    if (!budgetRes.ok) {
      const err = await budgetRes.json();
      return { platform: 'google', status: 'failed', error: JSON.stringify(err) };
    }

    const budgetData = await budgetRes.json();
    const budgetResource = budgetData.results?.[0]?.resourceName;

    // Create campaign
    const campaignRes = await fetch(
      `https://googleads.googleapis.com/v18/customers/${customerId}/campaigns:mutate`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          operations: [{
            create: {
              name: `Casa Schuck — ${payload.adCopy.headlines[0]}`,
              advertisingChannelType: 'SEARCH',
              status: 'PAUSED',
              campaignBudget: budgetResource,
              networkSettings: { targetGoogleSearch: true, targetSearchNetwork: true },
            },
          }],
        }),
      }
    );

    if (!campaignRes.ok) {
      const err = await campaignRes.json();
      return { platform: 'google', status: 'failed', error: JSON.stringify(err) };
    }

    const campaignData = await campaignRes.json();
    const campaignId = campaignData.results?.[0]?.resourceName?.split('/').pop() ?? '';

    // Create responsive search ad
    await fetch(
      `https://googleads.googleapis.com/v18/customers/${customerId}/adGroupAds:mutate`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          operations: [{
            create: {
              ad: {
                responsiveSearchAd: {
                  headlines: payload.adCopy.headlines.map((text) => ({ text })),
                  descriptions: [{ text: payload.adCopy.body }],
                },
                finalUrls: [destinationUrl],
              },
              status: 'PAUSED',
            },
          }],
        }),
      }
    );

    return { platform: 'google', status: 'submitted', externalId: campaignId };
  } catch (e) {
    return { platform: 'google', status: 'failed', error: String(e) };
  }
};

const dispatchWhatsApp = async (
  payload: CampaignPayload,
  destinationUrl: string
): Promise<PlatformResult> => {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipientPhone = process.env.WHATSAPP_BROADCAST_NUMBER;

  if (!token || !phoneNumberId || !recipientPhone) {
    return { platform: 'whatsapp', status: 'skipped', error: 'Missing WhatsApp env vars' };
  }

  try {
    const campaignLabel = CAMPAIGN_TYPES[payload.campaignType];
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: recipientPhone,
          type: 'template',
          template: {
            name: `casa_schuck_${campaignLabel}`,
            language: { code: 'en' },
            components: [
              ...(payload.mediaUrls[0]
                ? [{ type: 'header', parameters: [{ type: 'image', image: { link: payload.mediaUrls[0] } }] }]
                : []),
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: payload.adCopy.headlines[0] },
                  { type: 'text', text: payload.adCopy.body },
                ],
              },
              {
                type: 'button',
                sub_type: 'url',
                index: 0,
                parameters: [{ type: 'text', text: destinationUrl }],
              },
            ],
          },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return { platform: 'whatsapp', status: 'failed', error: JSON.stringify(err) };
    }

    const data = await res.json();
    return { platform: 'whatsapp', status: 'submitted', externalId: data.messages?.[0]?.id };
  } catch (e) {
    return { platform: 'whatsapp', status: 'failed', error: String(e) };
  }
};

// ─── Validation ────────────────────────────────────────────────────────────

const validatePayload = (body: unknown): { valid: true; data: CampaignPayload } | { valid: false; error: string } => {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object' };
  }

  const p = body as Record<string, unknown>;

  if (!(p.campaignType in CAMPAIGN_TYPES)) {
    return { valid: false, error: `campaignType must be 1-4, got: ${p.campaignType}` };
  }

  if (typeof p.budget !== 'number' || p.budget <= 0) {
    return { valid: false, error: 'budget must be a positive number (daily limit in USD)' };
  }

  if (!p.adCopy || typeof p.adCopy !== 'object') {
    return { valid: false, error: 'adCopy must be an object with headlines[] and body' };
  }

  const adCopy = p.adCopy as Record<string, unknown>;
  if (!Array.isArray(adCopy.headlines) || adCopy.headlines.length === 0) {
    return { valid: false, error: 'adCopy.headlines must be a non-empty array of strings' };
  }
  if (typeof adCopy.body !== 'string' || adCopy.body.length === 0) {
    return { valid: false, error: 'adCopy.body must be a non-empty string' };
  }

  if (!Array.isArray(p.mediaUrls)) {
    return { valid: false, error: 'mediaUrls must be an array of URLs' };
  }

  return { valid: true, data: p as unknown as CampaignPayload };
};

// ─── Logging ───────────────────────────────────────────────────────────────

const log = (level: 'info' | 'error' | 'warn', message: string, meta?: unknown) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'campaign-orchestrator',
    message,
    ...(meta ? { meta } : {}),
  };
  if (level === 'error') {
    console.error(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
};

// ─── CORS Headers ──────────────────────────────────────────────────────────

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });

// ─── Handler ───────────────────────────────────────────────────────────────

export default async (req: Request, _context: Context) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed. Use POST.' }, 405);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const validation = validatePayload(body);
  if (!validation.valid) {
    return jsonResponse({ error: validation.error }, 400);
  }

  const payload = validation.data;
  const campaignLabel = CAMPAIGN_TYPES[payload.campaignType];
  const campaignId = `cs-${campaignLabel}-${Date.now()}`;

  log('info', `Campaign deployment started: ${campaignId}`, {
    campaignType: payload.campaignType,
    label: campaignLabel,
    budget: payload.budget,
  });

  // Build UTM-tagged destination URL
  const baseDestination = payload.destinationUrl ?? 'https://casaschuck.com';
  const utmUrl = appendUTM(baseDestination, payload.campaignType);

  // Determine target platforms (default to all)
  const platforms = payload.targetPlatforms ?? ['meta', 'google', 'whatsapp'];

  // Dispatch to all platforms in parallel
  const results = await Promise.all(
    platforms.map((platform) => {
      switch (platform) {
        case 'meta':
          return dispatchMeta(payload, utmUrl);
        case 'google':
          return dispatchGoogle(payload, utmUrl);
        case 'whatsapp':
          return dispatchWhatsApp(payload, utmUrl);
      }
    })
  );

  const hasFailures = results.some((r) => r.status === 'failed');
  if (hasFailures) {
    log('warn', `Campaign ${campaignId} had platform failures`, { results });
  } else {
    log('info', `Campaign ${campaignId} deployed successfully`, { results });
  }

  return jsonResponse({
    success: !hasFailures,
    campaignId,
    platforms: results,
    utmUrl,
    timestamp: new Date().toISOString(),
  });
};
