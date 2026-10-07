import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IngredientSection } from './components/IngredientSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { HowToEatSection } from './components/HowToEatSection';
import { ProductOrderSection } from './components/ProductOrderSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { AdminOrdersModal } from './components/AdminOrdersModal';
import { StickyMobileCta } from './components/StickyMobileCta';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedBundleId, setSelectedBundleId] = useState('bundle-2');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleOpenOrderModal = () => {
    setSelectedBundleId('bundle-2');
    setSelectedQuantity(1);
    setIsOrderModalOpen(true);
  };

  const handleOpenOrderModalWithBundle = (bundleId: string, quantity: number) => {
    setSelectedBundleId(bundleId);
    setSelectedQuantity(quantity);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-stone-800 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        onOpenOrderModal={handleOpenOrderModal}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenOrderModal={handleOpenOrderModal} />

        {/* 50 Domestic Ingredients Section */}
        <IngredientSection />

        {/* Target Audience Section (이런분께 좋아요 3가지) */}
        <TargetAudienceSection />

        {/* Preparation Guide (물이나 우유에 타서 드세요 1->2->3) */}
        <HowToEatSection />

        {/* Product Showcase & Pricing Section */}
        <ProductOrderSection onOpenOrderModalWithBundle={handleOpenOrderModalWithBundle} />

        {/* Verified Customer Reviews */}
        <ReviewsSection />

        {/* FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Sticky Mobile Order CTA */}
      <StickyMobileCta onOpenOrderModal={handleOpenOrderModal} />

      {/* Order Modal Drawer */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialBundleId={selectedBundleId}
        initialQuantity={selectedQuantity}
      />

      {/* Admin Orders Management Modal */}
      <AdminOrdersModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}

