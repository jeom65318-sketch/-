import React from 'react';
import { REVIEWS_LIST } from '../data/saengsikData';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#F4EFE6] text-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-100 px-3.5 py-1 rounded-full text-sm font-extrabold border border-amber-200">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>고객 만족도 4.9 / 5.0 (누적 후기 1,280건)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-stone-900">
            실제 드셔보신 고객님들의 솔직한 후기
          </h2>

          <p className="text-stone-700 font-medium text-lg">
            국내산 50가지 원재료의 정성과 은은한 고소함, 간편함을 경험하신 분들의 후기입니다.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_LIST.map((review) => (
            <div
              key={review.id}
              className="bg-[#FBF8F3] p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-500" />
                  ))}
                </div>

                <p className="text-stone-800 font-medium text-base leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs sm:text-sm text-stone-500 font-bold">
                <div className="flex items-center gap-1.5 text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{review.author}</span>
                </div>
                <span className="text-stone-400">{review.bundleName}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
