'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface AgeCalculatorAppProps {
  config: AppConfig;
}

export default function AgeCalculatorApp({ config }: AgeCalculatorAppProps) {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      setAge(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
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
                생년월일
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  if (e.target.value) calculateAge();
                }}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            <button
              onClick={calculateAge}
              className="w-full px-6 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: theme.primary }}
            >
              나이 계산하기
            </button>

            {age && (
              <div
                className="mt-6 p-6 rounded-xl text-center"
                style={{
                  backgroundColor: theme.primary + '20',
                }}
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">만 나이</p>
                <div className="text-4xl font-bold mb-4" style={{ color: theme.primary }}>
                  {age.years}세
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  {age.months}개월 {age.days}일
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

