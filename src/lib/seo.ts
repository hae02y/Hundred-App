import { AppConfig } from '@/types/app-config';

export type SeoSection = {
  heading: string;
  body: string;
};

export type SeoFaq = {
  question: string;
  answer: string;
};

export type AppSeoContent = {
  summary: string;
  sections: SeoSection[];
  faqs: SeoFaq[];
};

const DEFAULT_SITE_URL = 'http://localhost:3000';
const NEXT_PUBLIC_SITE_URL = 'https://hundred-app.vercel.app';

const seoOverrides: Record<string, Partial<AppSeoContent>> = {
  'roulette-01': {
    summary: '점심 메뉴를 빠르게 결정해야 할 때 고민 시간을 줄여주는 랜덤 선택 도구입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '버튼을 눌러 후보 메뉴를 확인하고, 바로 이동해도 좋아요.',
      },
      {
        heading: '활용 팁',
        body: '전날 먹은 메뉴는 제외하고 다시 돌려보세요.',
      },
      {
        heading: '추천 대상',
        body: '점심 메뉴를 빠르게 정해야 하는 직장인과 학생에게 유용합니다.',
      },
    ],
    faqs: [
      {
        question: '매일 사용해도 되나요?',
        answer: '네, 제한 없이 사용 가능합니다.',
      },
      {
        question: '직접 항목을 바꿀 수 있나요?',
        answer: '현재는 고정 항목으로 제공됩니다.',
      },
    ],
  },
  'roulette-02': {
    summary: '주말에 할 일을 빠르게 정리해주는 데이트 코스 추천 룰렛입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과를 기준으로 근처 장소를 검색해 일정에 반영하세요.',
      },
      {
        heading: '활용 팁',
        body: '실내와 실외가 번갈아 나오도록 여러 번 돌려보세요.',
      },
      {
        heading: '추천 대상',
        body: '데이트 코스를 고민하는 커플과 친구 모임에 추천합니다.',
      },
    ],
    faqs: [
      {
        question: '혼자도 사용 가능한가요?',
        answer: '혼자 일정에도 활용 가능합니다.',
      },
      {
        question: '결과가 마음에 들지 않으면?',
        answer: '다시 돌려 새 코스를 뽑을 수 있습니다.',
      },
    ],
  },
  'roulette-03': {
    summary: '저녁 메뉴 선택이 어려운 날 빠르게 결정을 돕는 도구입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과를 기준으로 배달 또는 외식 중 선택해보세요.',
      },
      {
        heading: '활용 팁',
        body: '가족 구성원 선호를 고려해 여러 번 돌린 후 최종 선택을 추천합니다.',
      },
      {
        heading: '추천 대상',
        body: '저녁 메뉴를 빠르게 정해야 하는 누구에게나 유용합니다.',
      },
    ],
    faqs: [
      {
        question: '채식 옵션도 있나요?',
        answer: '현재는 일반 메뉴 중심으로 구성되어 있습니다.',
      },
      {
        question: '가중치가 있나요?',
        answer: '네, 메뉴마다 선택 확률이 다를 수 있습니다.',
      },
    ],
  },
  'roulette-04': {
    summary: '오늘 해야 할 운동을 가볍게 추천해주는 룰렛입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과에 맞춰 간단한 스트레칭부터 시작해보세요.',
      },
      {
        heading: '활용 팁',
        body: '시간 여유가 없는 날은 짧은 운동을 선택해도 좋아요.',
      },
      {
        heading: '추천 대상',
        body: '가볍게 운동 루틴을 시작하고 싶은 분들에게 추천합니다.',
      },
    ],
    faqs: [
      {
        question: '운동 강도 조절이 되나요?',
        answer: '현재는 카테고리 기반으로 제공됩니다.',
      },
      {
        question: '매일 사용해도 되나요?',
        answer: '네, 매일 사용 가능합니다.',
      },
    ],
  },
  'roulette-05': {
    summary: '주말에 짧게 떠날 여행지를 빠르게 정하는 데 도움 됩니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과를 기준으로 지역을 검색한 뒤 이동 계획을 잡아보세요.',
      },
      {
        heading: '활용 팁',
        body: '계절과 날씨에 맞는 목적지를 우선 고려해보세요.',
      },
      {
        heading: '추천 대상',
        body: '주말 일정이 막막한 분들에게 유용한 추천입니다.',
      },
    ],
    faqs: [
      {
        question: '국내와 해외 구분이 있나요?',
        answer: '현재는 국내 중심 추천입니다.',
      },
      {
        question: '당일치기도 가능한가요?',
        answer: '당일치기 일정에도 활용 가능합니다.',
      },
    ],
  },
  'roulette-06': {
    summary: '오늘 들을 음악 분위기를 빠르게 결정하는 룰렛입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과 장르로 플레이리스트를 검색해보세요.',
      },
      {
        heading: '활용 팁',
        body: '집중이 필요하면 재즈나 클래식 계열을 시도해보세요.',
      },
      {
        heading: '추천 대상',
        body: '새로운 음악 분위기가 필요한 분들에게 추천합니다.',
      },
    ],
    faqs: [
      {
        question: '장르가 더 추가되나요?',
        answer: '추후 확장 가능성이 있습니다.',
      },
      {
        question: '랜덤 결과만 나오나요?',
        answer: '네, 랜덤 추천 방식입니다.',
      },
    ],
  },
  'roulette-07': {
    summary: '영화 선택에 드는 시간을 줄여주는 장르 추천 도구입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과 장르로 OTT에서 콘텐츠를 찾아보세요.',
      },
      {
        heading: '활용 팁',
        body: '기분이 우울할 땐 코미디나 로맨스를 시도해보세요.',
      },
      {
        heading: '추천 대상',
        body: '오늘 볼 영화를 빠르게 정하고 싶은 분들에게 적합합니다.',
      },
    ],
    faqs: [
      {
        question: '실제 영화 추천도 되나요?',
        answer: '현재는 장르만 제공합니다.',
      },
      {
        question: '추천 장르가 겹치나요?',
        answer: '가중치에 따라 비슷할 수 있습니다.',
      },
    ],
  },
  'roulette-08': {
    summary: '간단한 간식 선택을 빠르게 도와주는 룰렛입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과를 기준으로 집에 있는 재료부터 확인해보세요.',
      },
      {
        heading: '활용 팁',
        body: '당분 섭취가 많다면 다른 간식으로 바꿔보세요.',
      },
      {
        heading: '추천 대상',
        body: '가볍게 간식을 고르고 싶은 분들에게 추천합니다.',
      },
    ],
    faqs: [
      {
        question: '다이어트 간식도 있나요?',
        answer: '일부 항목만 포함되어 있습니다.',
      },
      {
        question: '아이들과 함께 써도 되나요?',
        answer: '네, 간단한 선택용으로 적합합니다.',
      },
    ],
  },
  'roulette-09': {
    summary: '새로운 취미를 찾고 싶을 때 가볍게 시작할 수 있는 추천 도구입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과에 맞춰 관련 키워드를 검색해보세요.',
      },
      {
        heading: '활용 팁',
        body: '비용이 낮은 취미부터 시작하면 부담이 적습니다.',
      },
      {
        heading: '추천 대상',
        body: '여가 시간을 새롭게 채우고 싶은 분들에게 추천합니다.',
      },
    ],
    faqs: [
      {
        question: '초보자도 가능한가요?',
        answer: '네, 대부분 입문 가능합니다.',
      },
      {
        question: '실내와 실외 구분이 있나요?',
        answer: '현재는 혼합되어 있습니다.',
      },
    ],
  },
  'roulette-10': {
    summary: '오늘 즐길 게임 장르를 빠르게 정해주는 룰렛입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과 장르에 맞는 인기 게임을 검색해보세요.',
      },
      {
        heading: '활용 팁',
        body: '시간이 짧으면 캐주얼이나 퍼즐 장르가 적합합니다.',
      },
      {
        heading: '추천 대상',
        body: '게임 선택에 드는 시간을 줄이고 싶은 분들께 추천합니다.',
      },
    ],
    faqs: [
      {
        question: '모바일 게임도 포함되나요?',
        answer: '네, 장르 기준으로 적용됩니다.',
      },
      {
        question: '플레이 시간 정보가 있나요?',
        answer: '현재는 제공하지 않습니다.',
      },
    ],
  },
  'roulette-11': {
    summary: '읽을 책 장르를 빠르게 정해 독서 선택을 돕습니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과 장르로 베스트셀러를 찾아보세요.',
      },
      {
        heading: '활용 팁',
        body: '집중이 필요한 날은 논픽션이나 자기계발을 추천합니다.',
      },
      {
        heading: '추천 대상',
        body: '새로운 독서 경험을 찾는 분들에게 유용합니다.',
      },
    ],
    faqs: [
      {
        question: '책 제목도 추천되나요?',
        answer: '현재는 장르만 제공합니다.',
      },
      {
        question: '전자책에도 적용되나요?',
        answer: '네, 독서 방식과 무관합니다.',
      },
    ],
  },
  'roulette-12': {
    summary: '오늘 입을 색상이나 분위기를 빠르게 결정하는 룰렛입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과 색상을 포인트 컬러로 활용해보세요.',
      },
      {
        heading: '활용 팁',
        body: '무난하게 가고 싶다면 블랙이나 화이트를 선택해보세요.',
      },
      {
        heading: '추천 대상',
        body: '패션이나 인테리어 색상을 고민하는 분들에게 추천합니다.',
      },
    ],
    faqs: [
      {
        question: '계절별 추천인가요?',
        answer: '현재는 시즌 구분이 없습니다.',
      },
      {
        question: '패션 이외에도 쓰나요?',
        answer: '인테리어 색상 선택에도 활용 가능합니다.',
      },
    ],
  },
  'psychology-test-01': {
    summary: '간단한 질문 없이 오늘의 기분을 가볍게 점검하는 심리 룰렛입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '결과 문장을 읽고 오늘 하루 목표를 정리해보세요.',
      },
      {
        heading: '활용 팁',
        body: '결과를 일기나 메모와 함께 기록하면 더 유용합니다.',
      },
      {
        heading: '추천 대상',
        body: '가볍게 기분을 정리하고 싶은 분들에게 추천합니다.',
      },
    ],
    faqs: [
      {
        question: '의학적 진단인가요?',
        answer: '아니요, 참고용 가벼운 콘텐츠입니다.',
      },
      {
        question: '결과가 매번 달라지나요?',
        answer: '랜덤 결과입니다.',
      },
    ],
  },
  'calculator-01': {
    summary: '기본 사칙연산을 빠르게 수행하는 심플 계산기입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '숫자와 연산자를 입력해 결과를 확인하세요.',
      },
      {
        heading: '활용 팁',
        body: '반복 계산이 필요할 때 단축키로 빠르게 사용하세요.',
      },
      {
        heading: '추천 대상',
        body: '빠른 계산이 필요한 학생과 직장인에게 적합합니다.',
      },
    ],
    faqs: [
      {
        question: '소수점 계산도 되나요?',
        answer: '네, 기본 소수점 계산이 가능합니다.',
      },
      {
        question: '이력 저장이 되나요?',
        answer: '현재는 저장 기능이 없습니다.',
      },
    ],
  },
  'area-calculator-01': {
    summary: '평방미터와 평 변환을 빠르게 처리하는 도구입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '숫자를 입력하면 자동 변환됩니다.',
      },
      {
        heading: '활용 팁',
        body: '부동산 계약 전 면적 비교에 유용합니다.',
      },
      {
        heading: '추천 대상',
        body: '면적 변환이 필요한 부동산 이용자에게 적합합니다.',
      },
    ],
    faqs: [
      {
        question: '소수점도 지원하나요?',
        answer: '네, 소수점 변환이 가능합니다.',
      },
      {
        question: '㎡ 기준인가요?',
        answer: '네, 평방미터 기준 변환입니다.',
      },
    ],
  },
  'bmi-calculator-01': {
    summary: '체질량지수(BMI)를 계산해 건강 상태를 참고할 수 있습니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '키와 몸무게를 입력해 결과를 확인하세요.',
      },
      {
        heading: '활용 팁',
        body: '장기 추이를 보면 변화 파악에 도움이 됩니다.',
      },
      {
        heading: '추천 대상',
        body: '건강 관리를 시작하는 분들에게 적합합니다.',
      },
    ],
    faqs: [
      {
        question: '의학적 진단인가요?',
        answer: '아닙니다, 참고용 지표입니다.',
      },
      {
        question: '체형에 따라 다르나요?',
        answer: '개인차가 있을 수 있습니다.',
      },
    ],
  },
  'percent-calculator-01': {
    summary: '할인율과 세율, 비율 계산을 빠르게 처리하는 도구입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '기준값과 비율을 입력해 결과를 확인하세요.',
      },
      {
        heading: '활용 팁',
        body: '쇼핑 비교나 할인율 검증에 유용합니다.',
      },
      {
        heading: '추천 대상',
        body: '비율 계산이 잦은 업무 사용자에게 추천합니다.',
      },
    ],
    faqs: [
      {
        question: '증가율도 되나요?',
        answer: '네, 비율 계산에 활용 가능합니다.',
      },
      {
        question: '소수점 처리되나요?',
        answer: '네, 소수점 계산을 지원합니다.',
      },
    ],
  },
  'age-calculator-01': {
    summary: '생년월일 기준 만 나이를 쉽게 계산합니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '생년월일을 입력하면 결과가 표시됩니다.',
      },
      {
        heading: '활용 팁',
        body: '행사나 보험 서류 준비 시 빠르게 확인하세요.',
      },
      {
        heading: '추천 대상',
        body: '만 나이 확인이 필요한 모든 사용자에게 유용합니다.',
      },
    ],
    faqs: [
      {
        question: '만 나이 기준인가요?',
        answer: '네, 만 나이를 기준으로 합니다.',
      },
      {
        question: '기준일 변경이 되나요?',
        answer: '현재는 오늘 기준으로 계산됩니다.',
      },
    ],
  },
  'unit-converter-01': {
    summary: '길이, 무게, 온도 등 단위를 빠르게 변환합니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '변환할 값을 입력해 결과를 확인하세요.',
      },
      {
        heading: '활용 팁',
        body: '해외 단위 사용 시 바로 비교할 수 있습니다.',
      },
      {
        heading: '추천 대상',
        body: '단위 변환이 필요한 업무/학습 사용자에게 적합합니다.',
      },
    ],
    faqs: [
      {
        question: '모든 단위를 지원하나요?',
        answer: '주요 단위 중심으로 제공됩니다.',
      },
      {
        question: '정밀도 조절이 되나요?',
        answer: '기본 소수점 표시로 제공됩니다.',
      },
    ],
  },
  'interest-calculator-01': {
    summary: '예금과 저축 이자를 빠르게 계산하는 도구입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '원금, 기간, 금리를 입력해 확인하세요.',
      },
      {
        heading: '활용 팁',
        body: '월복리 또는 연복리 조건을 미리 정리하면 편합니다.',
      },
      {
        heading: '추천 대상',
        body: '저축 계획을 세우는 사용자에게 유용합니다.',
      },
    ],
    faqs: [
      {
        question: '세후 계산이 되나요?',
        answer: '현재는 세전 기준입니다.',
      },
      {
        question: '적금에도 쓰나요?',
        answer: '기본 예금 기준으로 제공됩니다.',
      },
    ],
  },
  'discount-calculator-01': {
    summary: '할인 전후 가격과 절약 금액을 쉽게 계산합니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '원가와 할인율을 입력해 결과를 확인하세요.',
      },
      {
        heading: '활용 팁',
        body: '여러 상품 가격 비교 시 유용합니다.',
      },
      {
        heading: '추천 대상',
        body: '쇼핑 전 빠르게 가격을 비교하고 싶은 분들께 적합합니다.',
      },
    ],
    faqs: [
      {
        question: '정액 할인도 되나요?',
        answer: '현재는 퍼센트 기준입니다.',
      },
      {
        question: '부가세 포함인가요?',
        answer: '별도 계산이 필요합니다.',
      },
    ],
  },
  'tip-calculator-01': {
    summary: '팁과 1인당 금액을 손쉽게 계산하는 도구입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '총액과 인원 또는 비율을 입력하세요.',
      },
      {
        heading: '활용 팁',
        body: '여행 중 빠른 정산에 유용합니다.',
      },
      {
        heading: '추천 대상',
        body: '외식이나 여행 경비를 나누는 사용자에게 적합합니다.',
      },
    ],
    faqs: [
      {
        question: '국가별 팁 기준이 있나요?',
        answer: '현재는 입력값 기준입니다.',
      },
      {
        question: '영수증 분할 계산도 되나요?',
        answer: '기본 분할 계산이 가능합니다.',
      },
    ],
  },
  'time-calculator-01': {
    summary: '시간을 더하거나 빼서 일정 계산을 빠르게 처리합니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '기준 시간과 더할 시간을 입력하세요.',
      },
      {
        heading: '활용 팁',
        body: '일정이나 근무 시간 산정에 유용합니다.',
      },
      {
        heading: '추천 대상',
        body: '시간 계산이 잦은 업무 사용자에게 적합합니다.',
      },
    ],
    faqs: [
      {
        question: '날짜 변경도 되나요?',
        answer: '기본은 시간 단위 계산입니다.',
      },
      {
        question: '24시간 표기인가요?',
        answer: '현재는 24시간 기준입니다.',
      },
    ],
  },
  'lotto-generator-01': {
    summary: '1부터 45까지 번호를 랜덤 생성해주는 도구입니다.',
    sections: [
      {
        heading: '사용 방법',
        body: '버튼을 눌러 번호를 확인하세요.',
      },
      {
        heading: '활용 팁',
        body: '여러 세트를 생성해 비교해보세요.',
      },
      {
        heading: '추천 대상',
        body: '로또 번호를 빠르게 만들고 싶은 사용자에게 적합합니다.',
      },
    ],
    faqs: [
      {
        question: '당첨 확률을 높이나요?',
        answer: '랜덤 생성일 뿐 보장은 없습니다.',
      },
      {
        question: '홀짝 정보가 나오나요?',
        answer: '네, 홀짝 구분 결과가 제공됩니다.',
      },
    ],
  },
};

