export type Language = 'uz' | 'ru';

export type UserRole = 'customer' | 'seller' | 'admin';

export type UnitType = 'qop' | 'dona' | 'kg' | 'metr' | 'm²' | 'm³' | 'tonna' | 'litr' | 'rulon';

export type SellerAccountStatus = 'invited' | 'active' | 'inactive' | 'suspended';

export interface WholesaleTier {
  minQty: number;
  discountPrice: number;
}

export interface Specification {
  labelUz: string;
  labelRu: string;
  value: string;
}

export interface Product {
  id: string;
  titleUz: string;
  titleRu: string;
  categoryId: string;
  price: number;
  oldPrice?: number;
  unit: UnitType;
  minOrder: number;
  stock: number;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerLocation: string;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  brand: string;
  specifications: Specification[];
  isWholesale: boolean;
  wholesaleTiers?: WholesaleTier[];
  inStock: boolean;
  featured?: boolean;
  discountPercent?: number;
  descriptionUz: string;
  descriptionRu: string;
  weightKg?: number;
  status?: 'approved' | 'pending_approval' | 'rejected' | 'hidden';
}

export interface Category {
  id: string;
  nameUz: string;
  nameRu: string;
  slug: string;
  iconName: string;
  image: string;
  itemCount: number;
  descriptionUz: string;
  descriptionRu: string;
}

export interface Seller {
  id: string;
  userId: string;
  name: string;
  storeName: string;
  slug: string;
  logo: string;
  banner: string;
  rating: number;
  verified: boolean;
  phone: string;
  email: string;
  username: string;
  address: string;
  region: string;
  memberSince: string;
  totalSalesCount: number;
  totalRevenue: number;
  description: string;
  inn: string;
  responseTime: string;
  productsCount: number;
  status: SellerAccountStatus;
  invitedAt?: string;
  activatedAt?: string;
}

export interface SellerInvitation {
  id: string;
  fullName: string;
  storeName: string;
  phone: string;
  email: string;
  username: string;
  inviteToken: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: string;
  createdBy: string;
  temporaryPasscode?: string;
}

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  username: string;
  role: UserRole;
  sellerId?: string;
  status: 'active' | 'inactive' | 'suspended' | 'invited';
  createdAt: string;
  lastLogin?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  performerRole: string;
  targetType: 'seller' | 'product' | 'order' | 'commission' | 'category' | 'user';
  targetId: string;
  details: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface PayoutRecord {
  id: string;
  sellerId: string;
  sellerName: string;
  period: string;
  totalSales: number;
  commissionRate: number;
  commissionAmount: number;
  netPayout: number;
  status: 'paid' | 'pending' | 'processing';
  payoutDate: string;
  bankAccount: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  activePrice: number;
}

export type OrderStatus =
  | 'pending'     // Kutilmoqda
  | 'confirmed'   // Tasdiqlandi
  | 'preparing'   // Tayyorlanmoqda
  | 'dispatched'  // Yo'lda
  | 'delivered'   // Yetkazildi
  | 'cancelled';  // Bekor qilindi

export type DeliveryVehicle = 'labo' | 'gazel' | 'isuzu' | 'fura';

export type PaymentMethod = 'cash' | 'click' | 'payme' | 'uzumbank' | 'b2b_contract';

export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  unit: UnitType;
  price: number;
  image: string;
  sellerId: string;
  sellerName: string;
}

export interface Order {
  id: string;
  trackingCode: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryType: 'delivery' | 'pickup';
  deliveryVehicle?: DeliveryVehicle;
  deliveryAddress: {
    region: string;
    district: string;
    street: string;
    landmark?: string;
  };
  customerName: string;
  customerPhone: string;
  customerNote?: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  sellerIds: string[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export type AdminTab =
  | 'dashboard'
  | 'sellers'
  | 'customers'
  | 'products'
  | 'categories'
  | 'orders'
  | 'commissions'
  | 'payouts'
  | 'reports'
  | 'audit'
  | 'settings';

export type SellerTab =
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'inventory'
  | 'reports'
  | 'store_settings';
