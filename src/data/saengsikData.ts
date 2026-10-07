export interface Ingredient {
  name: string;
  category: '곡물' | '채소' | '과일씨앗' | '해조류' | '자연원료';
  origin: string;
  description: string;
  icon?: string;
}

export const INGREDIENT_CATEGORIES = [
  { id: 'all', label: '전체 (50가지)' },
  { id: '곡물', label: '🌾 통곡물·잡곡 (15종)' },
  { id: '채소', label: '🥬 야채·뿌리채소 (18종)' },
  { id: '과일씨앗', label: '🍇 과일·견과 (9종)' },
  { id: '해조류', label: '🌊 해조류 (4종)' },
  { id: '자연원료', label: '🍃 자연원료 (4종)' },
];

export const INGREDIENTS_LIST: Ingredient[] = [
  // 통곡물 15종
  { name: '현미', category: '곡물', origin: '국내산 100%', description: '구수한 자연의 깊은 맛' },
  { name: '발아현미', category: '곡물', origin: '국내산 100%', description: '부드럽고 풍부한 식감' },
  { name: '보리', category: '곡물', origin: '국내산 100%', description: '속이 깔끔하고 시원한 곡물' },
  { name: '찰보리', category: '곡물', origin: '국내산 100%', description: '쫀득함과 고소함 증진' },
  { name: '흑미', category: '곡물', origin: '국내산 100%', description: '진한 구수함과 자연의 풍미' },
  { name: '수수', category: '곡물', origin: '국내산 100%', description: '전통 건강 곡물의 은은한 향' },
  { name: '조', category: '곡물', origin: '국내산 100%', description: '소화가 잘되는 순한 미곡' },
  { name: '메밀', category: '곡물', origin: '국내산 100%', description: '깔끔하고 정갈한 깔끔한 맛' },
  { name: '귀리(오트밀)', category: '곡물', origin: '국내산 100%', description: '든든함을 올려주는 슈퍼푸드' },
  { name: '율무', category: '곡물', origin: '국내산 100%', description: '자연 고소함의 결정체' },
  { name: '대두(백태)', category: '곡물', origin: '국내산 100%', description: '풍부한 단백한 고소함' },
  { name: '검은콩(서리태)', category: '곡물', origin: '국내산 100%', description: '깊고 진한 풍미의 대표 콩' },
  { name: '팥', category: '곡물', origin: '국내산 100%', description: '은은한 단맛과 깔끔한 목넘김' },
  { name: '녹두', category: '곡물', origin: '국내산 100%', description: '시원하고 개운한 자연 곡식' },
  { name: '차조', category: '곡물', origin: '국내산 100%', description: '부드러운 식감을 돕는 곡물' },

  // 야채/뿌리채소 18종
  { name: '케일', category: '채소', origin: '국내산 100%', description: '신선한 녹색 채소의 대표' },
  { name: '신선초', category: '채소', origin: '국내산 100%', description: '싱그러운 풀내음과 맑은 향' },
  { name: '시금치', category: '채소', origin: '국내산 100%', description: '부드러운 영양 잎채소' },
  { name: '당근', category: '채소', origin: '국내산 100%', description: '은은하게 감도는 기분 좋은 단맛' },
  { name: '단호박', category: '채소', origin: '국내산 100%', description: '달콤함과 노란 빛깔' },
  { name: '양배추', category: '채소', origin: '국내산 100%', description: '속이 편안한 대표 속채소' },
  { name: '브로콜리', category: '채소', origin: '국내산 100%', description: '아삭하고 깔끔한 신선 채소' },
  { name: '무청(시래기)', category: '채소', origin: '국내산 100%', description: '전통의 구수한 정성 재료' },
  { name: '연근', category: '채소', origin: '국내산 100%', description: '담백한 뿌리채소의 깊은 맛' },
  { name: '우엉', category: '채소', origin: '국내산 100%', description: '구수한 향이 깊은 땅의 선물' },
  { name: '마', category: '채소', origin: '국내산 100%', description: '부드러운 목넘김을 돕는 뿌리' },
  { name: '솔잎', category: '채소', origin: '국내산 100%', description: '은은하게 감도는 상쾌한 솔향' },
  { name: '쑥', category: '채소', origin: '국내산 100%', description: '봄날의 향긋하고 정갈한 향' },
  { name: '대파', category: '채소', origin: '국내산 100%', description: '감칠맛을 다져주는 신선 재료' },
  { name: '마늘', category: '채소', origin: '국내산 100%', description: '자연 풍미를 극대화하는 재료' },
  { name: '양파', category: '채소', origin: '국내산 100%', description: '은은한 감칠 단맛' },
  { name: '미나리', category: '채소', origin: '국내산 100%', description: '산뜻하고 깨끗한 향' },
  { name: '표고버섯', category: '채소', origin: '국내산 100%', description: '깊고 풍부한 자연 감칠맛' },

  // 과일/견과 9종
  { name: '사과', category: '과일씨앗', origin: '국내산 100%', description: '새콤달콤한 과일의 정수' },
  { name: '배', category: '과일씨앗', origin: '국내산 100%', description: '시원하고 맑은 단맛' },
  { name: '감', category: '과일씨앗', origin: '국내산 100%', description: '자연 숙성의 은은한 부드러움' },
  { name: '감귤', category: '과일씨앗', origin: '국내산 100%', description: '상큼함을 더해주는 비타민 과일' },
  { name: '해바라기씨', category: '과일씨앗', origin: '국내산 100%', description: '고소한 식감의 씨앗' },
  { name: '호박씨', category: '과일씨앗', origin: '국내산 100%', description: '씹는 고소함이 풍부한 씨앗' },
  { name: '호두', category: '과일씨앗', origin: '국내산 100%', description: '진한 풍미의 원두 견과' },
  { name: '아몬드', category: '과일씨앗', origin: '국내산 100%', description: '바삭하고 담백한 견과' },
  { name: '볶은참깨', category: '과일씨앗', origin: '국내산 100%', description: '마지막까지 감도는 극상의 고소함' },

  // 해조류 4종
  { name: '다시마', category: '해조류', origin: '국내산 100%', description: '바다의 자연 감칠맛' },
  { name: '미역', category: '해조류', origin: '국내산 100%', description: '부드럽고 맑은 미네랄 미역' },
  { name: '톳', category: '해조류', origin: '국내산 100%', description: '자연 바다의 참맛' },
  { name: '김', category: '해조류', origin: '국내산 100%', description: '구수한 향이 은은한 전통 해조류' },

  // 자연원료 4종
  { name: '자일로스설탕', category: '자연원료', origin: '국내산', description: '자연 흡수를 줄인 건강한 은은한 단맛' },
  { name: '프락토올리고당', category: '자연원료', origin: '국내산', description: '부드러운 유기농 당원' },
  { name: '신안 천일염', category: '자연원료', origin: '국내산 100%', description: '맛의 균형을 잡아주는 명품 소금' },
  { name: '유산균배양분말', category: '자연원료', origin: '국내산', description: '속 편한 마무리를 돕는 혼합분말' },
];

