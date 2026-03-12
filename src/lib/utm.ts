import { CAMPAIGN_TYPES } from '@/types/campaign';
import type { CampaignTypeId, UTMParams } from '@/types/campaign';

const UTM_DEFAULTS: Record<CampaignTypeId, UTMParams> = {
  1: {
    utm_source: 'paid',
    utm_medium: 'social',
    utm_campaign: 'casa-schuck-brand-awareness',
    utm_content: 'brand',
  },
  2: {
    utm_source: 'paid',
    utm_medium: 'social',
    utm_campaign: 'casa-schuck-weddings',
    utm_content: 'weddings',
  },
  3: {
    utm_source: 'paid',
    utm_medium: 'social',
    utm_campaign: 'casa-schuck-retreats',
    utm_content: 'retreats',
  },
  4: {
    utm_source: 'paid',
    utm_medium: 'social',
    utm_campaign: 'casa-schuck-corporate',
    utm_content: 'corporate',
  },
};

export const buildUTMParams = (
  campaignType: CampaignTypeId,
  overrides?: Partial<UTMParams>
): UTMParams => ({
  ...UTM_DEFAULTS[campaignType],
  ...overrides,
});

export const appendUTM = (
  baseUrl: string,
  campaignType: CampaignTypeId,
  overrides?: Partial<UTMParams>
): string => {
  const url = new URL(baseUrl);
  const params = buildUTMParams(campaignType, overrides);

  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }

  return url.toString();
};

export const getCampaignLabel = (id: CampaignTypeId): string =>
  CAMPAIGN_TYPES[id].charAt(0).toUpperCase() + CAMPAIGN_TYPES[id].slice(1);
