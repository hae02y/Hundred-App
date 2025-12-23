import type { MetadataRoute } from 'next';
import { getAllAppKeys } from '@/lib/app-config-loader';
import { getSiteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const appKeys = await getAllAppKeys();
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      priority: 1,
    },
    ...appKeys.map((appKey) => ({
      url: `${baseUrl}/${appKey}`,
      lastModified,
      changefreq: 'weekly',
      priority: 0.7,
    })),
  ];
}

