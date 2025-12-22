import { AppConfig } from '@/types/app-config';
import roulette01Config from '@/config/apps/roulette-01.json';
import roulette02Config from '@/config/apps/roulette-02.json';
import roulette03Config from '@/config/apps/roulette-03.json';
import roulette04Config from '@/config/apps/roulette-04.json';
import roulette05Config from '@/config/apps/roulette-05.json';
import roulette06Config from '@/config/apps/roulette-06.json';
import roulette07Config from '@/config/apps/roulette-07.json';
import roulette08Config from '@/config/apps/roulette-08.json';
import roulette09Config from '@/config/apps/roulette-09.json';
import roulette10Config from '@/config/apps/roulette-10.json';
import roulette11Config from '@/config/apps/roulette-11.json';
import roulette12Config from '@/config/apps/roulette-12.json';
import calculator01Config from '@/config/apps/calculator-01.json';
import areaCalculator01Config from '@/config/apps/area-calculator-01.json';
import bmiCalculator01Config from '@/config/apps/bmi-calculator-01.json';
import percentCalculator01Config from '@/config/apps/percent-calculator-01.json';
import ageCalculator01Config from '@/config/apps/age-calculator-01.json';
import unitConverter01Config from '@/config/apps/unit-converter-01.json';
import interestCalculator01Config from '@/config/apps/interest-calculator-01.json';
import discountCalculator01Config from '@/config/apps/discount-calculator-01.json';
import tipCalculator01Config from '@/config/apps/tip-calculator-01.json';
import timeCalculator01Config from '@/config/apps/time-calculator-01.json';
import lottoGenerator01Config from '@/config/apps/lotto-generator-01.json';

// 현재는 JSON 파일에서 로드, 추후 API로 교체 가능하도록 레이어 분리
const configMap: Record<string, AppConfig> = {
  'roulette-01': roulette01Config as AppConfig,
  'roulette-02': roulette02Config as AppConfig,
  'roulette-03': roulette03Config as AppConfig,
  'roulette-04': roulette04Config as AppConfig,
  'roulette-05': roulette05Config as AppConfig,
  'roulette-06': roulette06Config as AppConfig,
  'roulette-07': roulette07Config as AppConfig,
  'roulette-08': roulette08Config as AppConfig,
  'roulette-09': roulette09Config as AppConfig,
  'roulette-10': roulette10Config as AppConfig,
  'roulette-11': roulette11Config as AppConfig,
  'roulette-12': roulette12Config as AppConfig,
  'calculator-01': calculator01Config as AppConfig,
  'area-calculator-01': areaCalculator01Config as AppConfig,
  'bmi-calculator-01': bmiCalculator01Config as AppConfig,
  'percent-calculator-01': percentCalculator01Config as AppConfig,
  'age-calculator-01': ageCalculator01Config as AppConfig,
  'unit-converter-01': unitConverter01Config as AppConfig,
  'interest-calculator-01': interestCalculator01Config as AppConfig,
  'discount-calculator-01': discountCalculator01Config as AppConfig,
  'tip-calculator-01': tipCalculator01Config as AppConfig,
  'time-calculator-01': timeCalculator01Config as AppConfig,
  'lotto-generator-01': lottoGenerator01Config as AppConfig,
};

/**
 * 앱 설정을 로드합니다.
 * 현재는 JSON 파일에서 로드하지만, 추후 API 호출로 교체 가능합니다.
 */
export async function loadAppConfig(appKey: string): Promise<AppConfig | null> {
  // TODO: 추후 API 호출로 교체
  // const response = await fetch(`/api/apps/${appKey}`);
  // return response.json();
  
  return configMap[appKey] || null;
}

/**
 * 모든 앱 키 목록을 반환합니다.
 */
export async function getAllAppKeys(): Promise<string[]> {
  // TODO: 추후 API 호출로 교체
  return Object.keys(configMap);
}

