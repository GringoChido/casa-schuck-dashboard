import type {
  Room, Arrival, Alert, KpiData, OccupancyPoint,
  MarketingKpi, SocialPlatform, AdCampaign, ChannelPerformance, ScheduledPost,
  Lead, PipelineStage, LeadSourceBreakdown, LeadActivity,
} from '@/types/dashboard';

// ── Command Center ──────────────────────────────────────────

export const rooms: Room[] = [
  { id: 'royal', name: 'El Royal Suite', status: 'occupied', guest: 'Sarah M.', checkIn: '2026-03-08', checkOut: '2026-03-12', rate: 450, floor: 2 },
  { id: 'biblioteca', name: 'La Biblioteca', status: 'occupied', guest: 'James R.', checkIn: '2026-03-07', checkOut: '2026-03-11', rate: 380, floor: 1 },
  { id: 'artisan', name: 'The Artisan Loft', status: 'arriving', guest: 'Patricia D.', checkIn: '2026-03-10', checkOut: '2026-03-14', rate: 320, floor: 2 },
  { id: 'garden', name: 'Garden Suite', status: 'vacant', floor: 0 },
  { id: 'terraza', name: 'La Terraza', status: 'occupied', guest: 'Michael T.', checkIn: '2026-03-06', checkOut: '2026-03-10', rate: 350, floor: 2 },
  { id: 'colonial', name: 'Colonial Room', status: 'departing', guest: 'Ana V.', checkIn: '2026-03-05', checkOut: '2026-03-10', rate: 280, floor: 1 },
  { id: 'courtyard', name: 'Courtyard Room', status: 'maintenance', floor: 0 },
  { id: 'rooftop', name: 'Rooftop Suite', status: 'occupied', guest: 'David & Lia K.', checkIn: '2026-03-09', checkOut: '2026-03-13', rate: 420, floor: 3 },
  { id: 'casita', name: 'La Casita', status: 'vacant', floor: 0 },
];

export const arrivals: Arrival[] = [
  { id: '1', guest: 'Patricia D.', room: 'The Artisan Loft', checkIn: '2026-03-10', checkOut: '2026-03-14', guests: 2, source: 'direct', status: 'confirmed', specialRequests: 'Late check-in (6pm), anniversary celebration' },
  { id: '2', guest: 'Roberto & Maria S.', room: 'Garden Suite', checkIn: '2026-03-10', checkOut: '2026-03-15', guests: 2, source: 'booking.com', status: 'confirmed' },
  { id: '3', guest: 'Jennifer W.', room: 'La Casita', checkIn: '2026-03-11', checkOut: '2026-03-13', guests: 1, source: 'airbnb', status: 'pending', specialRequests: 'Vegan breakfast options' },
  { id: '4', guest: 'The Chen Family', room: 'El Royal Suite', checkIn: '2026-03-12', checkOut: '2026-03-17', guests: 4, source: 'direct', status: 'confirmed', specialRequests: 'Extra crib, airport transfer' },
];

export const alerts: Alert[] = [
  { id: '1', type: 'warning', message: 'Courtyard Room — maintenance delay, plumbing repair ETA 2 days', timestamp: '2026-03-10T08:30:00', read: false },
  { id: '2', type: 'success', message: 'Patricia D. confirmed late check-in (6pm) for Artisan Loft', timestamp: '2026-03-10T07:45:00', read: false },
  { id: '3', type: 'info', message: 'Wedding inquiry from Julia & Mark — March 28-30, 40 guests', timestamp: '2026-03-10T06:20:00', read: false },
  { id: '4', type: 'danger', message: 'Ana V. checkout overdue — Colonial Room (due 11am)', timestamp: '2026-03-10T11:15:00', read: false },
  { id: '5', type: 'success', message: 'Google review: 5 stars from David K. — "Rooftop at sunset is magical"', timestamp: '2026-03-09T20:00:00', read: true },
  { id: '6', type: 'info', message: 'Retreat inquiry: Yoga group, April 15-20, 12 participants', timestamp: '2026-03-09T14:30:00', read: true },
];

