import React, { useState } from 'react';
import { PRODUCT_BUNDLES } from '../data/saengsikData';
import { ShoppingBag, Check, Gift, Truck, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react';
import productImage from '../assets/images/saengsik_product_box_1791342247959.jpg';

interface ProductOrderSectionProps {
  onOpenOrderModalWithBundle: (bundleId: string, quantity: number) => void;
}

export const ProductOrderSection: React.FC<ProductOrderSectionProps> = ({
  onOpenOrderModalWithBundle,
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>('bundle-2');
  const [quantity, setQuantity] = useState<number>(1);

  const currentBundle =
    PRODUCT_BUNDLES.find((b) => b.id === selectedBundleId) || PRODUCT_BUNDLES[1];

  const totalPrice = currentBundle.price * quantity;
  const totalOriginalPrice = currentBundle.originalPrice * quantity;
  const totalDiscount = totalOriginalPrice - totalPrice;

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 10, prev + 1));
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <section id="product-order" className="py-16 sm:py-24 bg-[#FBF8F3] text-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#1B4332] text-base font-bold bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
            <Gift className="w-5 h-5 text-emerald-700" />
            <span>온라인 단독 직배송 할인 혜택</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight text-balance">
            하루한잔 <span className="text-[#1B4332]">국내산 50 곡물채소 생식</span>
          </h2>

          <p className="text-lg sm:text-xl text-stone-700 font-medium leading-relaxed">
            국내산 100% 50가지 원재료 그대로! 1포(40g)의 대용량 든든함을 가장 합리적인 가격에 만나보세요.
          </p>
        </div>

        {/* Product Showcase & Selection Card */}
        <div className="mt-12 bg-[#F4EFE6] rounded-3xl p-6 sm:p-10 border-2 border-stone-300 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Product Image Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-stone-300 shadow-lg bg-[#FBF8F3]">
                <img
                  src={productImage}
                  alt="하루한잔 국내산 50 곡물채소 생식 패키지"
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute top-4 left-4 bg-[#1B4332] text-[#FBF8F3] text-sm font-black px-3.5 py-1.5 rounded-xl shadow-md">
                  100% 국내산 50종
                </span>
              </div>

              {/* Product Key Points List */}
              <div className="bg-[#FBF8F3] p-4 sm:p-5 rounded-2xl border border-stone-200 space-y-2 text-sm sm:text-base font-bold text-stone-700">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>내용량: 1박스 (40g × 30포 / 총 1.2kg)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>원산지: 국내산 100% 농산물 (50가지)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>유통기한: 제조일로부터 12개월 (최신 제조품)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-900">
                  <Truck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>배송비: 전 상품 **무료배송** (오늘 주문시 내일 출고)</span>
                </div>
              </div>
            </div>

            {/* Right Configuration & Purchase Form */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-[#1B4332] tracking-wider uppercase">
                  구성 선택하기
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
                  구매하실 박스 세트를 선택하세요
                </h3>
              </div>

              {/* Bundle Option Radio Cards */}
              <div className="space-y-3">
                {PRODUCT_BUNDLES.map((bundle) => {
                  const isSelected = bundle.id === selectedBundleId;
                  return (
                    <div
                      key={bundle.id}
                      onClick={() => setSelectedBundleId(bundle.id)}
                      className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#FBF8F3] border-[#1B4332] shadow-md ring-2 ring-[#1B4332]/20'
                          : 'bg-[#FBF8F3]/60 border-stone-300 hover:border-stone-400'
                      }`}
                    >
                      {bundle.recommended && (
                        <span className="absolute -top-3 right-4 bg-amber-500 text-white text-xs font-extrabold px-3 py-0.5 rounded-full shadow-xs">
                          인기 베스트
                        </span>
                      )}

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#1B4332] bg-[#1B4332] text-white'
                                : 'border-stone-400'
                            }`}
                          >
                            {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg sm:text-xl font-black text-stone-900">
                                {bundle.name}
                              </span>
                              <span className="text-xs font-bold bg-emerald-100 text-[#1B4332] px-2 py-0.5 rounded-md">
                                {bundle.badge}
                              </span>
                            </div>
                            <div className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                              {bundle.giftNote} (포당 약 {bundle.perSachetPrice.toLocaleString()}원)
                            </div>
                          </div>
                        </div>

                        {/* Price Column */}
                        <div className="text-right shrink-0">
                          <div className="text-xs sm:text-sm text-stone-400 line-through">
                            {bundle.originalPrice.toLocaleString()}원
                          </div>
                          <div className="text-xl sm:text-2xl font-black text-[#1B4332]">
                            {bundle.price.toLocaleString()}원
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quantity Counter Box */}
              <div className="bg-[#FBF8F3] p-4 rounded-2xl border border-stone-300 flex items-center justify-between">
                <div>
                  <div className="text-base font-extrabold text-stone-900">세트 수량</div>
                  <div className="text-xs text-stone-500 font-medium">원하시는 세트 수량을 조절하세요</div>
                </div>

                <div className="flex items-center gap-3 bg-[#F4EFE6] p-1.5 rounded-xl border border-stone-300">
                  <button
                    onClick={handleDecrement}
                    className="w-9 h-9 rounded-lg bg-white hover:bg-stone-100 text-stone-800 font-bold flex items-center justify-center shadow-xs cursor-pointer"
                    aria-label="수량 감소"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-xl font-black text-stone-900 w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-9 h-9 rounded-lg bg-white hover:bg-stone-100 text-stone-800 font-bold flex items-center justify-center shadow-xs cursor-pointer"
                    aria-label="수량 증가"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-[#1B4332] text-[#FBF8F3] p-5 sm:p-6 rounded-2xl shadow-lg space-y-3">
                <div className="flex items-center justify-between text-sm sm:text-base text-emerald-200">
                  <span>총 상품 금액</span>
                  <span className="line-through">{totalOriginalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between text-sm sm:text-base text-emerald-200">
                  <span>총 할인 금액 + 무료배송</span>
                  <span className="font-bold text-amber-300">-{totalDiscount.toLocaleString()}원</span>
                </div>
                <div className="pt-2 border-t border-emerald-700/80 flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-black">최종 결제 금액</span>
                  <span className="text-3xl sm:text-4xl font-black text-amber-300">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* MANDATORY LARGE ORDER BUTTON */}
              <button
                onClick={() => onOpenOrderModalWithBundle(selectedBundleId, quantity)}
                className="w-full flex items-center justify-center gap-3 bg-[#1B4332] hover:bg-[#2D6A4F] active:scale-[0.98] text-[#FBF8F3] text-2xl sm:text-3xl font-black py-5 sm:py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all cursor-pointer group"
              >
                <ShoppingBag className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                <span>지금 주문하기</span>
              </button>

              <div className="flex items-center justify-center gap-6 text-xs sm:text-sm text-stone-600 font-bold">
                <span>✓ 무료배송</span>
                <span>✓ 100% 당일출고</span>
                <span>✓ 안전결제 시스템</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
