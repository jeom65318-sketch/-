import React, { useState } from 'react';
import { PRODUCT_BUNDLES } from '../data/saengsikData';
import {
  X,
  CheckCircle2,
  Truck,
  ShoppingBag,
  CreditCard,
  AlertTriangle,
  ShieldCheck,
  Building2,
} from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBundleId?: string;
  initialQuantity?: number;
}

type PaymentMethodType = 'card' | 'naverpay' | 'tosspay' | 'kakaopay' | 'vbank';

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialBundleId = 'bundle-2',
  initialQuantity = 1,
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>(initialBundleId);
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('문 앞에 놓아주세요');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');

  // Pre-filled Card Information for Practice Payment
  const [cardNumber, setCardNumber] = useState('1111-2222-3333-4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('777');

  const [isCompleted, setIsCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentBundle =
    PRODUCT_BUNDLES.find((b) => b.id === selectedBundleId) || PRODUCT_BUNDLES[1];

  const totalPrice = currentBundle.price * quantity;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('주문자 성함을 입력해 주세요.');
      return;
    }
    if (!phone.trim()) {
      alert('연락처를 입력해 주세요.');
      return;
    }
    if (!address.trim()) {
      alert('배송지 주소를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);

    // Generate Order Number format: ORD-20261007-3843
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    const generatedOrderNum = `ORD-${todayStr}-${randDigits}`;

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bundleId: selectedBundleId,
          bundleName: currentBundle.name,
          quantity,
          totalPrice,
          customerName: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          note,
          paymentMethod,
        }),
      });

      const resData = await response.json();

      if (resData.success && resData.order) {
        setOrderNumber(resData.order.orderNumber || generatedOrderNum);
        setIsCompleted(true);
      } else {
        setOrderNumber(generatedOrderNum);
        setIsCompleted(true);
      }
    } catch (err) {
      console.error('Order submit error:', err);
      setOrderNumber(generatedOrderNum);
      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsCompleted(false);
    setName('');
    setPhone('');
    setAddress('');
    onClose();
  };

  const getPaymentMethodName = (pm: PaymentMethodType) => {
    switch (pm) {
      case 'card':
        return '💳 신용/체크카드';
      case 'naverpay':
        return '💚 네이버페이';
      case 'tosspay':
        return '💙 토스페이';
      case 'kakaopay':
        return '💛 카카오페이';
      case 'vbank':
        return '🏦 무통장입금';
      default:
        return '카드결제';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FBF8F3] rounded-3xl border-2 border-stone-300 shadow-2xl my-6 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#1B4332] text-[#FBF8F3] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-300" />
            <h2 className="text-xl sm:text-2xl font-black">하루한잔 연습용 결제 주문하기</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* ORDER SUCCESS STATE ("주문완료" 화면) */}
        {isCompleted ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-[#1B4332] shadow-md">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <div className="inline-block bg-[#1B4332] text-amber-300 font-mono text-lg font-black px-4 py-1.5 rounded-xl shadow-xs">
                주문번호: {orderNumber}
              </div>
              <h3 className="text-3xl font-black text-stone-900">
                주문이 성공적으로 완료되었습니다!
              </h3>
              <p className="text-base sm:text-lg text-stone-700 font-medium">
                신선한 국내산 50가지 곡물채소 생식을 정성스레 포장하여 안전하게 배송해 드리겠습니다.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#F4EFE6] p-5 sm:p-6 rounded-2xl border border-stone-300 text-left space-y-3 shadow-xs">
              <div className="flex justify-between border-b border-stone-300 pb-2 text-stone-800 font-bold text-sm sm:text-base">
                <span>주문 상품</span>
                <span className="font-extrabold text-[#1B4332]">{currentBundle.name} ({quantity}세트)</span>
              </div>
              <div className="flex justify-between border-b border-stone-300 pb-2 text-stone-800 font-bold text-sm sm:text-base">
                <span>수령인 / 연락처</span>
                <span>{name} ({phone})</span>
              </div>
              <div className="flex justify-between border-b border-stone-300 pb-2 text-stone-800 font-bold text-sm sm:text-base">
                <span>배송지 주소</span>
                <span>{address}</span>
              </div>
              <div className="flex justify-between border-b border-stone-300 pb-2 text-stone-800 font-bold text-sm sm:text-base">
                <span>결제 방식</span>
                <span className="text-emerald-800">{getPaymentMethodName(paymentMethod)} (연습용)</span>
              </div>
              <div className="flex justify-between text-[#1B4332] font-black text-xl pt-1">
                <span>최종 결제 금액</span>
                <span className="text-amber-600 text-2xl">{totalPrice.toLocaleString()}원 (무료배송)</span>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-sm font-bold text-emerald-900 flex items-center justify-center gap-2">
              <Truck className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>내일 오전에 바로 택배로 신선 출고될 예정입니다.</span>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full bg-[#1B4332] text-white text-xl font-bold py-4 rounded-2xl shadow-lg hover:bg-[#2D6A4F] transition-all cursor-pointer"
            >
              확인 및 메인화면으로 이동
            </button>
          </div>
        ) : (
          /* PAYMENT & ORDER FORM */
          <form onSubmit={handleSubmitOrder} className="p-5 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
            
            {/* MANDATORY PROMINENT WARNING BANNER */}
            <div className="bg-amber-100 border-2 border-amber-400 p-4 rounded-2xl text-amber-950 font-extrabold text-base sm:text-lg text-center flex items-center justify-center gap-2 shadow-sm">
              <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0" />
              <span>실제로 결제되지 않는 연습용 입니다</span>
            </div>

            {/* Step 1: Select Package */}
            <div className="space-y-2">
              <label className="block text-base sm:text-lg font-extrabold text-stone-900">
                1. 상품 구성 선택
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PRODUCT_BUNDLES.map((bundle) => (
                  <button
                    type="button"
                    key={bundle.id}
                    onClick={() => setSelectedBundleId(bundle.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      selectedBundleId === bundle.id
                        ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                        : 'bg-[#F4EFE6] text-stone-800 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    <div className="text-xs font-black">{bundle.name}</div>
                    <div className={`text-base font-extrabold mt-1 ${selectedBundleId === bundle.id ? 'text-amber-300' : 'text-[#1B4332]'}`}>
                      {bundle.price.toLocaleString()}원
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Customer Address */}
            <div className="space-y-3 pt-2 border-t border-stone-300">
              <label className="block text-base sm:text-lg font-extrabold text-stone-900">
                2. 배송지 정보 입력
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    주문자 성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 엄정옥"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F4EFE6] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    휴대폰 번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="예: 010-4410-6063"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F4EFE6] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  배송지 주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 충주시 충인6길29-1"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#F4EFE6] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  배송 요청사항
                </label>
                <select
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-[#F4EFE6] border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                >
                  <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                  <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                  <option value="배송 전 전화 부탁드립니다">배송 전 전화 부탁드립니다</option>
                  <option value="직접 수령하겠습니다">직접 수령하겠습니다</option>
                </select>
              </div>
            </div>

            {/* Step 3: 연습용 결제 수단 선택 (Card, Naver, Toss, Kakao, VBank) */}
            <div className="space-y-3 pt-2 border-t border-stone-300">
              <label className="block text-base sm:text-lg font-extrabold text-stone-900">
                3. 결제 수단 선택 (네이버 · 토스 · 카카오 · 카드)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 px-2 rounded-xl text-center text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#1B4332] text-white border-[#1B4332]'
                      : 'bg-[#F4EFE6] text-stone-800 border-stone-300'
                  }`}
                >
                  💳 카드결제
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('naverpay')}
                  className={`py-2.5 px-2 rounded-xl text-center text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
                    paymentMethod === 'naverpay'
                      ? 'bg-[#03C75A] text-white border-[#03C75A]'
                      : 'bg-[#F4EFE6] text-stone-800 border-stone-300'
                  }`}
                >
                  💚 네이버페이
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('tosspay')}
                  className={`py-2.5 px-2 rounded-xl text-center text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
                    paymentMethod === 'tosspay'
                      ? 'bg-[#0064FF] text-white border-[#0064FF]'
                      : 'bg-[#F4EFE6] text-stone-800 border-stone-300'
                  }`}
                >
                  💙 토스페이
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('kakaopay')}
                  className={`py-2.5 px-2 rounded-xl text-center text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
                    paymentMethod === 'kakaopay'
                      ? 'bg-[#FEE500] text-stone-900 border-[#FEE500]'
                      : 'bg-[#F4EFE6] text-stone-800 border-stone-300'
                  }`}
                >
                  💛 카카오페이
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('vbank')}
                  className={`py-2.5 px-2 rounded-xl text-center text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
                    paymentMethod === 'vbank'
                      ? 'bg-[#1B4332] text-white border-[#1B4332]'
                      : 'bg-[#F4EFE6] text-stone-800 border-stone-300'
                  }`}
                >
                  🏦 무통장입금
                </button>
              </div>

              {/* PAYMENT METHOD DETAILED SUB-FORM */}
              {paymentMethod === 'card' && (
                <div className="bg-[#F4EFE6] p-4 rounded-2xl border border-stone-300 space-y-3">
                  <div className="text-xs font-bold text-stone-600 flex items-center justify-between">
                    <span>연습용 카드정보 (미리 입력되어 있습니다)</span>
                    <span className="text-emerald-800 font-extrabold">체크/신용카드</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      카드번호 (1111-2222-3333-4444)
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-stone-900 font-mono font-bold text-base focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        유효기간 (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-stone-900 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        CVC (3자리)
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-stone-900 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'naverpay' && (
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-900 space-y-1">
                  <div className="text-sm font-extrabold text-[#03C75A]">💚 네이버페이 연습용 결제</div>
                  <div>네이버 포인트/수단 연동 테스트용입니다. 실제로 금액이 청구되지 않습니다.</div>
                </div>
              )}

              {paymentMethod === 'tosspay' && (
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-xs font-bold text-blue-900 space-y-1">
                  <div className="text-sm font-extrabold text-[#0064FF]">💙 토스페이 연습용 결제</div>
                  <div>토스앱 원클릭 승인 테스트용입니다. 실제로 금액이 청구되지 않습니다.</div>
                </div>
              )}

              {paymentMethod === 'kakaopay' && (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs font-bold text-amber-950 space-y-1">
                  <div className="text-sm font-extrabold text-amber-900">💛 카카오페이 연습용 결제</div>
                  <div>카카오톡 간편결제 테스트용입니다. 실제로 금액이 청구되지 않습니다.</div>
                </div>
              )}

              {paymentMethod === 'vbank' && (
                <div className="bg-[#F4EFE6] p-4 rounded-2xl border border-stone-300 text-xs font-bold text-stone-800 space-y-1">
                  <div className="text-sm font-extrabold text-[#1B4332]">🏦 가상계좌 무통장입금 (연습용)</div>
                  <div>입금계좌: 국민은행 111102-04-293849 (예금주: 하루한잔)</div>
                  <div className="text-stone-500 font-medium">연습용이므로 실제 입금을 하지 않으셔도 자동 처리됩니다.</div>
                </div>
              )}
            </div>

            {/* Price Summary & Submit Button */}
            <div className="bg-[#1B4332] text-white p-5 rounded-2xl space-y-2 shadow-md">
              <div className="flex justify-between text-sm text-emerald-200 font-bold">
                <span>주문 구성</span>
                <span>{currentBundle.name} ({quantity}세트)</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-amber-300 pt-1 border-t border-emerald-800">
                <span>최종 결제 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
            </div>

            {/* MANDATORY PAYMENT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-2xl sm:text-3xl font-black py-5 rounded-2xl shadow-xl transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? '연습용 결제 처리 중...' : `${totalPrice.toLocaleString()}원 결제하기`}
            </button>

            <div className="text-center text-xs font-bold text-stone-500">
              🔒 안전한 연습용 가짜 결제 시스템입니다 (실제 과금 0원)
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
