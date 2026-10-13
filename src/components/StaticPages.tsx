import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Phone, Mail, MapPin, ShieldCheck, Truck, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { BuiltLogo } from './BuiltLogo';
import { getRegionalHubInfo } from '../utils/translations';

export const AboutView: React.FC = () => {
  const { setActiveView, selectedRegion } = useMarketplace();
  const hubInfo = getRegionalHubInfo(selectedRegion);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-20">
      <div className="text-center space-y-3">
        <div className="flex justify-center mb-2">
          <BuiltLogo size="lg" variant="dark" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#173B32]">
          BUILT Platformasi Haqida
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          O'zbekistonda qurilish industriyasi uchun birinchi to'liq raqamlashtirilgan ko'p sotuvchili B2B va B2C marketplace.
        </p>
      </div>

      {/* Hero Photography Banner */}
      <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-md relative bg-[#0f2721]">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80"
          alt="BUILT Qurilish Markazi"
          className="w-full h-56 sm:h-80 object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#173B32] via-[#173B32]/40 to-transparent flex items-end p-6 sm:p-8">
          <div className="text-white max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B] block mb-1">
              Milliy Ta'minot Tarmog'i
            </span>
            <h2 className="text-lg sm:text-2xl font-bold font-heading">
              14 ta viloyat, 350+ zavod va rasmiy distribyutorlar
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
        <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-heading">
          Bizning Missiyamiz
        </h2>
        <p>
          BUILT O'zbekiston bo'ylab qurilish materiallari ishlab chiqaruvchilari, zavodlar va rasmiy dilerlarni individual quruvchilar, prorablar hamda yirik qurilish kompaniyalari bilan to'g'ridan-to'g'ri bog'laydi.
        </p>
        <p>
          Biz vositachilarni chetlab o'tgan holda shaffof narxlar, haqiqiy GOST sertifikatlari va Labo, Gazel, Isuzu hamda Furada tezkor logistikani ta'minlaymiz.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-100">
          <div className="p-4 rounded-2xl bg-neutral-50 text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#173B32] font-heading">350+</div>
            <div className="text-xs text-neutral-500 mt-1">Rasmiy Dilerlar</div>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#F59E0B] font-heading">25 000+</div>
            <div className="text-xs text-neutral-500 mt-1">Materiallar</div>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-50 text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#173B32] font-heading">14 ta</div>
            <div className="text-xs text-neutral-500 mt-1">Viloyatlarga yetkazish</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { addToast, selectedRegion } = useMarketplace();
  const hubInfo = getRegionalHubInfo(selectedRegion);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Xabar yuborildi', "Xabaringiz qabul qilindi! Tez orada operatorimiz siz bilan bog'lanadi.");
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#173B32]">
          Bog‘lanish va Markaziy Ofis
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Savollaringiz yoki dilerlik takliflaringiz bo'lsa biz bilan bog'laning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Contact Info Card */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm space-y-5 text-xs text-neutral-700">
          <div className="rounded-2xl overflow-hidden border border-neutral-200 relative mb-4">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
              alt="BUILT Terminali"
              className="w-full h-36 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3 text-white">
              <span className="font-semibold text-xs">{hubInfo.hubName}</span>
            </div>
          </div>

          <h3 className="font-bold text-neutral-900 text-sm">Aloqa Ma'lumotlari</h3>
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#173B32] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div>
                <a href="tel:+998200205068" className="font-bold text-sm text-neutral-900 hover:text-[#173B32]">
                  20 020 50 68
                </a>
                <div className="text-neutral-400 text-[11px]">{hubInfo.workingHours}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#173B32] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div>
                <div className="font-bold text-neutral-900">info@built.uz</div>
                <div className="text-neutral-400 text-[11px]">Bosh ofis va korporativ shartnomalar</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#173B32] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <div>
                <div className="font-bold text-neutral-900">{hubInfo.hubName}</div>
                <div className="text-neutral-500 text-[11px] leading-relaxed">{hubInfo.hubAddress}</div>
                <div className="text-emerald-700 font-semibold text-[11px] mt-0.5">
                  Olib ketish ombori: {hubInfo.pickupWarehouse}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-neutral-900 text-sm">Xabar qoldirish</h3>
          <div>
            <label className="block text-neutral-600 mb-1 font-semibold">Ismingiz *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ismingizni kiriting"
              className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
            />
          </div>
          <div>
            <label className="block text-neutral-600 mb-1 font-semibold">Telefon raqam *</label>
            <input
              type="text"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+998 20 020 50 68"
              className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
            />
          </div>
          <div>
            <label className="block text-neutral-600 mb-1 font-semibold">Xabar matni *</label>
            <textarea
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Qurilish materiali turi, hajmi yoki dilerlik taklifi haqida yozing..."
              className="w-full p-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32] h-24"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#173B32] hover:bg-[#235246] text-white font-bold rounded-xl cursor-pointer transition-colors shadow-xs"
          >
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
};

export const FAQView: React.FC = () => {
  const faqs = [
    {
      q: "Qurilish materiallari qanday yetkazib beriladi?",
      a: "Materiallar og'irligi va hajmiga qarab Labo (1t gacha), Gazel (2t gacha), Isuzu (5t gacha) yoki Furalar orqali to'g'ridan-to'g'ri ob'ektingizgacha yetkaziladi. Shuningdek diler omboridan o'zingiz olib ketishingiz mumkin."
    },
    {
      q: "To'lov qanday amalga oshiriladi?",
      a: "Siz materiallarni qabul qilib olganda naqd pulda, shuningdek Click, Payme, Uzum Bank orqali to'lashingiz mumkin. Qurilish kompaniyalari uchun QQS bilan elektron hisob-faktura (Didox shartnomasi) taqdim etiladi."
    },
    {
      q: "Sotuvchi bo'lib ro'yxatdan o'tsa bo'ladimi?",
      a: "BUILT platformasida sotuvchi bo'lish taklif asosida amalga oshiriladi. Administrator bilan bog'lanib rasmiy dilerlik shartnomasini imzolaganingizdan keyin sizga maxsus taklif kodi beriladi."
    },
    {
      q: "Mahsulotlar sifati kafolatlanganmi?",
      a: "Ha! Barcha ro'yxatdan o'tgan sotuvchilar GOST va muvofiqlik sertifikatiga ega rasmiy zavod distribyutorlaridir."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#173B32]">
          Ko‘p Beriladigan Savollar (FAQ)
        </h1>
        <p className="text-xs text-neutral-500">
          Xarid qilish, yetkazib berish va to'lovlar bo'yicha eng muhim ma'lumotlar
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full text-left p-4 sm:p-4.5 flex items-center justify-between text-xs font-bold text-neutral-900 cursor-pointer"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
            </button>
            {openIdx === i && (
              <div className="px-4.5 pb-4.5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
