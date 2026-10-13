import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { AdminTab, SellerAccountStatus, Product, Seller } from '../types';
import { formatPrice, UZBEKISTAN_REGIONS, ALL_REGIONS_LABEL } from '../utils/translations';
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Store,
  Package,
  Layers,
  ShoppingBag,
  Percent,
  CreditCard,
  BarChart3,
  ClipboardList,
  Settings,
  UserPlus,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Key,
  ExternalLink,
  ChevronRight,
  Filter,
  Trash2,
  Edit,
  Clock,
  Eye,
  Building,
  Phone,
  Mail
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    sellers,
    products,
    orders,
    auditLogs,
    invitations,
    payouts,
    commissionRate,
    setCommissionRate,
    createSellerInvitation,
    revokeInvitation,
    updateSellerStatus,
    currentUser,
    setActiveView,
    addToast
  } = useMarketplace();

  // Invitation creation modal state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    fullName: '',
    storeName: '',
    phone: '+998 ',
    email: '',
    username: '',
    region: 'Namangan viloyati'
  });
  const [createdInviteResult, setCreatedInviteResult] = useState<any | null>(null);

  // Suspension confirmation modal state
  const [sellerToSuspend, setSellerToSuspend] = useState<Seller | null>(null);
  const [suspensionReason, setSuspensionReason] = useState('');

  // Seller filters
  const [sellerSearch, setSellerSearch] = useState('');
  const [sellerStatusFilter, setSellerStatusFilter] = useState<string>('all');
  const [sellerRegionFilter, setSellerRegionFilter] = useState<string>('all');

  // Product moderation filter
  const [productSearch, setProductSearch] = useState('');

  // Calculate platform statistics
  const totalGMV = orders.reduce((sum, o) => sum + o.total, 0);
  const platformRevenue = Math.round(totalGMV * (commissionRate / 100));
  const activeSellersCount = sellers.filter(s => s.status === 'active').length;
  const pendingInvitesCount = invitations.filter(i => i.status === 'pending').length;

  const handleCreateInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.fullName || !inviteForm.storeName || !inviteForm.phone || !inviteForm.username) {
      addToast('error', "Maydonlar to'ldirilmadi", "Iltimos, barcha majburiy maydonlarni to'ldiring");
      return;
    }
    const newInvite = createSellerInvitation(inviteForm);
    setCreatedInviteResult(newInvite);
    setInviteForm({
      fullName: '',
      storeName: '',
      phone: '+998 ',
      email: '',
      username: '',
      region: 'Namangan viloyati'
    });
  };

  const handleConfirmSuspension = () => {
    if (sellerToSuspend) {
      updateSellerStatus(sellerToSuspend.id, 'suspended', suspensionReason || 'Administrator qarori');
      setSellerToSuspend(null);
      setSuspensionReason('');
    }
  };

  // Filtered sellers with regional matching
  const filteredSellers = sellers.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(sellerSearch.toLowerCase()) ||
      s.storeName.toLowerCase().includes(sellerSearch.toLowerCase()) ||
      s.region.toLowerCase().includes(sellerSearch.toLowerCase()) ||
      s.phone.includes(sellerSearch);
    const matchesStatus =
      sellerStatusFilter === 'all' || s.status === sellerStatusFilter;
    const matchesRegion =
      sellerRegionFilter === 'all' || s.region === sellerRegionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  // Filtered products
  const filteredProducts = products.filter(p =>
    p.titleUz.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sellerName.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9F6] pb-28 lg:pb-16">
      {/* Top Banner */}
      <div className="bg-[#173B32] text-white border-b border-emerald-950 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#F59E0B] flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold font-heading">
                  Markaziy Boshqaruv Paneli (Super Admin)
                </h1>
                <span className="bg-emerald-900/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700">
                  MARKETPLACE CORE
                </span>
              </div>
              <p className="text-xs text-neutral-300">
                Administrator: <strong>{currentUser.fullName}</strong> · Butun platforma resurslari ustidan to‘liq nazorat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('home')}
              className="px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-xs text-neutral-200 transition-colors flex items-center gap-1.5"
            >
              <span>Xaridor rejimiga qaytish</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-neutral-200 text-xs font-semibold scrollbar-none">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'sellers', label: 'Sotuvchilar (Taklif)', icon: Store, badge: pendingInvitesCount > 0 ? pendingInvitesCount : undefined },
            { id: 'customers', label: 'Xaridorlar', icon: Users },
            { id: 'products', label: 'Mahsulotlar', icon: Package },
            { id: 'orders', label: 'Buyurtmalar', icon: ShoppingBag },
            { id: 'commissions', label: 'Komissiyalar', icon: Percent },
            { id: 'payouts', label: 'To‘lovlar', icon: CreditCard },
            { id: 'reports', label: 'Hisobotlar', icon: BarChart3 },
            { id: 'audit', label: 'Audit Jurnali', icon: ClipboardList, badge: auditLogs.length },
            { id: 'settings', label: 'Sozlamalar', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#173B32] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F59E0B]' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${isActive ? 'bg-[#F59E0B] text-[#173B32]' : 'bg-neutral-200 text-neutral-700'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {adminTab === 'dashboard' && (
          <div className="pt-6 space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Platforma GMV
                </span>
                <div className="text-2xl font-bold text-[#173B32] mt-1 font-heading">
                  {formatPrice(totalGMV)}
                </div>
                <div className="text-xs text-emerald-700 font-medium mt-1">
                  Barcha buyurtmalar summasi
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Komissiya Daromadi ({commissionRate}%)
                </span>
                <div className="text-2xl font-bold text-[#F59E0B] mt-1 font-heading">
                  {formatPrice(platformRevenue)}
                </div>
                <div className="text-xs text-neutral-500 font-medium mt-1">
                  Platforma sof komissiyasi
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Faol Sotuvchilar
                </span>
                <div className="text-2xl font-bold text-neutral-900 mt-1 font-heading">
                  {activeSellersCount} <span className="text-sm font-normal text-neutral-400">/ {sellers.length}</span>
                </div>
                <div className="text-xs text-amber-600 font-medium mt-1">
                  {pendingInvitesCount} ta taklif jarayonda
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Jami Mahsulotlar
                </span>
                <div className="text-2xl font-bold text-neutral-900 mt-1 font-heading">
                  {products.length} ta
                </div>
                <div className="text-xs text-emerald-700 font-medium mt-1">
                  Barcha dilerlar bazasida
                </div>
              </div>
            </div>

            {/* Workflow Quick Launcher: New Seller Invitation */}
            <div className="bg-gradient-to-r from-[#173B32] to-[#235246] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Majburiy Qoida: Sotuvchilar faqat taklif orqali ulanadi</span>
                </div>
                <h3 className="text-lg font-bold font-heading">
                  Yangi sotuvchi kompaniyani ro‘yxatdan o‘tkazish
                </h3>
                <p className="text-xs text-neutral-200 max-w-2xl mt-1 leading-relaxed">
                  Ommaviy ro‘yxatdan o‘tish yopiq. Administrator sotuvchi ma’lumotlarini kiritib, vaqt bilan cheklangan xavfsiz taklif tokeni va parolni o‘rnatish havolasini taqdim etadi.
                </p>
              </div>
              <button
                onClick={() => {
                  setCreatedInviteResult(null);
                  setIsInviteModalOpen(true);
                }}
                className="px-5 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
              >
                <UserPlus className="w-4 h-4" />
                <span>Yangi sotuvchi qo‘shish</span>
              </button>
            </div>

            {/* Recent Orders & Audit Log Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-neutral-900 font-heading">
                    So‘nggi Buyurtmalar
                  </h4>
                  <button
                    onClick={() => setAdminTab('orders')}
                    className="text-xs text-[#173B32] font-semibold hover:underline"
                  >
                    Barchasi ({orders.length}) →
                  </button>
                </div>
                <div className="divide-y divide-neutral-100">
                  {orders.slice(0, 4).map(ord => (
                    <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-neutral-900">{ord.trackingCode}</div>
                        <div className="text-neutral-500">{ord.customerName} · {ord.items.length} xil tovar</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#173B32]">{formatPrice(ord.total)}</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                          {ord.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Audit Trail */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-neutral-900 font-heading">
                    Xavfsizlik va Audit Jurnali
                  </h4>
                  <button
                    onClick={() => setAdminTab('audit')}
                    className="text-xs text-[#173B32] font-semibold hover:underline"
                  >
                    Barchasi ({auditLogs.length}) →
                  </button>
                </div>
                <div className="divide-y divide-neutral-100">
                  {auditLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="py-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-800">{log.action}</span>
                        <span className="text-[10px] text-neutral-400">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-neutral-600 mt-0.5 text-[11px] line-clamp-1">{log.details}</p>
                      <div className="text-[10px] text-neutral-400 mt-1">
                        Bajaruvchi: <strong className="text-neutral-700">{log.performedBy}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SELLERS MANAGEMENT (Requirement 1, 2, 6) */}
        {adminTab === 'sellers' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Sotuvchilar Boshqaruvi va Verifikatsiya
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Faqat administrator ruxsati bilan yaratilgan rasmiy dilerlar va zavodlar ro‘yxati
                </p>
              </div>

              <button
                onClick={() => {
                  setCreatedInviteResult(null);
                  setIsInviteModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#173B32] hover:bg-[#235246] text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <UserPlus className="w-4 h-4 text-[#F59E0B]" />
                <span>Yangi sotuvchi qo‘shish (Taklif)</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={sellerSearch}
                  onChange={e => setSellerSearch(e.target.value)}
                  placeholder="Do‘kon nomi, vakil ismi yoki telefon raqami bo‘yicha qidirish..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-900 outline-none focus:border-[#173B32]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-neutral-400" />
                <select
                  value={sellerStatusFilter}
                  onChange={e => setSellerStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-700 outline-none"
                >
                  <option value="all">Barcha holatlar</option>
                  <option value="active">Faol (Active)</option>
                  <option value="invited">Taklif yuborilgan (Invited)</option>
                  <option value="suspended">Bloklangan (Suspended)</option>
                </select>
                <select
                  value={sellerRegionFilter}
                  onChange={e => setSellerRegionFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-700 outline-none"
                >
                  <option value="all">Barcha viloyatlar ({sellers.length})</option>
                  {UZBEKISTAN_REGIONS.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pending Invitations Box */}
            {invitations.filter(i => i.status === 'pending').length > 0 && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-amber-900 text-xs font-bold mb-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Kutilayotgan takliflar (Sotuvchi hali parolini o‘rnatmagan)</span>
                </div>
                <div className="divide-y divide-amber-100">
                  {invitations.filter(i => i.status === 'pending').map(inv => (
                    <div key={inv.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <strong className="text-neutral-900">{inv.storeName}</strong> ({inv.fullName}) · {inv.phone}
                        <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                          Taklif kodi: <span className="bg-amber-200/80 px-1.5 py-0.5 rounded font-bold text-neutral-800">{inv.inviteToken}</span>
                          {' '}· Login: <strong>{inv.username}</strong>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(inv.inviteToken);
                            addToast('success', 'Nusxalandi', `Taklif kodi nusxalandi: ${inv.inviteToken}`);
                          }}
                          className="px-2.5 py-1 rounded bg-white text-neutral-700 border border-neutral-200 text-[11px] hover:bg-neutral-50"
                        >
                          Kodni nusxalash
                        </button>
                        <button
                          onClick={() => revokeInvitation(inv.id)}
                          className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 text-[11px] hover:bg-rose-100"
                        >
                          Bekor qilish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sellers Table */}
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Do‘kon / Kompaniya</th>
                      <th className="p-4">Mas'ul Vakil & Aloqa</th>
                      <th className="p-4">INN / Hudud</th>
                      <th className="p-4">Tovarlar & Savdo</th>
                      <th className="p-4">Holat</th>
                      <th className="p-4 text-right">Boshqaruv Amallari</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredSellers.map(seller => {
                      const isSuspended = seller.status === 'suspended';
                      const isInvited = seller.status === 'invited';
                      const isActive = seller.status === 'active';

                      return (
                        <tr key={seller.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={seller.logo}
                                alt={seller.storeName}
                                className="w-10 h-10 rounded-xl object-cover border border-neutral-200 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                                  <span>{seller.storeName}</span>
                                  {seller.verified && (
                                    <span title="Tasdiqlangan">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-neutral-400 font-mono">
                                  ID: {seller.id} · @{seller.username}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-4 text-neutral-700">
                            <div className="font-medium">{seller.name}</div>
                            <div className="text-neutral-500 text-[11px] flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-neutral-400" />
                              <span>{seller.phone}</span>
                            </div>
                          </td>

                          <td className="p-4 text-neutral-600">
                            <div>INN: <strong className="text-neutral-900">{seller.inn}</strong></div>
                            <div className="text-neutral-400 text-[11px]">{seller.region}</div>
                          </td>

                          <td className="p-4">
                            <div className="font-semibold text-neutral-900">
                              {seller.productsCount} ta tovar
                            </div>
                            <div className="text-[11px] text-neutral-500">
                              {seller.totalSalesCount} ta bitim
                            </div>
                          </td>

                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                isActive
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : isSuspended
                                  ? 'bg-rose-50 text-rose-800 border border-rose-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? 'bg-emerald-600' : isSuspended ? 'bg-rose-600' : 'bg-amber-600'
                              }`}></span>
                              {isActive
                                ? 'Faol'
                                : isSuspended
                                ? 'Bloklangan'
                                : 'Taklif qilingan'}
                            </span>
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {isSuspended ? (
                                <button
                                  onClick={() => updateSellerStatus(seller.id, 'active')}
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold flex items-center gap-1"
                                  title="Blokdan chiqarish va faollashtirish"
                                >
                                  <Unlock className="w-3.5 h-3.5" />
                                  <span>Faollashtirish</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => setSellerToSuspend(seller)}
                                  className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold flex items-center gap-1"
                                  title="Sotuvchini to'xtatish / bloklash"
                                >
                                  <Lock className="w-3.5 h-3.5" />
                                  <span>To‘xtatish</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS MODERATION */}
        {adminTab === 'products' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Barcha Tovar va Materiallar Moderatsiyasi ({products.length} ta)
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Barcha sotuvchilar tomonidan joylangan tovarlar ustidan markaziy nazorat
                </p>
              </div>

              <div className="relative w-72">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  placeholder="Tovar yoki brend qidirish..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white p-4 rounded-2xl border border-neutral-200 flex gap-3">
                  <img
                    src={product.image}
                    alt={product.titleUz}
                    className="w-16 h-16 rounded-xl object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-neutral-900 line-clamp-1">
                      {product.titleUz}
                    </h5>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      Sotuvchi: <strong className="text-neutral-800">{product.sellerName}</strong>
                    </div>
                    <div className="text-xs font-bold text-[#173B32] mt-1">
                      {formatPrice(product.price)} / {product.unit}
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">
                      Qoldiq: {product.stock} {product.unit} · {product.inStock ? 'Omborda bor' : 'Tugagan'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT TRAIL (Requirement 6, 8) */}
        {adminTab === 'audit' && (
          <div className="pt-6 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Xavfsizlik va Administratorlik Audit Jurnali
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Barcha admin va sotuvchi harakatlari, kirishlar, status o'zgarishlari va buyurtmalar to'liq qayd etiladi.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Amal (Action)</th>
                      <th className="p-4">Bajaruvchi</th>
                      <th className="p-4">Rol</th>
                      <th className="p-4">Tafsilotlar</th>
                      <th className="p-4">Daraja</th>
                      <th className="p-4">Vaqt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-neutral-50/80">
                        <td className="p-4 font-mono font-bold text-neutral-900">
                          {log.action}
                        </td>
                        <td className="p-4 text-neutral-700 font-medium">
                          {log.performedBy}
                        </td>
                        <td className="p-4">
                          <span className="uppercase text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                            {log.performerRole}
                          </span>
                        </td>
                        <td className="p-4 text-neutral-600 max-w-md">
                          {log.details}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.severity === 'warning'
                                ? 'bg-amber-100 text-amber-800'
                                : log.severity === 'critical'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {log.severity.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-neutral-400 text-[11px] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COMMISSIONS & SETTINGS */}
        {adminTab === 'commissions' && (
          <div className="pt-6 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 max-w-2xl space-y-4">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Marketplace Komissiya Stavkalari
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Platforma har bir savdo bitimidan olinadigan komissiya ulushini belgilaydi. Standart komissiya barcha dilerlar hisob-kitoblarida avtomatik hisoblab boriladi.
              </p>

              <div className="pt-3 border-t border-neutral-100 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Bozor komissiyasi stavkasi: {commissionRate}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={commissionRate}
                    onChange={e => setCommissionRate(parseFloat(e.target.value))}
                    className="w-full accent-[#173B32]"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                    <span>1.0% (Minimal)</span>
                    <span className="font-bold text-[#173B32]">{commissionRate}%</span>
                    <span>10.0% (Maksimal)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-1">
                  <div>Jami savdo hajmi: <strong>{formatPrice(totalGMV)}</strong></div>
                  <div>Platforma kutilayotgan daromadi: <strong className="text-emerald-700">{formatPrice(platformRevenue)}</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PAYOUTS */}
        {adminTab === 'payouts' && (
          <div className="pt-6 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Sotuvchilarga To‘lovlar va Payouts
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Bozor komissiyasi (3.5%) chegirilgandan keyin dilerlarning bank hisob raqamlariga o‘tkazilgan to‘lovlar
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Sotuvchi Do‘kon</th>
                      <th className="p-4">Davr</th>
                      <th className="p-4">Jami Savdo</th>
                      <th className="p-4">Komissiya (3.5%)</th>
                      <th className="p-4">Sof To‘lov (Net)</th>
                      <th className="p-4">Holat</th>
                      <th className="p-4">Bank Hisob Raqami</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {payouts.map(p => (
                      <tr key={p.id} className="hover:bg-neutral-50">
                        <td className="p-4 font-bold text-neutral-900">{p.sellerName}</td>
                        <td className="p-4 text-neutral-600">{p.period}</td>
                        <td className="p-4 font-medium">{formatPrice(p.totalSales)}</td>
                        <td className="p-4 text-rose-600 font-medium">-{formatPrice(p.commissionAmount)}</td>
                        <td className="p-4 font-bold text-emerald-800">{formatPrice(p.netPayout)}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.status === 'paid' ? 'To‘langan' : 'Kutilmoqda'}
                          </span>
                        </td>
                        <td className="p-4 text-[11px] text-neutral-500 font-mono">{p.bankAccount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: ORDERS */}
        {adminTab === 'orders' && (
          <div className="pt-6 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Platforma Buyurtmalari ({orders.length} ta)
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Barcha xaridorlar va dilerlar o'rtasidagi bitimlar
              </p>
            </div>

            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-neutral-900 font-bold">{order.trackingCode}</strong>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700">
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-600 mt-1">
                      Xaridor: <strong>{order.customerName}</strong> ({order.customerPhone})
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      Manzil: {order.deliveryAddress.region}, {order.deliveryAddress.district}, {order.deliveryAddress.street}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-[#173B32]">
                      {formatPrice(order.total)}
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Yetkazish: {formatPrice(order.deliveryFee)} · {order.deliveryVehicle || 'Do‘kondan'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTHER TABS: Customers, Categories, Settings (Fallback clean UI) */}
        {(adminTab === 'customers' || adminTab === 'categories' || adminTab === 'reports' || adminTab === 'settings') && (
          <div className="pt-6">
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center max-w-lg mx-auto">
              <h4 className="text-base font-bold text-neutral-900 mb-1">
                {adminTab.toUpperCase()} Bo'limi
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                Markaziy administrator tizimi barcha ko‘rsatkichlarni to‘liq boshqarmoqda.
              </p>
              <button
                onClick={() => setAdminTab('dashboard')}
                className="px-4 py-2 rounded-xl bg-[#173B32] text-white text-xs font-semibold cursor-pointer"
              >
                Asosiy dashboardga qaytish
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: CREATE SELLER INVITATION (MANDATORY REQUIREMENT 2) */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Yangi Sotuvchi Taklif Qilish
                </h3>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {createdInviteResult ? (
              /* Success Invitation Box */
              <div className="py-4 space-y-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <div className="font-bold text-sm mb-1">Taklif muvaffaqiyatli yaratildi!</div>
                  <p>
                    Ushbu taklif kodi orqali sotuvchi tizimga kirib o‘z parolini o‘rnatadi va do‘kon boshqaruvini oladi.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                  <div>Do‘kon nomi: <strong>{createdInviteResult.storeName}</strong></div>
                  <div>Mas'ul shaxs: <strong>{createdInviteResult.fullName}</strong></div>
                  <div>Telefon: <strong>{createdInviteResult.phone}</strong></div>
                  <div>Login: <strong className="font-mono">{createdInviteResult.username}</strong></div>
                  <div className="pt-2 border-t border-neutral-200">
                    <span className="text-neutral-500 block mb-1">Xavfsiz taklif kodi (Invite Token):</span>
                    <div className="p-2 rounded bg-amber-100/70 border border-amber-300 font-mono font-bold text-sm text-[#173B32] text-center select-all">
                      {createdInviteResult.inviteToken}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(createdInviteResult.inviteToken);
                      addToast('success', 'Nusxalandi', "Taklif kodi nusxalandi!");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#F59E0B] text-[#173B32] font-bold text-xs"
                  >
                    Kodni nusxalash
                  </button>
                  <button
                    onClick={() => {
                      setIsInviteModalOpen(false);
                      setCreatedInviteResult(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#173B32] text-white font-bold text-xs"
                  >
                    Yopish
                  </button>
                </div>
              </div>
            ) : (
              /* Invitation Form */
              <form onSubmit={handleCreateInviteSubmit} className="py-4 space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Do‘kon yoki Korxona nomi *
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteForm.storeName}
                    onChange={e => setInviteForm({ ...inviteForm, storeName: e.target.value })}
                    placeholder="Masalan: Bekobod Metall Dilerlik Markazi"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Sotuvchi Viloyati / Hududi *
                  </label>
                  <select
                    value={inviteForm.region}
                    onChange={e => setInviteForm({ ...inviteForm, region: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32] bg-white font-semibold text-neutral-800"
                  >
                    {UZBEKISTAN_REGIONS.map(reg => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Sotuvchi vakili F.I.Sh. (To‘liq ism) *
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteForm.fullName}
                    onChange={e => setInviteForm({ ...inviteForm, fullName: e.target.value })}
                    placeholder="Masalan: Sardor Toirov"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      Telefon raqami *
                    </label>
                    <input
                      type="text"
                      required
                      value={inviteForm.phone}
                      onChange={e => setInviteForm({ ...inviteForm, phone: e.target.value })}
                      placeholder="+998 90 123-45-67"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      Username / Login *
                    </label>
                    <input
                      type="text"
                      required
                      value={inviteForm.username}
                      onChange={e => setInviteForm({ ...inviteForm, username: e.target.value })}
                      placeholder="toirov_metall"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Elektron pochta (ixtiyoriy)
                  </label>
                  <input
                    type="email"
                    value={inviteForm.email}
                    onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
                    placeholder="sotuv@metall.uz"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  />
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-[11px] text-neutral-500">
                  ⚠️ <strong>Xavfsizlik qoidasi:</strong> Tizimda ommaviy ro‘yxatdan o‘tish yo‘q. Faqat ushbu shakl orqali yaratilgan taklif egasi o‘z parolini o‘rnatib sotuv bo‘limiga kira oladi.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsInviteModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 font-semibold"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#173B32] text-white font-bold hover:bg-[#235246] transition-colors"
                  >
                    Taklif yaratish
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: CONFIRM SELLER SUSPENSION (MANDATORY REQUIREMENT 6) */}
      {sellerToSuspend && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 text-rose-600 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold font-heading text-neutral-900">
                Sotuvchini to‘xtatish (Bloklash)
              </h3>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              Haqiqatan ham <strong>{sellerToSuspend.storeName}</strong> sotuvchi hisobini bloklamoqchimisiz?
              Bloklangan sotuvchining barcha aktiv sessiyalari bekor qilinadi va sotuv bo‘limiga kirish butunlay to‘xtatiladi.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                To‘xtatish sababi (Audit jurnaliga yoziladi):
              </label>
              <textarea
                value={suspensionReason}
                onChange={e => setSuspensionReason(e.target.value)}
                placeholder="Masalan: Mahsulot sifati bo'yicha mijozlar shikoyati yoki to'lov nizosi"
                className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs outline-none focus:border-rose-500 h-20"
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setSellerToSuspend(null)}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 font-semibold text-xs"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleConfirmSuspension}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                Ha, bloklash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
