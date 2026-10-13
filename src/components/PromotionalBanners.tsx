import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Truck, Calculator, ArrowRight, FileCheck, MapPin } from 'lucide-react';
import { getRegionalHubInfo, ALL_REGIONS_LABEL } from '../utils/translations';

export const PromotionalBanners: React.FC = () => {
  const { language, setActiveView, selectedRegion } = useMarketplace();
  const hubInfo = getRegionalHubInfo(selectedRegion);

  return (
    <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Banner 1: Wholesale B2B & Tender */}
        <div className="rounded-2xl bg-[#173B32] text-white p-6 sm:p-7 flex flex-col justify-between shadow-md relative overflow-hidden group">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
            alt="B2B Ulgurji Savdo"
            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173B32] via-[#173B32]/85 to-[#173B32]/70"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F59E0B] text-xs font-bold mb-3 border border-white/15 backdrop-blur-xs">
              <FileCheck className="w-3.5 h-3.5" />
              <span>B2B Ulgurji Savdo & Tender</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-heading mb-2">
              {selectedRegion === ALL_REGIONS_LABEL
                ? (language === 'uz' ? "Katta hajmda xarid & Diler narxlari" : 'Оптовые закупки и Тендеры B2B')
                : `${selectedRegion} bo‘yicha ulgurji tender`}
            </h3>
            <p className="text-xs text-neutral-200 leading-relaxed mb-6 line-clamp-3">
              {selectedRegion === ALL_REGIONS_LABEL
                ? "Sement, armatura, g'isht partiyalariga so'rov qoldiring va O'zbekiston bo'yicha eng arzon narxda oling."
                : `${hubInfo.hubName} orqali to‘g‘ridan-to‘g‘ri ob‘ektingizgacha yetkazib berish bilan ulgurji buyurtma bering.`}
            </p>
          </div>

          <div className="relative z-10">
            <button
              onClick={() => setActiveView('wholesale')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{language === 'uz' ? 'Tender so‘rovi qoldirish' : 'Оформить заявку'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Banner 2: Construction Calculator */}
        <div className="rounded-2xl bg-[#1E4D40] text-white p-6 sm:p-7 flex flex-col justify-between shadow-md relative overflow-hidden group">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80"
            alt="Qurilish kalkulyatori"
            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E4D40] via-[#1E4D40]/85 to-[#1E4D40]/70"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold mb-3 border border-white/15 backdrop-blur-xs">
              <Calculator className="w-3.5 h-3.5" />
              <span>Muhandislik Hisoblagichi</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-heading mb-2">
              {language === 'uz'
                ? "Materiallar Sarfini Aniq Hisoblang"
                : 'Строительный Калькулятор'}
            </h3>
            <p className="text-xs text-neutral-200 leading-relaxed mb-6 line-clamp-3">
              {language === 'uz'
                ? "Devor uchun g'isht, poydevor uchun beton, armatura, kafel va fasad bo'yog'i sarfini 1 daqiqada hisoblab to'g'ridan-to'g'ri xarid qiling."
                : 'Точный расчет расхода кирпича, бетона, арматуры, краски и плитки с мгновенным заказом в корзину.'}
            </p>
          </div>

          <div className="relative z-10">
            <button
              onClick={() => setActiveView('calculators')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-[#173B32] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{language === 'uz' ? 'Kalkulyatorni ochish' : 'Открыть калькулятор'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Banner 3: Regional Logistics Hub */}
        <div className="rounded-2xl bg-[#203630] text-white p-6 sm:p-7 flex flex-col justify-between shadow-md relative overflow-hidden group">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
            alt="Logistika tarmog'i"
            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#203630] via-[#203630]/85 to-[#203630]/70"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-3 border border-white/15 backdrop-blur-xs">
              <Truck className="w-3.5 h-3.5" />
              <span>{selectedRegion === ALL_REGIONS_LABEL ? '14 Ta Viloyatga Yetkazish' : `${selectedRegion} Yetkazish`}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-heading mb-2">
              Labo, Gazel, Isuzu va Fura
            </h3>
            <div className="space-y-1.5 mb-6 text-xs text-neutral-200">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{hubInfo.hubName}</span>
              </div>
              <p className="line-clamp-2 text-neutral-300 text-[11px]">
                {hubInfo.deliveryRadiusNote}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <button
              onClick={() => setActiveView('catalog')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{language === 'uz' ? 'Materiallarni ko‘rish' : 'Смотреть товары'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="hidden sm:inline text-[11px] text-neutral-400 font-mono">24/7 faol</span>
          </div>
        </div>
      </div>
    </section>
  );
};
