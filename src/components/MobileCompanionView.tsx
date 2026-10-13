import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPrice } from '../utils/translations';
import {
  Smartphone,
  Home,
  Search,
  Heart,
  ShoppingCart,
  User,
  ArrowLeft,
  Truck,
  Building2,
  Code,
  Bell,
  CheckCircle2,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react';
import { BuiltLogo } from './BuiltLogo';

export const MobileCompanionView: React.FC = () => {
  const {
    products,
    categories,
    cart,
    cartCount,
    cartTotal,
    favorites,
    currentUser,
    setActiveView,
    openProductDetail,
    language
  } = useMarketplace();

  const [mobileTab, setMobileTab] = useState<'home' | 'search' | 'favorites' | 'cart' | 'profile'>('home');
  const [showCodeInspector, setShowCodeInspector] = useState(false);
  const [deviceModel, setDeviceModel] = useState<'iphone' | 'android'>('iphone');

  const sampleRNCode = `// BUILT Mobile Companion App (React Native & Expo)
// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';
import { HomeScreen, CatalogScreen, CartScreen, OrdersScreen, ProfileScreen } from './src/screens';
import { BuiltProvider } from './src/context/BuiltContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    // Push notifications setup for order status updates (Dispatched, Delivered)
    registerForPushNotificationsAsync();
  }, []);

  return (
    <BuiltProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#173B32',
            tabBarInactiveTintColor: '#8E9A92',
            tabBarStyle: { height: 60, paddingBottom: 8, backgroundColor: '#FFFFFF' },
            headerStyle: { backgroundColor: '#173B32' },
            headerTintColor: '#FFFFFF',
          })}
        >
          <Tab.Screen name="Bosh sahifa" component={HomeScreen} />
          <Tab.Screen name="Katalog" component={CatalogScreen} />
          <Tab.Screen name="Savat" component={CartScreen} options={{ tabBarBadge: 3 }} />
          <Tab.Screen name="Buyurtmalar" component={OrdersScreen} />
          <Tab.Screen name="Kabinet" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </BuiltProvider>
  );
}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <button
            onClick={() => setActiveView('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#173B32] mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Asosiy saytga qaytish</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-heading text-[#173B32]">
              BUILT Mobile Companion (iOS & Android)
            </h1>
            <span className="bg-emerald-100 text-[#173B32] text-xs font-bold px-2 py-0.5 rounded-full">
              Expo & React Native
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Smartfonlar uchun maxsus moslashtirilgan interaktiv mobil ilova simulyatori
          </p>
        </div>

        {/* Device Switcher & Code Inspector buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCodeInspector(!showCodeInspector)}
            className="px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-800 hover:bg-neutral-100 flex items-center gap-2 cursor-pointer"
          >
            <Code className="w-4 h-4 text-[#173B32]" />
            <span>{showCodeInspector ? 'Simulyatorni ko‘rish' : 'Expo Kodini ko‘rish'}</span>
          </button>
        </div>
      </div>

      {showCodeInspector ? (
        /* React Native Architecture & Code Tab */
        <div className="mt-6 bg-[#1e2420] text-emerald-300 rounded-3xl p-6 font-mono text-xs overflow-x-auto shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-700 text-neutral-400 mb-4">
            <span>React Native + Expo App Architecture (`mobile/App.tsx`)</span>
            <span className="text-amber-400 font-bold">100% Native Ready</span>
          </div>
          <pre className="text-neutral-200 leading-relaxed">{sampleRNCode}</pre>
        </div>
      ) : (
        /* Interactive Smartphone Simulator Frame */
        <div className="mt-8 flex justify-center">
          <div className="w-[375px] h-[780px] bg-neutral-900 rounded-[50px] p-3 shadow-2xl border-4 border-neutral-800 relative flex flex-col">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-end px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-800"></span>
            </div>

            {/* Inner Phone Screen */}
            <div className="w-full h-full bg-[#F8F9F6] rounded-[40px] overflow-hidden flex flex-col relative z-20">
              {/* Phone Status bar */}
              <div className="pt-3 px-6 pb-1 flex justify-between text-[11px] font-bold text-neutral-800 bg-[#173B32] text-white">
                <span>09:41</span>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Mobile App Header */}
              <div className="bg-[#173B32] text-white px-4 py-3 flex items-center justify-between">
                <BuiltLogo size="sm" variant="light" showSubtitle={false} />
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-300" />
                </div>
              </div>

              {/* Scrollable Mobile Screen Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {/* Screen 1: Home */}
                {mobileTab === 'home' && (
                  <div className="space-y-4">
                    {/* Search Pill */}
                    <div className="bg-white rounded-xl p-2.5 border border-neutral-200 flex items-center gap-2 text-xs text-neutral-400 shadow-xs">
                      <Search className="w-4 h-4" />
                      <span>Sement, g'isht, armatura...</span>
                    </div>

                    {/* Banner Card */}
                    <div className="bg-gradient-to-r from-[#173B32] to-[#235246] text-white p-3.5 rounded-2xl shadow-xs">
                      <span className="text-[10px] font-bold text-[#F59E0B] uppercase">B2B Ulgurji</span>
                      <h4 className="font-bold text-xs mt-0.5">To'g'ridan-to'g'ri dilerlar narxida</h4>
                      <p className="text-[10px] text-neutral-300 mt-1">Ob'ektgacha yetkazib berish xizmati bilan</p>
                    </div>

                    {/* Categories Horizontal */}
                    <div>
                      <div className="text-xs font-bold text-neutral-800 mb-2">Toifalar</div>
                      <div className="grid grid-cols-4 gap-2">
                        {categories.slice(0, 4).map(cat => (
                          <div key={cat.id} className="bg-white p-2 rounded-xl border border-neutral-200 text-center">
                            <img src={cat.image} alt="" className="w-8 h-8 rounded-lg object-cover mx-auto mb-1" />
                            <div className="text-[9px] font-bold text-neutral-800 truncate">{cat.nameUz}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Popular Products */}
                    <div>
                      <div className="text-xs font-bold text-neutral-800 mb-2">Ommabop mahsulotlar</div>
                      <div className="space-y-2">
                        {products.slice(0, 4).map(p => (
                          <div
                            key={p.id}
                            onClick={() => openProductDetail(p.id)}
                            className="bg-white p-2.5 rounded-xl border border-neutral-200 flex items-center gap-2.5 shadow-xs cursor-pointer"
                          >
                            <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-neutral-200 shrink-0" />
                            <div className="flex-1 min-w-0 text-xs">
                              <h5 className="font-bold text-neutral-900 truncate">{p.titleUz}</h5>
                              <div className="text-[10px] text-neutral-500">{p.brand}</div>
                              <div className="font-extrabold text-[#173B32] text-xs mt-0.5">
                                {formatPrice(p.price)} / {p.unit}
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Screen 2: Search */}
                {mobileTab === 'search' && (
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-2.5 border border-neutral-200 flex items-center gap-2 text-xs">
                      <Search className="w-4 h-4 text-neutral-400" />
                      <input type="text" placeholder="Qidiruv..." className="w-full outline-none text-xs" />
                    </div>
                    <div className="text-xs text-neutral-500">Barcha toifalar bo‘yicha 25 000+ mahsulot</div>
                  </div>
                )}

                {/* Screen 3: Cart */}
                {mobileTab === 'cart' && (
                  <div className="space-y-3 text-xs">
                    <h3 className="font-bold text-neutral-900">Savatcha ({cartCount} ta)</h3>
                    {cart.length === 0 ? (
                      <div className="text-center py-10 text-neutral-400">Savatcha bo‘sh</div>
                    ) : (
                      <div className="space-y-2">
                        {cart.map(item => (
                          <div key={item.product.id} className="bg-white p-2.5 rounded-xl border border-neutral-200 flex justify-between">
                            <div>
                              <div className="font-bold text-neutral-900">{item.product.titleUz}</div>
                              <div className="text-[11px] text-neutral-500">{item.quantity} {item.product.unit}</div>
                            </div>
                            <div className="font-bold text-[#173B32]">{formatPrice(item.activePrice * item.quantity)}</div>
                          </div>
                        ))}
                        <div className="pt-2 border-t font-bold flex justify-between">
                          <span>Jami:</span>
                          <span className="text-[#173B32]">{formatPrice(cartTotal)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Screen 4: Profile */}
                {mobileTab === 'profile' && (
                  <div className="space-y-3 text-xs">
                    <div className="bg-white p-4 rounded-xl border border-neutral-200 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#173B32] text-white flex items-center justify-center font-bold">
                        {currentUser.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900">{currentUser.fullName}</div>
                        <div className="text-neutral-500">{currentUser.phone}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile App Bottom Tab Bar (Requirement 9) */}
              <div className="bg-white border-t border-neutral-200 px-3 py-2 flex items-center justify-around text-[10px] font-medium text-neutral-500 shrink-0">
                <button
                  onClick={() => setMobileTab('home')}
                  className={`flex flex-col items-center gap-0.5 cursor-pointer ${mobileTab === 'home' ? 'text-[#173B32] font-bold' : ''}`}
                >
                  <Home className="w-4 h-4" />
                  <span>Bosh sahifa</span>
                </button>

                <button
                  onClick={() => setMobileTab('search')}
                  className={`flex flex-col items-center gap-0.5 cursor-pointer ${mobileTab === 'search' ? 'text-[#173B32] font-bold' : ''}`}
                >
                  <Search className="w-4 h-4" />
                  <span>Qidiruv</span>
                </button>

                <button
                  onClick={() => setMobileTab('cart')}
                  className={`flex flex-col items-center gap-0.5 relative cursor-pointer ${mobileTab === 'cart' ? 'text-[#173B32] font-bold' : ''}`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-[#F59E0B] text-[#173B32] text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  <span>Savat</span>
                </button>

                <button
                  onClick={() => setMobileTab('profile')}
                  className={`flex flex-col items-center gap-0.5 cursor-pointer ${mobileTab === 'profile' ? 'text-[#173B32] font-bold' : ''}`}
                >
                  <User className="w-4 h-4" />
                  <span>Profil</span>
                </button>
              </div>

              {/* Home indicator bar */}
              <div className="pb-1 pt-1 bg-white flex justify-center">
                <div className="w-28 h-1 bg-neutral-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
