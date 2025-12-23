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

const seoOverrides: Record<string, Partial<AppSeoContent>> = {};

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!envUrl) return DEFAULT_SITE_URL;
  return envUrl.replace(/\/+$/, '');
}

export function getCanonicalUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}

export function getAppSeoContent(config: AppConfig): AppSeoContent {
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

