export type UserRole = 'admin' | 'resident' | 'security';

export interface BaseUser {
    username: string;
    password?: string;
    role: UserRole;
}

export interface ResidentUser extends BaseUser {
    role: 'resident';
    name: string;
    lastName: string;
    block: string;
    house: string;
    phone: string;
    email: string;
    paymentStatus: 'Al día' | 'Pendiente de pago';
}

export type User = BaseUser | ResidentUser;

export interface VisitInfo {
  visitorName: string;
  identity: string;
  vehicle?: string;
  licensePlate?: string;
  visitorPhone: string;
  visitReason: 'Familiar' | 'Delivery' | 'Otros';
  visitingWho: string; // Pre-filled resident info
  visitDate: string; // ISO String
  validUntil: string; // ISO String
  id: string;
  paymentStatus: 'Al día' | 'Pendiente de pago';
}