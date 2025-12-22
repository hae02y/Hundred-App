'use client';

import { useState } from 'react';
import { AppConfig } from '@/types/app-config';

interface CalculatorAppProps {
  config: AppConfig;
}

export default function CalculatorApp({ config }: CalculatorAppProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperation(op);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display);
      const result = calculate(previousValue, inputValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const theme = config.theme;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* 애니메이션 배경 */}
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${theme.primary}30 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, ${theme.accent}30 0%, transparent 50%),
                      linear-gradient(135deg, ${theme.background} 0%, ${theme.background}dd 100%)`,
        }}
      />
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
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

        {/* Calculator */}
        <div className="glass rounded-3xl shadow-2xl p-6 border border-white/20 dark:border-white/10">
          {/* Display */}
          <div className="rounded-2xl p-6 mb-6 text-right overflow-x-auto relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              }}
            />
            <div className="relative flex items-center justify-end min-h-[120px]">
              <div
                className="text-4xl md:text-5xl font-black break-all"
                style={{ 
                  color: theme.primary,
                  textShadow: `0 2px 10px ${theme.primary}30`,
                }}
              >
                {display}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <button
              onClick={handleClear}
              className="col-span-2 px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              C
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              ⌫
            </button>
            <button
              onClick={() => handleOperation('/')}
              className="px-4 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              }}
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => handleNumber('7')}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              7
            </button>
            <button
              onClick={() => handleNumber('8')}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              8
            </button>
            <button
              onClick={() => handleNumber('9')}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              9
            </button>
            <button
              onClick={() => handleOperation('*')}
              className="px-4 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              }}
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => handleNumber('4')}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              4
            </button>
            <button
              onClick={() => handleNumber('5')}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              5
            </button>
            <button
              onClick={() => handleNumber('6')}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              6
            </button>
            <button
              onClick={() => handleOperation('-')}
              className="px-4 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              }}
            >
              −
            </button>

            {/* Row 4 */}
            <button
              onClick={() => handleNumber('1')}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              1
            </button>
            <button
              onClick={() => handleNumber('2')}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              2
            </button>
            <button
              onClick={() => handleNumber('3')}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              3
            </button>
            <button
              onClick={() => handleOperation('+')}
              className="px-4 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              }}
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => handleNumber('0')}
              className="col-span-2 px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="px-4 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 glass shadow-lg"
              style={{
                color: theme.primary,
              }}
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="px-4 py-4 rounded-xl font-bold text-lg text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`,
              }}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