export const kpis: KpiData[] = [
  { label: 'Occupancy', value: '67%', change: 8, trend: 'up', icon: 'bed' },
  { label: 'ADR', value: '$367', change: 12, trend: 'up', icon: 'dollar' },
  { label: 'RevPAR', value: '$246', change: 5, trend: 'up', icon: 'trending' },
  { label: 'Direct %', value: '52%', change: -3, trend: 'down', icon: 'target' },
];

export const occupancyData: OccupancyPoint[] = [
  { date: 'Mar 1', occupancy: 44, revenue: 1480 },
  { date: 'Mar 2', occupancy: 56, revenue: 1920 },
  { date: 'Mar 3', occupancy: 67, revenue: 2340 },
  { date: 'Mar 4', occupancy: 78, revenue: 2880 },
  { date: 'Mar 5', occupancy: 78, revenue: 2920 },
  { date: 'Mar 6', occupancy: 89, revenue: 3380 },
  { date: 'Mar 7', occupancy: 78, revenue: 2960 },
  { date: 'Mar 8', occupancy: 67, revenue: 2450 },
  { date: 'Mar 9', occupancy: 67, revenue: 2520 },
  { date: 'Mar 10', occupancy: 56, revenue: 2080 },
];

// ── Marketing ───────────────────────────────────────────────

export const marketingKpis: MarketingKpi[] = [
  { label: 'Total Reach', value: '145K', change: 18, trend: 'up', icon: 'eye' },
  { label: 'Engagement', value: '4.2%', change: 0.8, trend: 'up', icon: 'heart' },
  { label: 'Cost / Lead', value: '$12.40', change: -15, trend: 'up', icon: 'dollar' },
  { label: 'Campaign ROAS', value: '3.8x', change: 22, trend: 'up', icon: 'trending' },
  { label: 'Ad Spend', value: '$2,450', change: 5, trend: 'up', icon: 'wallet' },
];

export const socialPlatforms: SocialPlatform[] = [
  { platform: 'instagram', followers: 12400, followersChange: 340, engagementRate: 5.1, postsThisMonth: 18, topPostMetric: '2.4K likes' },
  { platform: 'facebook', followers: 8200, followersChange: 120, engagementRate: 2.8, postsThisMonth: 12, topPostMetric: '890 shares' },
  { platform: 'tiktok', followers: 3100, followersChange: 580, engagementRate: 8.4, postsThisMonth: 8, topPostMetric: '14K views' },
];

export const adCampaigns: AdCampaign[] = [
  { id: 'c1', name: 'Spring Getaway Promo', platform: 'meta', status: 'active', budget: 800, spend: 542, impressions: 45200, clicks: 1240, conversions: 18, roas: 4.2 },
  { id: 'c2', name: 'Wedding Season SMA', platform: 'meta', status: 'active', budget: 600, spend: 388, impressions: 32100, clicks: 890, conversions: 6, roas: 3.1 },
  { id: 'c3', name: 'Rooftop Experience', platform: 'google', status: 'active', budget: 500, spend: 310, impressions: 28400, clicks: 720, conversions: 12, roas: 5.8 },
  { id: 'c4', name: 'Retreat & Wellness', platform: 'google', status: 'paused', budget: 400, spend: 400, impressions: 22000, clicks: 560, conversions: 8, roas: 2.9 },
  { id: 'c5', name: 'Colonial Charm Reels', platform: 'tiktok', status: 'active', budget: 300, spend: 185, impressions: 68000, clicks: 2100, conversions: 4, roas: 2.4 },
  { id: 'c6', name: 'Día de Muertos Special', platform: 'meta', status: 'completed', budget: 500, spend: 500, impressions: 51000, clicks: 1800, conversions: 22, roas: 6.1 },
];

