import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Phone, Mail, MapPin, ShieldCheck, Truck, Clock } from 'lucide-react';
import { BuiltLogo } from './BuiltLogo';
import { getRegionalHubInfo } from '../utils/translations';

export const Footer: React.FC = () => {
  const { categories, setActiveView, language, openCategory, selectedRegion } = useMarketplace();
  const hubInfo = getRegionalHubInfo(selectedRegion);

  return (
    <footer className="bg-[#173B32] text-white border-t border-emerald-950 pt-12 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-emerald-900/80 text-xs">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <BuiltLogo size="md" variant="light" />

            <p className="text-neutral-300 leading-relaxed max-w-sm">
              O'zbekistondagi zamonaviy qurilish mollari bozori. Sement, metall, g'isht, taxta va pardozlash materiallarini to'g'ridan-to'g'ri ishlab chiqaruvchilar va rasmiy dilerlardan xarid qiling.
            </p>

            <div className="pt-2 text-neutral-300 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">{hubInfo.hubName}</span>
                  <span className="text-neutral-300 text-[11px]">{hubInfo.hubAddress}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a href="tel:+998200205068" className="hover:text-white font-bold tracking-wider text-sm">
                  20 020 50 68
                </a>
                <span className="text-emerald-400 text-[11px]">· {hubInfo.workingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>info@built.uz</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 font-heading uppercase tracking-wider text-[11px]">
              Ommabop Toifalar
            </h4>
            <ul className="space-y-2 text-neutral-300">
              {categories.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => openCategory(cat.id)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat.nameUz}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: For Customers & Navigation */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 font-heading uppercase tracking-wider text-[11px]">
              Xaridorlar Uchun
            </h4>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <button onClick={() => setActiveView('catalog')} className="hover:text-white cursor-pointer">
                  Katalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('calculators')} className="hover:text-[#F59E0B] font-semibold flex items-center gap-1 cursor-pointer">
                  <span>📐 Qurilish kalkulyatori</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('wholesale')} className="hover:text-[#F59E0B] font-semibold flex items-center gap-1 cursor-pointer">
                  <span>🏗️ Ulgurji & Tender (B2B)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('account')} className="hover:text-white cursor-pointer">
                  Buyurtmalarni kuzatish
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('faq')} className="hover:text-white cursor-pointer">
                  Ko'p beriladigan savollar
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-white cursor-pointer">
                  Biz haqimizda
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: For Sellers & Partners */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 font-heading uppercase tracking-wider text-[11px]">
              Sotuvchilar Uchun
            </h4>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <button onClick={() => setActiveView('seller-login')} className="hover:text-[#F59E0B] font-bold cursor-pointer">
                  Sotuvchi Kabineti (Kirish)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('activate-invite')} className="hover:text-white cursor-pointer">
                  Taklif kodini faollashtirish
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-white cursor-pointer">
                  Dilerlik shartnomasi
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('mobile-companion')} className="hover:text-white cursor-pointer">
                  Mobil ilova (iOS/Android)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip: Payments & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © 2026 BUILT Marketplace. Barcha huquqlar himoyalangan.
          </div>

          <div className="flex items-center gap-3">
            <span className="text-neutral-300 font-semibold">To‘lov tizimlari:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-white font-bold">
              CLICK
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-white font-bold">
              PAYME
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-white font-bold">
              UZUM BANK
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-white font-bold">
              QQS BILAN B2B
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
