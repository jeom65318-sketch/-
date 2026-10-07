import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

interface StickyMobileCtaProps {
  onOpenOrderModal: () => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({ onOpenOrderModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (300px)
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FBF8F3]/95 backdrop-blur-md border-t border-stone-300 p-3 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="space-y-0.5 shrink-0">
          <div className="text-xs font-bold text-stone-500">100% 국내산 50 곡물채소</div>
          <div className="text-lg font-black text-[#1B4332]">1박스 38,000원~</div>
        </div>

        <button
          onClick={onOpenOrderModal}
          className="flex-1 flex items-center justify-center gap-2 bg-[#1B4332] active:scale-95 text-white text-lg font-black py-3 px-5 rounded-2xl shadow-lg cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>하루한잔 주문하기</span>
        </button>
      </div>
    </div>
  );
};
