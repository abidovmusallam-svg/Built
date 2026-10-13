import React, { useState, useRef, useEffect } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPrice, UZBEKISTAN_REGIONS, ALL_REGIONS_LABEL } from '../utils/translations';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  Globe,
  PhoneCall,
  Menu,
  X,
  Layers,
  ChevronDown,
  Building2,
  ShieldCheck,
  Smartphone,
  Store,
  Calculator,
  Home
} from 'lucide-react';
import { BuiltLogo } from './BuiltLogo';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    userRole,
    setUserRole,
    activeView,
    setActiveView,
    cartCount,
    cartTotal,
    favorites,
    categories,
    products,
    selectedRegion,
    setSelectedRegion,
    searchTerm,
    setSearchTerm,
    openCategory,
    openProductDetail
  } = useMarketplace();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setIsRegionDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for instant autocomplete search
  const searchSuggestions = searchTerm.trim()
    ? products
        .filter(p =>
          p.titleUz.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.titleRu.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    setActiveView('catalog');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/80 shadow-xs">
      {/* Top utility bar */}
      <div className="bg-[#173B32] text-neutral-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Region selector & Hotline */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative" ref={regionRef}>
              <button
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-0.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="font-medium text-white">{selectedRegion}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isRegionDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 bg-white text-[#202622] rounded-xl shadow-xl border border-neutral-200 py-2 w-64 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between border-b border-neutral-100">
                    <span>{t.selectRegion}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">14 ta viloyat</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1">
                    {/* All regions option */}
                    <button
                      onClick={() => {
                        setSelectedRegion(ALL_REGIONS_LABEL);
                        setIsRegionDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-neutral-100 transition-colors flex items-center justify-between ${
                        selectedRegion === ALL_REGIONS_LABEL ? 'font-bold text-[#173B32] bg-emerald-50' : 'text-neutral-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>{language === 'uz' ? "Barcha viloyatlar (Butun O'zbekiston)" : "Все регионы (Узбекистан)"}</span>
                      </span>
                      {selectedRegion === ALL_REGIONS_LABEL && <span className="text-[#173B32] font-bold">✓</span>}
                    </button>

                    <div className="my-1 border-t border-neutral-100"></div>

                    {UZBEKISTAN_REGIONS.map(reg => (
                      <button
                        key={reg}
                        onClick={() => {
                          setSelectedRegion(reg);
                          setIsRegionDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-100 transition-colors flex items-center justify-between ${
                          selectedRegion === reg ? 'font-bold text-[#173B32] bg-emerald-50' : 'text-neutral-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          <span>{reg}</span>
                        </span>
                        {selectedRegion === reg && <span className="text-[#173B32] font-bold">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#F59E0B]" />
              <a href="tel:+998200205068" className="hover:text-white transition-colors font-bold tracking-wide">
                20 020 50 68
              </a>
              <span className="text-neutral-400">·</span>
              <span className="text-neutral-300">Har kuni 08:00 – 21:00</span>
            </div>
          </div>

          {/* Right: Companion Mobile App, Role Switcher, Language */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Companion Mobile App toggle */}
            <button
              onClick={() => setActiveView('mobile-companion')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                activeView === 'mobile-companion'
                  ? 'bg-[#F59E0B] text-[#173B32] font-bold'
                  : 'bg-emerald-950/60 hover:bg-emerald-900 text-neutral-200'
              }`}
              title="Smartfon ilovasi simulyatori (React Native / Expo)"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="hidden sm:inline">Mobil Ilova</span>
            </button>

            {/* Role Switcher */}
            <div className="relative" ref={roleRef}>
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-900/60 hover:bg-emerald-900 text-xs text-white transition-colors cursor-pointer"
              >
                {userRole === 'admin' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                ) : userRole === 'seller' ? (
                  <Store className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <User className="w-3.5 h-3.5 text-neutral-300" />
                )}
                <span className="capitalize font-medium">
                  {userRole === 'customer'
                    ? t.customerRole
                    : userRole === 'seller'
                    ? t.sellerCabinet
                    : t.adminPanel}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isRoleMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white text-[#202622] rounded-lg shadow-xl border border-neutral-200 py-1.5 w-48 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    {t.roleSwitch}
                  </div>
                  <button
                    onClick={() => {
                      setUserRole('customer');
                      setActiveView('home');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-neutral-100 ${
                      userRole === 'customer' ? 'font-bold text-[#173B32] bg-emerald-50' : ''
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{t.customerRole} (Xarid qilish)</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('seller');
                      setActiveView('seller-dashboard');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-neutral-100 ${
                      userRole === 'seller' ? 'font-bold text-[#173B32] bg-emerald-50' : ''
                    }`}
                  >
                    <Store className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.sellerCabinet} (MasterStroy)</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('admin');
                      setActiveView('admin-dashboard');
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-neutral-100 ${
                      userRole === 'admin' ? 'font-bold text-[#173B32] bg-emerald-50' : ''
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.adminPanel} (Boshqaruv)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Language toggle */}
            <div className="flex items-center gap-1 font-semibold">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  language === 'uz' ? 'bg-[#F59E0B] text-[#173B32]' : 'hover:text-white'
                }`}
              >
                UZ
              </button>
              <span className="text-neutral-500">/</span>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  language === 'ru' ? 'bg-[#F59E0B] text-[#173B32]' : 'hover:text-white'
                }`}
              >
                RU
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="shrink-0 cursor-pointer group"
          aria-label="BUILT Bosh sahifa"
        >
          <BuiltLogo size="md" variant="dark" />
        </button>

        {/* Catalog Menu Button */}
        <div className="relative shrink-0 hidden md:block" ref={categoryMenuRef}>
          <button
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#173B32] text-white hover:bg-[#235246] font-semibold text-sm transition-all shadow-xs cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#F59E0B]" />
            <span>{t.catalog}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Megamenu Category Dropdown */}
          {isCategoryMenuOpen && (
            <div className="absolute left-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-200 w-80 p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                {t.allCategories}
              </div>
              <div className="divide-y divide-neutral-100 max-h-96 overflow-y-auto">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      openCategory(cat.id);
                      setIsCategoryMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-neutral-50 text-neutral-800 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-medium text-neutral-900 group-hover:text-[#173B32]">
                        {language === 'uz' ? cat.nameUz : cat.nameRu}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {cat.itemCount} {language === 'uz' ? 'xil material' : 'товаров'}
                      </div>
                    </div>
                    <span className="text-neutral-400 group-hover:translate-x-0.5 group-hover:text-[#173B32] transition-all">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Bar with live autocomplete */}
        <div className="flex-1 max-w-2xl relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 focus:bg-white focus:border-[#173B32] focus:ring-2 focus:ring-[#173B32]/10 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#173B32] hover:bg-[#235246] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Qidirish
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {searchFocused && (searchTerm.trim() || searchSuggestions.length > 0) && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-neutral-200 p-2 z-50">
              {searchSuggestions.length > 0 ? (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    {language === 'uz' ? 'Topilgan mahsulotlar' : 'Найденные товары'}
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {searchSuggestions.map(product => (
                      <button
                        key={product.id}
                        onClick={() => {
                          openProductDetail(product.id);
                          setSearchFocused(false);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-neutral-50 flex items-center gap-3 transition-colors group cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.titleUz}
                          className="w-10 h-10 object-cover rounded-md border border-neutral-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900 truncate group-hover:text-[#173B32]">
                            {language === 'uz' ? product.titleUz : product.titleRu}
                          </p>
                          <div className="text-xs text-neutral-500 flex items-center gap-2">
                            <span>{product.brand}</span>
                            <span>·</span>
                            <span className="font-semibold text-[#173B32]">
                              {formatPrice(product.price)} / {product.unit}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-neutral-500">
                  {language === 'uz'
                    ? `"${searchTerm}" bo‘yicha natija topilmadi`
                    : `По запросу "${searchTerm}" ничего не найдено`}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Favorites */}
          <button
            onClick={() => setActiveView('account')}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-neutral-700 hover:text-[#173B32] hover:bg-neutral-100 transition-colors flex items-center gap-1.5 relative cursor-pointer"
            title={t.favorites}
          >
            <div className="relative">
              <Heart className="w-5 h-5 text-neutral-600" />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#F59E0B] text-neutral-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </div>
            <span className="text-xs font-medium hidden lg:inline">{t.favorites}</span>
          </button>

          {/* Shopping Cart */}
          <button
            onClick={() => setActiveView('cart')}
            className={`p-2 sm:px-3.5 sm:py-2 rounded-xl transition-all flex items-center gap-2.5 relative cursor-pointer border ${
              activeView === 'cart'
                ? 'bg-[#173B32] text-white border-[#173B32]'
                : 'bg-neutral-100/80 hover:bg-neutral-200/60 text-neutral-900 border-neutral-200'
            }`}
            title={t.cart}
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#F59E0B] text-neutral-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] text-neutral-500 uppercase leading-none">
                {t.cart}
              </span>
              <span className="text-xs font-bold leading-tight mt-0.5">
                {cartTotal > 0 ? formatPrice(cartTotal) : '0 so‘m'}
              </span>
            </div>
          </button>

          {/* User profile / orders button */}
          <button
            onClick={() => {
              if (userRole === 'seller') {
                setActiveView('seller-dashboard');
              } else if (userRole === 'admin') {
                setActiveView('admin-dashboard');
              } else {
                setActiveView('account');
              }
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-neutral-700 hover:text-[#173B32] hover:bg-neutral-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            title={t.profile}
          >
            <User className="w-5 h-5 text-neutral-600" />
            <span className="text-xs font-medium hidden xl:inline">
              {userRole === 'seller' ? 'Sotuvchi' : userRole === 'admin' ? 'Admin' : 'Kabinet'}
            </span>
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 md:hidden cursor-pointer"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Subnav Category Quick Links for desktop */}
      <div className="hidden lg:block border-t border-neutral-100 bg-[#FCFDFB]">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between overflow-x-auto gap-4 text-xs">
          <div className="flex items-center gap-5 shrink-0 font-medium text-neutral-600">
            {categories.slice(0, 6).map(cat => (
              <button
                key={cat.id}
                onClick={() => openCategory(cat.id)}
                className="hover:text-[#173B32] hover:underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
              >
                {language === 'uz' ? cat.nameUz : cat.nameRu}
              </button>
            ))}
            <button
              onClick={() => setActiveView('catalog')}
              className="text-[#173B32] font-bold hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
            >
              {language === 'uz' ? 'Barcha toifalar →' : 'Все категории →'}
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView('calculators')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                activeView === 'calculators'
                  ? 'bg-[#173B32] text-white'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'uz' ? 'Qurilish Kalkulyatori' : 'Калькулятор'}</span>
            </button>

            <button
              onClick={() => setActiveView('wholesale')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                activeView === 'wholesale'
                  ? 'bg-[#173B32] text-white'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'uz' ? 'Ulgurji / Tender (B2B)' : 'Оптом и Тендер'}</span>
            </button>

            <span className="text-neutral-300">|</span>

            <button
              onClick={() => setActiveView('about')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {language === 'uz' ? 'Biz haqimizda' : 'О нас'}
            </button>
            <span className="text-neutral-300">·</span>
            <button
              onClick={() => setActiveView('faq')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              FAQ
            </button>
            <span className="text-neutral-300">·</span>
            <button
              onClick={() => setActiveView('contact')}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {language === 'uz' ? 'Aloqa' : 'Контакты'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white p-4 space-y-4 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setActiveView('catalog');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#173B32] text-white text-xs font-semibold"
            >
              <Layers className="w-4 h-4 text-[#F59E0B]" />
              <span>{t.catalog}</span>
            </button>
            <button
              onClick={() => {
                setActiveView('mobile-companion');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F59E0B] text-[#173B32] text-xs font-bold"
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobil Ilova</span>
            </button>
          </div>

          {/* Quick Tools for Mobile */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setActiveView('calculators');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold"
            >
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>Kalkulyator</span>
            </button>
            <button
              onClick={() => {
                setActiveView('wholesale');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold"
            >
              <Building2 className="w-4 h-4 text-amber-700" />
              <span>Ulgurji / Tender</span>
            </button>
          </div>

          {/* Mobile Region Selector */}
          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
            <div className="text-[11px] font-bold text-neutral-500 uppercase mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{t.region} (14 ta viloyat)</span>
              </span>
              <span className="text-emerald-700 font-bold text-[11px] truncate max-w-[120px]">{selectedRegion}</span>
            </div>
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="w-full p-2 rounded-lg bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 outline-none"
            >
              <option value={ALL_REGIONS_LABEL}>🌐 Barcha viloyatlar (Butun O'zbekiston)</option>
              {UZBEKISTAN_REGIONS.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-neutral-400 uppercase px-1">Toifalar</div>
            {categories.slice(0, 6).map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  openCategory(cat.id);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-100 rounded-lg flex items-center justify-between"
              >
                <span>{language === 'uz' ? cat.nameUz : cat.nameRu}</span>
                <span className="text-neutral-400">{cat.itemCount} ta</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
            <button
              onClick={() => {
                setActiveView('account');
                setIsMobileMenuOpen(false);
              }}
              className="font-medium hover:text-[#173B32]"
            >
              Buyurtmalarim
            </button>
            <button
              onClick={() => {
                setActiveView('seller-dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="font-medium hover:text-[#173B32]"
            >
              Sotuvchi portali
            </button>
            <button
              onClick={() => {
                setActiveView('admin-dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="font-medium hover:text-[#173B32]"
            >
              Admin panel
            </button>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom App Navigation Bar (Responsive Native UX) */}
      <nav aria-label="Mobil tezkor navigatsiya" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => {
            setActiveView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeView === 'home' ? 'text-[#173B32] font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Bosh sahifa</span>
        </button>

        <button
          onClick={() => setActiveView('catalog')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeView === 'catalog' ? 'text-[#173B32] font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px]">Katalog</span>
        </button>

        <button
          onClick={() => setActiveView('calculators')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeView === 'calculators' ? 'text-[#173B32] font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Calculator className="w-5 h-5" />
          <span className="text-[10px]">Kalkulyator</span>
        </button>

        <button
          onClick={() => setActiveView('wholesale')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeView === 'wholesale' ? 'text-[#173B32] font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span className="text-[10px]">Ulgurji</span>
        </button>

        <button
          onClick={() => setActiveView('cart')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all relative cursor-pointer ${
            activeView === 'cart' || activeView === 'checkout' ? 'text-[#173B32] font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#F59E0B] text-[#173B32] font-black text-[9px] flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Savat</span>
        </button>

        <button
          onClick={() => {
            if (userRole === 'seller') setActiveView('seller-dashboard');
            else if (userRole === 'admin') setActiveView('admin-dashboard');
            else setActiveView('account');
          }}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeView === 'account' || activeView === 'seller-dashboard' || activeView === 'admin-dashboard'
              ? 'text-[#173B32] font-bold'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Kabinet</span>
        </button>
      </nav>
    </header>
  );
};
