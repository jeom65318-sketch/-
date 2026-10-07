import React, { useState } from 'react';
import { FAQ_LIST } from '../data/saengsikData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-[#FBF8F3] text-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-[#1B4332] text-sm font-bold bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>궁금하신 점을 확인해보세요</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-stone-900">
            자주 묻는 질문 (FAQ)
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_LIST.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F4EFE6] rounded-2xl border border-stone-200/90 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-200/40 transition-colors"
                >
                  <span className="text-lg sm:text-xl font-bold text-stone-900">
                    Q. {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FBF8F3] flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#1B4332] text-white' : 'text-stone-700'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 sm:p-6 pt-0 text-base sm:text-lg text-stone-700 font-medium border-t border-stone-300/60 leading-relaxed bg-[#FBF8F3]/60">
                    A. {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
