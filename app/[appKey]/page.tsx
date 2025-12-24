import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { loadAppConfig } from '@/lib/app-config-loader';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebApplicationJsonLd,
  getAppSeoContent,
  getCanonicalUrl,
} from '@/lib/seo';
import SeoTextSection from '@/components/SeoTextSection';
import RouletteApp from '@/components/RouletteApp';
import CalculatorApp from '@/components/CalculatorApp';
import AreaCalculatorApp from '@/components/AreaCalculatorApp';
import BMICalculatorApp from '@/components/BMICalculatorApp';
import PercentCalculatorApp from '@/components/PercentCalculatorApp';
import AgeCalculatorApp from '@/components/AgeCalculatorApp';
import UnitConverterApp from '@/components/UnitConverterApp';
import InterestCalculatorApp from '@/components/InterestCalculatorApp';
import DiscountCalculatorApp from '@/components/DiscountCalculatorApp';
import TipCalculatorApp from '@/components/TipCalculatorApp';
import TimeCalculatorApp from '@/components/TimeCalculatorApp';
import LottoGeneratorApp from '@/components/LottoGeneratorApp';

interface PageProps {
  params: Promise<{ appKey: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { appKey } = await params;
  const config = await loadAppConfig(appKey);

  if (!config) {
    return {
      title: '존재하지 않는 앱',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = config.title;
  const description = config.description || `${config.title} 앱에서 빠르게 결과를 확인하세요.`;
  const canonical = getCanonicalUrl(`/${appKey}`);

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

export default async function AppPage({ params }: PageProps) {
  const { appKey } = await params;
  const config = await loadAppConfig(appKey);

  if (!config) {
    notFound();
  }

  const seoContent = getAppSeoContent(config);
  const canonicalUrl = getCanonicalUrl(`/${appKey}`);
  const structuredData = [
    buildWebApplicationJsonLd(config, canonicalUrl),
    buildBreadcrumbJsonLd(appKey, config.title),
    ...(seoContent.faqs.length ? [buildFaqJsonLd(seoContent.faqs)] : []),
  ];

  let appView: React.ReactNode = <RouletteApp config={config} />;

  if (config.appType === 'calculator') {
    if (appKey === 'area-calculator-01') {
      appView = <AreaCalculatorApp config={config} />;
    } else if (appKey === 'bmi-calculator-01') {
      appView = <BMICalculatorApp config={config} />;
    } else if (appKey === 'percent-calculator-01') {
      appView = <PercentCalculatorApp config={config} />;
    } else if (appKey === 'age-calculator-01') {
      appView = <AgeCalculatorApp config={config} />;
    } else if (appKey === 'unit-converter-01') {
      appView = <UnitConverterApp config={config} />;
    } else if (appKey === 'interest-calculator-01') {
      appView = <InterestCalculatorApp config={config} />;
    } else if (appKey === 'discount-calculator-01') {
      appView = <DiscountCalculatorApp config={config} />;
    } else if (appKey === 'tip-calculator-01') {
      appView = <TipCalculatorApp config={config} />;
    } else if (appKey === 'time-calculator-01') {
      appView = <TimeCalculatorApp config={config} />;
    } else if (appKey === 'lotto-generator-01') {
      appView = <LottoGeneratorApp config={config} />;
    } else {
      appView = <CalculatorApp config={config} />;
    }
  }

  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={`ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      {appView}
      <SeoTextSection title={config.title} content={seoContent} />
    </>
  );
}
