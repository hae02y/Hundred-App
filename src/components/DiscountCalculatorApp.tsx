'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface DiscountCalculatorAppProps {
  config: AppConfig;
}

export default function DiscountCalculatorApp({ config }: DiscountCalculatorAppProps) {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [result, setResult] = useState<{ discounted: number; saved: number } | null>(null);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (!isNaN(price) && !isNaN(discount) && price > 0 && discount >= 0 && discount <= 100) {
      const saved = (price * discount) / 100;
      const discounted = price - saved;
      setResult({ discounted, saved });
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
                원가 (원)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => {
                  setOriginalPrice(e.target.value);
                  if (originalPrice && discountPercent) calculate();
                }}
                onBlur={calculate}
                placeholder="원가를 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                할인율 (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={discountPercent}
                onChange={(e) => {
                  setDiscountPercent(e.target.value);
                  if (originalPrice && discountPercent) calculate();
                }}
                onBlur={calculate}
                placeholder="할인율을 입력하세요"
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
                className="mt-6 p-6 rounded-xl space-y-4"
                style={{
                  backgroundColor: theme.primary + '20',
                }}
              >
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">할인 금액</p>
                  <div className="text-2xl font-bold" style={{ color: theme.accent }}>
                    {result.saved.toLocaleString()}원
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">할인 후 가격</p>
                  <div className="text-3xl font-bold" style={{ color: theme.primary }}>
                    {result.discounted.toLocaleString()}원
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

