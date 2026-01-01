'use client';

import { useState, useEffect } from 'react';
import { AppConfig } from '@/types/app-config';
import RouletteWheel from './RouletteWheel';
import ResultModal from './ResultModal';
import ShareButton from './ShareButton';
import { useCooldown } from '@/hooks/useCooldown';

interface RouletteAppProps {
  config: AppConfig;
}

export default function RouletteApp({ config }: RouletteAppProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{ id: string; label: string; description?: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { canSpin, remainingTime, checkAndSetCooldown } = useCooldown(config.appKey, config.rules);

  const handleSpin = async () => {
    if (isSpinning || !canSpin) return;

    if (!checkAndSetCooldown()) {
      return;
    }

    setIsSpinning(true);
    setShowModal(false);

    try {
      const response = await fetch('/api/spin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appKey: config.appKey,
        }),
      });

      if (!response.ok) {
        throw new Error('룰렛 돌리기 실패');
      }

      const data = await response.json();
      const selectedItem = config?.items?.find(item => item.id === data.itemId);

      if (selectedItem) {
        // 서버 응답을 받은 즉시 결과 설정 (애니메이션이 해당 섹션으로 회전)
        setResult({
          id: selectedItem.id,
          label: selectedItem.label,
          description: selectedItem.description,
        });
        
        // 애니메이션 완료 후 모달 표시
        setTimeout(() => {
          setIsSpinning(false);
          setShowModal(true);
        }, 2000); // 회전 애니메이션 시간 (RouletteWheel의 duration과 동일)
      }
    } catch (error) {
      console.error('Error spinning roulette:', error);
      setIsSpinning(false);
      alert('룰렛을 돌리는 중 오류가 발생했습니다.');
    }
  };

  const theme = config.theme;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 애니메이션 배경 */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${theme.primary}20 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, ${theme.accent}20 0%, transparent 50%),
                      linear-gradient(135deg, ${theme.background} 0%, ${theme.background}dd 100%)`,
        }}
      />
      
      {/* Header */}
      <header className="relative w-full px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <div className="glass rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
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
                  <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium">
                    {config.description}
                  </p>
                )}
              </div>
              <ShareButton appKey={config.appKey} title={config.title} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col items-center">
            {/* Roulette Wheel */}
            <div className="mb-8">
              <RouletteWheel
                items={config.items??[]}
                theme={theme}
                isSpinning={isSpinning}
                resultId={result?.id}
              />
            </div>

            {/* Spin Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning || !canSpin}
              className="relative group px-10 py-5 rounded-2xl text-white font-bold text-lg md:text-xl shadow-2xl transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                {isSpinning ? (
                  <>
                    <span className="animate-spin text-2xl">🎰</span>
                    <span>돌리는 중...</span>
                  </>
                ) : !canSpin ? (
                  <span>쿨다운 중... ({remainingTime}초)</span>
                ) : (
                  <>
                    <span className="text-2xl">🎯</span>
                    <span>돌리기</span>
                  </>
                )}
              </span>
            </button>

            {!canSpin && remainingTime > 0 && (
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                잠시 후 다시 시도해주세요
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Result Modal */}
      {showModal && result && (
        <ResultModal
          result={result}
          theme={theme}
          onClose={() => setShowModal(false)}
          appKey={config.appKey}
          title={config.title}
        />
      )}
    </div>
  );
}
