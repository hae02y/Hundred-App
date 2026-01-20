'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AppConfig, AppCategory } from '@/types/app-config';
import SearchBar from './SearchBar';

interface HomePageClientProps {
  apps: Array<{ key: string; config: AppConfig }>;
  categoryLabels: Record<AppCategory, string>;
}

export default function HomePageClient({ apps, categoryLabels }: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 필터링
  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) {
      return apps;
    }

    const query = searchQuery.toLowerCase().trim();
    return apps.filter(({ config }) => {
      const titleMatch = config.title.toLowerCase().includes(query);
      const descriptionMatch = config.description?.toLowerCase().includes(query);
      const categoryMatch = categoryLabels[config.category]?.toLowerCase().includes(query);
      const appTypeMatch = 
        (config.appType === 'roulette' && '룰렛'.includes(query)) ||
        (config.appType === 'calculator' && '계산기'.includes(query));
      const tagsMatch = config.tags?.some(tag => tag.toLowerCase().includes(query));

      return titleMatch || descriptionMatch || categoryMatch || appTypeMatch || tagsMatch;
    });
  }, [apps, searchQuery, categoryLabels]);

  // 카테고리별로 그룹화
  const appsByCategory = useMemo(() => {
    const grouped = filteredApps.reduce((acc, { key, config }) => {
      const category = config.category || 'other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({ key, config });
      return acc;
    }, {} as Record<AppCategory, Array<{ key: string; config: AppConfig }>>);

    return grouped;
  }, [filteredApps]);

  const categories = Object.keys(appsByCategory) as AppCategory[];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 애니메이션 배경 */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 gradient-animate" />
      <div className="fixed inset-0 -z-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDMuMzE0LTIuNjg2IDYtNiA2cy02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNnoiIGZpbGw9InJnYmEoMTQ4LDE2MywxODQsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-40" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="text-6xl md:text-7xl font-black mb-4 text-slate-100 drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
              오늘의앱!
            </h1>
            <div className="h-1 w-24 mx-auto bg-white/70 rounded-full" />
          </div>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 font-medium">
            다양한 앱을 즐겨보세요 ✨
          </p>
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
                  {categoryLabels[category]}
                </h2>
                <span className="px-4 py-2 rounded-full glass text-lg font-bold text-gray-700 dark:text-gray-300 shadow-lg">
                  {appsByCategory[category].length}개
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appsByCategory[category].map(({ key, config }) => (
                  <Link
                    key={key}
                    href={`/${key}`}
                    className="group relative card-hover overflow-hidden rounded-3xl"
                  >
                    {/* 그라데이션 배경 */}
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                      style={{
                        background: `linear-gradient(135deg, ${config.theme.primary}40, ${config.theme.accent}40)`,
                      }}
                    />
                    
                    {/* 카드 */}
                    <div className="relative glass rounded-3xl p-6 h-full border border-white/20 dark:border-white/10 shadow-xl">
                      {/* 상단 색상 바 */}
                      <div 
                        className="h-1.5 w-full rounded-full mb-4 transition-all duration-300 group-hover:h-2"
                        style={{ 
                          background: `linear-gradient(90deg, ${config.theme.primary}, ${config.theme.accent})`,
                        }}
                      />
                      
                      {/* 아이콘/이모지 영역 */}
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{
                            background: `linear-gradient(135deg, ${config.theme.primary}, ${config.theme.accent})`,
                            color: 'white',
                          }}
                        >
                          {config.appType === 'roulette' ? '🎰' : '🧮'}
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold glass text-gray-700 dark:text-gray-300">
                          {config.appType === 'roulette' ? '룰렛' : '계산기'}
                        </span>
                      </div>
                      
                      {/* 제목 */}
                      <h3 
                        className="text-2xl font-bold mb-2 transition-colors duration-300"
                        style={{ color: config.theme.primary }}
                      >
                        {config.title}
                      </h3>
                      
                      {/* 설명 */}
                      {config.description && (
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                          {config.description}
                        </p>
                      )}
                      
                      {/* 태그 */}
                      {config.tags && config.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {config.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-lg glass text-gray-700 dark:text-gray-300 font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                          {config.tags.length > 3 && (
                            <span className="text-xs px-2.5 py-1 rounded-lg glass text-gray-500 dark:text-gray-500">
                              +{config.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* 하단 정보 */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                        {config.appType === 'roulette' && config.items && (
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {config.items.length}개 항목
                          </span>
                        )}
                        {config.appType === 'calculator' && (
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            즉시 사용 가능
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1" style={{ color: config.theme.primary }}>
                          시작하기
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
              "{searchQuery}"에 대한 검색 결과가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
