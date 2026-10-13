import { User, Seller, SellerInvitation, AuditLog, UserRole, SellerAccountStatus } from '../types';

export interface AuthSession {
  token: string;
  user: User;
  seller?: Seller;
  expiresAt: string;
}

// Initial Admin User
export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-1',
    fullName: 'Sardor Alimov (Bosh Administrator)',
    phone: '+998 71 200-00-50',
    email: 'admin@qurilishbozor.uz',
    username: 'admin',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-01T00:00:00Z',
    lastLogin: '2026-10-10T09:30:00Z'
  },
  {
    id: 'user-seller-masterstroy',
    fullName: 'Bobur Yo‘ldoshev (MasterStroy Rahbari)',
    phone: '+998 90 910-44-22',
    email: 'bobur@masterstroy.uz',
    username: 'masterstroy',
    role: 'seller',
    sellerId: 'seller-masterstroy',
    status: 'active',
    createdAt: '2026-02-15T00:00:00Z',
    lastLogin: '2026-10-10T08:15:00Z'
  },
  {
    id: 'user-seller-bekobod',
    fullName: 'Jamshid Karimov (Bekobod Metall)',
    phone: '+998 71 200-88-11',
    email: 'sales@bekobodmetall.uz',
    username: 'bekobod',
    role: 'seller',
    sellerId: 'seller-bekobod',
    status: 'active',
    createdAt: '2026-03-01T00:00:00Z',
    lastLogin: '2026-10-09T17:00:00Z'
  },
  {
    id: 'user-seller-samarkand',
    fullName: 'Sherzod Nazarov (Samarkand Block)',
    phone: '+998 93 333-77-88',
    email: 'sherzod@blockstroi.uz',
    username: 'samarkand_block',
    role: 'seller',
    sellerId: 'seller-gazoblock',
    status: 'suspended', // Demonstrates suspended seller test scenario!
    createdAt: '2026-06-10T00:00:00Z',
    lastLogin: '2026-09-15T12:00:00Z'
  },
  {
    id: 'user-customer-1',
    fullName: 'Akmal Rahimov (Xaridor / Prorab)',
    phone: '+998 90 123-45-67',
    email: 'akmal.stroy@gmail.com',
    username: 'akmal_builder',
    role: 'customer',
    status: 'active',
    createdAt: '2026-05-20T00:00:00Z',
    lastLogin: '2026-10-10T07:45:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-001',
    action: 'PLATFORM_INITIALIZED',
    performedBy: 'Sardor Alimov',
    performerRole: 'admin',
    targetType: 'user',
    targetId: 'sys-core',
    details: 'BUILT markazlashtirilgan admin tizimi ishga tushirildi. Xavfsizlik qoidalari faollashtirildi.',
    timestamp: '2026-10-08T08:00:00Z',
    severity: 'info'
  },
  {
    id: 'audit-002',
    action: 'SELLER_INVITATION_CREATED',
    performedBy: 'Sardor Alimov',
    performerRole: 'admin',
    targetType: 'seller',
    targetId: 'seller-masterstroy',
    details: 'MasterStroy UZ do‘koni uchun taklif havolasi va xavfsiz kalit yaratildi.',
    timestamp: '2026-10-08T09:15:00Z',
    severity: 'info'
  },
  {
    id: 'audit-003',
    action: 'SELLER_ACCOUNT_SUSPENDED',
    performedBy: 'Sardor Alimov',
    performerRole: 'admin',
    targetType: 'seller',
    targetId: 'seller-gazoblock',
    details: 'Samarkand Block Stroi do‘koni sifati bo‘yicha shikoyatlar sababli administrator tomonidan vaqtincha bloklandi.',
    timestamp: '2026-10-09T14:30:00Z',
    severity: 'warning'
  }
];

export const INITIAL_INVITATIONS: SellerInvitation[] = [
  {
    id: 'inv-101',
    fullName: 'Farrux Qodirov',
    storeName: 'Grand Keramika & Santexnika',
    phone: '+998 78 140-55-66',
    email: 'farrux@grandceramic.uz',
    username: 'grand_ceramic',
    inviteToken: 'QB-INV-8931-A90F',
    expiresAt: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days valid
    status: 'pending',
    createdAt: new Date().toISOString(),
    createdBy: 'Sardor Alimov (Admin)',
    temporaryPasscode: 'Stroy2026!Pass'
  }
];
