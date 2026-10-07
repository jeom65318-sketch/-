import React from 'react';
import { Leaf, ShieldCheck, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1B4332] text-[#FBF8F3] pt-12 pb-24 md:pb-12 border-t border-emerald-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-emerald-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-2xl font-black text-white">
              <span className="p-1.5 bg-emerald-700 text-white rounded-xl">
                <Leaf className="w-6 h-6" />
              </span>
              <span>하루한잔 생식</span>
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed max-w-sm">
              국내산 50가지 정성 곡물과 신선 야채를 자연 그대로 담아낸 식사대용 생식 브랜드입니다. 바쁜 하루를 더 간편하고 든든하게 채워드립니다.
            </p>
          </div>

          {/* Customer Support */}
          <div className="md:col-span-4 space-y-2 text-sm text-emerald-100 font-medium">
            <div className="text-base font-bold text-white mb-2">고객만족센터</div>
            <div className="text-2xl font-black text-amber-300">1588-0000</div>
            <div>운영시간: 평일 09:00 ~ 18:00 (점심시간 12:00~13:00)</div>
            <div>주말 및 공휴일 휴무 / 카카오톡 24시간 문의가능</div>
          </div>

          {/* Certification Badge */}
          <div className="md:col-span-3 space-y-2 text-xs text-emerald-200">
            <div className="text-base font-bold text-white mb-2">품질 및 안심인증</div>
            <div className="flex items-center gap-2 bg-emerald-800/60 p-3 rounded-xl border border-emerald-700">
              <ShieldCheck className="w-6 h-6 text-emerald-300 shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">HACCP 안전관리인증</div>
                <div>위생적인 현대식 제조공정</div>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Food Disclaimer Notice */}
        <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800 text-xs text-emerald-200/90 leading-relaxed space-y-1">
          <p className="font-bold text-emerald-100">※ 일반식품(생식) 안내</p>
          <p>
            본 제품은 질병의 예방 및 치료를 위한 의약품 또는 건강기능식품이 아닌, 국내산 농산물 50가지를 원료로 한 일반가공식품(생식)입니다.
          </p>
        </div>

        {/* Copyright & Unboxed Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300 font-medium">
          <div>© 2026 하루한잔 생식 All Rights Reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-white transition-colors font-bold">개인정보처리방침</a>
            <span aria-hidden="true">·</span>
            <a href="#product-order" className="hover:text-white transition-colors">주문안내</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