export function getSiteUrl(): string {
  const envUrl = NEXT_PUBLIC_SITE_URL;
  if (!envUrl) return DEFAULT_SITE_URL;
  return envUrl.replace(/\/+$/, '');
}

export function getCanonicalUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}

export function getAppSeoContent(config: AppConfig): AppSeoContent {
  const audienceText =
    config.category === 'food'
      ? '점심이나 저녁 메뉴를 고민하는 직장인, 학생, 가족에게 유용합니다.'
      : config.category === 'date'
        ? '데이트 코스가 필요한 연인과 친구 모임을 준비하는 분들에게 추천합니다.'
        : config.category === 'utility'
          ? '일상이나 업무에서 빠른 계산이 필요한 학생과 직장인에게 적합합니다.'
          : config.category === 'entertainment'
            ? '가볍게 즐길 콘텐츠를 찾는 분들에게 추천합니다.'
            : '빠르게 선택하거나 계산이 필요한 모든 분들에게 도움이 됩니다.';

  const fallbackSummary =
    config.description ||
    `${config.title}를 빠르게 사용해보고 결과를 확인할 수 있는 페이지입니다.`;

  const fallbackSections: SeoSection[] = [
    {
      heading: '이 앱은 무엇인가요',
      body: `${config.title}는 필요한 선택이나 계산을 빠르게 끝낼 수 있도록 돕는 간편 도구입니다.`,
    },
    {
      heading: '사용 방법',
      body: '간단한 입력 후 버튼을 누르면 결과를 바로 확인할 수 있습니다. 필요할 때마다 반복해서 사용할 수 있습니다.',
    },
    {
      heading: '추천 대상',
      body: audienceText,
    },
    {
      heading: '활용 팁',
      body: '자주 쓰는 목적에 맞게 여러 번 실행해 비교해 보세요. 다른 앱과 함께 사용하면 더 다양한 결과를 얻을 수 있습니다.',
    },
  ];

  const fallbackFaqs: SeoFaq[] = [
    {
      question: `${config.title}는 무료인가요?`,
      answer: '네, 별도의 가입 없이 바로 사용할 수 있습니다.',
    },
    {
      question: '모바일에서도 사용할 수 있나요?',
      answer: '모바일과 데스크톱 모두에서 사용할 수 있도록 반응형으로 제공됩니다.',
    },
  ];

  const override = seoOverrides[config.appKey] ?? {};

  return {
    summary: override.summary || fallbackSummary,
    sections: override.sections || fallbackSections,
    faqs: override.faqs || fallbackFaqs,
  };
}

export function buildWebApplicationJsonLd(config: AppConfig, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: config.title,
    description: config.description || '',
    url,
    applicationCategory: config.appType === 'roulette' ? 'GameApplication' : 'UtilityApplication',
    operatingSystem: 'Web',
    inLanguage: 'ko',
    publisher: {
      '@type': 'Organization',
      name: 'HundredApp',
      url: getSiteUrl(),
    },
  };
}

export function buildBreadcrumbJsonLd(appKey: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'HundredApp',
        item: getSiteUrl(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: getCanonicalUrl(`/${appKey}`),
      },
    ],
  };
}

export function buildFaqJsonLd(faqs: SeoFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
