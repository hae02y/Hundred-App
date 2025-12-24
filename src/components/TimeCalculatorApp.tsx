'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface TimeCalculatorAppProps {
  config: AppConfig;
}

export default function TimeCalculatorApp({ config }: TimeCalculatorAppProps) {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [hours2, setHours2] = useState('');
  const [minutes2, setMinutes2] = useState('');
  const [result, setResult] = useState<{ hours: number; minutes: number } | null>(null);

  const calculate = () => {
    const h1 = parseFloat(hours) || 0;
    const m1 = parseFloat(minutes) || 0;
    const h2 = parseFloat(hours2) || 0;
    const m2 = parseFloat(minutes2) || 0;

    const totalMinutes1 = h1 * 60 + m1;
    const totalMinutes2 = h2 * 60 + m2;

    let resultMinutes: number;
    if (operation === 'add') {
      resultMinutes = totalMinutes1 + totalMinutes2;
    } else {
      resultMinutes = totalMinutes1 - totalMinutes2;
      if (resultMinutes < 0) {
        resultMinutes = 0;
      }
    }

    const resultHours = Math.floor(resultMinutes / 60);
    const remainingMinutes = resultMinutes % 60;

    setResult({ hours: resultHours, minutes: remainingMinutes });
  };

  const theme = config.theme;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${theme.primary}30 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, ${theme.accent}30 0%, transparent 50%),
                      linear-gradient(135deg, ${theme.background} 0%, ${theme.background}dd 100%)`,
        }}
      />
      
      <div className="w-full max-w-2xl relative z-10">
        <header className="text-center mb-8">
          <div className="glass rounded-3xl p-6 mb-6 shadow-2xl border border-white/20 dark:border-white/10">
            <h1
              className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {config.title}
            </h1>
            {config.description && (
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {config.description}
              </p>
            )}
          </div>
        </header>

        <div className="glass rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 dark:border-white/10">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                  시간 1
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => {
                      setHours(e.target.value);
                      if (hours && minutes && hours2 && minutes2) calculate();
                    }}
                    onBlur={calculate}
                    placeholder="시"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200"
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => {
                      setMinutes(e.target.value);
                      if (hours && minutes && hours2 && minutes2) calculate();
                    }}
                    onBlur={calculate}
                    placeholder="분"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                  시간 2
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={hours2}
                    onChange={(e) => {
                      setHours2(e.target.value);
                      if (hours && minutes && hours2 && minutes2) calculate();
                    }}
                    onBlur={calculate}
                    placeholder="시"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200"
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes2}
                    onChange={(e) => {
                      setMinutes2(e.target.value);
                      if (hours && minutes && hours2 && minutes2) calculate();
                    }}
                    onBlur={calculate}
                    placeholder="분"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                연산
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setOperation('add');
                    if (hours && minutes && hours2 && minutes2) calculate();
                  }}
                  className={`px-6 py-4 rounded-xl font-bold transition-all ${
                    operation === 'add'
                      ? 'text-white shadow-lg scale-105'
                      : 'glass text-gray-700 dark:text-gray-300'
                  }`}
                  style={{
                    background: operation === 'add'
                      ? `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
                      : undefined,
                  }}
                >
                  더하기 (+)
                </button>
                <button
                  onClick={() => {
                    setOperation('subtract');
                    if (hours && minutes && hours2 && minutes2) calculate();
                  }}
                  className={`px-6 py-4 rounded-xl font-bold transition-all ${
                    operation === 'subtract'
                      ? 'text-white shadow-lg scale-105'
                      : 'glass text-gray-700 dark:text-gray-300'
                  }`}
                  style={{
                    background: operation === 'subtract'
                      ? `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
                      : undefined,
                  }}
                >
                  빼기 (-)
                </button>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full px-6 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              }}
            >
              계산하기
            </button>

            {result && (
              <div
                className="mt-6 p-6 rounded-xl text-center"
                style={{
                  backgroundColor: theme.primary + '20',
                }}
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">결과</p>
                <div className="text-4xl font-bold" style={{ color: theme.primary }}>
                  {result.hours}시간 {result.minutes}분
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  (총 {result.hours * 60 + result.minutes}분)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



