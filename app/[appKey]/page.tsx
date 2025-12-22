import { notFound } from 'next/navigation';
import { loadAppConfig } from '@/lib/app-config-loader';
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

export async function generateMetadata({ params }: PageProps) {
  const { appKey } = await params;
  const config = await loadAppConfig(appKey);

  if (!config) {
    return {
      title: '앱을 찾을 수 없습니다',
    };
  }

  return {
    title: `${config.title} - HundredApp`,
    description: config.description || `${config.title} 앱`,
  };
}

export default async function AppPage({ params }: PageProps) {
  const { appKey } = await params;
  const config = await loadAppConfig(appKey);

  if (!config) {
    notFound();
  }

  // 앱 타입과 키에 따라 다른 컴포넌트 렌더링
  if (config.appType === 'roulette') {
    return <RouletteApp config={config} />;
  }

  // 계산기 타입별로 분기
  if (config.appType === 'calculator') {
    if (appKey === 'area-calculator-01') {
      return <AreaCalculatorApp config={config} />;
    }
    if (appKey === 'bmi-calculator-01') {
      return <BMICalculatorApp config={config} />;
    }
    if (appKey === 'percent-calculator-01') {
      return <PercentCalculatorApp config={config} />;
    }
    if (appKey === 'age-calculator-01') {
      return <AgeCalculatorApp config={config} />;
    }
    if (appKey === 'unit-converter-01') {
      return <UnitConverterApp config={config} />;
    }
    if (appKey === 'interest-calculator-01') {
      return <InterestCalculatorApp config={config} />;
    }
    if (appKey === 'discount-calculator-01') {
      return <DiscountCalculatorApp config={config} />;
    }
    if (appKey === 'tip-calculator-01') {
      return <TipCalculatorApp config={config} />;
    }
    if (appKey === 'time-calculator-01') {
      return <TimeCalculatorApp config={config} />;
    }
    if (appKey === 'lotto-generator-01') {
      return <LottoGeneratorApp config={config} />;
    }
    return <CalculatorApp config={config} />;
  }

  return <RouletteApp config={config} />;
}

