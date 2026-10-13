import React from 'react';
import { Product } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPrice } from '../utils/translations';
import { Heart, ShoppingCart, Star, CheckCircle, Truck, Package, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    language,
    t,
    addToCart,
    toggleFavorite,
    isFavorite,
    openProductDetail
  } = useMarketplace();

  const title = language === 'uz' ? product.titleUz : product.titleRu;
  const isFav = isFavorite(product.id);

  // Lowest wholesale price if available
  const lowestWholesalePrice = product.wholesaleTiers && product.wholesaleTiers.length > 0
    ? Math.min(...product.wholesaleTiers.map(tier => tier.discountPrice))
    : null;

  return (
    <div className="group bg-white rounded-2xl border border-neutral-200/80 hover:border-[#173B32]/30 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden relative">
      {/* Top Image area */}
      <div className="relative aspect-4/3 bg-neutral-100 overflow-hidden cursor-pointer" onClick={() => openProductDetail(product.id)}>
        <img
          src={product.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite heart button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFav
              ? 'bg-rose-50 text-rose-600 shadow-xs'
              : 'bg-white/90 text-neutral-600 hover:text-rose-600 hover:bg-white shadow-xs'
          }`}
          title="Sevimlilarga qo'shish"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Discount tag (subtle, clean) */}
        {product.discountPercent && product.discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-[#F59E0B] text-[#173B32] font-black text-[11px] px-2 py-0.5 rounded-md shadow-xs">
            -{product.discountPercent}%
          </div>
        )}

        {/* Stock status overlay banner if low or out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-semibold">
            {t.outOfStock}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Brand & Stock (Unboxed, clean typographic separators - Anti-pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1.5">
            <span className="font-semibold text-neutral-700">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
              {t.inStock}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openProductDetail(product.id)}
            className="text-sm font-semibold text-neutral-900 line-clamp-2 hover:text-[#173B32] cursor-pointer transition-colors leading-snug"
            title={title}
          >
            {title}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-neutral-600">
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-neutral-900">{product.rating.toFixed(1)}</span>
            </div>
            <span aria-hidden="true" className="text-neutral-300">·</span>
            <span className="text-neutral-500">
              {product.reviewsCount} {language === 'uz' ? 'ta sharh' : 'отзывов'}
            </span>
          </div>

          {/* Seller line with verification and regional location */}
          <div className="mt-2 pt-2 border-t border-neutral-100 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-neutral-500">
              <span className="truncate flex items-center gap-1">
                <span className="text-neutral-400">{t.seller}:</span>
                <span className="font-medium text-neutral-800 truncate">{product.sellerName}</span>
              </span>
              <span title="Tasdiqlangan diler">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </span>
            </div>
            {product.sellerLocation && (
              <div className="flex items-center gap-1 text-[10px] text-neutral-500 truncate">
                <MapPin className="w-3 h-3 text-[#F59E0B] shrink-0" />
                <span className="truncate">{product.sellerLocation}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="mt-4 pt-3 border-t border-neutral-100">
          <div className="flex items-baseline justify-between gap-1 mb-1">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-[#173B32]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-neutral-500 font-normal">
                  / {product.unit}
                </span>
              </div>
              {product.oldPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Minimum order indicator */}
            {product.minOrder > 1 && (
              <span className="text-[11px] text-neutral-500 text-right">
                Min. {product.minOrder} {product.unit}
              </span>
            )}
          </div>

          {/* Wholesale highlight */}
          {lowestWholesalePrice && (
            <div className="text-[11px] text-emerald-800 font-medium mb-3 bg-emerald-50/60 rounded px-1.5 py-0.5">
              Ulgurji: {formatPrice(lowestWholesalePrice)} dan
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, product.minOrder || 1)}
            disabled={!product.inStock}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#173B32] hover:bg-[#235246] disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs active:scale-98"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{t.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
