import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPrice, UZBEKISTAN_REGIONS, getDistrictsForRegion, getRegionalHubInfo } from '../utils/translations';
import { DeliveryVehicle, PaymentMethod } from '../types';
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  Truck,
  Building,
  CheckCircle2,
  CreditCard,
  Banknote,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowLeft,
  Phone
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    cartTotal,
    cartCount,
    updateCartQty,
    removeFromCart,
    clearCart,
    setActiveView,
    language,
    t
  } = useMarketplace();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold font-heading text-neutral-900 mb-1">
          {t.emptyCart}
        </h2>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
          {t.emptyCartText}
        </p>
        <button
          onClick={() => setActiveView('catalog')}
          className="px-6 py-3 rounded-xl bg-[#173B32] text-white font-bold text-xs hover:bg-[#235246] transition-colors cursor-pointer"
        >
          {t.heroCtaCatalog}
        </button>
      </div>
    );
  }

  // Group cart items by seller
  const itemsBySeller: Record<string, typeof cart> = {};
  cart.forEach(item => {
    const sId = item.product.sellerId;
    if (!itemsBySeller[sId]) itemsBySeller[sId] = [];
    itemsBySeller[sId].push(item);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16">
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[#173B32]">
            {t.cartTitle} ({cartCount} {language === 'uz' ? 'ta tovar' : 'товаров'})
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Materiallar dilerlar bo‘yicha ajratilgan
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-neutral-400 hover:text-rose-600 transition-colors"
        >
          Savatchani tozalash
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-6">
          {Object.entries(itemsBySeller).map(([sellerId, items]) => {
            const sellerName = items[0].product.sellerName;
            const sellerSubtotal = items.reduce((s, i) => s + i.activePrice * i.quantity, 0);

            return (
              <div
                key={sellerId}
                className="bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-xs"
              >
                {/* Seller Group Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400">{t.seller}:</span>
                    <strong className="text-neutral-900 font-bold">{sellerName}</strong>
                  </div>
                  <span className="font-semibold text-[#173B32]">
                    Jami: {formatPrice(sellerSubtotal)}
                  </span>
                </div>

                {/* Items in seller */}
                <div className="divide-y divide-neutral-100">
                  {items.map(item => (
                    <div key={item.product.id} className="py-4 flex gap-4 items-center text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.titleUz}
                        className="w-16 h-16 rounded-xl object-cover border border-neutral-200 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-neutral-900 truncate">
                          {language === 'uz' ? item.product.titleUz : item.product.titleRu}
                        </h4>
                        <div className="text-neutral-500 text-[11px] mt-0.5">
                          {item.product.brand} · {formatPrice(item.activePrice)} / {item.product.unit}
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                            <button
                              onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-200 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 font-bold text-neutral-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-200 font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-neutral-500 text-[11px]">{item.product.unit}</span>
                        </div>
                      </div>

                      {/* Total and delete */}
                      <div className="text-right shrink-0">
                        <div className="font-extrabold text-[#173B32] text-sm">
                          {formatPrice(item.activePrice * item.quantity)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="mt-2 p-1 text-neutral-400 hover:text-rose-600 transition-colors"
                          title="O‘chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 sticky top-24 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-bold text-neutral-900 font-heading">
              {t.orderSummary}
            </h3>

            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <div className="flex justify-between text-neutral-600">
                <span>{t.itemsTotal}:</span>
                <span className="font-semibold text-neutral-900">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Katta xarid chegirmasi:</span>
                <span className="font-semibold text-emerald-700">
                  {cartTotal > 3000000 ? `-${formatPrice(Math.round(cartTotal * 0.03))}` : '0 so‘m'}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Yetkazib berish:</span>
                <span className="text-neutral-400">Keyingi bosqichda</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-neutral-900">{t.grandTotal}:</span>
              <span className="text-xl font-extrabold text-[#173B32]">
                {formatPrice(cartTotal > 3000000 ? Math.round(cartTotal * 0.97) : cartTotal)}
              </span>
            </div>

            <button
              onClick={() => setActiveView('checkout')}
              className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>{t.checkout}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartTotal,
    createOrder,
    setActiveView,
    selectedRegion,
    addToast,
    language,
    t
  } = useMarketplace();

  const [checkoutRegion, setCheckoutRegion] = useState<string>(
    selectedRegion && selectedRegion !== 'Barcha viloyatlar' ? selectedRegion : 'Namangan viloyati'
  );
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryVehicle, setDeliveryVehicle] = useState<DeliveryVehicle>('gazel');
  const [district, setDistrict] = useState<string>('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [fullName, setFullName] = useState('Akmal Rahimov');
  const [phone, setPhone] = useState('+998 90 123-45-67');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available districts for the chosen region
  const availableDistricts = getDistrictsForRegion(checkoutRegion);

  React.useEffect(() => {
    if (selectedRegion && selectedRegion !== 'Barcha viloyatlar') {
      setCheckoutRegion(selectedRegion);
    }
  }, [selectedRegion]);

  const hubInfo = getRegionalHubInfo(checkoutRegion);

  // Auto-set first district when region changes
  React.useEffect(() => {
    if (!district || !availableDistricts.includes(district)) {
      setDistrict(availableDistricts[0] || '');
    }
  }, [checkoutRegion]);

  // Delivery fee calculation
  const deliveryFees: Record<DeliveryVehicle, number> = {
    labo: 90000,
    gazel: 160000,
    isuzu: 250000,
    fura: 650000
  };

  const deliveryFee = deliveryType === 'delivery' ? deliveryFees[deliveryVehicle] : 0;
  const discount = cartTotal > 3000000 ? Math.round(cartTotal * 0.03) : 0;
  const grandTotal = cartTotal + deliveryFee - discount;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!street && deliveryType === 'delivery') {
      addToast('error', 'Manzil kiritilmadi', 'Iltimos, yetkazib berish manzilini kiriting');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = createOrder({
        deliveryType,
        deliveryVehicle: deliveryType === 'delivery' ? deliveryVehicle : undefined,
        deliveryAddress: {
          region: checkoutRegion,
          district: district || availableDistricts[0] || checkoutRegion,
          street: street || 'Ombordan olib ketiladi',
          landmark
        },
        customerName: fullName,
        customerPhone: phone,
        customerNote: note,
        paymentMethod
      });
      setIsSubmitting(false);
      setActiveView('account');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16">
      <button
        onClick={() => setActiveView('cart')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#173B32] mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Savatchaga qaytish</span>
      </button>

      <h1 className="text-2xl font-bold font-heading text-[#173B32] mb-6">
        {t.checkout}
      </h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="md:col-span-7 space-y-6">
          {/* 1. Delivery or Pickup Choice */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
              1. {t.deliveryMethod}
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  deliveryType === 'delivery'
                    ? 'border-[#173B32] bg-emerald-50 text-[#173B32] font-bold ring-1 ring-[#173B32]'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Truck className="w-4 h-4 mb-1" />
                <div>Ob'ektgacha yetkazish</div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  deliveryType === 'pickup'
                    ? 'border-[#173B32] bg-emerald-50 text-[#173B32] font-bold ring-1 ring-[#173B32]'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Building className="w-4 h-4 mb-1" />
                <div>Ombordan o‘zi olib ketish</div>
              </button>
            </div>

            {/* Vehicle Selection if delivery */}
            {deliveryType === 'delivery' && (
              <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs">
                <label className="font-semibold text-neutral-700 block">
                  Yuk transporti turi (Tonna va hajm bo‘yicha):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'labo', name: 'Damas / Labo (1t gacha)', fee: 90000 },
                    { id: 'gazel', name: 'Gazel (2t gacha)', fee: 160000 },
                    { id: 'isuzu', name: 'Isuzu (5t gacha)', fee: 250000 },
                    { id: 'fura', name: 'Kamaz / Fura (20t)', fee: 650000 },
                  ].map(v => (
                    <button
                      type="button"
                      key={v.id}
                      onClick={() => setDeliveryVehicle(v.id as any)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        deliveryVehicle === v.id
                          ? 'border-[#173B32] bg-white font-bold text-[#173B32] shadow-xs'
                          : 'border-neutral-200 text-neutral-600'
                      }`}
                    >
                      <div className="truncate">{v.name}</div>
                      <div className="text-[11px] text-neutral-500 font-normal mt-0.5">
                        +{formatPrice(v.fee)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pickup terminal display if pickup chosen */}
            {deliveryType === 'pickup' && (
              <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/90 text-emerald-950 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#173B32]">
                    <MapPin className="w-4 h-4 text-[#F59E0B]" />
                    <span>{hubInfo.hubName}</span>
                  </div>
                  <div className="text-neutral-700 font-medium">{hubInfo.hubAddress}</div>
                  <div className="text-[11px] text-neutral-600">
                    Olib ketish rampasi: <strong>{hubInfo.pickupWarehouse}</strong>
                  </div>
                  <div className="text-[11px] text-emerald-800 font-semibold pt-1 border-t border-emerald-200/80 flex items-center justify-between">
                    <span>{hubInfo.workingHours}</span>
                    <a href="tel:+998200205068" className="hover:underline flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#F59E0B]" />
                      <span>20 020 50 68</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Address & Recipient */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-neutral-800 uppercase tracking-wider">
              2. {deliveryType === 'delivery' ? t.addressInfo : t.contactInfo}
            </h3>

            {deliveryType === 'delivery' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Viloyat / Shahar *</label>
                    <select
                      value={checkoutRegion}
                      onChange={e => setCheckoutRegion(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32] font-medium"
                    >
                      {UZBEKISTAN_REGIONS.map(reg => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Tuman / Shahar *</label>
                    <select
                      value={district}
                      onChange={e => setDistrict(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32] font-medium"
                    >
                      {availableDistricts.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Ko‘cha va ob'ekt manzili *</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    placeholder="Masalan: Bunyodkor shoh ko'chasi 42-uy, qurilish maydoni"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Mo'ljal (Orientir)</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={e => setLandmark(e.target.value)}
                    placeholder="Masalan: Mirzo Ulug'bek metrosi yonida"
                    className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Qabul qiluvchi F.I.Sh. *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Telefon raqam *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Haydovchiga izoh (ixtiyoriy)</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Darvoza kodi, tushirish joyi yoki kran haqida ma'lumot..."
                className="w-full p-2 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32] h-16"
              />
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-neutral-800 uppercase tracking-wider">
              3. {t.paymentMethod}
            </h3>

            <div className="space-y-2">
              {[
                { id: 'cash', label: 'Naqd pul (Yukni qabul qilib olganda to‘lash)', sub: 'Kafolatlangan xavfsiz to‘lov' },
                { id: 'click', label: 'Click orqali to‘lov', sub: 'Click Up ilovasi orqali to‘g‘ridan-to‘g‘ri' },
                { id: 'payme', label: 'Payme orqali to‘lov', sub: '0% komissiya bilan' },
                { id: 'uzumbank', label: 'Uzum Bank orqali to‘lov', sub: 'Tezkor cashback bilan' },
                { id: 'b2b_contract', label: 'Yuridik shaxs shartnomasi (Hisob-faktura)', sub: 'QQS bilan to‘lov (Didox orqali elektron hujjat)' }
              ].map(pm => (
                <label
                  key={pm.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === pm.id
                      ? 'border-[#173B32] bg-emerald-50 text-neutral-900 font-semibold'
                      : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === pm.id}
                    onChange={() => setPaymentMethod(pm.id as any)}
                    className="mt-0.5 accent-[#173B32]"
                  />
                  <div>
                    <div>{pm.label}</div>
                    <div className="text-[11px] text-neutral-400 font-normal">{pm.sub}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="md:col-span-5">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs sticky top-24 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-neutral-900 font-heading">
              Buyurtma hisob-kitobi
            </h3>

            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <div className="flex justify-between text-neutral-600">
                <span>{t.itemsTotal}:</span>
                <span className="font-semibold text-neutral-900">{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Yetkazib berish ({deliveryType === 'delivery' ? deliveryVehicle : 'Ombordan'}):</span>
                <span className="font-semibold text-neutral-900">{formatPrice(deliveryFee)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Hajm chegirmasi:</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-neutral-900">{t.grandTotal}:</span>
              <span className="text-xl font-extrabold text-[#173B32]">
                {formatPrice(grandTotal)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#173B32] hover:bg-[#235246] disabled:bg-neutral-300 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>{isSubmitting ? 'Rasmiylashtirilmoqda...' : t.confirmOrder}</span>
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
            </button>

            <div className="text-[11px] text-neutral-400 text-center leading-relaxed">
              Buyurtmani tasdiqlash orqali siz xarid va yetkazib berish shartlariga rozilik bildirasiz.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
