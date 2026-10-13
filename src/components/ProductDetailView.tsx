import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPrice, UZBEKISTAN_REGIONS, getRegionalHubInfo } from '../utils/translations';
import {
  Star,
  CheckCircle,
  Truck,
  ShieldCheck,
  Heart,
  ShoppingCart,
  MapPin,
  Phone,
  ArrowLeft,
  Share2,
  Package,
  Calculator,
  MessageSquare
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProductId,
    products,
    sellers,
    reviews,
    addToCart,
    toggleFavorite,
    isFavorite,
    addReview,
    setActiveView,
    selectedRegion,
    language,
    t
  } = useMarketplace();

  const product = products.find(p => p.id === selectedProductId) || products[0];
  const seller = sellers.find(s => s.id === product?.sellerId) || sellers[0];
  const prodReviews = reviews.filter(r => r.productId === product?.id);

  const [quantity, setQuantity] = useState<number>(product ? product.minOrder || 1 : 1);
  const [selectedImage, setSelectedImage] = useState<string>(product?.image || '');
  const [selectedVehicle, setSelectedVehicle] = useState<'labo' | 'gazel' | 'isuzu' | 'fura' | 'pickup'>('labo');
  const [destinationRegion, setDestinationRegion] = useState<string>(() => {
    return selectedRegion && selectedRegion !== 'Barcha viloyatlar' ? selectedRegion : 'Namangan viloyati';
  });

  useEffect(() => {
    if (selectedRegion && selectedRegion !== 'Barcha viloyatlar') {
      setDestinationRegion(selectedRegion);
    }
  }, [selectedRegion]);

  const hubInfo = getRegionalHubInfo(destinationRegion);

  // Review form state
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-500 mb-4">Mahsulot topilmadi</p>
        <button
          onClick={() => setActiveView('catalog')}
          className="px-4 py-2 bg-[#173B32] text-white rounded-xl text-xs font-semibold"
        >
          Katalogga qaytish
        </button>
      </div>
    );
  }

  const isFav = isFavorite(product.id);
  const title = language === 'uz' ? product.titleUz : product.titleRu;
  const description = language === 'uz' ? product.descriptionUz : product.descriptionRu;

  // Dynamic wholesale tier pricing calculation
  let activeUnitPrice = product.price;
  if (product.wholesaleTiers && product.wholesaleTiers.length > 0) {
    const sorted = [...product.wholesaleTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sorted) {
      if (quantity >= tier.minQty) {
        activeUnitPrice = tier.discountPrice;
        break;
      }
    }
  }

  const totalPrice = activeUnitPrice * quantity;
  const regularTotal = product.price * quantity;
  const totalSavings = regularTotal - totalPrice;

  // Delivery fee estimation
  const vehicleFees = {
    labo: 90000,
    gazel: 160000,
    isuzu: 250000,
    fura: 650000,
    pickup: 0
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment || !newReviewAuthor) return;
    addReview(product.id, newReviewRating, newReviewComment, newReviewAuthor);
    setNewReviewComment('');
    setNewReviewAuthor('');
    setShowReviewForm(false);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActiveView('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-32 lg:pb-16">
      {/* Back button */}
      <button
        onClick={() => setActiveView('catalog')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#173B32] mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Katalogga qaytish</span>
      </button>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-sm">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 relative">
            <img
              src={selectedImage || product.image}
              alt={title}
              className="w-full h-full object-cover"
            />
            {product.discountPercent && (
              <span className="absolute top-3 left-3 bg-[#F59E0B] text-[#173B32] font-black text-xs px-2.5 py-1 rounded-md shadow-xs">
                -{product.discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    (selectedImage || product.image) === img
                      ? 'border-[#173B32] ring-2 ring-[#173B32]/10'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Seller Card */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Rasmiy Sotuvchi
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Tasdiqlangan
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={seller.logo}
                alt={seller.storeName}
                className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-neutral-900 truncate">
                  {seller.storeName}
                </h4>
                <div className="text-xs text-neutral-500 flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {seller.rating}
                  </span>
                  <span>·</span>
                  <span>{seller.totalSalesCount} ta savdo</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-neutral-600 space-y-1.5 pt-2 border-t border-neutral-200/80">
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200/60">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Ombor viloyati: {seller.region}</span>
              </div>
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="truncate">{seller.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{seller.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 pt-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Yetkazish: Butun O'zbekiston (14 ta viloyat) bo'ylab</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
              <span className="font-semibold text-neutral-800">{product.brand}</span>
              <span>·</span>
              <span className="text-emerald-700 font-medium">Omborda bor ({product.stock} {product.unit})</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 font-heading leading-snug">
              {title}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-2 mt-2 text-xs text-neutral-600">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span>·</span>
              <span>{prodReviews.length} ta sharh</span>
              <span>·</span>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-[#173B32] font-semibold hover:underline"
              >
                Fikr qoldirish
              </button>
            </div>
          </div>

          {/* Price and Wholesale tiers */}
          <div className="p-4 rounded-2xl bg-[#F8F9F6] border border-neutral-200/80 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-neutral-500">Narxi (1 {product.unit}):</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#173B32]">
                    {formatPrice(activeUnitPrice)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs text-neutral-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>

              {totalSavings > 0 && (
                <div className="text-right">
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Ulgurji tejov: {formatPrice(totalSavings)}
                  </span>
                </div>
              )}
            </div>

            {/* Wholesale tiers matrix */}
            {product.wholesaleTiers && product.wholesaleTiers.length > 0 && (
              <div className="pt-2 border-t border-neutral-200/80">
                <div className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Katta hajm uchun ulgurji narxlar:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {product.wholesaleTiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        quantity >= tier.minQty
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                          : 'bg-white border-neutral-200 text-neutral-600'
                      }`}
                    >
                      <div>{tier.minQty}+ {product.unit}</div>
                      <div className="text-[#173B32] font-extrabold mt-0.5">
                        {formatPrice(tier.discountPrice)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity Selector & Live Total */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-neutral-800">
              Miqdorni tanlang (Min. {product.minOrder} {product.unit}):
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-300 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(product.minOrder || 1, quantity - 1))}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 font-bold cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  min={product.minOrder || 1}
                  max={product.stock}
                  value={quantity}
                  onChange={e => setQuantity(Math.max(product.minOrder || 1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center font-bold text-xs text-neutral-900 outline-none"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                {product.unit}
              </span>

              <div className="ml-auto text-right">
                <span className="text-[10px] text-neutral-400 block uppercase">Jami summa:</span>
                <span className="text-lg font-bold text-[#173B32]">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => addToCart(product, quantity)}
              className="py-3 px-4 rounded-xl bg-[#173B32] hover:bg-[#235246] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-[#F59E0B]" />
              <span>Savatga qo‘shish</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="py-3 px-4 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              Hoziroq xarid qilish
            </button>
          </div>

          {/* Delivery Vehicle Selector & Logistics estimation across Uzbekistan */}
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#173B32]" />
                <span>Yetkazib berish transporti:</span>
              </h4>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-neutral-500">Manzil:</span>
                <select
                  value={destinationRegion}
                  onChange={e => setDestinationRegion(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-800 outline-none cursor-pointer"
                >
                  {UZBEKISTAN_REGIONS.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: 'labo', name: 'Labo (1t)', fee: 90000 },
                { id: 'gazel', name: 'Gazel (2t)', fee: 160000 },
                { id: 'isuzu', name: 'Isuzu (5t)', fee: 250000 },
                { id: 'fura', name: 'Fura (20t)', fee: 650000 },
              ].map(veh => (
                <button
                  key={veh.id}
                  onClick={() => setSelectedVehicle(veh.id as any)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedVehicle === veh.id
                      ? 'bg-emerald-50 border-[#173B32] text-[#173B32] font-bold'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="truncate">{veh.name}</div>
                  <div className="text-[11px] text-neutral-500 font-normal mt-0.5">
                    {formatPrice(veh.fee)}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-[11px] text-neutral-500 flex items-center justify-between pt-1">
              <span>{destinationRegion} ob'ektigacha yuk tushirish xizmati</span>
              <span className="text-emerald-700 font-bold">24 soat ichida yetkazish</span>
            </div>

            {/* Regional Terminal Information */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/90 text-[11px] text-neutral-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{hubInfo.hubName}</span>
              </div>
              <div className="text-neutral-500 pl-5">{hubInfo.hubAddress}</div>
              <div className="text-emerald-700 font-semibold pl-5">⚡ {hubInfo.deliveryRadiusNote}</div>
            </div>
          </div>

          {/* Technical Specifications Sheet */}
          <div className="pt-4 border-t border-neutral-200">
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-3">
              Texnik xususiyatlari:
            </h4>
            <div className="divide-y divide-neutral-100 text-xs">
              {product.specifications.map((spec, i) => (
                <div key={i} className="py-2 flex justify-between">
                  <span className="text-neutral-500">{spec.labelUz}</span>
                  <span className="font-semibold text-neutral-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t border-neutral-200">
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
              Mahsulot tavsifi:
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 font-heading">
              Mijozlar sharhlari ({prodReviews.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Qurilish ob'ektlarida sinovdan o‘tgan xaridorlar baholari
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-800"
          >
            Fikr bildirish
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Ismingiz / Kasbingiz</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={e => setNewReviewAuthor(e.target.value)}
                  placeholder="Masalan: Sardor (Prorab)"
                  className="w-full p-2.5 rounded-xl border border-neutral-300 bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Baho (1-5)</label>
                <select
                  value={newReviewRating}
                  onChange={e => setNewReviewRating(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-neutral-300 bg-white"
                >
                  <option value={5}>5 - A'lo sifat</option>
                  <option value={4}>4 - Yaxshi</option>
                  <option value={3}>3 - Qoniqarli</option>
                  <option value={2}>2 - Yomon</option>
                  <option value={1}>1 - Qoniqarsiz</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Fikringiz va tavsiyangiz</label>
              <textarea
                required
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                placeholder="Material sifati, yetkazib berish tezligi haqida yozing..."
                className="w-full p-2.5 rounded-xl border border-neutral-300 bg-white h-20"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-3 py-1.5 rounded-lg border border-neutral-300"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#173B32] text-white font-bold"
              >
                Yuborish
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="divide-y divide-neutral-100">
          {prodReviews.map(rev => (
            <div key={rev.id} className="py-4 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-900">{rev.userName}</span>
                  {rev.verifiedPurchase && (
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                      Tasdiqlangan xarid
                    </span>
                  )}
                </div>
                <span className="text-neutral-400">{rev.date}</span>
              </div>
              <div className="flex items-center text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-neutral-600 leading-relaxed pt-1">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Mobile Bottom Action Bar (Ultra responsive shopping experience) */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-neutral-400 block uppercase">Jami summa:</span>
          <span className="text-base font-extrabold text-[#173B32]">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => addToCart(product, quantity)}
            className="px-3 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-[#173B32] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Savatga</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors shadow-xs cursor-pointer"
          >
            Xarid qilish
          </button>
        </div>
      </div>
    </div>
  );
};
