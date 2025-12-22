'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AppTheme } from '@/types/app-config';
import ShareButton from './ShareButton';

interface ResultModalProps {
  result: {
    id: string;
    label: string;
    description?: string;
  };
  theme: AppTheme;
  onClose: () => void;
  appKey: string;
  title: string;
}

export default function ResultModal({ result, theme, onClose, appKey, title }: ResultModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10 border border-white/20 dark:border-white/10 relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 배경 그라데이션 */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
            }}
          />
          
          <div className="relative text-center">
            <div className="mb-6">
              <div
                className="inline-block p-6 rounded-full shadow-2xl animate-bounce"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
                }}
              >
                <span className="text-5xl">🎉</span>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-4 bg-gradient-to-r bg-clip-text text-transparent" style={{
              backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              오늘의 결과
            </h2>

            <div
              className="inline-block px-8 py-4 rounded-2xl mb-6 font-black text-xl md:text-2xl shadow-xl text-white"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
              }}
            >
              {result.label}
            </div>

            {result.description && (
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-base md:text-lg font-medium">
                {result.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ShareButton
                appKey={appKey}
                title={title}
                result={result.label}
                variant="button"
              />
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 glass shadow-lg"
                style={{
                  color: theme.primary,
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

