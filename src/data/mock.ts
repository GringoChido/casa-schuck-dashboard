import type { Room, Arrival, Alert, KpiData, OccupancyPoint } from '@/types/dashboard';

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
