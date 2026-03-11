export type PageId = 'command-center' | 'marketing' | 'leads';

export interface Room {
  id: string;
  name: string;
  status: 'occupied' | 'vacant' | 'maintenance' | 'arriving' | 'departing';
  guest?: string;
  checkIn?: string;
  checkOut?: string;
  rate?: number;
  floor: number;
}

export interface Arrival {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
  source: 'direct' | 'booking.com' | 'airbnb' | 'expedia';
  status: 'confirmed' | 'pending' | 'checked-in';
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface KpiData {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'flat';
  icon: string;
}

export interface OccupancyPoint {
  date: string;
  occupancy: number;
  revenue: number;
}

// Marketing types

export interface MarketingKpi {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'flat';
  icon: string;
}

export interface SocialPlatform {
  platform: 'instagram' | 'facebook' | 'tiktok';
  followers: number;
  followersChange: number;
  engagementRate: number;
  postsThisMonth: number;
  topPostMetric: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  platform: 'meta' | 'google' | 'tiktok';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
}

export interface ChannelPerformance {
  channel: string;
  leads: number;
  percentage: number;
  color: string;
}

export interface ScheduledPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'tiktok';
  content: string;
  scheduledDate: string;
  type: 'image' | 'video' | 'carousel' | 'story';
  status: 'scheduled' | 'draft' | 'published';
}

// Leads types

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';

export type LeadSource = 'instagram' | 'facebook' | 'google-ads' | 'direct' | 'referral' | 'booking.com' | 'tiktok';

export type InquiryType = 'room-booking' | 'event' | 'wedding' | 'retreat' | 'group' | 'corporate';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  inquiryType: InquiryType;
  status: LeadStatus;
  date: string;
  estimatedValue: number;
  notes?: string;
}

export interface PipelineStage {
  stage: LeadStatus;
  label: string;
  count: number;
  value: number;
  color: string;
}

export interface LeadSourceBreakdown {
  source: string;
  count: number;
  percentage: number;
  color: string;
}

export interface LeadActivity {
  id: string;
  leadName: string;
  action: string;
  timestamp: string;
  type: 'email' | 'call' | 'note' | 'status-change' | 'meeting';
}
