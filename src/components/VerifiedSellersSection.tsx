import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ShieldCheck, Star, MapPin, Phone, ArrowRight, Globe, Truck } from 'lucide-react';
import { UZBEKISTAN_REGIONS } from '../utils/translations';

export const VerifiedSellersSection: React.FC = () => {
  const { sellers, language, t, setActiveView, setSearchTerm, setSelectedRegion, selectedRegion } = useMarketplace();
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>(() => {
    return selectedRegion && selectedRegion !== 'Barcha viloyatlar' ? selectedRegion : 'all';
  });

  React.useEffect(() => {
    if (selectedRegion && selectedRegion !== 'Barcha viloyatlar') {
      setActiveRegionFilter(selectedRegion);
    } else {
      setActiveRegionFilter('all');
    }
  }, [selectedRegion]);

  const verifiedList = sellers.filter(s => s.verified && s.status === 'active');

  const filteredSellers = verifiedList.filter(s => {
    if (activeRegionFilter === 'all') return true;
    return s.region === activeRegionFilter || s.region.toLowerCase().includes(activeRegionFilter.toLowerCase());
  });

  const popularRegions = [
    { id: 'all', label: 'Barcha viloyatlar' },
    { id: 'Namangan viloyati', label: 'Namangan' },
    { id: 'Toshkent shahri', label: 'Toshkent sh.' },
    { id: 'Toshkent viloyati', label: 'Toshkent vil.' },
    { id: 'Samarqand viloyati', label: 'Samarqand' },
    { id: 'Farg‘ona viloyati', label: 'Farg‘ona' },
    { id: 'Andijon viloyati', label: 'Andijon' },
    { id: 'Buxoro viloyati', label: 'Buxoro' },
    { id: 'Navoiy viloyati', label: 'Navoiy' },
    { id: 'Surxondaryo viloyati', label: 'Surxondaryo' },
    { id: 'Qashqadaryo viloyati', label: 'Qashqadaryo' },
    { id: 'Xorazm viloyati', label: 'Xorazm' },
    { id: 'Jizzax viloyati', label: 'Jizzax' },
    { id: 'Sirdaryo viloyati', label: 'Sirdaryo' },
    { id: 'Qoraqalpog‘iston Resp.', label: 'Qoraqalpog‘iston' },
  ];

  return (
    <section className="py-12 bg-white border-y border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>O'zbekistonning barcha viloyatlaridagi rasmiy ta'minotchilar</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#173B32] font-heading">
              {t.verifiedSellers}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {language === 'uz'
                ? 'Sertifikatlangan zavodlar, rasmiy dilerlar va 14 ta viloyatdagi omborlar tarmog‘i'
                : 'Сертифицированные заводы, официальные дилеры и сеть складов в 14 регионах'}
            </p>
          </div>

          <div className="text-xs text-neutral-500">
            Jami: <strong className="text-neutral-900 font-bold">{verifiedList.length} ta</strong> rasmiy diler
          </div>
        </div>

        {/* Region filter pills for sellers */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 scrollbar-none text-xs">
          {popularRegions.map(reg => {
            const isActive = activeRegionFilter === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => {
                  setActiveRegionFilter(reg.id);
                  setSelectedRegion(reg.id === 'all' ? 'Barcha viloyatlar' : reg.id);
                }}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 font-medium ${
                  isActive
                    ? 'bg-[#173B32] text-white shadow-xs font-bold'
                    : 'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700'
                }`}
              >
                {reg.id === 'all' ? <Globe className="w-3 h-3 text-[#F59E0B]" /> : <MapPin className="w-3 h-3 text-neutral-400" />}
                <span>{reg.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {filteredSellers.map(seller => (
            <div
              key={seller.id}
              className="rounded-2xl border border-neutral-200/90 p-5 hover:border-[#173B32]/40 hover:shadow-md transition-all flex flex-col justify-between bg-[#FDFEFC]"
            >
              <div>
                {/* Header with region tag */}
                <div className="flex items-start gap-3.5 mb-3">
                  <img
                    src={seller.logo}
                    alt={seller.name}
                    className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-neutral-900 truncate">
                        {seller.name}
                      </h3>
                      <span title="Tasdiqlangan">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-neutral-900">{seller.rating}</span>
                      </div>
                      <span>·</span>
                      <span>{seller.totalSalesCount} ta savdo</span>
                    </div>
                  </div>
                </div>

                {/* Region Badge */}
                <div className="mb-2.5 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60">
                    <MapPin className="w-3 h-3 text-emerald-700" />
                    <span>{seller.region}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-medium border border-amber-200/60">
                    <Truck className="w-3 h-3 text-amber-700" />
                    <span>Tezkor yetkazish</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-600 line-clamp-2 mb-3 leading-relaxed">
                  {seller.description}
                </p>

                {/* Details */}
                <div className="space-y-1.5 text-xs text-neutral-500 py-2 border-t border-neutral-100">
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{seller.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{seller.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between mt-2">
                <span className="text-[11px] text-neutral-400">
                  Javob vaqti: <strong className="text-neutral-700">{seller.responseTime}</strong>
                </span>
                <button
                  onClick={() => {
                    setSearchTerm(seller.name.split(' ')[0]);
                    setSelectedRegion(seller.region);
                    setActiveView('catalog');
                  }}
                  className="text-xs font-bold text-[#173B32] hover:text-[#235246] flex items-center gap-1 cursor-pointer"
                >
                  <span>Tovarlari ({seller.productsCount})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