export const TARGET_AUDIENCES = [
  {
    id: 1,
    badge: '추천 01',
    title: '아침을 자꾸 거르는 분',
    subtitle: '직장인 · 학생 · 수험생',
    description: '출근/등교로 1분 1초가 아까운 바쁜 아침! 물이나 우유에 타서 5초 만에 마시면 허기지지 않고 든든한 하루를 시작할 수 있습니다.',
    iconName: 'Sun',
    accentColor: 'emerald',
  },
  {
    id: 2,
    badge: '추천 02',
    title: '끼니 챙기기 번거로운 분',
    subtitle: '1인 가구 · 맞벌이 부부',
    description: '매번 뭘 먹을지 고민하거나 요리 후 설거지하기 귀찮을 때! 개별 스틱 1포로 장소 제약 없이 언제 어디서나 깔끔하게 한 끼를 해결하세요.',
    iconName: 'Clock',
    accentColor: 'amber',
  },
  {
    id: 3,
    badge: '추천 03',
    title: '속이 편안한 한 끼를 찾는 분',
    subtitle: '부모님 · 담백한 맛 선호자',
    description: '자극적이고 기름진 패스트푸드가 부담스러울 때, 국내산 50가지 곡물과 채소의 순수한 고소함으로 뱃속 편안하고 가벼운 든든함을 경험해보세요.',
    iconName: 'HeartHandshake',
    accentColor: 'stone',
  },
];

