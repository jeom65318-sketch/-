import React, { useState } from 'react';
import { PREPARATION_STEPS } from '../data/saengsikData';
import { GlassWater, PackageCheck, Sparkles, ArrowRight, Check } from 'lucide-react';
import prepImage from '../assets/images/saengsik_prep_step_1791342233494.jpg';

export const HowToEatSection: React.FC = () => {
  const [selectedBase, setSelectedBase] = useState<'water' | 'milk' | 'soymilk'>('milk');

  const baseDetails = {
    water: {
      name: '💧 차가운 물 (200~250ml)',
      calories: '약 145 kcal',
      tasteNote: '깔끔하고 정갈한 원재료 본연의 가벼운 곡물 풍미',
      recommendation: '아침에 가볍고 속 깔끔하게 시작하고 싶은 분께 추천!',
      sweetness: '★☆☆☆☆',
      body: '★★☆☆☆',
    },
    milk: {
      name: '🥛 고소한 우유 (200~250ml)',
      calories: '약 265 kcal',
      tasteNote: '부드럽고 진하며 고소한 라떼 및 오트 음료 풍미',
      recommendation: '포만감이 오래 가고 묵직하고 고소한 한 끼를 원하는 분께 추천!',
      sweetness: '★★★☆☆',
      body: '★★★★★',
    },
    soymilk: {
      name: '🌱 담백한 두유 (200~250ml)',
      calories: '약 230 kcal',
      tasteNote: '콩의 고소함과 50가지 곡물이 어우러지는 최고의 찰떡궁합',
      recommendation: '더욱 깊고 풍성한 극상의 고소함을 선사하는 베스트 조합!',
      sweetness: '★★★★☆',
      body: '★★★★☆',
    },
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'GlassWater':
        return <GlassWater className="w-7 h-7 sm:w-8 sm:h-8 text-[#1B4332]" />;
      case 'PackageCheck':
        return <PackageCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#1B4332]" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#1B4332]" />;
    }
  };

  return (
    <section id="how-to-eat" className="py-16 sm:py-24 bg-[#F4EFE6] text-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#1B4332] text-base font-bold bg-emerald-100/80 px-4 py-1.5 rounded-full border border-emerald-200">
            <span>🥛 간편 5초 섭취 방법</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight text-balance">
            물이나 우유에 타서 <span className="text-[#1B4332]">맛있게 드세요</span>
          </h2>

          <p className="text-lg sm:text-xl text-stone-700 font-medium leading-relaxed">
            복잡한 준비 과정 없이 텀블러만 있다면 언제 어디서나 5초 만에 건강한 한 끼 완성! 순서대로 쉽게 따라해 보세요.
          </p>
        </div>

        {/* ORDERED STEPS 1 -> 2 -> 3 */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {PREPARATION_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="relative bg-[#FBF8F3] p-6 sm:p-8 rounded-3xl border-2 border-stone-200 shadow-md hover:border-emerald-600 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Step Number Badge */}
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-[#1B4332] text-[#FBF8F3] text-2xl font-black flex items-center justify-center shadow-md">
                    {step.step}
                  </span>
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                    {getStepIcon(step.icon)}
                  </div>
                </div>

                <div className="text-xs font-extrabold text-[#1B4332] tracking-wider uppercase">
                  {step.stepLabel}
                </div>

                <h3 className="text-2xl font-black text-stone-900 leading-snug">
                  {step.title}
                </h3>

                <p className="text-base sm:text-lg text-stone-700 font-medium leading-relaxed">
                  {step.description}
                </p>

              </div>

              {/* Tip Callout */}
              <div className="mt-6 pt-4 border-t border-stone-200 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-xs sm:text-sm font-bold text-emerald-900">
                💡 팁: {step.tip}
              </div>

              {/* Arrow Connector for Desktop (Steps 1 & 2) */}
              {index < 2 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#1B4332] text-white rounded-full items-center justify-center shadow-md">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* INTERACTIVE DRINK / TASTE CALCULATOR SIMULATOR */}
        <div className="mt-16 bg-[#FBF8F3] rounded-3xl p-6 sm:p-10 border-2 border-stone-300/80 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Interactive Panel */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-[#1B4332] tracking-wider uppercase">
                  취향 맞춤 가이드
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
                  어떤 음료와 함께 마실까요?
                </h3>
                <p className="text-stone-600 font-medium text-base">
                  물, 우유, 두유 중 베이스 음료를 선택하시면 맛과 고소함의 특성을 확인하실 수 있습니다.
                </p>
              </div>

              {/* Beverage Selector Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedBase('water')}
                  className={`p-3.5 sm:p-4 rounded-2xl text-center font-black text-base sm:text-lg border-2 transition-all cursor-pointer ${
                    selectedBase === 'water'
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md'
                      : 'bg-[#F4EFE6] text-stone-800 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  💧 차가운 물
                </button>
                <button
                  onClick={() => setSelectedBase('milk')}
                  className={`p-3.5 sm:p-4 rounded-2xl text-center font-black text-base sm:text-lg border-2 transition-all cursor-pointer ${
                    selectedBase === 'milk'
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md'
                      : 'bg-[#F4EFE6] text-stone-800 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  🥛 우유 (추천)
                </button>
                <button
                  onClick={() => setSelectedBase('soymilk')}
                  className={`p-3.5 sm:p-4 rounded-2xl text-center font-black text-base sm:text-lg border-2 transition-all cursor-pointer ${
                    selectedBase === 'soymilk'
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md'
                      : 'bg-[#F4EFE6] text-stone-800 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  🌱 두유
                </button>
              </div>

              {/* Selected Base Result Box */}
              <div className="bg-[#F4EFE6] p-5 sm:p-6 rounded-2xl border border-stone-300 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-300 pb-3">
                  <span className="text-xl sm:text-2xl font-black text-stone-900">
                    {baseDetails[selectedBase].name}
                  </span>
                  <span className="bg-emerald-100 text-[#1B4332] text-sm font-extrabold px-3 py-1 rounded-xl">
                    {baseDetails[selectedBase].calories}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-stone-800 font-bold">
                  {baseDetails[selectedBase].tasteNote}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm font-bold text-stone-700 pt-1">
                  <div>
                    <span className="text-stone-500 block text-xs">고소함 및 당도</span>
                    <span className="text-base text-amber-600">{baseDetails[selectedBase].sweetness}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-xs">바디감 및 포만감</span>
                    <span className="text-base text-emerald-800">{baseDetails[selectedBase].body}</span>
                  </div>
                </div>

                <div className="text-sm font-medium text-stone-700 bg-[#FBF8F3] p-3 rounded-xl border border-stone-200">
                  ✨ {baseDetails[selectedBase].recommendation}
                </div>
              </div>

            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 h-72 sm:h-80 lg:h-full min-h-[320px] relative rounded-2xl overflow-hidden border border-stone-300 shadow-md">
              <img
                src={prepImage}
                alt="우유와 섞는 고소한 생식 유기농 드링크"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
