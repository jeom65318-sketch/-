import React from 'react';
import { ShoppingBag, CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/saengsik_hero_bowl_1791342197051.jpg';

interface HeroProps {
  onOpenOrderModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#FBF8F3] via-[#F4EFE6] to-[#EBE3D5] overflow-hidden">
      {/* Background Subtle Leaf Motifs */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Unboxed Metadata Tag */}
            <div className="inline-flex items-center gap-2 text-stone-700 text-sm sm:text-base font-bold tracking-wide">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1B4332]" />
              <span>100% 국내산 정성 재료</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>50가지 자연 곡물채소</span>
            </div>

            {/* MANDATORY BIG HEADLINE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 leading-[1.18] tracking-tight text-balance">
              <span className="block text-[#1B4332]">하루한잔,</span>
              <span className="block text-stone-900 mt-1">간편한 한끼</span>
            </h1>

            {/* Key Value Description */}
            <p className="text-xl sm:text-2xl text-stone-700 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              바쁜 현대인을 위해 <strong className="text-[#1B4332] font-extrabold underline decoration-emerald-400/60 decoration-4">국내산 50가지 자연 곡물과 채소</strong>를 한 포에 담았습니다. 물이나 우유에 타서 부드럽고 고소하게 즐기는 속 편한 식사 대용 생식!
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="bg-[#FBF8F3] p-3.5 sm:p-4 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="text-xs sm:text-sm font-semibold text-stone-500">원재료 품질</div>
                <div className="text-lg sm:text-xl font-extrabold text-[#1B4332] mt-0.5">국내산 100%</div>
              </div>
              <div className="bg-[#FBF8F3] p-3.5 sm:p-4 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="text-xs sm:text-sm font-semibold text-stone-500">자연 원료 수</div>
                <div className="text-lg sm:text-xl font-extrabold text-[#1B4332] mt-0.5">50가지 엄선</div>
              </div>
              <div className="bg-[#FBF8F3] p-3.5 sm:p-4 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="text-xs sm:text-sm font-semibold text-stone-500">준비 시간</div>
                <div className="text-lg sm:text-xl font-extrabold text-[#1B4332] mt-0.5">단 5초 완비</div>
              </div>
            </div>

            {/* MANDATORY LARGE ORDER BUTTON */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenOrderModal}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#1B4332] hover:bg-[#2D6A4F] active:scale-[0.98] text-[#FBF8F3] text-xl sm:text-2xl font-black px-8 sm:px-10 py-4 sm:py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
              >
                <ShoppingBag className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                <span>지금 주문하기</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#ingredients"
                className="w-full sm:w-auto text-center text-lg sm:text-xl font-bold text-stone-700 hover:text-[#1B4332] bg-[#FBF8F3] hover:bg-stone-100 px-6 py-4 rounded-2xl border border-stone-300/80 transition-colors"
              >
                50가지 재료 보기
              </a>
            </div>

            {/* Clean Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-stone-600 text-sm sm:text-base font-bold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>무료배송 혜택</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>해썹(HACCP) 인증 시설</span>
              </div>
            </div>

          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Card Framing */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#1B4332] to-[#52B788] rounded-3xl opacity-20 blur-xl" />

              <div className="relative bg-[#FBF8F3] rounded-3xl p-3 sm:p-4 border-2 border-stone-200 shadow-2xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="하루한잔 50가지 국내산 곡물채소 생식 음료"
                  className="w-full h-80 sm:h-96 lg:h-[420px] object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Highlight Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#FBF8F3]/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200/90 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#1B4332]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-stone-900">바른 곡물채소 1포 (40g)</div>
                      <div className="text-xs text-stone-500 font-medium">인공 보존료 0% · 100% 자연 가루</div>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-[#1B4332] text-white px-2.5 py-1 rounded-lg shrink-0">
                    40g 대용량
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