export const PREPARATION_STEPS = [
  {
    step: 1,
    stepLabel: 'STEP 01',
    title: '물 또는 우유 200~250ml 준비',
    description: '텀블러나 컵에 물, 우유, 또는 두유를 기호에 맞게 알맞은 양(200~250ml)만큼 부어줍니다.',
    tip: '차가운 음료에도 아주 부드럽게 잘 녹습니다!',
    icon: 'GlassWater',
  },
  {
    step: 2,
    stepLabel: 'STEP 02',
    title: '하루한잔 생식 1포(40g) 넣기',
    description: '이지컷 스틱형 파우치를 뜯어 50가지 국내산 정성 곡물채소 가루를 용기에 가볍게 털어 넣습니다.',
    tip: '1포 40g 대용량으로 속이 속 채워지는 든든함!',
    icon: 'PackageCheck',
  },
  {
    step: 3,
    stepLabel: 'STEP 03',
    title: '흔들거나 저어서 맛있게 마시기',
    description: '텀블러 뚜껑을 닫고 10초간 가볍게 흔들거나, 스푼으로 잘 저어서 고소하게 섭취합니다.',
    tip: '취향에 따라 꿀 1스푼을 첨가하면 더욱 달콤 고소합니다.',
    icon: 'Sparkles',
  },
];

export const PRODUCT_BUNDLES = [
  {
    id: 'bundle-1',
    name: '1박스 (30포 / 1개월분)',
    price: 38000,
    originalPrice: 45000,
    discountRate: 15,
    perSachetPrice: 1260,
    shippingFee: 0,
    badge: '기본 구성',
    giftNote: '무료배송 혜택',
    recommended: false,
  },
  {
    id: 'bundle-2',
    name: '2박스 세트 (60포 / 2개월분)',
    price: 72000,
    originalPrice: 90000,
    discountRate: 20,
    perSachetPrice: 1200,
    shippingFee: 0,
    badge: '🔥 제일 인기',
    giftNote: '무료배송 + 전용 쉐이커 보틀 무료 증정!',
    recommended: true,
  },
  {
    id: 'bundle-3',
    name: '3박스 세트 (90포 / 3개월분)',
    price: 102000,
    originalPrice: 135000,
    discountRate: 24,
    perSachetPrice: 1130,
    shippingFee: 0,
    badge: '최대 할인',
    giftNote: '무료배송 + 전용 쉐이커 2개 무료 증정!',
    recommended: false,
  },
];

export const REVIEWS_LIST = [
  {
    id: 1,
    author: '김민지 님',
    rating: 5,
    date: '2026.10.02',
    bundleName: '2박스 세트 구매',
    comment: '바쁜 아침 출근길에 우유에 타서 마시는데 진짜 너무 고소하고 맛있어요! 속도 안 부대끼고 점심때까지 든든해서 아침마다 꼭 챙겨먹습니다.',
  },
  {
    id: 2,
    author: '박성호 님',
    rating: 5,
    date: '2026.09.28',
    bundleName: '3박스 세트 구매',
    comment: '국내산 50가지나 들어갔다고 해서 부모님 선물로 드렸는데 너무 만족해하세요. 당도가 과하지 않고 고소한 미숫가루 느낌이라 질리지 않습니다.',
  },
  {
    id: 3,
    author: '이수진 님',
    rating: 5,
    date: '2026.09.20',
    bundleName: '1박스 구매 후 재구매',
    comment: '스틱 형태라서 가방에 쏙 넣어가기 편해요. 사무실에서 배고플 때 두유에 타서 마시면 딱 좋습니다. 배송도 빠르고 사은품 쉐이커도 튼튼해요!',
  },
];

export const FAQ_LIST = [
  {
    q: '하루한잔 생식은 일반 미숫가루와 무엇이 다른가요?',
    a: '일반 미숫가루는 주로 볶은 곡물 몇 가지로 만들어지지만, 하루한잔 생식은 국내산 50가지 통곡물, 신선 야채, 과일, 해조류, 씨앗을 엄선하여 정성스럽게 동결건조 및 미세분쇄하여 원재료의 풍미와 식감을 그대로 살렸습니다.',
  },
  {
    q: '어떻게 보관해야 하나요?',
    a: '개별 이지컷 스틱 파우치 포장으로 습기와 공기를 완벽히 차단했습니다. 직사광선을 피해 서늘하고 건조한 곳에 보관하시면 유통기한(제조일로부터 12개월) 동안 신선하게 드실 수 있습니다.',
  },
  {
    q: '아이들이나 어르신이 드셔도 괜찮은가요?',
    a: '네, 100% 국내산 자연 곡물과 채소로 만든 일반 식품이므로 온 가족 남녀노소 누구나 안심하고 섭취하실 수 있습니다. 우유나 꿀을 조금 넣어 드시면 어린이들도 아주 잘 마십니다.',
  },
  {
    q: '배송은 얼마나 걸리나요?',
    a: '평일 오후 2시 이전 결제 완료 건은 당일 출고되며, 대부분 다음날(1~2일 이내) 안전하게 택배로 받아보실 수 있습니다. 전 상품 무료배송 혜택을 제공합니다.',
  },
];
