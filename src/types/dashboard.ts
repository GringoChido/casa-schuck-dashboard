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
