'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface AreaCalculatorAppProps {
  config: AppConfig;
}

export default function AreaCalculatorApp({ config }: AreaCalculatorAppProps) {
  const [squareMeters, setSquareMeters] = useState('');
  const [pyeong, setPyeong] = useState('');

  // 평방미터를 평으로 변환 (1평 = 3.3058㎡)
  const handleSquareMetersChange = (value: string) => {
    setSquareMeters(value);
    if (value === '') {
      setPyeong('');
      return;
    }
    const sqm = parseFloat(value);
    if (!isNaN(sqm) && sqm >= 0) {
      const pyeongValue = (sqm / 3.3058).toFixed(2);
      setPyeong(pyeongValue);
    } else {
      setPyeong('');
    }
  };

  // 평을 평방미터로 변환
  const handlePyeongChange = (value: string) => {
    setPyeong(value);
    if (value === '') {
      setSquareMeters('');
      return;
    }
    const pyeongValue = parseFloat(value);
    if (!isNaN(pyeongValue) && pyeongValue >= 0) {
      const sqmValue = (pyeongValue * 3.3058).toFixed(2);
      setSquareMeters(sqmValue);
    } else {
      setSquareMeters('');
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
            {/* 평방미터 입력 */}
            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                평방미터 (㎡)
              </label>
              <input
                type="number"
                value={squareMeters}
                onChange={(e) => handleSquareMetersChange(e.target.value)}
                placeholder="평방미터를 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            {/* 변환 화살표 */}
            <div className="flex justify-center">
              <div className="text-4xl" style={{ color: theme.accent }}>
                ⇅
              </div>
            </div>

            {/* 평 입력 */}
            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                평 (坪)
              </label>
              <input
                type="number"
                value={pyeong}
                onChange={(e) => handlePyeongChange(e.target.value)}
                placeholder="평을 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            {/* 결과 표시 */}
            {(squareMeters || pyeong) && (
              <div
                className="mt-6 p-6 rounded-xl text-center"
                style={{
                  backgroundColor: theme.primary + '20',
                }}
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">변환 결과</p>
                <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                  {squareMeters && `${squareMeters} ㎡`}
                  {squareMeters && pyeong && ' = '}
                  {pyeong && `${pyeong} 평`}
                </div>
              </div>
            )}

            {/* 정보 */}
            <div className="mt-6 p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400">
              <p>💡 1평 = 3.3058㎡ (약 3.3㎡)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

