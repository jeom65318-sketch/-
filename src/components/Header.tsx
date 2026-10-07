import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Leaf, ClipboardList } from 'lucide-react';

interface HeaderProps {
  onOpenOrderModal: () => void;
  onOpenAdminModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOrderModal, onOpenAdminModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF8F3]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-3'
          : 'bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Zone 1: Clean Brand Wordmark */}
        <a href="#" className="group flex items-center gap-2 text-2xl sm:text-3xl font-black text-[#1B4332] tracking-tight">
          <span className="p-1.5 bg-[#1B4332] text-[#FBF8F3] rounded-xl group-hover:bg-[#2D6A4F] transition-colors">
            <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <span>하루한잔</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-base sm:text-lg font-bold text-stone-700">
          <a href="#ingredients" className="hover:text-[#1B4332] transition-colors py-1">
            50가지 곡물채소
          </a>
          <a href="#target-audience" className="hover:text-[#1B4332] transition-colors py-1">
            이런 분께 좋아요
          </a>
          <a href="#how-to-eat" className="hover:text-[#1B4332] transition-colors py-1">
            섭취방법 (1→2→3)
          </a>
          <a href="#product-order" className="hover:text-[#1B4332] transition-colors py-1">
            상품 및 가격
          </a>
          <a href="#faq" className="hover:text-[#1B4332] transition-colors py-1">
            자주 묻는 질문
          </a>
        </nav>

        {/* Zone 3: Primary Action CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenAdminModal}
            className="hidden sm:flex items-center gap-1.5 bg-[#F4EFE6] hover:bg-stone-200 text-[#1B4332] text-sm sm:text-base font-bold px-3.5 py-2.5 rounded-2xl border border-stone-300 transition-colors cursor-pointer"
            title="실시간 접수 주문 내역 관리"
          >
            <ClipboardList className="w-4 h-4 text-[#1B4332]" />
            <span>주문관리</span>
          </button>

          <button
            onClick={onOpenOrderModal}
            className="flex items-center gap-2 bg-[#1B4332] hover:bg-[#2D6A4F] active:scale-95 text-[#FBF8F3] text-base sm:text-lg font-bold px-4 sm:px-7 py-2.5 sm:py-3 rounded-2xl shadow-md transition-all whitespace-nowrap cursor-pointer"
            aria-label="주문하기"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>주문하기</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-[#1B4332] hover:bg-stone-200/50 rounded-xl transition-colors"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4EFE6] border-b border-stone-300/80 px-6 py-6 shadow-xl space-y-4">
          <a
            href="#ingredients"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl font-bold text-stone-800 hover:text-[#1B4332] py-2 border-b border-stone-200/60"
          >
            🌾 50가지 국내산 곡물채소
          </a>
          <a
            href="#target-audience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl font-bold text-stone-800 hover:text-[#1B4332] py-2 border-b border-stone-200/60"
          >
            💚 이런 분께 좋아요
          </a>
          <a
            href="#how-to-eat"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl font-bold text-stone-800 hover:text-[#1B4332] py-2 border-b border-stone-200/60"
          >
            🥛 섭취방법 (1→2→3)
          </a>
          <a
            href="#product-order"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl font-bold text-stone-800 hover:text-[#1B4332] py-2 border-b border-stone-200/60"
          >
            📦 상품 및 할인 가격
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xl font-bold text-stone-800 hover:text-[#1B4332] py-2"
          >
            ❓ 자주 묻는 질문
          </a>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminModal();
              }}
              className="w-full text-center bg-[#F4EFE6] border border-stone-300 text-[#1B4332] text-lg font-bold py-3 rounded-2xl"
            >
              📋 주문 관리자 페이지 (접수 내역)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full text-center bg-[#1B4332] text-white text-xl font-bold py-4 rounded-2xl shadow-lg"
            >
              지금 바로 주문하기
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
