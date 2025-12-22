'use client';

import { useState, useEffect } from 'react';
import { AppRules } from '@/types/app-config';

const STORAGE_PREFIX = 'hundredapp_cooldown_';
const STORAGE_DAILY_PREFIX = 'hundredapp_daily_';

export function useCooldown(appKey: string, rules?: AppRules) {
  // 초기 상태를 false로 설정하여 localStorage 확인 전까지는 비활성화
  const [remainingTime, setRemainingTime] = useState(0);
  const [canSpin, setCanSpin] = useState(false);

  useEffect(() => {
    const checkCooldown = () => {
      // 서버 사이드에서는 localStorage가 없으므로 스킵
      if (typeof window === 'undefined') {
        setCanSpin(true);
        return;
      }

      if (!rules) {
        setCanSpin(true);
        setRemainingTime(0);
        return;
      }

      let isBlocked = false;
      let remaining = 0;

      // 쿨다운 체크
      if (rules.cooldownSec) {
        const cooldownKey = `${STORAGE_PREFIX}${appKey}`;
        const lastSpinTime = localStorage.getItem(cooldownKey);
        
        if (lastSpinTime) {
          const elapsed = Math.floor((Date.now() - parseInt(lastSpinTime)) / 1000);
          remaining = Math.max(0, rules.cooldownSec - elapsed);
          
          if (remaining > 0) {
            isBlocked = true;
          } else {
            // 쿨다운이 끝났으면 스토리지에서 제거
            localStorage.removeItem(cooldownKey);
          }
        }
      }

      // 하루 1회 제한 체크 (쿨다운보다 우선)
      if (rules.onePerDay) {
        const dailyKey = `${STORAGE_DAILY_PREFIX}${appKey}`;
        const lastDailyDate = localStorage.getItem(dailyKey);
        const today = new Date().toDateString();
        
        if (lastDailyDate === today) {
          isBlocked = true;
          remaining = 0;
        }
      }

      setCanSpin(!isBlocked);
      setRemainingTime(remaining);
    };

    // 초기 체크
    checkCooldown();
    
    // 1초마다 체크
    const interval = setInterval(checkCooldown, 1000);

    return () => clearInterval(interval);
  }, [appKey, rules]);

  const checkAndSetCooldown = (): boolean => {
    if (!canSpin) return false;

    if (rules?.cooldownSec) {
      const cooldownKey = `${STORAGE_PREFIX}${appKey}`;
      localStorage.setItem(cooldownKey, Date.now().toString());
    }

    if (rules?.onePerDay) {
      const dailyKey = `${STORAGE_DAILY_PREFIX}${appKey}`;
      const today = new Date().toDateString();
      localStorage.setItem(dailyKey, today);
    }

    return true;
  };

  return { canSpin, remainingTime, checkAndSetCooldown };
}

