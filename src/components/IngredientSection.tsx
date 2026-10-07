import React, { useState } from 'react';
import { INGREDIENT_CATEGORIES, INGREDIENTS_LIST } from '../data/saengsikData';
import { Search, Sparkles, MapPin, Layers } from 'lucide-react';
import ingredientsImage from '../assets/images/saengsik_50_ingredients_1791342210306.jpg';
import { NutrientChart } from './NutrientChart';

export const IngredientSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredIngredients = INGREDIENTS_LIST.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.includes(searchQuery) || item.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-[#F4EFE6] text-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#1B4332] text-base font-bold bg-emerald-100/80 px-4 py-1.5 rounded-full border border-emerald-200">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <span>원산지 100% 국내산 정성 재료</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight text-balance">
            국내산 <span className="text-[#1B4332] underline decoration-emerald-500/50 decoration-4">50가지 자연 곡물과 채소</span>의 깊은 고소함
          </h2>

          <p className="text-lg sm:text-xl text-stone-700 font-medium leading-relaxed">
            땅의 정기를 가득 담은 50가지 곡물, 신선한 야채, 과일, 해조류를 하나하나 까다롭게 엄선하여 담았습니다. 영양소 파괴를 최소화하는 정성 공법으로 자연 그대로의 풍미를 전달합니다.
          </p>
        </div>

        {/* Feature Image Banner */}
        <div className="mt-10 mb-12 relative rounded-3xl overflow-hidden shadow-xl border-2 border-stone-300/80 bg-[#FBF8F3]">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-6 p-6 sm:p-10 space-y-4">
              <span className="text-sm font-extrabold text-[#1B4332] tracking-wider uppercase">
                Natural Blend 50
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                인공 첨가물 없이, 오직 100% 국산 자연 원재료
              </h3>
              <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-medium">
                합성 보존료, 인공 향료, 색소를 단 1%도 넣지 않았습니다. 농가에서 직접 정성스레 수확한 50가지 원재료가 어우러져 목넘김이 깔끔하고 자연 고소한 맛을 선사합니다.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-sm font-bold text-stone-700">
                <span className="bg-emerald-100 text-[#1B4332] px-3 py-1 rounded-lg">#통곡물15종</span>
                <span className="bg-emerald-100 text-[#1B4332] px-3 py-1 rounded-lg">#신선야채18종</span>
                <span className="bg-emerald-100 text-[#1B4332] px-3 py-1 rounded-lg">#과일견과9종</span>
                <span className="bg-emerald-100 text-[#1B4332] px-3 py-1 rounded-lg">#해조류4종</span>
              </div>
            </div>
            <div className="md:col-span-6 h-64 sm:h-80 md:h-full min-h-[280px] relative">
              <img
                src={ingredientsImage}
                alt="국내산 50가지 곡물과 채소 원재료"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-300 pb-4">
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              {INGREDIENT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm sm:text-base font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#1B4332] text-white shadow-md'
                      : 'bg-[#FBF8F3] text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="재료 검색 (예: 케일, 검은콩)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FBF8F3] border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-sm sm:text-base text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              />
            </div>

          </div>

          {/* Ingredient Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredIngredients.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FBF8F3] p-4 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
                    <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      {item.origin}
                    </span>
                    <span className="text-stone-400">{item.category}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-stone-900 mt-1">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredIngredients.length === 0 && (
            <div className="text-center py-12 bg-[#FBF8F3] rounded-2xl border border-dashed border-stone-300">
              <p className="text-lg font-bold text-stone-600">검색어와 일치하는 재료가 없습니다.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-sm font-bold text-[#1B4332] underline cursor-pointer"
              >
                전체 50가지 재료 목록 보기
              </button>
            </div>
          )}
        </div>

        {/* Recharts Nutrient Visualization Chart */}
        <NutrientChart />

      </div>
    </section>
  );
};
