'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface BMICalculatorAppProps {
  config: AppConfig;
}

export default function BMICalculatorApp({ config }: BMICalculatorAppProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // cm를 m로 변환
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      setBmi(parseFloat(bmiValue.toFixed(1)));

      if (bmiValue < 18.5) {
        setCategory('저체중');
      } else if (bmiValue < 23) {
        setCategory('정상');
      } else if (bmiValue < 25) {
        setCategory('과체중');
      } else if (bmiValue < 30) {
        setCategory('비만');
      } else {
        setCategory('고도비만');
      }
    } else {
      setBmi(null);
      setCategory('');
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
            {/* 키 입력 */}
            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                키 (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  if (height && weight) calculateBMI();
                }}
                onBlur={calculateBMI}
                placeholder="키를 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            {/* 몸무게 입력 */}
            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                몸무게 (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  if (height && weight) calculateBMI();
                }}
                onBlur={calculateBMI}
                placeholder="몸무게를 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            {/* 계산 버튼 */}
            <button
              onClick={calculateBMI}
              className="w-full px-6 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: theme.primary }}
            >
              BMI 계산하기
            </button>

            {/* 결과 표시 */}
            {bmi !== null && (
              <div
                className="mt-6 p-6 rounded-xl text-center"
                style={{
                  backgroundColor: theme.primary + '20',
                }}
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">BMI 지수</p>
                <div className="text-4xl font-bold mb-2" style={{ color: theme.primary }}>
                  {bmi}
                </div>
                <div className="text-xl font-semibold" style={{ color: theme.accent }}>
                  {category}
                </div>
              </div>
            )}

            {/* 정보 */}
            <div className="mt-6 p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold mb-2">BMI 기준:</p>
              <ul className="space-y-1">
                <li>저체중: 18.5 미만</li>
                <li>정상: 18.5 ~ 23</li>
                <li>과체중: 23 ~ 25</li>
                <li>비만: 25 ~ 30</li>
                <li>고도비만: 30 이상</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