export const channelPerformance: ChannelPerformance[] = [
  { channel: 'Instagram', leads: 13, percentage: 28, color: '#C17A56' },
  { channel: 'Google Ads', leads: 11, percentage: 24, color: '#BF754B' },
  { channel: 'Direct', leads: 9, percentage: 20, color: '#5B7B6A' },
  { channel: 'Facebook', leads: 7, percentage: 15, color: '#3b82f6' },
  { channel: 'Referral', leads: 4, percentage: 8, color: '#C4A289' },
  { channel: 'TikTok', leads: 3, percentage: 5, color: '#a855f7' },
];

export const scheduledPosts: ScheduledPost[] = [
  { id: 'sp1', platform: 'instagram', content: 'Rooftop sunset cocktail hour — golden hour magic above San Miguel', scheduledDate: '2026-03-11T18:00:00', type: 'carousel', status: 'scheduled' },
  { id: 'sp2', platform: 'facebook', content: 'Spring packages now available — 3-night stay with breakfast & spa', scheduledDate: '2026-03-12T10:00:00', type: 'image', status: 'scheduled' },
  { id: 'sp3', platform: 'tiktok', content: 'Morning routine at a colonial boutique hotel in Mexico', scheduledDate: '2026-03-13T08:00:00', type: 'video', status: 'draft' },
  { id: 'sp4', platform: 'instagram', content: 'Behind the scenes: preparing the Garden Suite for a honeymoon arrival', scheduledDate: '2026-03-14T16:00:00', type: 'story', status: 'scheduled' },
];

// ── Leads ───────────────────────────────────────────────────

export const leads: Lead[] = [
  { id: 'l1', name: 'Julia & Mark Thompson', email: 'julia.t@gmail.com', phone: '+1 512-555-0142', source: 'instagram', inquiryType: 'wedding', status: 'proposal', date: '2026-03-08', estimatedValue: 18500, notes: '40 guests, March 28-30, rooftop ceremony' },
  { id: 'l2', name: 'Wellness Retreats Co.', email: 'bookings@wellnessretreats.co', phone: '+1 415-555-0198', source: 'google-ads', inquiryType: 'retreat', status: 'qualified', date: '2026-03-07', estimatedValue: 12800, notes: 'Yoga retreat, 12 pax, April 15-20' },
  { id: 'l3', name: 'Carlos Mendoza', email: 'carlos.m@outlook.com', phone: '+52 415-123-4567', source: 'direct', inquiryType: 'room-booking', status: 'won', date: '2026-03-05', estimatedValue: 2400 },
  { id: 'l4', name: 'Amanda & Steve Davis', email: 'amanda.davis@yahoo.com', phone: '+1 310-555-0176', source: 'facebook', inquiryType: 'event', status: 'contacted', date: '2026-03-09', estimatedValue: 5200, notes: 'Anniversary dinner, 20 guests, private dining' },
  { id: 'l5', name: 'TechStart Inc.', email: 'events@techstart.io', phone: '+1 650-555-0234', source: 'referral', inquiryType: 'corporate', status: 'new', date: '2026-03-10', estimatedValue: 8900, notes: 'Team offsite, 15 people, 4 nights' },
  { id: 'l6', name: 'María Elena Ruiz', email: 'maria.ruiz@gmail.com', phone: '+52 55-555-0189', source: 'instagram', inquiryType: 'wedding', status: 'new', date: '2026-03-10', estimatedValue: 22000, notes: 'Destination wedding, 60 guests, October' },
  { id: 'l7', name: 'Robert Chen', email: 'r.chen@gmail.com', phone: '+1 212-555-0145', source: 'google-ads', inquiryType: 'room-booking', status: 'contacted', date: '2026-03-06', estimatedValue: 1800 },
  { id: 'l8', name: 'Grupo Artístico SMA', email: 'info@artisticosma.mx', phone: '+52 415-555-0321', source: 'direct', inquiryType: 'group', status: 'qualified', date: '2026-03-04', estimatedValue: 6500, notes: 'Art workshop group, 8 rooms, May 1-5' },
  { id: 'l9', name: 'Sarah Johnson', email: 'sarah.j@proton.me', phone: '+1 773-555-0167', source: 'booking.com', inquiryType: 'room-booking', status: 'won', date: '2026-03-02', estimatedValue: 1350 },
  { id: 'l10', name: 'Luxe Travel Agency', email: 'concierge@luxetravel.com', phone: '+1 305-555-0298', source: 'referral', inquiryType: 'group', status: 'proposal', date: '2026-03-03', estimatedValue: 15200, notes: 'VIP group, 6 suites, private chef dinners' },
  { id: 'l11', name: 'Diego Hernández', email: 'diego.h@hotmail.com', phone: '+52 33-555-0412', source: 'tiktok', inquiryType: 'room-booking', status: 'lost', date: '2026-02-28', estimatedValue: 980, notes: 'Price too high' },
  { id: 'l12', name: 'Mindful Journeys LLC', email: 'hello@mindfuljourneys.com', phone: '+1 503-555-0187', source: 'facebook', inquiryType: 'retreat', status: 'new', date: '2026-03-09', estimatedValue: 9400, notes: 'Meditation retreat, 10 guests, June' },
];

