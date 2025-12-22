'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppItem, AppTheme } from '@/types/app-config';

interface RouletteWheelProps {
  items: AppItem[];
  theme: AppTheme;
  isSpinning: boolean;
  resultId?: string;
}

export default function RouletteWheel({ items, theme, isSpinning, resultId }: RouletteWheelProps) {
  // Hydration 에러 방지를 위해 클라이언트에서만 렌더링
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState(400);

  useEffect(() => {
    setMounted(true);
    setSize(window.innerWidth < 768 ? 280 : 400);
  }, []);

  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const anglePerWeight = 360 / totalWeight;

  let currentAngle = 0;
  const segments = items.map((item) => {
    const angle = item.weight * anglePerWeight;
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      angle,
    };
    currentAngle += angle;
    return segment;
  });

  // 결과 아이템의 인덱스 찾기
  const resultIndex = resultId ? items.findIndex(item => item.id === resultId) : -1;
  
  // 결과가 정확히 중앙에 오도록 회전 각도 계산
  // 결과 섹션의 중앙 각도로 회전
  const targetRotation = resultIndex >= 0 && resultId
    ? 360 - (segments[resultIndex].startAngle + segments[resultIndex].angle / 2) + 360 * 5 // 5바퀴 추가 회전
    : 0;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 10;

  const getPathData = (startAngle: number, endAngle: number) => {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    
    // 부동소수점 반올림으로 일관성 보장 (Hydration 에러 방지)
    const round = (num: number, decimals = 10) => Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    
    const x1 = round(centerX + radius * Math.cos(startRad));
    const y1 = round(centerY + radius * Math.sin(startRad));
    const x2 = round(centerX + radius * Math.cos(endRad));
    const y2 = round(centerY + radius * Math.sin(endRad));
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${round(centerX)} ${round(centerY)} L ${x1} ${y1} A ${round(radius)} ${round(radius)} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // 색상 생성 함수 (테마 기반)
  const getSegmentColor = (index: number) => {
    const colors = [
      theme.primary,
      theme.accent,
      theme.primary + 'dd',
      theme.accent + 'dd',
      theme.primary + 'bb',
      theme.accent + 'bb',
    ];
    return colors[index % colors.length];
  };

  // Hydration 에러 방지: 클라이언트에서만 렌더링
  if (!mounted) {
    return (
      <div className="relative" style={{ width: 400, height: 400 }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin text-4xl">🎰</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="relative"
        animate={{
          rotate: isSpinning ? targetRotation : 0,
        }}
        transition={{
          duration: isSpinning ? 2 : 0,
          ease: [0.23, 1, 0.32, 1], // easeOutQuart
        }}
        style={{
          width: size,
          height: size,
        }}
      >
        <svg width={size} height={size} className="drop-shadow-2xl">
          {segments.map((segment, index) => {
            // 부동소수점 반올림으로 일관성 보장
            const pathData = getPathData(segment.startAngle, segment.endAngle);
            return (
              <path
                key={segment.id}
                d={pathData}
                fill={getSegmentColor(index)}
                stroke="white"
                strokeWidth="2"
                className="transition-opacity duration-300"
                style={{
                  opacity: resultId && segment.id === resultId ? 1 : resultId ? 0.5 : 1,
                }}
              />
            );
          })}
        </svg>

        {/* 텍스트 레이블 - UI에 가려져서 숨김 처리 */}
      </motion.div>

      {/* 중앙 포인터 */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10"
        style={{ width: 0, height: 0, borderLeft: '15px solid transparent', borderRight: '15px solid transparent', borderTop: `30px solid ${theme.primary}` }}
      />
    </div>
  );
}

