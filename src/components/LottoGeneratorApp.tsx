'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface LottoGeneratorAppProps {
  config: AppConfig;
}

export default function LottoGeneratorApp({ config }: LottoGeneratorAppProps) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);

  const generateNumbers = () => {
    const newNumbers: number[] = [];
    const used = new Set<number>();

    while (newNumbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!used.has(num)) {
        used.add(num);
        newNumbers.push(num);
      }
    }

    newNumbers.sort((a, b) => a - b);
    setNumbers(newNumbers);
    setHistory([newNumbers, ...history.slice(0, 4)]); // 최근 5개만 저장
  };

  const oddNumbers = numbers.filter(n => n % 2 === 1);
  const evenNumbers = numbers.filter(n => n % 2 === 0);

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
          {/* 생성 버튼 */}
          <button
            onClick={generateNumbers}
            className="w-full px-8 py-5 rounded-2xl font-black text-xl text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl mb-8 relative overflow-hidden group"
            style={{ 
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
            }}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-3">
              <span className="text-2xl">🎱</span>
              <span>번호 생성하기</span>
            </span>
          </button>

          {/* 생성된 번호 */}
          {numbers.length > 0 && (
            <div className="space-y-6">
              {/* 전체 번호 */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-center" style={{ color: theme.primary }}>
                  생성된 번호
                </h3>
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {numbers.map((num, index) => {
                    const isOdd = num % 2 === 1;
                    return (
                      <div
                        key={index}
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-lg transition-transform duration-300 hover:scale-110"
                        style={{
                          background: isOdd
                            ? `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
                            : `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`,
                        }}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 홀짝 구분 */}
              <div className="grid grid-cols-2 gap-4">
                {/* 홀수 */}
                <div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <h4 className="font-bold text-lg" style={{ color: theme.primary }}>
                      홀수 ({oddNumbers.length}개)
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {oddNumbers.length > 0 ? (
                      oddNumbers.map((num, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-md"
                          style={{
                            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                          }}
                        >
                          {num}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">없음</p>
                    )}
                  </div>
                </div>

                {/* 짝수 */}
                <div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <h4 className="font-bold text-lg" style={{ color: theme.accent }}>
                      짝수 ({evenNumbers.length}개)
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {evenNumbers.length > 0 ? (
                      evenNumbers.map((num, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-md"
                          style={{
                            background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`,
                          }}
                        >
                          {num}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">없음</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 통계 */}
              <div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
                <h4 className="font-bold text-lg mb-4 text-center" style={{ color: theme.primary }}>
                  번호 통계
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">홀수</p>
                    <p className="text-2xl font-black" style={{ color: theme.primary }}>
                      {oddNumbers.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">짝수</p>
                    <p className="text-2xl font-black" style={{ color: theme.accent }}>
                      {evenNumbers.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">합계</p>
                    <p className="text-2xl font-black text-gray-700 dark:text-gray-300">
                      {numbers.reduce((a, b) => a + b, 0)}
                    </p>
                  </div>
                </div>
              </div>

              {/* 생성 이력 */}
              {history.length > 1 && (
                <div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
                  <h4 className="font-bold text-lg mb-4 text-center" style={{ color: theme.primary }}>
                    최근 생성 이력
                  </h4>
                  <div className="space-y-3">
                    {history.slice(1).map((prevNumbers, idx) => (
                      <div key={idx} className="flex flex-wrap gap-2 justify-center">
                        {prevNumbers.map((num, numIdx) => (
                          <div
                            key={numIdx}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300 glass"
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 안내 문구 */}
          {numbers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎲</div>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                위 버튼을 눌러 번호를 생성하세요!
              </p>
            </div>
          )}

          {/* 주의사항 */}
          <div className="mt-6 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
              ⚠️ 이 번호는 참고용이며, 실제 당첨을 보장하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

