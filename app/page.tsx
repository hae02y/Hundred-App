import { loadAppConfig, getAllAppKeys } from '@/lib/app-config-loader';
import { AppCategory } from '@/types/app-config';
import HomePageClient from '@/components/HomePageClient';

const categoryLabels: Record<AppCategory, string> = {
  food: '🍽️ 음식',
  date: '💕 데이트',
  utility: '🛠️ 유틸리티',
  entertainment: '🎮 엔터테인먼트',
  other: '📱 기타',
};

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
