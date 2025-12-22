'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface PercentCalculatorAppProps {
  config: AppConfig;
}

export default function PercentCalculatorApp({ config }: PercentCalculatorAppProps) {
  const [value, setValue] = useState('');
  const [percent, setPercent] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const v = parseFloat(value);
    const p = parseFloat(percent);

    if (!isNaN(v) && !isNaN(p)) {
      setResult((v * p) / 100);
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
        {/* Header */}
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

        {/* Calculator */}
        <div
          className="rounded-3xl shadow-2xl p-6 md:p-8"
          style={{ backgroundColor: theme.background }}
        >
          <div className="space-y-6">
            {/* 값 입력 */}
            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                값
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setValue(newValue);
                  if (newValue && percent) {
                    const v = parseFloat(newValue);
                    const p = parseFloat(percent);
                    if (!isNaN(v) && !isNaN(p)) {
                      setResult((v * p) / 100);
                    }
                  } else {
                    setResult(null);
                  }
                }}
                placeholder="값을 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            {/* 퍼센트 입력 */}
            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                퍼센트 (%)
              </label>
              <input
                type="number"
                value={percent}
                onChange={(e) => {
                  const newPercent = e.target.value;
                  setPercent(newPercent);
                  if (value && newPercent) {
                    const v = parseFloat(value);
                    const p = parseFloat(newPercent);
                    if (!isNaN(v) && !isNaN(p)) {
                      setResult((v * p) / 100);
                    }
                  } else {
                    setResult(null);
                  }
                }}
                placeholder="퍼센트를 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            {/* 계산 버튼 */}
            <button
              onClick={calculate}
              className="w-full px-6 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: theme.primary }}
            >
              계산하기
            </button>

            {/* 결과 표시 */}
            {result !== null && (
              <div
                className="mt-6 p-6 rounded-xl text-center"
                style={{
                  backgroundColor: theme.primary + '20',
                }}
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">계산 결과</p>
                <div className="text-3xl font-bold" style={{ color: theme.primary }}>
                  {result.toLocaleString()}
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  {value}의 {percent}%
                </div>
              </div>
            )}

            {/* 예시 */}
            <div className="mt-6 p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold mb-2">예시:</p>
              <ul className="space-y-1">
                <li>100의 20% = 20</li>
                <li>50000의 15% = 7500</li>
                <li>할인율, 세율, 수수료 계산에 유용합니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

