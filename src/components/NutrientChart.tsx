import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { BarChart3, PieChart as PieIcon, Info } from 'lucide-react';

// Data 1: 1포(40g) 당 주요 영양 함량 (g)
const SERVING_NUTRIENT_DATA = [
  { name: '복합탄수화물', amount: 22.5, unit: 'g', color: '#1B4332', desc: '천천히 소화되어 든든한 에너지원' },
  { name: '식물성 단백질', amount: 7.8, unit: 'g', color: '#2D6A4F', desc: '국내산 콩·귀리 유래 양질의 단백질' },
  { name: '자연 식이섬유', amount: 6.4, unit: 'g', color: '#52B788', desc: '풍부한 속 편한 50가지 식이섬유' },
  { name: '불포화지방산', amount: 2.1, unit: 'g', color: '#B7E4C7', desc: '견과·씨앗류의 착한 식물성 지방' },
  { name: '당류(자연유래)', amount: 1.2, unit: 'g', color: '#D8F3DC', desc: '원재료의 은은한 자연 단맛' },
];

// Data 2: 원재료 그룹별 평균 식이섬유 & 단백질 함량 비교 (100g 당 지표)
const CATEGORY_COMPARISON_DATA = [
  { category: '통곡물(15종)', protein: 12.5, fiber: 9.8, minerals: 3.2 },
  { category: '야채류(18종)', protein: 8.2, fiber: 18.5, minerals: 6.5 },
  { category: '견과·과일(9종)', protein: 15.4, fiber: 8.2, minerals: 4.1 },
  { category: '해조류(4종)', protein: 10.1, fiber: 28.0, minerals: 12.4 },
];

// Data 3: 50가지 원재료 비율 (Pie Chart)
const INGREDIENT_RATIO_DATA = [
  { name: '통곡물·잡곡 (15종)', value: 45, color: '#1B4332' },
  { name: '신선 야채·뿌리채소 (18종)', value: 30, color: '#2D6A4F' },
  { name: '과일·견과·씨앗 (9종)', value: 15, color: '#52B788' },
  { name: '바다 해조류 (4종)', value: 6, color: '#74C69D' },
  { name: '기타 자연원료 (4종)', value: 4, color: '#95D5B2' },
];

export const NutrientChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'serving' | 'ratio' | 'compare'>('serving');

  return (
    <div className="mt-12 bg-[#FBF8F3] rounded-3xl p-6 sm:p-10 border-2 border-stone-300 shadow-xl space-y-6">
      
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#1B4332] bg-emerald-100 px-3 py-1 rounded-md mb-1">
            <BarChart3 className="w-4 h-4 text-emerald-800" />
            <span>영양 성분 시각화 리포트</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
            곡물과 채소가 만든 자연 영양 밸런스
          </h3>
          <p className="text-stone-600 text-sm sm:text-base font-medium mt-1">
            하루한잔 1포(40g)에 균형있게 담긴 국내산 50가지 원재료의 영양 함량을 확인해보세요.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-[#F4EFE6] p-1.5 rounded-2xl border border-stone-300 shrink-0 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('serving')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'serving'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            1포(40g) 영양구성
          </button>
          <button
            onClick={() => setActiveTab('ratio')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'ratio'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            50가지 원재료 비율
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'compare'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            원재료군 영양비교
          </button>
        </div>
      </div>

      {/* CHART RENDER TAB 1: 1포(40g) 영양 함량 (BarChart) */}
      {activeTab === 'serving' && (
        <div className="space-y-6">
          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={SERVING_NUTRIENT_DATA}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#292524', fontSize: 13, fontWeight: 700 }}
                  axisLine={{ stroke: '#D6D3D1' }}
                />
                <YAxis
                  unit="g"
                  tick={{ fill: '#78716C', fontSize: 12 }}
                  axisLine={{ stroke: '#D6D3D1' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1B4332] text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                          <p className="font-extrabold text-sm text-amber-300">{data.name}</p>
                          <p className="font-bold text-base">{data.amount}g (1포 40g 당)</p>
                          <p className="text-emerald-100 font-medium">{data.desc}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  {SERVING_NUTRIENT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Key Insights Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SERVING_NUTRIENT_DATA.slice(0, 4).map((item, i) => (
              <div key={i} className="bg-[#F4EFE6] p-3.5 rounded-2xl border border-stone-200">
                <span className="text-xs font-extrabold text-stone-500 block">{item.name}</span>
                <span className="text-xl font-black text-[#1B4332] block mt-0.5">{item.amount}g</span>
                <span className="text-xs text-stone-600 font-medium line-clamp-1 mt-0.5">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHART RENDER TAB 2: 50가지 원재료 비율 (PieChart) */}
      {activeTab === 'ratio' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-4">
          <div className="md:col-span-6 h-72 sm:h-80 w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INGREDIENT_RATIO_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {INGREDIENT_RATIO_DATA.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1B4332] text-white p-3 rounded-xl shadow-lg text-xs space-y-1">
                          <p className="font-bold text-amber-300">{data.name}</p>
                          <p className="text-sm font-black">배합 비율: {data.value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="md:col-span-6 space-y-3">
            <h4 className="text-lg font-black text-stone-900 border-b border-stone-200 pb-2">
              황금 배합 비율 레시피
            </h4>
            <div className="space-y-2">
              {INGREDIENT_RATIO_DATA.map((ratio, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#F4EFE6] rounded-xl text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block shrink-0"
                      style={{ backgroundColor: ratio.color }}
                    />
                    <span className="text-stone-800">{ratio.name}</span>
                  </div>
                  <span className="text-[#1B4332] font-black">{ratio.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHART RENDER TAB 3: 원재료군 영양 비교 (Grouped BarChart) */}
      {activeTab === 'compare' && (
        <div className="space-y-4">
          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CATEGORY_COMPARISON_DATA}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="category"
                  tick={{ fill: '#292524', fontSize: 13, fontWeight: 700 }}
                  axisLine={{ stroke: '#D6D3D1' }}
                />
                <YAxis unit="g" tick={{ fill: '#78716C', fontSize: 12 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#1B4332] text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                          <p className="font-extrabold text-amber-300 text-sm">{payload[0].payload.category}</p>
                          <p className="text-emerald-100">식물성 단백질: {payload[0]?.value}g</p>
                          <p className="text-emerald-200">자연 식이섬유: {payload[1]?.value}g</p>
                          <p className="text-[#95D5B2]">천연 미네랄: {payload[2]?.value}g</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12, fontWeight: 700 }} />
                <Bar dataKey="protein" name="식물성 단백질 (g)" fill="#1B4332" radius={[6, 6, 0, 0]} />
                <Bar dataKey="fiber" name="자연 식이섬유 (g)" fill="#52B788" radius={[6, 6, 0, 0]} />
                <Bar dataKey="minerals" name="천연 미네랄 (g)" fill="#B7E4C7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Footnote Notice */}
      <div className="flex items-center gap-2 bg-[#F4EFE6] p-3.5 rounded-2xl text-xs font-bold text-stone-600 border border-stone-200">
        <Info className="w-4 h-4 text-emerald-800 shrink-0" />
        <span>
          상기 영양 정보는 100% 국내산 자연 원재료 50가지의 평균 공인 자성분 분석 수치를 기반으로 작성되었습니다. (일반가공식품 기준)
        </span>
      </div>

    </div>
  );
};
