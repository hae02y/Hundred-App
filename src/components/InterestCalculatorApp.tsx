'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface InterestCalculatorAppProps {
  config: AppConfig;
}

export default function InterestCalculatorApp({ config }: InterestCalculatorAppProps) {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [period, setPeriod] = useState('');
  const [result, setResult] = useState<{ total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(period);

    if (!isNaN(p) && !isNaN(r) && !isNaN(t) && p > 0 && r > 0 && t > 0) {
      // 단리 계산
      const interest = p * r * t;
      const total = p + interest;
      setResult({ total, interest });
    } else {
      setResult(null);
    }
  };

  const theme = config.theme;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.background}dd 100%)`,
      }}
    >
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{ color: theme.primary }}
          >
            {config.title}
          </h1>
          {config.description && (
            <p className="text-gray-600 dark:text-gray-300">
              {config.description}
            </p>
          )}
        </header>

        <div
          className="rounded-3xl shadow-2xl p-6 md:p-8"
          style={{ backgroundColor: theme.background }}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                원금 (원)
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => {
                  setPrincipal(e.target.value);
                  if (principal && rate && period) calculate();
                }}
                onBlur={calculate}
                placeholder="원금을 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                이자율 (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                  if (principal && rate && period) calculate();
                }}
                onBlur={calculate}
                placeholder="연 이자율을 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                기간 (년)
              </label>
              <input
                type="number"
                step="0.1"
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  if (principal && rate && period) calculate();
                }}
                onBlur={calculate}
                placeholder="기간을 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full px-6 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: theme.primary }}
            >
              계산하기
            </button>

            {result && (
              <div
                className="mt-6 p-6 rounded-xl"
                style={{
                  backgroundColor: theme.primary + '20',
                }}
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">이자</p>
                    <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                      {result.interest.toLocaleString()}원
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">원리금 합계</p>
                    <div className="text-3xl font-bold" style={{ color: theme.accent }}>
                      {result.total.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400">
              <p>💡 단리 계산식: 원금 × 이자율 × 기간</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

