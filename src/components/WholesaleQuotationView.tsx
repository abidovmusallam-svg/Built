import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPrice, UZBEKISTAN_REGIONS, getDistrictsForRegion } from '../utils/translations';
import {
  FileText,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Send,
  Plus,
  Phone
} from 'lucide-react';

interface QuoteOffer {
  id: string;
  sellerName: string;
  sellerPhone: string;
  unitPrice: number;
  deliveryDays: string;
  totalOfferPrice: number;
  notes: string;
  validUntil: string;
}

interface QuoteRequest {
  id: string;
  title: string;
  quantity: number;
  unit: string;
  region: string;
  district: string;
  deliveryDate: string;
  createdAt: string;
  status: 'active' | 'completed' | 'expired';
  offers: QuoteOffer[];
  image?: string;
}

export const WholesaleQuotationView: React.FC = () => {
  const { addToast, createOrder, setActiveView, selectedRegion } = useMarketplace();

  const [activeRegion, setActiveRegion] = useState(
    selectedRegion && selectedRegion !== 'Barcha viloyatlar' ? selectedRegion : 'Namangan viloyati'
  );

  useEffect(() => {
    if (selectedRegion && selectedRegion !== 'Barcha viloyatlar') {
      setActiveRegion(selectedRegion);
    }
  }, [selectedRegion]);

  const [district, setDistrict] = useState('Davlatobod tumani');
  const [materialTitle, setMaterialTitle] = useState('Ohangaron Sement M400 (50 kg)');
  const [quantity, setQuantity] = useState(500);
  const [unit, setUnit] = useState('qop');
  const [targetDate, setTargetDate] = useState('2026-10-25');
  const [specNotes, setSpecNotes] = useState("Litsenziyalangan zavod sertifikati va QQS bilan elektron hisob-faktura talab etiladi.");

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([
    {
      id: 'REQ-8821',
      title: "Bekobod Armaturasi A500C d=14 mm (12 metr)",
      quantity: 15,
      unit: 'tonna',
      region: 'Namangan viloyati',
      district: 'Chust tumani',
      deliveryDate: '2026-10-22',
      createdAt: '2026-10-09',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80',
      offers: [
        {
          id: 'off-1',
          sellerName: 'Chust Metall Invest (Bekobod Armatura Dileri)',
          sellerPhone: '+998 69 770-88-11',
          unitPrice: 8900000,
          deliveryDays: '2 kun ichida ob‘ektga yuklanadi',
          totalOfferPrice: 133500000,
          notes: "To'liq vagon partiyasi, Bekobod zavodining laboratoriya pasporti bilan birga topshiriladi.",
          validUntil: '2026-10-20'
        },
        {
          id: 'off-2',
          sellerName: 'Toshkent Bekobod Metall Invest',
          sellerPhone: '+998 71 200-88-11',
          unitPrice: 8850000,
          deliveryDays: '3 kun ichida yetkaziladi',
          totalOfferPrice: 132750000,
          notes: "Fura transporti narx ichiga kiritilgan.",
          validUntil: '2026-10-21'
        }
      ]
    },
    {
      id: 'REQ-8822',
      title: "Ohangaron Sement M500 (50 kg qop)",
      quantity: 1200,
      unit: 'qop',
      region: 'Toshkent shahri',
      district: 'Sergeli tumani',
      deliveryDate: '2026-10-24',
      createdAt: '2026-10-10',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
      offers: [
        {
          id: 'off-3',
          sellerName: 'Ohangaron Sement Bosh Dilerligi',
          sellerPhone: '+998 71 200-88-11',
          unitPrice: 48000,
          deliveryDays: 'Ertaga 09:00 gacha 3 ta Isuzuda',
          totalOfferPrice: 57600000,
          notes: "Zavod yangi partiyasi, QQS bilan to'liq hisob-faktura taqdim etiladi.",
          validUntil: '2026-10-22'
        }
      ]
    }
  ]);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: QuoteRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      title: materialTitle,
      quantity,
      unit,
      region: activeRegion,
      district,
      deliveryDate: targetDate,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      offers: [
        {
          id: `off-${Date.now()}`,
          sellerName: 'Namangan Sement & Beton Savdo Uyi',
          sellerPhone: '+998 69 227-33-44',
          unitPrice: 41000,
          deliveryDays: '1 kun ichida Isuzu yuk mashinasida',
          totalOfferPrice: quantity * 41000,
          notes: "Zavod narxida to'g'ridan-to'g'ri yetkazamiz.",
          validUntil: '2026-10-28'
        }
      ]
    };

    setQuoteRequests([newReq, ...quoteRequests]);
    setIsFormOpen(false);
    addToast('success', 'Tijoriy taklif so‘rovi yuborildi', `${newReq.id} - Dilerlar ko‘rib chiqmoqda`);
  };

  const handleAcceptQuote = (req: QuoteRequest, offer: QuoteOffer) => {
    addToast('success', 'Taklif qabul qilindi!', `"${offer.sellerName}" dilerining taklifi tasdiqlandi va buyurtma rasmiylashtirildi.`);
    setActiveView('account');
  };

  const availableDistricts = getDistrictsForRegion(activeRegion);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#173B32] to-[#235246] text-white p-8 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F59E0B] text-xs font-bold mb-3 border border-white/10">
            <Building className="w-3.5 h-3.5" />
            <span>B2B Ulgurji va Qurilish Kompaniyalari Uchun</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">
            Tijoriy Taklif So‘rash (Wholesale RFQ)
          </h1>
          <p className="text-xs sm:text-sm text-neutral-200 max-w-2xl mt-1 leading-relaxed">
            Katta hajmdagi sement, armatura, g‘isht va yog‘och uchun to‘g‘ridan-to‘g‘ri dilerlardan eng arzon ulgurji narxlarni oling.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="px-5 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi so‘rov qoldirish</span>
        </button>
      </div>

      {/* Corporate Hotline Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#173B32] flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-neutral-900">
              Yirik Qurilish Kompaniyalari & Tenderlar Bo'limi
            </div>
            <div className="text-[11px] text-neutral-500">
              Didox orqali elektron hisob-faktura (QQS bilan) va shartnomalar rasmiylashtirish
            </div>
          </div>
        </div>
        <a
          href="tel:+998200205068"
          className="px-4 py-2.5 rounded-xl bg-[#173B32] hover:bg-[#235246] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shrink-0 shadow-xs"
        >
          <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>20 020 50 68</span>
        </a>
      </div>

      {/* Modal / Form for Request */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Ulgurji Tijoriy Taklif So‘rovi Yaratish
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-neutral-400 text-lg cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Kerakli material nomi va markasi *
                </label>
                <input
                  type="text"
                  required
                  value={materialTitle}
                  onChange={e => setMaterialTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Hajm / Miqdor *</label>
                  <input
                    type="number"
                    required
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Birlik *</label>
                  <select
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  >
                    <option value="qop">qop</option>
                    <option value="tonna">tonna</option>
                    <option value="dona">dona</option>
                    <option value="m³">m³ (kub)</option>
                    <option value="metr">metr</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Yetkazib beriladigan viloyat *</label>
                  <select
                    value={activeRegion}
                    onChange={e => {
                      setActiveRegion(e.target.value);
                      setDistrict(getDistrictsForRegion(e.target.value)[0] || '');
                    }}
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  >
                    {UZBEKISTAN_REGIONS.map(reg => (
                      <option key={reg} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Tuman *</label>
                  <select
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  >
                    {availableDistricts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Kerakli yetkazish sanasi</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Qo'shimcha talablar</label>
                <textarea
                  value={specNotes}
                  onChange={e => setSpecNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-300 h-16"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-xl"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#173B32] text-white font-bold rounded-xl"
                >
                  Dilerlarga yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Requests & Quotations List */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-neutral-900 font-heading">
          Faol Tijoriy Taklif So‘rovlari va Dilerlar Narxlari ({quoteRequests.length})
        </h2>

        {quoteRequests.map(req => (
          <div key={req.id} className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 text-xs">
              <div className="flex items-start gap-3.5">
                {req.image && (
                  <img
                    src={req.image}
                    alt={req.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-neutral-200 shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-neutral-900 font-mono text-sm">{req.id}</span>
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-50 text-emerald-800">
                      FAOL SO'ROV
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-neutral-900 mt-1">{req.title}</h3>
                  <div className="text-neutral-500 mt-0.5">
                    Hajm: <strong className="text-neutral-800">{req.quantity} {req.unit}</strong> · Manzil: <strong className="text-neutral-800">{req.region}, {req.district}</strong>
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right text-[11px] text-neutral-500 shrink-0">
                Yetkazish muddati: <strong className="text-neutral-900">{req.deliveryDate} gacha</strong>
              </div>
            </div>

            {/* Seller Offers Matrix */}
            <div>
              <div className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">
                Dilerlar takliflari ({req.offers.length} ta):
              </div>

              <div className="space-y-3">
                {req.offers.map(offer => (
                  <div
                    key={offer.id}
                    className="p-4 rounded-2xl border border-neutral-200/80 hover:border-[#173B32] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-50/60 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-neutral-900">{offer.sellerName}</strong>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-neutral-600 mt-1 max-w-md">{offer.notes}</p>
                      <div className="text-[11px] text-neutral-400 mt-1">
                        Muddat: {offer.deliveryDays} · Telefon: <strong>{offer.sellerPhone}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 block uppercase">Jami partiya:</span>
                        <div className="text-base font-extrabold text-[#173B32]">
                          {formatPrice(offer.totalOfferPrice)}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {formatPrice(offer.unitPrice)} / {req.unit}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAcceptQuote(req, offer)}
                        className="px-4 py-2.5 rounded-xl bg-[#173B32] hover:bg-[#235246] text-white font-bold text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
                      >
                        Qabul qilish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
