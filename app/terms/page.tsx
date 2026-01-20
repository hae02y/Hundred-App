import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Link
          href="/"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          ← 홈으로 돌아가기
        </Link>
        <h1 className="mt-6 text-4xl font-black text-gray-900 dark:text-white">Terms of Service</h1>
        <ul className="mt-6 space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <li>HundredApp은 개인 사용을 위한 도구 제공 서비스입니다.</li>
          <li>제공 결과는 참고용이며, 특정 결과를 보장하지 않습니다.</li>
          <li>서비스 내 콘텐츠를 무단 복제/재배포하는 행위를 금지합니다.</li>
          <li>서비스는 사전 공지 없이 변경될 수 있습니다.</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Terms of Service (EN)</h2>
        <ul className="mt-4 space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <li>HundredApp provides tools for personal use.</li>
          <li>Results are for reference only and are not guaranteed.</li>
          <li>Unauthorized reproduction or redistribution is prohibited.</li>
          <li>The service may change without prior notice.</li>
        </ul>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">Last updated: 2026-01-18</p>
      </div>
    </div>
  );
}
