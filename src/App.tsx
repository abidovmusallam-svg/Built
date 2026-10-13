import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { CartView, CheckoutView } from './components/CartAndCheckout';
import { CustomerAccountView } from './components/CustomerAccountView';
import { SellerDashboardView } from './components/SellerDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { MobileCompanionView } from './components/MobileCompanionView';
import { SellerLoginView, ActivateInviteView, AccessDeniedView } from './components/SellerAuthModals';
import { AboutView, ContactView, FAQView } from './components/StaticPages';
import { CalculatorsView } from './components/CalculatorsView';
import { WholesaleQuotationView } from './components/WholesaleQuotationView';

const MainContent: React.FC = () => {
  const { activeView } = useMarketplace();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9F6] text-[#202622]">
      <Header />
      <main className="flex-1">
        {activeView === 'home' && <HomeView />}
        {activeView === 'catalog' && <CatalogView />}
        {activeView === 'product-detail' && <ProductDetailView />}
        {activeView === 'cart' && <CartView />}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'account' && <CustomerAccountView />}
        {activeView === 'seller-dashboard' && <SellerDashboardView />}
        {activeView === 'admin-dashboard' && <AdminDashboardView />}
        {activeView === 'mobile-companion' && <MobileCompanionView />}
        {activeView === 'calculators' && <CalculatorsView />}
        {activeView === 'wholesale' && <WholesaleQuotationView />}
        {activeView === 'seller-login' && <SellerLoginView />}
        {activeView === 'activate-invite' && <ActivateInviteView />}
        {activeView === 'access-denied' && <AccessDeniedView />}
        {activeView === 'about' && <AboutView />}
        {activeView === 'contact' && <ContactView />}
        {activeView === 'faq' && <FAQView />}
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <MarketplaceProvider>
      <MainContent />
    </MarketplaceProvider>
  );
}