export const pipelineStages: PipelineStage[] = [
  { stage: 'new', label: 'New', count: 3, value: 40300, color: '#3b82f6' },
  { stage: 'contacted', label: 'Contacted', count: 2, value: 7000, color: '#BF754B' },
  { stage: 'qualified', label: 'Qualified', count: 2, value: 19300, color: '#C17A56' },
  { stage: 'proposal', label: 'Proposal', count: 2, value: 33700, color: '#C4A289' },
  { stage: 'won', label: 'Won', count: 2, value: 3750, color: '#5B7B6A' },
  { stage: 'lost', label: 'Lost', count: 1, value: 980, color: '#52525b' },
];

export const leadSourceBreakdown: LeadSourceBreakdown[] = [
  { source: 'Instagram', count: 2, percentage: 17, color: '#C17A56' },
  { source: 'Google Ads', count: 2, percentage: 17, color: '#BF754B' },
  { source: 'Direct', count: 2, percentage: 17, color: '#5B7B6A' },
  { source: 'Facebook', count: 2, percentage: 17, color: '#3b82f6' },
  { source: 'Referral', count: 2, percentage: 17, color: '#C4A289' },
  { source: 'Booking.com', count: 1, percentage: 8, color: '#eab308' },
  { source: 'TikTok', count: 1, percentage: 7, color: '#a855f7' },
];

export const leadActivities: LeadActivity[] = [
  { id: 'la1', leadName: 'María Elena Ruiz', action: 'New wedding inquiry submitted via Instagram DM', timestamp: '2026-03-10T09:15:00', type: 'note' },
  { id: 'la2', leadName: 'TechStart Inc.', action: 'New corporate retreat inquiry received', timestamp: '2026-03-10T08:30:00', type: 'email' },
  { id: 'la3', leadName: 'Julia & Mark Thompson', action: 'Proposal sent — rooftop ceremony + reception package', timestamp: '2026-03-09T16:00:00', type: 'email' },
  { id: 'la4', leadName: 'Amanda & Steve Davis', action: 'Follow-up call — discussed private dining options', timestamp: '2026-03-09T14:20:00', type: 'call' },
  { id: 'la5', leadName: 'Wellness Retreats Co.', action: 'Status changed to Qualified', timestamp: '2026-03-09T11:00:00', type: 'status-change' },
  { id: 'la6', leadName: 'Luxe Travel Agency', action: 'Meeting scheduled — VIP package walkthrough', timestamp: '2026-03-08T15:30:00', type: 'meeting' },
  { id: 'la7', leadName: 'Grupo Artístico SMA', action: 'Site visit confirmed for March 15', timestamp: '2026-03-08T10:45:00', type: 'note' },
  { id: 'la8', leadName: 'Robert Chen', action: 'Initial outreach email sent with room options', timestamp: '2026-03-07T09:00:00', type: 'email' },
];
