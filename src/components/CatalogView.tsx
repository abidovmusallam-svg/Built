import React, { useState, useMemo, useEffect } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from './ProductCard';
import { formatPrice, UZBEKISTAN_REGIONS, ALL_REGIONS_LABEL } from '../utils/translations';
import {
  SlidersHorizontal,
  X,
  MapPin,
  Globe,
  Grid,
  List
} from 'lucide-react';

export const CatalogView: React.FC = () => {
  const {
    products,
    categories,
    sellers,
    selectedCategoryId,
    setSelectedCategoryId,
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    language,
    t
  } = useMarketplace();

  // Filter states
  const [regionFilter, setRegionFilter] = useState<string>(() => {
    return selectedRegion && selectedRegion !== ALL_REGIONS_LABEL ? selectedRegion : 'all';
  });
  const [selectedSellerId, setSelectedSellerId] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyWholesale, setOnlyWholesale] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync regionFilter when context selectedRegion changes
  useEffect(() => {
    if (selectedRegion && selectedRegion !== ALL_REGIONS_LABEL) {
      setRegionFilter(selectedRegion);
    } else {
      setRegionFilter('all');
    }
  }, [selectedRegion]);

  // Unique brands
  const brands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
  }, [products]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Search
        if (searchTerm.trim()) {
          const s = searchTerm.toLowerCase();
          const matchTitle =
            p.titleUz.toLowerCase().includes(s) ||
            p.titleRu.toLowerCase().includes(s) ||
            p.brand.toLowerCase().includes(s);
          if (!matchTitle) return false;
        }

        // Region Filter
        if (regionFilter !== 'all') {
          const seller = sellers.find(s => s.id === p.sellerId);
          const matchSeller = seller && (
            seller.region === regionFilter ||
            seller.region.toLowerCase().includes(regionFilter.toLowerCase()) ||
            seller.address.toLowerCase().includes(regionFilter.toLowerCase())
          );
          const matchLocation = p.sellerLocation && p.sellerLocation.toLowerCase().includes(regionFilter.toLowerCase());
          if (!matchSeller && !matchLocation) {
            return false;
          }
        }

        // Category
        if (selectedCategoryId && p.categoryId !== selectedCategoryId) {
          return false;
        }

        // Seller
        if (selectedSellerId !== 'all' && p.sellerId !== selectedSellerId) {
          return false;
        }

        // Brand
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
          return false;
        }

        // Price
        if (p.price < minPrice || p.price > maxPrice) {
          return false;
        }

        // In-stock
        if (onlyInStock && !p.inStock) {
          return false;
        }

        // Wholesale
        if (onlyWholesale && !p.isWholesale) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        // default: popular (reviews count)
        return b.reviewsCount - a.reviewsCount;
      });
  }, [
    products,
    searchTerm,
    regionFilter,
    selectedCategoryId,
    selectedSellerId,
    selectedBrand,
    minPrice,
    maxPrice,
    onlyInStock,
    onlyWholesale,
    sortBy,
    sellers
  ]);

  const clearAllFilters = () => {
    setSelectedCategoryId(null);
    setSelectedSellerId('all');
    setSelectedBrand('all');
    setRegionFilter('all');
    setSelectedRegion(ALL_REGIONS_LABEL);
    setMinPrice(0);
    setMaxPrice(5000000);
    setOnlyInStock(false);
    setOnlyWholesale(false);
    setSearchTerm('');
  };

  const hasActiveFilters =
    Boolean(selectedCategoryId) ||
    selectedSellerId !== 'all' ||
    selectedBrand !== 'all' ||
    regionFilter !== 'all' ||
    minPrice > 0 ||
    maxPrice < 5000000 ||
    onlyInStock ||
    onlyWholesale ||
    Boolean(searchTerm);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Catalog Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
            <span className="flex items-center gap-1 font-semibold text-[#173B32]">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{regionFilter === 'all' ? "O'zbekiston bo'ylab (14 ta viloyat)" : regionFilter}</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#173B32] font-heading">
            {selectedCategoryId
              ? categories.find(c => c.id === selectedCategoryId)?.[language === 'uz' ? 'nameUz' : 'nameRu']
              : language === 'uz' ? 'Qurilish Mollari Katalogi' : 'Каталог Строительных Материалов'}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Topildi: <strong className="text-neutral-900 font-bold">{filteredProducts.length}</strong> ta material
          </p>
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs font-bold text-neutral-800 shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#173B32]" />
            <span>Filtrlar</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
            )}
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 hidden sm:inline">{t.sortBy}:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 outline-none focus:border-[#173B32]"
            >
              <option value="popular">{t.sortPopular}</option>
              <option value="price-asc">{t.sortPriceAsc}</option>
              <option value="price-desc">{t.sortPriceDesc}</option>
              <option value="rating">{t.sortRating}</option>
              <option value="newest">{t.sortNew}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 py-3 border-b border-neutral-100 text-xs">
          <span className="text-neutral-400">Faol filtrlar:</span>
          {regionFilter !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/60">
              <MapPin className="w-3.5 h-3.5 text-[#173B32]" />
              <span>{regionFilter}</span>
              <button
                onClick={() => {
                  setRegionFilter('all');
                  setSelectedRegion(ALL_REGIONS_LABEL);
                }}
                className="hover:text-rose-600 font-bold ml-0.5 cursor-pointer"
              >
                ×
              </button>
            </span>
          )}
          {selectedCategoryId && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700">
              <span>{categories.find(c => c.id === selectedCategoryId)?.nameUz}</span>
              <button onClick={() => setSelectedCategoryId(null)} className="hover:text-rose-600 font-bold ml-0.5 cursor-pointer">×</button>
            </span>
          )}
          {selectedSellerId !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700">
              <span>{sellers.find(s => s.id === selectedSellerId)?.storeName}</span>
              <button onClick={() => setSelectedSellerId('all')} className="hover:text-rose-600 font-bold ml-0.5 cursor-pointer">×</button>
            </span>
          )}
          {selectedBrand !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700">
              <span>Brend: {selectedBrand}</span>
              <button onClick={() => setSelectedBrand('all')} className="hover:text-rose-600 font-bold ml-0.5 cursor-pointer">×</button>
            </span>
          )}
          {onlyInStock && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800">
              <span>Faqat omborda bor</span>
              <button onClick={() => setOnlyInStock(false)} className="hover:text-rose-600 font-bold ml-0.5 cursor-pointer">×</button>
            </span>
          )}
          {onlyWholesale && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800">
              <span>Ulgurji narxlilar</span>
              <button onClick={() => setOnlyWholesale(false)} className="hover:text-rose-600 font-bold ml-0.5 cursor-pointer">×</button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-rose-600 font-semibold hover:underline ml-1 cursor-pointer"
          >
            {t.clearFilters}
          </button>
        </div>
      )}

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
        {/* Left Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block space-y-6 bg-white p-5 rounded-2xl border border-neutral-200/90 h-fit shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="text-sm font-bold text-neutral-900 font-heading flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#173B32]" />
              <span>{t.filterTitle}</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
              >
                {t.clearFilters}
              </button>
            )}
          </div>

          {/* Region / Viloyat Filter (Requirement: All 14 regions of Uzbekistan) */}
          <div>
            <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Viloyat / Hudud</span>
              </span>
              {regionFilter !== 'all' && (
                <button
                  onClick={() => {
                    setRegionFilter('all');
                    setSelectedRegion(ALL_REGIONS_LABEL);
                  }}
                  className="text-[10px] text-neutral-400 hover:text-rose-600 lowercase cursor-pointer"
                >
                  tozalash
                </button>
              )}
            </h4>
            <select
              value={regionFilter}
              onChange={e => {
                const val = e.target.value;
                setRegionFilter(val);
                if (val !== 'all') {
                  setSelectedRegion(val);
                } else {
                  setSelectedRegion(ALL_REGIONS_LABEL);
                }
              }}
              className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 outline-none focus:border-[#173B32] bg-white cursor-pointer"
            >
              <option value="all">🌐 Barcha viloyatlar (Butun O'zbekiston)</option>
              {UZBEKISTAN_REGIONS.map(reg => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
            <p className="text-[10px] text-neutral-400 mt-1.5">
              {regionFilter === 'all'
                ? "14 ta viloyatdagi barcha rasmiy dilerlar ombori"
                : `${regionFilter}dagi rasmiy dilerlar va materiallar`}
            </p>
          </div>

          {/* Categories Accordion */}
          <div className="pt-4 border-t border-neutral-100">
            <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2.5">
              {t.categories}
            </h4>
            <div className="space-y-1 max-h-56 overflow-y-auto text-xs pr-1">
              <button
                onClick={() => setSelectedCategoryId(null)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  !selectedCategoryId
                    ? 'font-bold text-[#173B32] bg-emerald-50'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <span>{t.allCategories}</span>
                <span className="text-neutral-400">{products.length}</span>
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                    selectedCategoryId === cat.id
                      ? 'font-bold text-[#173B32] bg-emerald-50'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <span className="truncate">{cat.nameUz}</span>
                  <span className="text-neutral-400">{cat.itemCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider & Inputs */}
          <div className="pt-4 border-t border-neutral-100">
            <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2.5">
              {t.priceRange}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <label className="text-[10px] text-neutral-400">Dan (so‘m)</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={e => setMinPrice(Number(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-neutral-200 text-xs font-medium"
                />
              </div>
              <div>
                <label className="text-[10px] text-neutral-400">Gacha (so‘m)</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value) || 5000000)}
                  className="w-full p-2 rounded-lg border border-neutral-200 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          {/* Sellers Filter */}
          <div className="pt-4 border-t border-neutral-100">
            <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2.5">
              Sotuvchi Do‘kon
            </h4>
            <select
              value={selectedSellerId}
              onChange={e => setSelectedSellerId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 outline-none cursor-pointer"
            >
              <option value="all">Barcha sotuvchilar ({sellers.length} ta)</option>
              {sellers.map(s => (
                <option key={s.id} value={s.id}>
                  {s.storeName} ({s.region})
                </option>
              ))}
            </select>
          </div>

          {/* Brands Filter */}
          {brands.length > 0 && (
            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2.5">
                {t.brands}
              </h4>
              <select
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 outline-none cursor-pointer"
              >
                <option value="all">Barcha brendlar</option>
                {brands.map(b => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Toggles */}
          <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={e => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 accent-[#173B32]"
              />
              <span className="font-medium text-neutral-700">{t.onlyInStock}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyWholesale}
                onChange={e => setOnlyWholesale(e.target.checked)}
                className="w-4 h-4 accent-[#173B32]"
              />
              <span className="font-medium text-neutral-700">{t.onlyWholesale}</span>
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center shadow-xs">
              <div className="text-neutral-400 text-4xl mb-3">🔍</div>
              <h4 className="text-base font-bold text-neutral-900 mb-1">
                Materiallar topilmadi
              </h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-4 leading-relaxed">
                {regionFilter !== 'all'
                  ? `${regionFilter} bo'yicha materiallar topilmadi. Barcha viloyatlarni tanlab ko'ring.`
                  : "Tanlangan filtrlar bo‘yicha tovar mavjud emas. Filtrlarni tozalab ko‘ring."}
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2.5 rounded-xl bg-[#173B32] text-white font-bold text-xs cursor-pointer"
              >
                Filtrlarni tozalash (Barcha viloyatlar)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-5 overflow-y-auto space-y-5 animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#173B32]" />
                <span>Katalog Filtrlari</span>
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Region in Mobile Drawer */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Viloyat / Hudud
              </label>
              <select
                value={regionFilter}
                onChange={e => {
                  const val = e.target.value;
                  setRegionFilter(val);
                  if (val !== 'all') setSelectedRegion(val);
                  else setSelectedRegion(ALL_REGIONS_LABEL);
                }}
                className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-800"
              >
                <option value="all">🌐 Barcha viloyatlar</option>
                {UZBEKISTAN_REGIONS.map(reg => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>

            {/* Category in Mobile Drawer */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Toifa
              </label>
              <select
                value={selectedCategoryId || ''}
                onChange={e => setSelectedCategoryId(e.target.value || null)}
                className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-800"
              >
                <option value="">Barcha toifalar</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nameUz}</option>
                ))}
              </select>
            </div>

            {/* Seller in Mobile Drawer */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Sotuvchi Do‘kon
              </label>
              <select
                value={selectedSellerId}
                onChange={e => setSelectedSellerId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs text-neutral-800"
              >
                <option value="all">Barcha sotuvchilar</option>
                {sellers.map(s => (
                  <option key={s.id} value={s.id}>{s.storeName} ({s.region})</option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2 border-t border-neutral-100 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 accent-[#173B32]"
                />
                <span className="font-semibold text-neutral-800">Faqat omborda bor</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyWholesale}
                  onChange={e => setOnlyWholesale(e.target.checked)}
                  className="w-4 h-4 accent-[#173B32]"
                />
                <span className="font-semibold text-neutral-800">Ulgurji narxlilar</span>
              </label>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 font-bold text-xs"
              >
                Tozalash
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#173B32] text-white font-bold text-xs"
              >
                Ko‘rish ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
