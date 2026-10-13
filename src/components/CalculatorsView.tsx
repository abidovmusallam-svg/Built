import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPrice, getRegionalHubInfo } from '../utils/translations';
import {
  Calculator,
  Layers,
  Box,
  Building,
  Paintbrush,
  Grid,
  Shield,
  ArrowRight,
  ShoppingCart,
  CheckCircle2,
  Info,
  MapPin,
  Truck
} from 'lucide-react';

const CALC_IMAGES: Record<string, { url: string; caption: string }> = {
  brick: {
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=700&q=80',
    caption: "Standart 1NF pishiq qizil g'isht va sement qorishmasi"
  },
  concrete: {
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=700&q=80',
    caption: 'M250 / M300 markali monolit poydevor betoni va sement'
  },
  tile: {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    caption: 'Kafel va 60x120 sm keramogranit plitkalari'
  },
  paint: {
    url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=700&q=80',
    caption: "Fasad va ichki devorlar uchun suv-emulsiya bo'yog'i"
  },
  rebar: {
    url: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=700&q=80',
    caption: "A500C Bekobod armaturasi va poydevor xamutlari"
  }
};

export const CalculatorsView: React.FC = () => {
  const { products, addToCart, setActiveView, selectedRegion } = useMarketplace();
  const hubInfo = getRegionalHubInfo(selectedRegion);

  const [activeCalc, setActiveCalc] = useState<
    'brick' | 'concrete' | 'cement' | 'tile' | 'paint' | 'drywall' | 'insulation' | 'rebar'
  >('brick');

  // Brick Calculator State
  const [brickWallLength, setBrickWallLength] = useState(10); // meters
  const [brickWallHeight, setBrickWallHeight] = useState(3); // meters
  const [brickThickness, setBrickThickness] = useState<'0.5' | '1.0' | '1.5'>('1.0'); // 12cm, 25cm, 38cm
  const [brickWastePercent, setBrickWastePercent] = useState(5); // %

  // Concrete Calculator State
  const [concreteLength, setConcreteLength] = useState(8);
  const [concreteWidth, setConcreteWidth] = useState(0.4);
  const [concreteDepth, setConcreteDepth] = useState(1.0);

  // Tile Calculator State
  const [tileArea, setTileArea] = useState(30); // m2
  const [tileWastePercent, setTileWastePercent] = useState(10); // %

  // Paint Calculator State
  const [paintArea, setPaintArea] = useState(60); // m2
  const [paintLayers, setPaintLayers] = useState(2);

  // Rebar Calculator State
  const [rebarTrenchLength, setRebarTrenchLength] = useState(40); // meters of foundation
  const [rebarRodsCount, setRebarRodsCount] = useState(4); // longitudinal rods

  // CALCULATIONS:
  // 1. Brick calculation (Standard 250x120x65mm brick with mortar)
  // 1 m2 wall of 1.0 thickness (25cm) = ~102 bricks. 0.5 thickness = ~51 bricks. 1.5 thickness = ~153 bricks.
  const wallArea = brickWallLength * brickWallHeight;
  const bricksPerM2 = brickThickness === '0.5' ? 51 : brickThickness === '1.0' ? 102 : 153;
  const rawBricks = Math.round(wallArea * bricksPerM2);
  const totalBricks = Math.round(rawBricks * (1 + brickWastePercent / 100));
  const brickPricePerUnit = 1350; // UZS
  const brickEstimatedCost = totalBricks * brickPricePerUnit;

  // 2. Concrete calculation
  const concreteVolumeM3 = Math.round(concreteLength * concreteWidth * concreteDepth * 100) / 100;
  // For 1 m3 concrete B20 (M250): ~320 kg cement (6.4 bags of 50kg), ~0.45 m3 sand, ~0.8 m3 crushed stone
  const concreteCementBags = Math.ceil(concreteVolumeM3 * 6.5);
  const concreteEstimatedCost = concreteVolumeM3 * 680000; // ~680 000 UZS / m3

  // 3. Tile calculation
  const totalTileM2 = Math.ceil(tileArea * (1 + tileWastePercent / 100));
  const tileEstimatedCost = totalTileM2 * 185000; // UZS / m2

  // 4. Paint calculation
  // 1 kg acrylic paint covers ~7 m2 per layer
  const paintKgNeeded = Math.ceil((paintArea * paintLayers) / 7);
  const paintBuckets25kg = Math.ceil(paintKgNeeded / 25);
  const paintEstimatedCost = paintBuckets25kg * 340000;

  // 5. Rebar calculation
  // Total linear meters of main longitudinal rebar + 10% overlap
  const rebarTotalMeters = Math.round(rebarTrenchLength * rebarRodsCount * 1.15);
  // Stirrups (xamut) every 30cm: perimeter ~1.2m
  const stirrupsCount = Math.round(rebarTrenchLength / 0.3);
  const stirrupMeters = Math.round(stirrupsCount * 1.4);
  const rebarTotalAllMeters = rebarTotalMeters + stirrupMeters;
  const rebarEstimatedCost = rebarTotalAllMeters * 9800; // UZS / meter

  // Find products to add to cart
  const brickProduct = products.find(p => p.id === 'prod-gisht-pishiq-qizil') || products[2];
  const cementProduct = products.find(p => p.id === 'prod-ohangaron-m400') || products[0];
  const tileProduct = products.find(p => p.id === 'prod-keramogranit-60-120') || products[7];
  const paintProduct = products.find(p => p.id === 'prod-mastercoat-fasad') || products[5];
  const rebarProduct = products.find(p => p.id === 'prod-bekobod-armatura-12') || products[1];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#173B32] text-xs font-bold mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Muhandislik Hisob-Kitob Xizmati</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#173B32]">
          Qurilish Materiallari Kalkulyatorlari
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
          G'isht, beton, sement, plitka, bo'yoq va armatura sarfini aniq hisoblang, zaxirani inobatga oling va bir bosishda savatchaga qo'shing.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 border-b border-neutral-200 text-xs font-semibold">
        {[
          { id: 'brick', label: "G'isht kalkulyatori", icon: Box },
          { id: 'concrete', label: 'Beton kalkulyatori', icon: Building },
          { id: 'tile', label: 'Plitka / Kafel', icon: Grid },
          { id: 'paint', label: "Bo'yoq sarfi", icon: Paintbrush },
          { id: 'rebar', label: 'Armatura hisobi', icon: Layers },
        ].map(calc => {
          const Icon = calc.icon;
          const isActive = activeCalc === calc.id;
          return (
            <button
              key={calc.id}
              onClick={() => setActiveCalc(calc.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#173B32] text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <Icon className="w-4 h-4 text-[#F59E0B]" />
              <span>{calc.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Inputs */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-xs space-y-5 text-xs">
          {/* BRICK CALCULATOR */}
          {activeCalc === 'brick' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                G'isht miqdori parametrlarini kiriting:
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Devor uzunligi (metr)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={brickWallLength}
                    onChange={e => setBrickWallLength(Number(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Devor balandligi (metr)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={brickWallHeight}
                    onChange={e => setBrickWallHeight(Number(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 font-bold text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Devor qalinligi (G'isht terish usuli)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '0.5', label: "Yarim g'isht (12 sm)", sub: "Ichki to'siqlar" },
                    { id: '1.0', label: "Bir g'isht (25 sm)", sub: "Standart devor" },
                    { id: '1.5', label: "Bir yarim (38 sm)", sub: "Ko'taruvchi devor" }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBrickThickness(item.id as any)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        brickThickness === item.id
                          ? 'border-[#173B32] bg-emerald-50 text-[#173B32] font-bold'
                          : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="truncate">{item.label}</div>
                      <div className="text-[10px] text-neutral-400 font-normal">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Chiqindi va sinish zaxirasi: {brickWastePercent}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={brickWastePercent}
                  onChange={e => setBrickWastePercent(Number(e.target.value))}
                  className="w-full accent-[#173B32]"
                />
              </div>
            </div>
          )}

          {/* CONCRETE CALCULATOR */}
          {activeCalc === 'concrete' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Beton va poydevor hajmini hisoblash:
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Uzunligi (m)</label>
                  <input
                    type="number"
                    value={concreteLength}
                    onChange={e => setConcreteLength(Number(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Kengligi (m)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={concreteWidth}
                    onChange={e => setConcreteWidth(Number(e.target.value) || 0.1)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Chuqurligi (m)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={concreteDepth}
                    onChange={e => setConcreteDepth(Number(e.target.value) || 0.1)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TILE CALCULATOR */}
          {activeCalc === 'tile' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Plitka va kafel maydonini hisoblash:
              </h3>
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Xona maydoni (m²)</label>
                <input
                  type="number"
                  value={tileArea}
                  onChange={e => setTileArea(Number(e.target.value) || 1)}
                  className="w-full p-2.5 rounded-xl border border-neutral-300 font-bold text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Qirqish zaxirasi: {tileWastePercent}%</label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={tileWastePercent}
                  onChange={e => setTileWastePercent(Number(e.target.value))}
                  className="w-full accent-[#173B32]"
                />
              </div>
            </div>
          )}

          {/* PAINT CALCULATOR */}
          {activeCalc === 'paint' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Bo'yoq sarfini hisoblash:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Devorlar maydoni (m²)</label>
                  <input
                    type="number"
                    value={paintArea}
                    onChange={e => setPaintArea(Number(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Qatlamlar soni</label>
                  <select
                    value={paintLayers}
                    onChange={e => setPaintLayers(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  >
                    <option value={1}>1 qatlam</option>
                    <option value={2}>2 qatlam (Tavsiya etiladi)</option>
                    <option value={3}>3 qatlam</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* REBAR CALCULATOR */}
          {activeCalc === 'rebar' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-900 font-heading">
                Poydevor armatura karkasini hisoblash:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Poydevor umumiy uzunligi (m)</label>
                  <input
                    type="number"
                    value={rebarTrenchLength}
                    onChange={e => setRebarTrenchLength(Number(e.target.value) || 1)}
                    className="w-full p-2.5 rounded-xl border border-neutral-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Bo'ylama sterjenlar soni</label>
                  <select
                    value={rebarRodsCount}
                    onChange={e => setRebarRodsCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-neutral-300"
                  >
                    <option value={4}>4 qator (Standart kottej)</option>
                    <option value={6}>6 qator (2-3 qavatli bino)</option>
                    <option value={8}>8 qator (Mustahkamlangan)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-[11px] text-neutral-500 flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              Hisob-kitoblar O'zbekiston QMQ (Qurilish me'yorlari va qoidalari) tavsiyalariga asoslangan. Aniq loyihalashtirishda mas'ul prorab bilan tasdiqlang.
            </span>
          </div>
        </div>

        {/* Right Results & Add to Cart Action */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-[#173B32] to-[#0f2721] text-white p-6 rounded-3xl shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Hisob-kitob Natijasi
              </span>
              <CheckCircle2 className="w-5 h-5 text-[#F59E0B]" />
            </div>

            {/* Visual Material Photo */}
            {CALC_IMAGES[activeCalc] && (
              <div className="rounded-2xl overflow-hidden border border-emerald-800/80 relative shadow-md">
                <img
                  src={CALC_IMAGES[activeCalc].url}
                  alt={CALC_IMAGES[activeCalc].caption}
                  className="w-full h-36 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] text-white/90 font-medium">
                    {CALC_IMAGES[activeCalc].caption}
                  </span>
                </div>
              </div>
            )}

            {/* Regional Delivery Notice */}
            <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-800 text-[11px] text-emerald-200 flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">{hubInfo.hubName}</strong>
                <span>{hubInfo.deliveryRadiusNote}</span>
              </div>
            </div>

            {/* Results Output */}
            {activeCalc === 'brick' && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-neutral-300">Devor yuzasi:</div>
                  <div className="text-xl font-bold">{wallArea} m²</div>
                </div>
                <div>
                  <div className="text-neutral-300">Kerakli pishiq g'isht (zaxirasi bilan):</div>
                  <div className="text-3xl font-black text-[#F59E0B] font-heading">
                    {totalBricks.toLocaleString()} dona
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-800/80">
                  <div className="text-neutral-300">Mo'ljallangan xarajat:</div>
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(brickEstimatedCost)}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(brickProduct, totalBricks)}
                  className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>G'ishtni to'g'ridan-to'g'ri savatga qo'shish</span>
                </button>
              </div>
            )}

            {activeCalc === 'concrete' && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-neutral-300">Beton umumiy hajmi:</div>
                  <div className="text-3xl font-black text-[#F59E0B] font-heading">
                    {concreteVolumeM3} m³
                  </div>
                </div>
                <div>
                  <div className="text-neutral-300">Tavsiya etiladigan sement miqdori (50 kg qop):</div>
                  <div className="text-xl font-bold text-white">
                    ~{concreteCementBags} qop sement
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-800/80">
                  <div className="text-neutral-300">Mo'ljallangan sement narxi:</div>
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(concreteCementBags * 46000)}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(cementProduct, concreteCementBags)}
                  className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Sementni savatga qo'shish</span>
                </button>
              </div>
            )}

            {activeCalc === 'tile' && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-neutral-300">Kerakli kafel / plitka miqdori:</div>
                  <div className="text-3xl font-black text-[#F59E0B] font-heading">
                    {totalTileM2} m²
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-800/80">
                  <div className="text-neutral-300">Mo'ljallangan xarajat:</div>
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(tileEstimatedCost)}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(tileProduct, totalTileM2)}
                  className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Plitkani savatga qo'shish</span>
                </button>
              </div>
            )}

            {activeCalc === 'paint' && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-neutral-300">Zarur bo'yoq paqirlari (25 kg):</div>
                  <div className="text-3xl font-black text-[#F59E0B] font-heading">
                    {paintBuckets25kg} paqir ({paintKgNeeded} kg)
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-800/80">
                  <div className="text-neutral-300">Mo'ljallangan xarajat:</div>
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(paintEstimatedCost)}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(paintProduct, paintBuckets25kg)}
                  className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Bo'yoqni savatga qo'shish</span>
                </button>
              </div>
            )}

            {activeCalc === 'rebar' && (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-neutral-300">Kerakli armatura uzunligi:</div>
                  <div className="text-3xl font-black text-[#F59E0B] font-heading">
                    {rebarTotalAllMeters} metr
                  </div>
                  <div className="text-[11px] text-neutral-300 mt-0.5">
                    (~{Math.round(rebarTotalAllMeters * 0.888)} kg / d=12mm)
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-800/80">
                  <div className="text-neutral-300">Mo'ljallangan xarajat:</div>
                  <div className="text-2xl font-bold text-white">
                    {formatPrice(rebarEstimatedCost)}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(rebarProduct, rebarTotalAllMeters)}
                  className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#173B32] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Armaturani savatga qo'shish</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
