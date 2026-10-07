import React from 'react';
import { TARGET_AUDIENCES } from '../data/saengsikData';
import { Sun, Clock, HeartHandshake, CheckCircle } from 'lucide-react';

export const TargetAudienceSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />;
      case 'Clock':
        return <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-700" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-8 h-8 sm:w-10 sm:h-10 text-stone-700" />;
    }
  };

  return (
    <section id="target-audience" className="py-16 sm:py-24 bg-[#FBF8F3] text-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#1B4332] text-base font-bold bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
            <span>💚 맞춤형 식사 대용 솔루션</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight text-balance">
            이런 분께 <span className="text-[#1B4332]">적극 추천</span>합니다
          </h2>

          <p className="text-lg sm:text-xl text-stone-700 font-medium leading-relaxed">
            바쁜 하루 속 식사를 자꾸만 미루거나 대충 때우고 계신가요? 하루한잔 생식이 여러분의 하루를 더 든든하고 속 편하게 채워드립니다.
          </p>
        </div>

        {/* 3 Key Target Audience Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TARGET_AUDIENCES.map((item) => (
            <div
              key={item.id}
              className="bg-[#F4EFE6] p-6 sm:p-8 rounded-3xl border-2 border-stone-200/90 shadow-md hover:shadow-xl hover:border-emerald-600 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-5">
                
                {/* Header Tag & Icon */}
                <div className="flex items-center justify-between">
                  <span className="bg-[#1B4332] text-[#FBF8F3] text-sm font-extrabold px-3.5 py-1 rounded-xl shadow-xs">
                    {item.badge}
                  </span>
                  <div className="p-3 bg-[#FBF8F3] rounded-2xl border border-stone-200 group-hover:scale-110 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                </div>

                {/* Card Title & Subtitle */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-sm sm:text-base font-bold text-emerald-800 mt-1">
                    대상: {item.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-stone-700 font-medium leading-relaxed">
                  {item.description}
                </p>

              </div>

              {/* Bottom Checklist Line */}
              <div className="pt-6 mt-6 border-t border-stone-300/80 flex items-center gap-2 text-stone-800 text-sm sm:text-base font-bold">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>간편 스틱 1포로 고민 해결!</span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner summary callout */}
        <div className="mt-12 p-6 sm:p-8 bg-[#1B4332] text-[#FBF8F3] rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-2xl sm:text-3xl font-extrabold">내 가족이 마시는 마음으로 엄선했습니다</h4>
            <p className="text-base sm:text-lg text-emerald-100 font-medium">
              국내산 50가지 원재료의 정성스러움으로 하루 한 잔의 든든함을 선물하세요.
            </p>
          </div>
          <a
            href="#product-order"
            className="shrink-0 bg-[#FBF8F3] hover:bg-stone-100 text-[#1B4332] text-lg sm:text-xl font-black px-8 py-4 rounded-2xl shadow-md hover:scale-105 transition-all"
          >
            상품 구성 보기
          </a>
        </div>

      </div>
    </section>
  );
};
