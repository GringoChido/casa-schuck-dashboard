export type PageId = 'command-center' | 'marketing' | 'leads' | 'reservations' | 'guests' | 'reviews' | 'analytics' | 'settings';

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

// Reservations types

export type ReservationStatus = 'confirmed' | 'pending' | 'checked-in' | 'checked-out' | 'cancelled';
export type BookingSource = 'direct' | 'booking.com' | 'airbnb' | 'expedia';

export interface Reservation {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  ratePerNight: number;
  total: number;
  source: BookingSource;
  status: ReservationStatus;
}

export interface OccupancyDay {
  date: string;
  dayLabel: string;
  occupancy: number;
}

export interface ChannelMixEntry {
  name: string;
  value: number;
  color: string;
}

// Guest types

export type GuestStatus = 'first-time' | 'returning' | 'vip' | 'lapsed';

export interface Guest {
  id: string;
  name: string;
  email: string;
  totalStays: number;
  lastVisit: string;
  status: GuestStatus;
  lifetimeValue: number;
  roomPreference: string;
}

export interface GuestSegment {
  segment: string;
  count: number;
  color: string;
}

export interface GuestActivity {
  id: string;
  guestName: string;
  action: string;
  timestamp: string;
  type: 'booking' | 'email' | 'note' | 'review';
}

// Reviews types

export type ReviewSource = 'google' | 'tripadvisor' | 'booking.com';

export interface ReviewSourceData {
  source: ReviewSource;
  rating: number;
  ratingLabel: string;
  totalReviews: number;
  trend: 'up' | 'down' | 'flat';
}

export interface Review {
  id: string;
  source: ReviewSource;
  rating: number;
  guestName: string;
  excerpt: string;
  date: string;
  replied: boolean;
}

export interface SentimentTheme {
  theme: string;
  mentions: number;
  sentiment: 'positive' | 'negative';
}

export interface SocialMetric {
  platform: 'instagram' | 'facebook';
  followers: number;
  engagementRate: number;
  recentPostLikes: number;
  recentPostReach: number;
}

// Analytics types

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

export interface FunnelStep {
  label: string;
  value: number;
  conversionFromPrev?: number;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  adr: number;
  revpar: number;
}

// Settings types

export interface Integration {
  name: string;
  status: 'connected' | 'not-connected';
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'owner' | 'manager' | 'front-desk' | 'marketing';
  email: string;
  status: 'active' | 'invited';
}
