export interface AppItem {
  id: string;
  label: string;
  weight: number;
  description?: string;
}

export interface AppRules {
  cooldownSec?: number;
  onePerDay?: boolean;
}

export interface AppTheme {
  primary: string;
  background: string;
  accent: string;
  text?: string;
}

export type AppType = 'roulette' | 'calculator' | 'other';
export type AppCategory = 'food' | 'date' | 'utility' | 'entertainment' | 'other';

export interface AppConfig {
  appKey: string;
  title: string;
  description?: string;
  category: AppCategory;
  appType: AppType;
  theme: AppTheme;
  items?: AppItem[]; // 룰렛 앱에만 필요
  rules?: AppRules; // 룰렛 앱에만 필요
  tags?: string[]; // 검색용 태그
}

