'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface TipCalculatorAppProps {
  config: AppConfig;
}

export default function TipCalculatorApp({ config }: TipCalculatorAppProps) {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');
  const [result, setResult] = useState<{ tip: number; total: number; perPerson: number } | null>(null);

  const calculate = () => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent);
    const numPeople = parseFloat(people);

    if (!isNaN(billAmount) && !isNaN(tip) && !isNaN(numPeople) && billAmount > 0 && numPeople > 0) {
      const tipAmount = (billAmount * tip) / 100;
      const total = billAmount + tipAmount;
      const perPerson = total / numPeople;
      setResult({ tip: tipAmount, total, perPerson });
    } else {
      setResult(null);
    }
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
            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                계산서 금액 (원)
              </label>
              <input
                type="number"
                value={bill}
                onChange={(e) => {
                  setBill(e.target.value);
                  if (bill && tipPercent && people) calculate();
                }}
                onBlur={calculate}
                placeholder="금액을 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                팁 비율 (%)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[10, 15, 20, 25].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => {
                      setTipPercent(percent.toString());
                      if (bill && people) {
                        setTimeout(calculate, 100);
                      }
                    }}
                    className={`px-4 py-3 rounded-xl font-bold transition-all ${
                      tipPercent === percent.toString()
                        ? 'text-white shadow-lg scale-105'
                        : 'glass text-gray-700 dark:text-gray-300'
                    }`}
                    style={{
                      background: tipPercent === percent.toString()
                        ? `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
                        : undefined,
                    }}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={tipPercent}
                onChange={(e) => {
                  setTipPercent(e.target.value);
                  if (bill && tipPercent && people) calculate();
                }}
                onBlur={calculate}
                placeholder="직접 입력"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3" style={{ color: theme.primary }}>
                인원 수
              </label>
              <input
                type="number"
                min="1"
                value={people}
                onChange={(e) => {
                  setPeople(e.target.value);
                  if (bill && tipPercent && people) calculate();
                }}
                onBlur={calculate}
                placeholder="인원 수를 입력하세요"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition-all duration-200 text-lg"
              />
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
                className="mt-6 p-6 rounded-xl space-y-4"
                style={{
                  backgroundColor: theme.primary + '20',
                }}
              >
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">팁 금액</p>
                  <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                    {result.tip.toLocaleString()}원
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 금액</p>
                  <div className="text-3xl font-bold" style={{ color: theme.accent }}>
                    {result.total.toLocaleString()}원
                  </div>
                </div>
                {parseFloat(people) > 1 && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">1인당 금액</p>
                    <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                      {result.perPerson.toLocaleString()}원
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




