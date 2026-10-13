import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Store, Key, ShieldAlert, ArrowRight, CheckCircle2, Lock, UserCheck } from 'lucide-react';
import { BuiltLogo } from './BuiltLogo';

export const SellerLoginView: React.FC = () => {
  const { login, setActiveView, language, users } = useMarketplace();
  const [username, setUsername] = useState('masterstroy');
  const [password, setPassword] = useState('seller123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Check if the user is attempting to login with customer credentials into seller portal
    const matched = users.find((u: any) => u.username.toLowerCase() === username.trim().toLowerCase());
    if (matched && matched.role === 'customer') {
      setErrorMessage("Ushbu hisob xaridor hisobi. Sotuv bo'limiga kirish uchun sotuvchi hisobi talab qilinadi. Sotuvchi hisoblari faqat administrator taklifi bilan yaratiladi.");
      return;
    }

    const res = login(username, password);
    if (res.success) {
      setActiveView('seller-dashboard');
    } else {
      setErrorMessage(res.error || 'Kirishda xatolik yuz berdi');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F6] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 max-w-md w-full shadow-xl animate-in fade-in zoom-in-95">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BuiltLogo size="md" variant="dark" />
          </div>
          <h2 className="text-xl font-bold font-heading text-neutral-900 mt-2">
            Sotuvchi Sifatida Kirish
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
            BUILT dilerlik va savdo bo'limi boshqaruv tizimi
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Sotuvchi Logini (Username) *
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="masalan: masterstroy"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32] font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Maxfiy Parol *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#173B32] hover:bg-[#235246] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
          >
            Sotuv Paneligacha Kirish
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3 text-center text-xs">
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-[11px] text-amber-900 text-left">
            <strong>Administrator taklifi oldingizmi?</strong>
            <p className="mt-0.5 text-neutral-600">
              Sizga administrator tomonidan berilgan maxsus token orqali parolingizni o'rnating.
            </p>
            <button
              onClick={() => setActiveView('activate-invite')}
              className="mt-2 text-xs font-bold text-[#173B32] underline hover:text-[#235246]"
            >
              Taklif kodini faollashtirish →
            </button>
          </div>

          <div className="text-neutral-400 text-[11px]">
            Sinov uchun akkauntlar: <strong>masterstroy</strong> (Faol), <strong>bekobod</strong> (Faol), <strong>samarkand_block</strong> (Bloklangan)
          </div>

          <button
            onClick={() => setActiveView('home')}
            className="text-neutral-500 hover:text-neutral-800 text-xs font-medium"
          >
            ← Xaridlar bo'limiga qaytish
          </button>
        </div>
      </div>
    </div>
  );
};

export const ActivateInviteView: React.FC = () => {
  const { activateSellerWithToken, setActiveView, invitations } = useMarketplace();
  const [token, setToken] = useState('QB-INV-8931-A90F');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleActivateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword.length < 6) {
      setErrorMsg("Parol kamida 6 ta belgidan iborat bo'lishi shart");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Kiritilgan parollar bir-biriga mos kelmadi");
      return;
    }

    const res = activateSellerWithToken(token, newPassword);
    if (res.success) {
      setIsSuccess(true);
    } else {
      setErrorMsg(res.error || "Faollashtirishda xatolik");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F6] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 max-w-md w-full shadow-xl">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Key className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-heading text-neutral-900">
            Sotuvchi Akkauntini Faollashtirish
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
            Administrator tomonidan berilgan taklif kodi orqali o'z shaxsiy parolingizni belgilang
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              Akkauntingiz Muvaffaqiyatli Faollashtirildi!
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Siz endi BUILT platformasining rasmiy dileri sifatida tovarlarni joylashtirishingiz va buyurtmalarni qabul qilishingiz mumkin.
            </p>
            <button
              onClick={() => setActiveView('seller-dashboard')}
              className="w-full py-3 rounded-xl bg-[#173B32] text-white font-bold text-xs"
            >
              Sotuvchi Dashboardiga O'tish
            </button>
          </div>
        ) : (
          <div>
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleActivateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Taklif Kodi (Invite Token) *
                </label>
                <input
                  type="text"
                  required
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  placeholder="QB-INV-xxxx-xxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32] font-mono font-bold uppercase"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Yangi Maxfiy Parol *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Kamida 6 belgi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Parolni Qayta Kiriting *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Parolni tasdiqlang"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 outline-none focus:border-[#173B32]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#173B32] hover:bg-[#235246] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                Parolni Saqlash va Faollashtirish
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setActiveView('seller-login')}
                className="text-neutral-500 hover:text-neutral-800 text-xs"
              >
                ← Sotuvchi login oynasiga qaytish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AccessDeniedView: React.FC = () => {
  const { setActiveView } = useMarketplace();

  return (
    <div className="min-h-screen bg-[#F8F9F6] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 max-w-md w-full text-center shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold font-heading text-neutral-900 mb-2">
          Ruxsat Cheklangan (Sotuvchi Emas)
        </h2>
        <p className="text-xs text-neutral-600 leading-relaxed mb-6">
          BUILT platformasida sotuvchi bo'lish faqat administratorning rasmiy taklifi va shartnomasi asosida amalga oshiriladi. Ommaviy ro'yxatdan o'tish yopiq.
        </p>

        <div className="space-y-2">
          <button
            onClick={() => setActiveView('seller-login')}
            className="w-full py-3 rounded-xl bg-[#173B32] hover:bg-[#235246] text-white font-bold text-xs cursor-pointer"
          >
            Sotuvchi Akkauntiga Kirish
          </button>
          <button
            onClick={() => setActiveView('activate-invite')}
            className="w-full py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 cursor-pointer"
          >
            Taklif Kodini Kiritish
          </button>
          <button
            onClick={() => setActiveView('home')}
            className="w-full py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs hover:bg-neutral-50 cursor-pointer"
          >
            Bosh Sahifaga Qaytish
          </button>
        </div>
      </div>
    </div>
  );
};
