import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPrice, getRegionalHubInfo } from '../utils/translations';
import { Order, OrderStatus } from '../types';
import {
  ShoppingBag,
  Heart,
  MapPin,
  User,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  FileText,
  AlertCircle,
  ChevronRight,
  Trash2,
  ShoppingCart
} from 'lucide-react';

export const CustomerAccountView: React.FC = () => {
  const {
    orders,
    favorites,
    products,
    cancelOrder,
    addToCart,
    toggleFavorite,
    currentUser,
    setActiveView,
    selectedRegion,
    language,
    t
  } = useMarketplace();

  const hubInfo = getRegionalHubInfo(selectedRegion);

  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'addresses' | 'profile'>('orders');

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  // Status step index helper
  const getStatusStep = (status: OrderStatus): number => {
    switch (status) {
      case 'pending': return 1;
      case 'confirmed': return 2;
      case 'preparing': return 3;
      case 'dispatched': return 4;
      case 'delivered': return 5;
      case 'cancelled': return 0;
      default: return 1;
    }
  };

  const statusSteps = [
    { label: 'Kutilmoqda', desc: 'Qabul qilindi' },
    { label: 'Tasdiqlandi', desc: 'Sotuvchi tasdiqladi' },
    { label: 'Tayyorlanmoqda', desc: 'Omborda yuklanmoqda' },
    { label: 'Yo‘lda', desc: 'Haydovchi ob\'ektga bormoqda' },
    { label: 'Yetkazildi', desc: 'Qabul qilindi' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16">
      {/* Account Header */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#173B32] text-white flex items-center justify-center font-bold text-xl font-heading shadow-xs">
            {currentUser.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-heading text-neutral-900">
                {currentUser.fullName}
              </h1>
              <span className="bg-neutral-100 text-neutral-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {currentUser.role === 'customer' ? 'Xaridor' : currentUser.role}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {currentUser.phone} · {currentUser.email || 'Profil faol'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-neutral-400 block uppercase">Jami buyurtmalar:</span>
            <span className="text-base font-bold text-[#173B32]">{orders.length} ta</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#173B32] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Buyurtmalarim ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'favorites'
              ? 'bg-[#173B32] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Sevimlilar ({favorites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'addresses'
              ? 'bg-[#173B32] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saqlangan manzillar</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#173B32] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profil sozlamalari</span>
        </button>
      </div>

      {/* TAB 1: BUYURTMALARIM (ORDERS WITH STATUS STEPPER) */}
      {activeTab === 'orders' && (
        <div className="pt-6 space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-neutral-900 mb-1">Buyurtmalar mavjud emas</h3>
              <p className="text-xs text-neutral-500 mb-4">Katalogdan kerakli materiallarni tanlang</p>
              <button
                onClick={() => setActiveView('catalog')}
                className="px-4 py-2 bg-[#173B32] text-white font-bold text-xs rounded-xl"
              >
                Katalogga o'tish
              </button>
            </div>
          ) : (
            orders.map(order => {
              const currentStep = getStatusStep(order.status);
              const isCancelled = order.status === 'cancelled';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs space-y-6"
                >
                  {/* Order Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 text-xs">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-extrabold text-neutral-900 font-mono text-sm">
                          {order.trackingCode}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isCancelled
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-neutral-400 text-[11px] mt-1">
                        Rasmiylashtirilgan vaqt: {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-extrabold text-[#173B32] text-base">
                          {formatPrice(order.total)}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {order.deliveryType === 'delivery' ? 'Yetkazib berish bilan' : 'Ombordan olib ketish'}
                        </div>
                      </div>

                      {order.status === 'pending' && (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold"
                        >
                          Bekor qilish
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tracking Stepper Timeline */}
                  {!isCancelled && (
                    <div className="py-2">
                      <div className="text-xs font-bold text-neutral-800 mb-3 uppercase tracking-wider">
                        Kuzatuv holati:
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-center text-xs">
                        {statusSteps.map((step, idx) => {
                          const stepNumber = idx + 1;
                          const isDone = currentStep >= stepNumber;
                          const isCurrent = currentStep === stepNumber;

                          return (
                            <div key={idx} className="space-y-1.5">
                              <div
                                className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs transition-colors ${
                                  isDone
                                    ? 'bg-[#173B32] text-white shadow-xs'
                                    : 'bg-neutral-100 text-neutral-400'
                                } ${isCurrent ? 'ring-4 ring-emerald-100' : ''}`}
                              >
                                {isDone ? '✓' : stepNumber}
                              </div>
                              <div className={`font-bold ${isDone ? 'text-neutral-900' : 'text-neutral-400'}`}>
                                {step.label}
                              </div>
                              <div className="text-[10px] text-neutral-400 hidden sm:block">
                                {step.desc}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Items List */}
                  <div className="pt-4 border-t border-neutral-100 space-y-3">
                    <div className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Buyurtma tarkibi ({order.items.length} ta tovar):
                    </div>
                    <div className="divide-y divide-neutral-100 text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-10 h-10 rounded-lg object-cover border border-neutral-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-semibold text-neutral-900 truncate">{item.title}</div>
                              <div className="text-neutral-400 text-[11px]">
                                Sotuvchi: {item.sellerName}
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-bold text-neutral-900">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-[11px] text-neutral-500">
                              {item.quantity} {item.unit} × {formatPrice(item.price)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery details strip */}
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-neutral-600">
                    <div>
                      Manzil: <strong>{order.deliveryAddress.district}, {order.deliveryAddress.street}</strong>
                    </div>
                    <div>
                      To'lov turi: <strong className="uppercase">{order.paymentMethod}</strong>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: SEVIMLILAR (FAVORITES) */}
      {activeTab === 'favorites' && (
        <div className="pt-6">
          {favoriteProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center text-xs text-neutral-500">
              Sevimlilar ro‘yxatida hozircha hech narsa yo‘q
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteProducts.map(prod => (
                <div key={prod.id} className="bg-white p-4 rounded-2xl border border-neutral-200 flex flex-col justify-between">
                  <div className="flex gap-3">
                    <img src={prod.image} alt={prod.titleUz} className="w-16 h-16 rounded-xl object-cover border border-neutral-200 shrink-0" />
                    <div>
                      <h4 className="font-bold text-neutral-900 text-xs line-clamp-2">{prod.titleUz}</h4>
                      <div className="font-extrabold text-[#173B32] text-sm mt-1">{formatPrice(prod.price)} / {prod.unit}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-neutral-100">
                    <button
                      onClick={() => addToCart(prod, prod.minOrder || 1)}
                      className="flex-1 py-2 bg-[#173B32] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>Savatga</span>
                    </button>
                    <button
                      onClick={() => toggleFavorite(prod.id)}
                      className="p-2 border border-neutral-200 text-rose-600 rounded-xl hover:bg-rose-50"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="pt-6 space-y-4 max-w-xl text-xs">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <strong className="font-bold text-neutral-900">Qurilish ob'ekti #1 (Asosiy)</strong>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">STANDART</span>
            </div>
            <p className="text-neutral-600">
              Toshkent shahri, Yunusobod tumani, Amir Temur shoh ko'chasi 108
            </p>
            <div className="text-[11px] text-neutral-400">Mo'ljal: Shahriston metrosi</div>
          </div>
        </div>
      )}

      {/* TAB 4: PROFILE SETTINGS */}
      {activeTab === 'profile' && (
        <div className="pt-6 max-w-xl space-y-4 text-xs">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-3">
            <h3 className="font-bold text-neutral-900 text-sm">Shaxsiy ma'lumotlar</h3>
            <div>
              <label className="block text-neutral-500 mb-1">F.I.Sh.</label>
              <input type="text" defaultValue={currentUser.fullName} className="w-full p-2.5 rounded-xl border border-neutral-200 bg-neutral-50" disabled />
            </div>
            <div>
              <label className="block text-neutral-500 mb-1">Telefon raqam</label>
              <input type="text" defaultValue={currentUser.phone} className="w-full p-2.5 rounded-xl border border-neutral-200 bg-neutral-50" disabled />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
