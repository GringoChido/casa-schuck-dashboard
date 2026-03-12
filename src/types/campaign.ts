// Campaign Orchestrator — Type Definitions

export const CAMPAIGN_TYPES = {
  1: 'brand',
  2: 'weddings',
  3: 'retreats',
  4: 'corporate',
} as const;

export type CampaignTypeId = keyof typeof CAMPAIGN_TYPES;
export type CampaignTypeName = (typeof CAMPAIGN_TYPES)[CampaignTypeId];

export interface AdCopyPayload {
  headlines: string[];
  body: string;
  callToAction?: string;
}

export interface CampaignPayload {
  campaignType: CampaignTypeId;
  budget: number;
  adCopy: AdCopyPayload;
  mediaUrls: string[];
  targetPlatforms?: ('google' | 'meta' | 'whatsapp')[];
  destinationUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface CampaignResponse {
  success: boolean;
  campaignId: string;
  platforms: PlatformResult[];
  utmUrl: string;
  timestamp: string;
}

export interface PlatformResult {
  platform: 'google' | 'meta' | 'whatsapp';
  status: 'submitted' | 'failed' | 'skipped';
  externalId?: string;
  error?: string;
}

export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
  utm_term?: string;
}

export interface TokenStatus {
  platform: string;
  valid: boolean;
  expiresAt?: string;
  error?: string;
}
