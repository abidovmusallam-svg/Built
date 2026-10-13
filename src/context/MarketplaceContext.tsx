import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  Product,
  Category,
  Seller,
  SellerAccountStatus,
  SellerInvitation,
  User,
  AuditLog,
  PayoutRecord,
  CartItem,
  Order,
  Review,
  ToastMessage,
  OrderStatus,
  DeliveryVehicle,
  PaymentMethod,
  AdminTab,
  SellerTab
} from '../types';
import { translations } from '../utils/translations';
import {
  INITIAL_CATEGORIES,
  INITIAL_SELLERS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS
} from '../data/mockData';
import {
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_INVITATIONS,
  AuthSession
} from '../services/authService';

export type ActiveView =
  | 'home'
  | 'catalog'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'seller-dashboard'
  | 'admin-dashboard'
  | 'mobile-companion'
  | 'calculators'
  | 'wholesale'
  | 'about'
  | 'contact'
  | 'faq'
  | 'seller-login'
  | 'activate-invite'
  | 'access-denied';

interface MarketplaceContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['uz'];
  
  // Navigation
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  sellerTab: SellerTab;
  setSellerTab: (tab: SellerTab) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;

  // Authentication & RBAC
  currentUser: User;
  users: User[];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentSeller: Seller | null;
  login: (username: string, password?: string) => { success: boolean; error?: string };
  logout: () => void;
  switchRoleQuick: (role: UserRole) => void;
  isSellerActive: boolean;
  isAdmin: boolean;
  isSeller: boolean;
  isCustomer: boolean;

  // Data Collections
  categories: Category[];
  sellers: Seller[];
  products: Product[];
  orders: Order[];
  reviews: Review[];
  cart: CartItem[];
  favorites: string[];
  toasts: ToastMessage[];
  auditLogs: AuditLog[];
  invitations: SellerInvitation[];
  payouts: PayoutRecord[];

  // Cart operations
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQty: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Favorites
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Orders
  createOrder: (orderData: {
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
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;

  // Invitation & Seller Onboarding (Admin only)
  createSellerInvitation: (data: {
    fullName: string;
    storeName: string;
    phone: string;
    email: string;
    username: string;
  }) => SellerInvitation;
  revokeInvitation: (id: string) => void;
  activateSellerWithToken: (
    token: string,
    newPassword: string
  ) => { success: boolean; error?: string; user?: User };

  // Seller Management (Admin only)
  updateSellerStatus: (
    sellerId: string,
    status: SellerAccountStatus,
    reason?: string
  ) => void;
  commissionRate: number;
  setCommissionRate: (rate: number) => void;

  // Seller workspace operations (Restricted to seller's own products and orders!)
  sellerProducts: Product[];
  sellerOrders: Order[];
  addSellerProduct: (prodData: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'sellerId' | 'sellerName' | 'sellerRating' | 'sellerLocation'>) => void;
  updateSellerProduct: (productId: string, updates: Partial<Product>) => void;
  deleteSellerProduct: (productId: string) => void;
  updateSellerOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Audit Logs
  addAuditLog: (
    action: string,
    targetType: 'seller' | 'product' | 'order' | 'commission' | 'category' | 'user',
    targetId: string,
    details: string,
    severity?: 'info' | 'warning' | 'critical'
  ) => void;

  // Reviews
  addReview: (productId: string, rating: number, comment: string, userName: string) => void;

  // Notifications
  addToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Navigation helpers
  openProductDetail: (productId: string) => void;
  openCategory: (categoryId: string) => void;
  requireSellerAuth: () => boolean;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('qb_lang') as Language) || 'uz';
  });

  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [sellerTab, setSellerTab] = useState<SellerTab>('dashboard');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>(() => {
    return localStorage.getItem('qb_region') || 'Barcha viloyatlar';
  });
  const [commissionRate, setCommissionRate] = useState<number>(3.5);

  // Authenticated User State
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('qb_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem('qb_current_user_id') || 'user-customer-1';
  });

  // Load / initialize core data
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [sellers, setSellers] = useState<Seller[]>(() => {
    const saved = localStorage.getItem('qb_sellers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_SELLERS.length) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_SELLERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('qb_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_PRODUCTS.length) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('qb_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('qb_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('qb_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('qb_favs');
    return saved ? JSON.parse(saved) : ['prod-ohangaron-m400', 'prod-bekobod-armatura-12'];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('qb_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [invitations, setInvitations] = useState<SellerInvitation[]>(() => {
    const saved = localStorage.getItem('qb_invitations');
    return saved ? JSON.parse(saved) : INITIAL_INVITATIONS;
  });

  const [payouts, setPayouts] = useState<PayoutRecord[]>([
    {
      id: 'pay-001',
      sellerId: 'seller-masterstroy',
      sellerName: 'MasterStroy UZ Savdo Uyi',
      period: '2026-09',
      totalSales: 48500000,
      commissionRate: 3.5,
      commissionAmount: 1697500,
      netPayout: 46802500,
      status: 'paid',
      payoutDate: '2026-10-01',
      bankAccount: '20208000400582910001 (Kapitalbank)'
    },
    {
      id: 'pay-002',
      sellerId: 'seller-bekobod',
      sellerName: 'Bekobod Metall Invest MChJ',
      period: '2026-09',
      totalSales: 112000000,
      commissionRate: 3.5,
      commissionAmount: 3920000,
      netPayout: 108080000,
      status: 'paid',
      payoutDate: '2026-10-01',
      bankAccount: '20208000100492810002 (O‘zsanoatqurilishbank)'
    },
    {
      id: 'pay-003',
      sellerId: 'seller-masterstroy',
      sellerName: 'MasterStroy UZ Savdo Uyi',
      period: '2026-10 (joriy)',
      totalSales: 24300000,
      commissionRate: 3.5,
      commissionAmount: 850500,
      netPayout: 23449500,
      status: 'pending',
      payoutDate: '2026-11-01',
      bankAccount: '20208000400582910001 (Kapitalbank)'
    }
  ]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent storage sync
  useEffect(() => {
    localStorage.setItem('qb_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('qb_region', selectedRegion);
  }, [selectedRegion]);

  useEffect(() => {
    localStorage.setItem('qb_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('qb_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('qb_sellers', JSON.stringify(sellers));
  }, [sellers]);

  useEffect(() => {
    localStorage.setItem('qb_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('qb_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('qb_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('qb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('qb_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('qb_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('qb_invitations', JSON.stringify(invitations));
  }, [invitations]);

  const t = translations[language];

  // Current active user
  const currentUser: User = users.find(u => u.id === currentUserId) || users[0];
  const currentSeller: Seller | null = currentUser.sellerId
    ? sellers.find(s => s.id === currentUser.sellerId) || null
    : null;

  const isAdmin = currentUser.role === 'admin';
  const isSeller = currentUser.role === 'seller';
  const isCustomer = currentUser.role === 'customer';
  const isSellerActive = isSeller && currentSeller?.status === 'active';

  // Audit Logger
  const addAuditLog = (
    action: string,
    targetType: 'seller' | 'product' | 'order' | 'commission' | 'category' | 'user',
    targetId: string,
    details: string,
    severity: 'info' | 'warning' | 'critical' = 'info'
  ) => {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      performedBy: currentUser.fullName,
      performerRole: currentUser.role,
      targetType,
      targetId,
      details,
      timestamp: new Date().toISOString(),
      severity
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Toast notifications
  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(item => item.id !== id));
  };

  // Login handler
  const login = (username: string, _password?: string): { success: boolean; error?: string } => {
    const matchedUser = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());

    if (!matchedUser) {
      return {
        success: false,
        error: language === 'uz'
          ? 'Foydalanuvchi logini topilmadi'
          : 'Пользователь не найден'
      };
    }

    // Status check
    if (matchedUser.status === 'suspended') {
      addAuditLog(
        'LOGIN_BLOCKED_SUSPENDED',
        'user',
        matchedUser.id,
        `Bloklangan ${matchedUser.username} foydalanuvchisi tizimga kirishga urindi`,
        'warning'
      );
      return {
        success: false,
        error: language === 'uz'
          ? 'Ushbu hisob administrator tomonidan to‘xtatilgan (bloklangan). Kirish taqiqlangan.'
          : 'Этот аккаунт заблокирован администратором. Доступ запрещен.'
      };
    }

    // Update state
    setCurrentUserId(matchedUser.id);
    setUsers(prev =>
      prev.map(u => (u.id === matchedUser.id ? { ...u, lastLogin: new Date().toISOString() } : u))
    );

    addAuditLog(
      'USER_LOGGED_IN',
      'user',
      matchedUser.id,
      `${matchedUser.fullName} (${matchedUser.role}) tizimga kirdi`,
      'info'
    );

    addToast(
      'success',
      language === 'uz' ? 'Tizimga kirildi' : 'Вход выполнен',
      `${matchedUser.fullName} (${matchedUser.role})`
    );

    return { success: true };
  };

  const logout = () => {
    addAuditLog(
      'USER_LOGGED_OUT',
      'user',
      currentUser.id,
      `${currentUser.fullName} tizimdan chiqdi`,
      'info'
    );
    // Switch to default customer
    const defaultCust = users.find(u => u.role === 'customer') || users[0];
    setCurrentUserId(defaultCust.id);
    setActiveView('home');
    addToast(
      'info',
      language === 'uz' ? 'Tizimdan chiqildi' : 'Выход выполнен',
      ''
    );
  };

  // Development convenience role switcher
  const switchRoleQuick = (role: UserRole) => {
    let target = users.find(u => u.role === role && u.status === 'active');
    if (!target) {
      target = users.find(u => u.role === role);
    }
    if (target) {
      setCurrentUserId(target.id);
      if (role === 'admin') setActiveView('admin-dashboard');
      else if (role === 'seller') setActiveView('seller-dashboard');
      else setActiveView('home');

      addToast(
        'info',
        language === 'uz' ? 'Rol almashtirildi' : 'Роль изменена',
        `${target.fullName} (${role})`
      );
    }
  };

  // Helper guard for Seller Auth
  const requireSellerAuth = (): boolean => {
    if (!isSeller) {
      setActiveView('access-denied');
      return false;
    }
    if (!isSellerActive) {
      addToast(
        'error',
        language === 'uz' ? 'Kirish taqiqlangan' : 'Доступ заблокирован',
        language === 'uz'
          ? 'Sotuvchi hisobingiz bloklangan yoki faol emas'
          : 'Ваш аккаунт продавца заблокирован или неактивен'
      );
      setActiveView('access-denied');
      return false;
    }
    return true;
  };

  // Create Seller Invitation (Step 1-4)
  const createSellerInvitation = (data: {
    fullName: string;
    storeName: string;
    phone: string;
    email: string;
    username: string;
  }): SellerInvitation => {
    if (!isAdmin) {
      throw new Error('Faqat administrator sotuvchi taklif qila oladi');
    }

    const tokenSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const tokenNumber = Math.floor(1000 + Math.random() * 9000);
    const inviteToken = `QB-INV-${tokenNumber}-${tokenSuffix}`;
    const newId = `inv-${Date.now()}`;

    const newInvite: SellerInvitation = {
      id: newId,
      fullName: data.fullName,
      storeName: data.storeName,
      phone: data.phone,
      email: data.email,
      username: data.username,
      inviteToken,
      expiresAt: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days
      status: 'pending',
      createdAt: new Date().toISOString(),
      createdBy: currentUser.fullName,
      temporaryPasscode: 'Stroy2026!'
    };

    setInvitations(prev => [newInvite, ...prev]);

    // Also create the seller profile in 'invited' status
    const newSellerId = `seller-${Date.now()}`;
    const newSellerSlug = data.storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newSeller: Seller = {
      id: newSellerId,
      userId: `user-pending-${newId}`,
      name: data.fullName,
      storeName: data.storeName,
      slug: newSellerSlug,
      logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=200&q=80',
      banner: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
      rating: 5.0,
      verified: false,
      phone: data.phone,
      email: data.email,
      username: data.username,
      address: "Toshkent shahri (Ko'rsatilmagan)",
      region: 'Toshkent shahri',
      memberSince: '2026',
      totalSalesCount: 0,
      totalRevenue: 0,
      description: `${data.storeName} - Qurilish mollari do‘koni`,
      inn: '30' + Math.floor(1000000 + Math.random() * 9000000),
      responseTime: '30 daqiqa',
      productsCount: 0,
      status: 'invited',
      invitedAt: new Date().toISOString()
    };

    setSellers(prev => [...prev, newSeller]);

    addAuditLog(
      'SELLER_INVITATION_CREATED',
      'seller',
      newSellerId,
      `Administrator ${data.storeName} (${data.fullName}) uchun taklif yaratdi. Token: ${inviteToken}`,
      'info'
    );

    addToast(
      'success',
      language === 'uz' ? 'Taklif muvaffaqiyatli yaratildi' : 'Приглашение создано',
      `${data.storeName} (${inviteToken})`
    );

    return newInvite;
  };

  const revokeInvitation = (id: string) => {
    if (!isAdmin) return;
    setInvitations(prev =>
      prev.map(inv => (inv.id === id ? { ...inv, status: 'expired' } : inv))
    );
    addAuditLog(
      'SELLER_INVITATION_REVOKED',
      'seller',
      id,
      `Taklif bekor qilindi (ID: ${id})`,
      'warning'
    );
  };

  // Seller Activation using time-limited Token (Step 5-7)
  const activateSellerWithToken = (
    token: string,
    newPassword: string
  ): { success: boolean; error?: string; user?: User } => {
    const invite = invitations.find(
      inv => inv.inviteToken.trim().toUpperCase() === token.trim().toUpperCase()
    );

    if (!invite) {
      return {
        success: false,
        error: language === 'uz' ? 'Taklif kodi noto‘g‘ri yoki topilmadi' : 'Неверный код приглашения'
      };
    }

    if (invite.status !== 'pending') {
      return {
        success: false,
        error: language === 'uz' ? 'Ushbu taklif allaqachon faollashtirilgan' : 'Приглашение уже активировано'
      };
    }

    if (new Date(invite.expiresAt).getTime() < Date.now()) {
      return {
        success: false,
        error: language === 'uz' ? 'Taklif muddati tugagan. Administratorga murojaat qiling' : 'Срок действия приглашения истек'
      };
    }

    // Mark invitation accepted
    setInvitations(prev =>
      prev.map(i => (i.id === invite.id ? { ...i, status: 'accepted' } : i))
    );

    // Create / activate user
    const newUserId = `user-seller-${Date.now()}`;
    const matchedSeller = sellers.find(s => s.username === invite.username) || sellers.find(s => s.phone === invite.phone);
    const sellerId = matchedSeller ? matchedSeller.id : `seller-${Date.now()}`;

    const newUser: User = {
      id: newUserId,
      fullName: invite.fullName,
      phone: invite.phone,
      email: invite.email,
      username: invite.username,
      role: 'seller',
      sellerId: sellerId,
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUserId(newUserId);

    // Update seller profile to active
    setSellers(prev =>
      prev.map(s =>
        s.id === sellerId || s.username === invite.username
          ? {
              ...s,
              status: 'active',
              verified: true,
              userId: newUserId,
              activatedAt: new Date().toISOString()
            }
          : s
      )
    );

    addAuditLog(
      'SELLER_ACCOUNT_ACTIVATED',
      'seller',
      sellerId,
      `${invite.storeName} sotuvchisi o‘z parolini o‘rnatib, akkauntni faollashtirdi.`,
      'info'
    );

    addToast(
      'success',
      language === 'uz' ? 'Akkaunt muvaffaqiyatli faollashtirildi!' : 'Аккаунт успешно активирован!',
      `${invite.storeName} xush kelibsiz!`
    );

    return { success: true, user: newUser };
  };

  // Admin Seller Status Management (Suspend / Activate)
  const updateSellerStatus = (
    sellerId: string,
    status: SellerAccountStatus,
    reason?: string
  ) => {
    if (!isAdmin) {
      addToast('error', 'Ruxsat berilmagan', 'Faqat administrator ushbu amalni bajara oladi');
      return;
    }

    setSellers(prev =>
      prev.map(s => {
        if (s.id === sellerId) {
          return {
            ...s,
            status,
            verified: status === 'active',
            ...(status === 'active' ? { activatedAt: new Date().toISOString() } : {})
          };
        }
        return s;
      })
    );

    // Update corresponding user status
    setUsers(prev =>
      prev.map(u => (u.sellerId === sellerId ? { ...u, status } : u))
    );

    addAuditLog(
      status === 'suspended' ? 'SELLER_ACCOUNT_SUSPENDED' : 'SELLER_ACCOUNT_ACTIVATED',
      'seller',
      sellerId,
      `Administrator sotuvchi holatini "${status}"ga o‘zgartirdi.${reason ? ` Sabab: ${reason}` : ''}`,
      status === 'suspended' ? 'warning' : 'info'
    );

    addToast(
      status === 'suspended' ? 'error' : 'success',
      language === 'uz' ? 'Sotuvchi holati yangilandi' : 'Статус поставщика обновлен',
      `${sellerId}: ${status.toUpperCase()}`
    );
  };

  // RESTRICTED SELLER WORKSPACE QUERIES:
  // A seller can ONLY view and manage products where sellerId === currentSeller.id!
  const sellerProducts = isSeller && currentSeller
    ? products.filter(p => p.sellerId === currentSeller.id)
    : [];

  // A seller can ONLY view orders containing items from their sellerId!
  const sellerOrders = isSeller && currentSeller
    ? orders.filter(ord => ord.items.some(item => item.sellerId === currentSeller.id))
    : [];

  const addSellerProduct = (
    prodData: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'sellerId' | 'sellerName' | 'sellerRating' | 'sellerLocation'>
  ) => {
    if (!requireSellerAuth() || !currentSeller) return;

    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...prodData,
      id: newId,
      sellerId: currentSeller.id,
      sellerName: currentSeller.storeName,
      sellerRating: currentSeller.rating,
      sellerLocation: currentSeller.address,
      rating: 5.0,
      reviewsCount: 0,
      status: 'approved'
    };

    setProducts(prev => [newProduct, ...prev]);

    // Update seller product count
    setSellers(prev =>
      prev.map(s => (s.id === currentSeller.id ? { ...s, productsCount: s.productsCount + 1 } : s))
    );

    addAuditLog(
      'PRODUCT_CREATED_BY_SELLER',
      'product',
      newId,
      `${currentSeller.storeName} yangi tovar qo‘shdi: "${newProduct.titleUz}"`,
      'info'
    );

    addToast(
      'success',
      language === 'uz' ? 'Tovar muvaffaqiyatli joylandi' : 'Товар успешно опубликован',
      newProduct.titleUz
    );
  };

  const updateSellerProduct = (productId: string, updates: Partial<Product>) => {
    if (!requireSellerAuth() || !currentSeller) return;

    // Security check: Verify product belongs to current seller!
    const targetProd = products.find(p => p.id === productId);
    if (!targetProd || targetProd.sellerId !== currentSeller.id) {
      addToast('error', 'Xatolik', 'Siz faqat o‘z tovaringizni tahrirlashingiz mumkin');
      return;
    }

    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, ...updates } : p))
    );

    addAuditLog(
      'PRODUCT_UPDATED_BY_SELLER',
      'product',
      productId,
      `${currentSeller.storeName} tovar ma'lumotlarini yangiladi (ID: ${productId})`,
      'info'
    );

    addToast(
      'success',
      language === 'uz' ? 'Tovar yangilandi' : 'Товар обновлен',
      ''
    );
  };

  const deleteSellerProduct = (productId: string) => {
    if (!requireSellerAuth() || !currentSeller) return;

    // Security check
    const targetProd = products.find(p => p.id === productId);
    if (!targetProd || targetProd.sellerId !== currentSeller.id) {
      addToast('error', 'Xatolik', 'Siz faqat o‘z tovaringizni o‘chira olasiz');
      return;
    }

    setProducts(prev => prev.filter(p => p.id !== productId));

    setSellers(prev =>
      prev.map(s => (s.id === currentSeller.id ? { ...s, productsCount: Math.max(0, s.productsCount - 1) } : s))
    );

    addAuditLog(
      'PRODUCT_DELETED_BY_SELLER',
      'product',
      productId,
      `${currentSeller.storeName} tovarini o‘chirdi (ID: ${productId})`,
      'warning'
    );

    addToast(
      'info',
      language === 'uz' ? 'Tovar o‘chirildi' : 'Товар удален',
      ''
    );
  };

  const updateSellerOrderStatus = (orderId: string, status: OrderStatus) => {
    if (!requireSellerAuth() || !currentSeller) return;

    // Verify order contains current seller's item
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder || !targetOrder.items.some(i => i.sellerId === currentSeller.id)) {
      addToast('error', 'Xatolik', 'Siz faqat o‘z buyurtmalaringiz holatini o‘zgartira olasiz');
      return;
    }

    setOrders(prev =>
      prev.map(ord =>
        ord.id === orderId
          ? { ...ord, status, updatedAt: new Date().toISOString() }
          : ord
      )
    );

    addAuditLog(
      'ORDER_STATUS_UPDATED_BY_SELLER',
      'order',
      orderId,
      `${currentSeller.storeName} buyurtma holatini "${status}"ga o‘zgartirdi (Buyurtma: ${targetOrder.trackingCode})`,
      'info'
    );

    addToast(
      'success',
      language === 'uz' ? 'Buyurtma holati yangilandi' : 'Статус заказа обновлен',
      `${targetOrder.trackingCode}: ${status.toUpperCase()}`
    );
  };

  // Cart operations
  const calculateTierPrice = (product: Product, quantity: number): number => {
    if (!product.wholesaleTiers || product.wholesaleTiers.length === 0) {
      return product.price;
    }
    const sorted = [...product.wholesaleTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sorted) {
      if (quantity >= tier.minQty) {
        return tier.discountPrice;
      }
    }
    return product.price;
  };

  const addToCart = (product: Product, quantity = 1) => {
    const effectiveQty = Math.max(quantity, product.minOrder || 1);
    const existing = cart.find(item => item.product.id === product.id);
    let updatedCart: CartItem[];

    if (existing) {
      const newQty = existing.quantity + effectiveQty;
      const newPrice = calculateTierPrice(product, newQty);
      updatedCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: newQty, activePrice: newPrice }
          : item
      );
    } else {
      const activePrice = calculateTierPrice(product, effectiveQty);
      updatedCart = [...cart, { product, quantity: effectiveQty, activePrice }];
    }

    setCart(updatedCart);
    addToast(
      'success',
      language === 'uz' ? 'Savatga qo‘shildi' : 'Добавлено в корзину',
      `${product.titleUz} (${effectiveQty} ${product.unit})`
    );
  };

  const updateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          const activePrice = calculateTierPrice(item.product, quantity);
          return { ...item, quantity, activePrice };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast(
      'info',
      language === 'uz' ? 'O‘chirildi' : 'Удалено',
      language === 'uz' ? 'Mahsulot savatdan olib tashlandi' : 'Товар удален из корзины'
    );
  };

  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((sum, item) => sum + item.activePrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Favorites
  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast(
          'info',
          language === 'uz' ? 'Sevimlilardan olindi' : 'Удалено из избранного',
          ''
        );
        return prev.filter(id => id !== productId);
      } else {
        addToast(
          'success',
          language === 'uz' ? 'Sevimlilarga saqlandi' : 'Добавлено в избранное',
          ''
        );
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Create Order
  const createOrder = (orderData: {
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
  }): Order => {
    const codeNumber = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `QB-${codeNumber}`;
    const newId = `ord-${Date.now()}`;

    let deliveryFee = 0;
    if (orderData.deliveryType === 'delivery') {
      switch (orderData.deliveryVehicle) {
        case 'labo': deliveryFee = 90000; break;
        case 'gazel': deliveryFee = 160000; break;
        case 'isuzu': deliveryFee = 250000; break;
        case 'fura': deliveryFee = 650000; break;
        default: deliveryFee = 120000;
      }
    }

    const subtotal = cartTotal;
    const discount = subtotal > 3000000 ? Math.round(subtotal * 0.03) : 0;
    const total = subtotal + deliveryFee - discount;

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      title: item.product.titleUz,
      quantity: item.quantity,
      unit: item.product.unit,
      price: item.activePrice,
      image: item.product.image,
      sellerId: item.product.sellerId,
      sellerName: item.product.sellerName
    }));

    const sellerIds = Array.from(new Set(cart.map(item => item.product.sellerId)));

    const newOrder: Order = {
      id: newId,
      trackingCode,
      items: orderItems,
      subtotal,
      deliveryFee,
      discount,
      total,
      deliveryType: orderData.deliveryType,
      deliveryVehicle: orderData.deliveryVehicle,
      deliveryAddress: orderData.deliveryAddress,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerNote: orderData.customerNote,
      paymentMethod: orderData.paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sellerIds
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    addAuditLog(
      'ORDER_CREATED_BY_CUSTOMER',
      'order',
      newId,
      `Xaridor ${orderData.customerName} yangi buyurtma berdi (${trackingCode}). Jami: ${total} so'm`,
      'info'
    );

    addToast(
      'success',
      language === 'uz' ? 'Buyurtmangiz qabul qilindi!' : 'Заказ оформлен!',
      `${trackingCode}`
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord =>
        ord.id === orderId
          ? { ...ord, status, updatedAt: new Date().toISOString() }
          : ord
      )
    );
  };

  const cancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
    addAuditLog(
      'ORDER_CANCELLED',
      'order',
      orderId,
      `Buyurtma bekor qilindi (ID: ${orderId})`,
      'warning'
    );
  };

  // Reviews
  const addReview = (productId: string, rating: number, comment: string, userName: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userName,
      rating,
      date: new Date().toISOString().split('T')[0],
      comment,
      verifiedPurchase: true
    };
    setReviews(prev => [newReview, ...prev]);
    addToast('success', 'Rahmat!', 'Sharhingiz qabul qilindi');
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MarketplaceContext.Provider
      value={{
        language,
        setLanguage,
        t,
        activeView,
        setActiveView,
        adminTab,
        setAdminTab,
        sellerTab,
        setSellerTab,
        selectedProductId,
        setSelectedProductId,
        selectedCategoryId,
        setSelectedCategoryId,
        searchTerm,
        setSearchTerm,
        selectedRegion,
        setSelectedRegion,
        currentUser,
        users,
        userRole: currentUser.role,
        setUserRole: (role: UserRole) => switchRoleQuick(role),
        currentSeller,
        login,
        logout,
        switchRoleQuick,
        isSellerActive,
        isAdmin,
        isSeller,
        isCustomer,
        categories,
        sellers,
        products,
        orders,
        reviews,
        cart,
        favorites,
        toasts,
        auditLogs,
        invitations,
        payouts,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        toggleFavorite,
        isFavorite,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        createSellerInvitation,
        revokeInvitation,
        activateSellerWithToken,
        updateSellerStatus,
        commissionRate,
        setCommissionRate,
        sellerProducts,
        sellerOrders,
        addSellerProduct,
        updateSellerProduct,
        deleteSellerProduct,
        updateSellerOrderStatus,
        addAuditLog,
        addReview,
        addToast,
        removeToast,
        openProductDetail,
        openCategory,
        requireSellerAuth
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
