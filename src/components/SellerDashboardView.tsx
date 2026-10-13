import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { SellerTab, Product, OrderStatus, UnitType } from '../types';
import { formatPrice, UZBEKISTAN_REGIONS } from '../utils/translations';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Boxes,
  BarChart3,
  Store,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  Calendar,
  Lock,
  ChevronRight,
  TrendingUp,
  Percent,
  Wallet
} from 'lucide-react';

export const SellerDashboardView: React.FC = () => {
  const {
    currentSeller,
    currentUser,
    isSellerActive,
    isSeller,
    sellerTab,
    setSellerTab,
    sellerProducts,
    sellerOrders,
    addSellerProduct,
    updateSellerProduct,
    deleteSellerProduct,
    updateSellerOrderStatus,
    setActiveView,
    addToast
  } = useMarketplace();

  // Modal for adding a product
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [prodForm, setProdForm] = useState({
    titleUz: '',
    titleRu: '',
    categoryId: 'cement-dry-mix',
    price: 50000,
    oldPrice: 55000,
    unit: 'qop' as UnitType,
    minOrder: 1,
    stock: 100,
    brand: '',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    descriptionUz: '',
    descriptionRu: '',
    isWholesale: true,
    wholesaleMinQty: 20,
    wholesalePrice: 47000,
    inStock: true
  });

  // Strict RBAC Guard (Requirement 3 & 4)
  if (!isSeller || !currentSeller) {
    return (
      <div className="min-h-screen bg-[#F8F9F6] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900 font-heading mb-2">
            Ruxsat berilmagan (Kirish taqiqlangan)
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed mb-6">
            Sotuv bo‘limiga faqat administrator tomonidan tasdiqlangan va taklif qilingan sotuvchilar kirishi mumkin. Oddiy xaridor hisobi sotuvchi huquqiga ega emas.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveView('seller-login')}
              className="w-full py-2.5 rounded-xl bg-[#173B32] text-white font-semibold text-xs"
            >
              Sotuvchi sifatida kirish
            </button>
            <button
              onClick={() => setActiveView('home')}
              className="w-full py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs hover:bg-neutral-50"
            >
              Bosh sahifaga qaytish
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Account Suspended Guard (Requirement 3)
  if (!isSellerActive) {
    return (
      <div className="min-h-screen bg-[#F8F9F6] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-rose-200 p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900 font-heading mb-2">
            Hisobingiz vaqtincha to‘xtatilgan (Bloklangan)
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed mb-6">
            Hurmatli <strong>{currentSeller.storeName}</strong> ma'muriyati, sotuvchi profilingiz administrator tomonidan bloklangan. Tovar qo‘shish yoki buyurtmalarni qabul qilish to‘xtatilgan. Administratorga murojaat qiling.
          </p>
          <button
            onClick={() => setActiveView('home')}
            className="w-full py-2.5 rounded-xl bg-[#173B32] text-white font-semibold text-xs"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  // Calculate metrics strictly for this seller's data
  const totalSalesRevenue = sellerOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, ord) => {
      const sellerItemTotal = ord.items
        .filter(item => item.sellerId === currentSeller.id)
        .reduce((s, i) => s + i.price * i.quantity, 0);
      return sum + sellerItemTotal;
    }, 0);

  const pendingOrdersCount = sellerOrders.filter(o => o.status === 'pending').length;
  const lowStockCount = sellerProducts.filter(p => p.stock < 50).length;
  const commissionDeducted = Math.round(totalSalesRevenue * 0.035); // 3.5% commission
  const netProceeds = totalSalesRevenue - commissionDeducted;

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.titleUz || !prodForm.price) return;

    if (editingProduct) {
      updateSellerProduct(editingProduct.id, {
        titleUz: prodForm.titleUz,
        titleRu: prodForm.titleRu || prodForm.titleUz,
        price: prodForm.price,
        oldPrice: prodForm.oldPrice,
        unit: prodForm.unit,
        minOrder: prodForm.minOrder,
        stock: prodForm.stock,
        brand: prodForm.brand || 'Standart',
        image: prodForm.image,
        descriptionUz: prodForm.descriptionUz,
        descriptionRu: prodForm.descriptionRu || prodForm.descriptionUz,
        inStock: prodForm.inStock
      });
      setEditingProduct(null);
    } else {
      addSellerProduct({
        titleUz: prodForm.titleUz,
        titleRu: prodForm.titleRu || prodForm.titleUz,
        categoryId: prodForm.categoryId,
        price: prodForm.price,
        oldPrice: prodForm.oldPrice,
        unit: prodForm.unit,
        minOrder: prodForm.minOrder,
        stock: prodForm.stock,
        brand: prodForm.brand || 'Standart',
        image: prodForm.image,
        images: [prodForm.image],
        specifications: [
          { labelUz: 'Ishlab chiqaruvchi', labelRu: 'Производитель', value: "O'zbekiston" },
          { labelUz: 'Sertifikat', labelRu: 'Сертификат', value: 'GOST standart' }
        ],
        isWholesale: prodForm.isWholesale,
        wholesaleTiers: prodForm.isWholesale
          ? [{ minQty: prodForm.wholesaleMinQty, discountPrice: prodForm.wholesalePrice }]
          : [],
        inStock: prodForm.inStock,
        descriptionUz: prodForm.descriptionUz,
        descriptionRu: prodForm.descriptionRu || prodForm.descriptionUz,
        weightKg: 10
      });
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9F6] pb-28 lg:pb-16">
      {/* Seller Top Navigation Bar */}
      <div className="bg-[#173B32] text-white border-b border-emerald-950 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={currentSeller.logo}
              alt={currentSeller.storeName}
              className="w-11 h-11 rounded-xl object-cover border border-emerald-700 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-heading">
                  {currentSeller.storeName}
                </h1>
                <span className="bg-emerald-900/80 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  FAOL DILER
                </span>
              </div>
              <p className="text-xs text-neutral-300">
                Sotuvchi: <strong>{currentUser.fullName}</strong> · INN: {currentSeller.inn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsAddModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi tovar qo‘shish</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Navigation Tabs (Strictly Seller Workspace Tabs) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-neutral-200 text-xs font-semibold scrollbar-none">
          {[
            { id: 'dashboard', label: 'Sotuv paneli', icon: LayoutDashboard },
            { id: 'products', label: 'Mahsulotlarim', icon: Package, badge: sellerProducts.length },
            { id: 'orders', label: 'Buyurtmalar', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined },
            { id: 'inventory', label: 'Ombor & Qoldiq', icon: Boxes, badge: lowStockCount > 0 ? `${lowStockCount} kam` : undefined },
            { id: 'reports', label: 'Savdo hisobotlari', icon: BarChart3 },
            { id: 'store_settings', label: 'Do‘kon sozlamalari', icon: Store }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = sellerTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSellerTab(tab.id as SellerTab)}
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

        {/* TAB 1: SOTUV PANELI (SELLER DASHBOARD) */}
        {sellerTab === 'dashboard' && (
          <div className="pt-6 space-y-6">
            {/* 4 Core Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Jami Savdo Hajmi
                </span>
                <div className="text-2xl font-bold text-[#173B32] mt-1 font-heading">
                  {formatPrice(totalSalesRevenue)}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Komissiyadan oldin
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Kutilayotgan Buyurtmalar
                </span>
                <div className="text-2xl font-bold text-[#F59E0B] mt-1 font-heading">
                  {pendingOrdersCount} ta
                </div>
                <div className="text-xs text-amber-700 font-medium mt-1">
                  Qabul qilishni kutmoqda
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Faol Mahsulotlarim
                </span>
                <div className="text-2xl font-bold text-neutral-900 mt-1 font-heading">
                  {sellerProducts.length} ta
                </div>
                <div className="text-xs text-emerald-700 font-medium mt-1">
                  Katalogda ko‘rinmoqda
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Sof Daromad (Net Payout)
                </span>
                <div className="text-2xl font-bold text-emerald-800 mt-1 font-heading">
                  {formatPrice(netProceeds)}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  3.5% bozor to‘lovi chegirilgan
                </div>
              </div>
            </div>

            {/* Inventory Alerts Box */}
            {lowStockCount > 0 && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900">
                      Omborda qoldig‘i oz qolgan mahsulotlar ({lowStockCount} ta)
                    </h4>
                    <p className="text-[11px] text-amber-700 mt-0.5">
                      Buyurtmalar to‘xtab qolmasligi uchun qoldiqni o‘z vaqtida yangilang.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSellerTab('inventory')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-xs font-bold text-amber-900 hover:bg-amber-100"
                >
                  Qoldiqni to‘ldirish
                </button>
              </div>
            )}

            {/* Orders Section Preview */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-neutral-900 font-heading">
                  So‘nggi Buyurtmalar (Faqat sizning tovarlaringiz)
                </h3>
                <button
                  onClick={() => setSellerTab('orders')}
                  className="text-xs text-[#173B32] font-semibold hover:underline"
                >
                  Barcha buyurtmalar ({sellerOrders.length}) →
                </button>
              </div>

              {sellerOrders.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400">
                  Hozircha buyurtmalar yo‘q
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {sellerOrders.slice(0, 4).map(ord => {
                    const myItems = ord.items.filter(i => i.sellerId === currentSeller.id);
                    const mySubtotal = myItems.reduce((s, i) => s + i.price * i.quantity, 0);

                    return (
                      <div key={ord.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-900">{ord.trackingCode}</span>
                            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-800">
                              {ord.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-neutral-500 mt-0.5">
                            Xaridor: <strong>{ord.customerName}</strong> ({ord.customerPhone}) · {myItems.length} ta mahsulotingiz
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-bold text-[#173B32]">{formatPrice(mySubtotal)}</div>
                            <div className="text-[10px] text-neutral-400">
                              {ord.deliveryType === 'delivery' ? 'Yetkazish' : 'Ombordan olish'}
                            </div>
                          </div>
                          <button
                            onClick={() => setSellerTab('orders')}
                            className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-[11px]"
                          >
                            Boshqarish
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MAHSULOTLARIM (PRODUCTS MANAGEMENT) */}
        {sellerTab === 'products' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-heading">
                  Mening Mahsulotlarim ({sellerProducts.length} ta)
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Faqat sizning do‘koningizga tegishli tovarlar ro‘yxati. Narx va qoldiqlarni to‘g‘ridan-to‘g‘ri boshqaring.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#173B32] hover:bg-[#235246] text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4 text-[#F59E0B]" />
                <span>Yangi tovar qo‘shish</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Tovar</th>
                      <th className="p-4">Narxi / Birlik</th>
                      <th className="p-4">Ulgurji Narx</th>
                      <th className="p-4">Qoldiq</th>
                      <th className="p-4">Holat</th>
                      <th className="p-4 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {sellerProducts.map(prod => (
                      <tr key={prod.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.titleUz}
                              className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-neutral-900 line-clamp-1">{prod.titleUz}</div>
                              <div className="text-[11px] text-neutral-400">{prod.brand} · Min. {prod.minOrder} {prod.unit}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-[#173B32]">{formatPrice(prod.price)}</div>
                          <div className="text-[10px] text-neutral-400">/{prod.unit}</div>
                        </td>

                        <td className="p-4">
                          {prod.wholesaleTiers && prod.wholesaleTiers.length > 0 ? (
                            <span className="text-emerald-700 font-semibold">
                              {formatPrice(prod.wholesaleTiers[0].discountPrice)} ({prod.wholesaleTiers[0].minQty}+ {prod.unit})
                            </span>
                          ) : (
                            <span className="text-neutral-400">-</span>
                          )}
                        </td>

                        <td className="p-4">
                          <span className={`font-bold ${prod.stock < 50 ? 'text-amber-600' : 'text-neutral-900'}`}>
                            {prod.stock} {prod.unit}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            prod.inStock ? 'bg-emerald-50 text-emerald-800' : 'bg-neutral-100 text-neutral-500'
                          }`}>
                            {prod.inStock ? 'Sotuvda' : 'Yashirilgan'}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                updateSellerProduct(prod.id, { inStock: !prod.inStock });
                              }}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                              title={prod.inStock ? 'Vaqtincha yashirish' : 'Sotuvga chiqarish'}
                            >
                              {prod.inStock ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => deleteSellerProduct(prod.id)}
                              className="p-1.5 rounded-lg text-rose-400 hover:text-rose-700 hover:bg-rose-50"
                              title="O‘chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BUYURTMALAR (ORDERS MANAGEMENT) */}
        {sellerTab === 'orders' && (
          <div className="pt-6 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Kelib Tushgan Buyurtmalar ({sellerOrders.length} ta)
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Xaridorlar tomonidan rasmiylashtirilgan tovarlar buyurtmalari. Holatni o‘zgartiring va jo‘natilishini nazorat qiling.
              </p>
            </div>

            <div className="space-y-4">
              {sellerOrders.map(order => {
                const myItems = order.items.filter(i => i.sellerId === currentSeller.id);
                const myTotal = myItems.reduce((s, i) => s + i.price * i.quantity, 0);

                return (
                  <div key={order.id} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-neutral-900 font-mono text-sm">{order.trackingCode}</span>
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-800">
                          {order.status.toUpperCase()}
                        </span>
                        <span className="text-neutral-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Status action dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500 text-[11px]">Holatni o‘zgartirish:</span>
                        <select
                          value={order.status}
                          onChange={e => updateSellerOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-800 outline-none"
                        >
                          <option value="pending">Kutilmoqda (Pending)</option>
                          <option value="confirmed">Tasdiqlash (Confirmed)</option>
                          <option value="preparing">Tayyorlanmoqda (Preparing)</option>
                          <option value="dispatched">Yo‘lda / Yuklandi (Dispatched)</option>
                          <option value="delivered">Yetkazildi (Delivered)</option>
                          <option value="cancelled">Bekor qilish (Cancelled)</option>
                        </select>
                      </div>
                    </div>

                    {/* Items & Shipping address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="font-semibold text-neutral-500 uppercase text-[10px] mb-2">
                          Buyurtma qilingan tovarlaringiz:
                        </div>
                        <div className="space-y-2">
                          {myItems.map(item => (
                            <div key={item.productId} className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-10 h-10 rounded-lg object-cover border border-neutral-200 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-neutral-900 truncate">{item.title}</div>
                                <div className="text-neutral-500 text-[11px]">
                                  {item.quantity} {item.unit} × {formatPrice(item.price)}
                                </div>
                              </div>
                              <div className="font-bold text-[#173B32]">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer Delivery info */}
                      <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-1.5 text-xs text-neutral-700">
                        <div className="font-bold text-neutral-900 mb-1">
                          Yetkazib berish ma'lumotlari:
                        </div>
                        <div>Qabul qiluvchi: <strong>{order.customerName}</strong></div>
                        <div>Telefon: <strong className="text-[#173B32]">{order.customerPhone}</strong></div>
                        <div>
                          Manzil: {order.deliveryAddress.region}, {order.deliveryAddress.district}, {order.deliveryAddress.street}
                        </div>
                        {order.deliveryAddress.landmark && (
                          <div className="text-[11px] text-neutral-500">
                            Mo'ljal: {order.deliveryAddress.landmark}
                          </div>
                        )}
                        {order.customerNote && (
                          <div className="pt-2 text-[11px] text-amber-800">
                            Izoh: "{order.customerNote}"
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SAVDO HISOBOTLARI (FINANCIAL REPORTS & PAYOUTS) */}
        {sellerTab === 'reports' && (
          <div className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase">Jami Sotuvlar</span>
                <div className="text-2xl font-bold text-[#173B32] mt-1">{formatPrice(totalSalesRevenue)}</div>
                <div className="text-xs text-neutral-400 mt-1">Ushbu oy davomida</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase">Bozor Komissiyasi (3.5%)</span>
                <div className="text-2xl font-bold text-rose-600 mt-1">-{formatPrice(commissionDeducted)}</div>
                <div className="text-xs text-neutral-400 mt-1">BUILT xizmat haqi</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-xs font-semibold text-neutral-500 uppercase">Hisobingizga Tushadigan Sof Summa</span>
                <div className="text-2xl font-bold text-emerald-800 mt-1">{formatPrice(netProceeds)}</div>
                <div className="text-xs text-emerald-700 font-medium mt-1">Keyingi to‘lov: 1-sana</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200">
              <h3 className="text-base font-bold text-neutral-900 font-heading mb-2">
                Bank Rekvizitlari va Shartnoma
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-2xl">
                Barcha to‘lovlar har 10 kunda yoki oy boshida rasmiy hisob-faktura (Didox/E-Faktura) asosida ko‘rsatilgan bank hisob raqamiga o‘tkaziladi.
              </p>
              <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1 font-mono">
                <div>INN / STIR: <strong>{currentSeller.inn}</strong></div>
                <div>Do‘kon nomi: <strong>{currentSeller.storeName}</strong></div>
                <div>Hisob-kitob holati: <span className="text-emerald-700 font-bold">FAOL (Shartnoma imzolangan)</span></div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DO'KON SOZLAMALARI */}
        {sellerTab === 'store_settings' && (
          <div className="pt-6 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 max-w-2xl space-y-4 text-xs">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Do‘kon Profili va Aloqa Ma'lumotlari
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Do‘kon nomi</label>
                  <input
                    type="text"
                    disabled
                    value={currentSeller.storeName}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-600"
                  />
                  <span className="text-[10px] text-neutral-400">Do'kon nomini faqat administrator o'zgartira oladi.</span>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Viloyat / Hudud</label>
                  <select
                    defaultValue={currentSeller.region}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32] bg-white font-semibold text-neutral-800"
                  >
                    {UZBEKISTAN_REGIONS.map(reg => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Ombor manzili</label>
                  <input
                    type="text"
                    defaultValue={currentSeller.address}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Mijozlar uchun telefon raqami</label>
                  <input
                    type="text"
                    defaultValue={currentSeller.phone}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Do‘kon tavsifi</label>
                  <textarea
                    defaultValue={currentSeller.description}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32] h-24"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => addToast('success', 'Sozlamalar saqlandi', "Do'kon ma'lumotlari muvaffaqiyatli yangilandi.")}
                    className="px-5 py-2.5 rounded-xl bg-[#173B32] text-white font-bold text-xs"
                  >
                    O‘zgarishlarni saqlash
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD PRODUCT FORM */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                {editingProduct ? 'Tovarni Tahrirlash' : 'Yangi Tovar Qo‘shish'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Tovar nomi (O‘zbek tilida) *
                </label>
                <input
                  type="text"
                  required
                  value={prodForm.titleUz}
                  onChange={e => setProdForm({ ...prodForm, titleUz: e.target.value })}
                  placeholder="Masalan: Bekobod Armaturasi 12 mm A500C"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Toifasi *</label>
                  <select
                    value={prodForm.categoryId}
                    onChange={e => setProdForm({ ...prodForm, categoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  >
                    <option value="cement-dry-mix">Sement va Quruq Qorishmalar</option>
                    <option value="rebar-metal">Armatura va Metall Prokati</option>
                    <option value="bricks-blocks">G'isht va Bloklar</option>
                    <option value="timber-wood">Yog'och va Taxta</option>
                    <option value="paint-varnish">Bo'yoqlar va Pardozlash</option>
                    <option value="plumbing-pipes">Santexnika va Quvurlar</option>
                    <option value="electrical">Elektr va Yoritish</option>
                    <option value="tiles-granite">Plitka va Keramogranit</option>
                    <option value="insulation">Izolyatsiya</option>
                    <option value="tools-hardware">Asboblar va Uskunalar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">O‘lchov birligi *</label>
                  <select
                    value={prodForm.unit}
                    onChange={e => setProdForm({ ...prodForm, unit: e.target.value as UnitType })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  >
                    <option value="qop">qop (bag)</option>
                    <option value="dona">dona (piece)</option>
                    <option value="metr">metr (m)</option>
                    <option value="m²">m² (kv.m)</option>
                    <option value="m³">m³ (kub)</option>
                    <option value="tonna">tonna (t)</option>
                    <option value="kg">kg</option>
                    <option value="litr">litr</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Narxi (so‘m) *</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={e => setProdForm({ ...prodForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Ombordagi qoldiq *</label>
                  <input
                    type="number"
                    required
                    value={prodForm.stock}
                    onChange={e => setProdForm({ ...prodForm, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Min. buyurtma</label>
                  <input
                    type="number"
                    value={prodForm.minOrder}
                    onChange={e => setProdForm({ ...prodForm, minOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  />
                </div>
              </div>

              {/* Wholesale pricing toggle */}
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-800">Ulgurji xaridlar uchun maxsus narx</span>
                  <input
                    type="checkbox"
                    checked={prodForm.isWholesale}
                    onChange={e => setProdForm({ ...prodForm, isWholesale: e.target.checked })}
                    className="w-4 h-4 accent-[#173B32]"
                  />
                </div>
                {prodForm.isWholesale && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <span className="text-neutral-500 block mb-1">Katta hajm (min. miqdor):</span>
                      <input
                        type="number"
                        value={prodForm.wholesaleMinQty}
                        onChange={e => setProdForm({ ...prodForm, wholesaleMinQty: parseInt(e.target.value) || 10 })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white"
                      />
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">Ulgurji narx (so‘m):</span>
                      <input
                        type="number"
                        value={prodForm.wholesalePrice}
                        onChange={e => setProdForm({ ...prodForm, wholesalePrice: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Rasm havolasi (URL)</label>
                <input
                  type="url"
                  value={prodForm.image}
                  onChange={e => setProdForm({ ...prodForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Tavsifi</label>
                <textarea
                  value={prodForm.descriptionUz}
                  onChange={e => setProdForm({ ...prodForm, descriptionUz: e.target.value })}
                  placeholder="Material sifati, qo'llanilishi va GOST standarti haqida..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32] h-20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#173B32] text-white font-bold hover:bg-[#235246]"
                >
                  Saqlash va Joylash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
