import type { Metadata } from 'next';
import { loadAppConfig, getAllAppKeys } from '@/lib/app-config-loader';
import { getCanonicalUrl } from '@/lib/seo';
import { AppCategory } from '@/types/app-config';
import HomePageClient from '@/components/HomePageClient';

const categoryLabels: Record<AppCategory, string> = {
  food: '음식',
  date: '데이트',
  utility: '유틸리티',
  entertainment: '엔터테인먼트',
  other: '기타',
};

export async function generateMetadata(): Promise<Metadata> {
  const title = 'HundredApp';
  const description = '다양한 룰렛과 계산기 앱을 한 곳에서 빠르게 찾아보세요.';
  const canonical = getCanonicalUrl('/');

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'HundredApp',
      images: [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: 'HundredApp',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-default.png'],
    },
  };
}

export default async function HomePage() {
  const appKeys = await getAllAppKeys();
  const apps = await Promise.all(
    appKeys.map(async (key) => {
      const config = await loadAppConfig(key);
      return { key, config };
    })
  );

  const validApps = apps.filter(({ config }) => config !== null) as Array<{
    key: string;
    config: NonNullable<typeof apps[0]['config']>;
  }>;

  return <HomePageClient apps={validApps} categoryLabels={categoryLabels} />;
}
