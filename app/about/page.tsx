import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Link
          href="/"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          ← 홈으로 돌아가기
        </Link>
        <h1 className="mt-6 text-4xl font-black text-gray-900 dark:text-white">About HundredApp</h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          HundredApp은 다양한 룰렛·계산기 도구를 빠르게 사용할 수 있도록 만든 멀티테넌트
          웹앱입니다. 사용자는 복잡한 설정 없이 즉시 결과를 확인할 수 있으며, 필요한 순간에
          빠른 의사결정을 돕는 것을 목표로 합니다.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          운영 주체는 <span className="font-semibold">HundredApp 팀</span>이며, 문의는
          아래 이메일로 가능합니다.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-gray-900 dark:text-white">About (EN)</h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          HundredApp is a multi-tenant web app that provides quick access to roulette and calculator
          tools. We focus on enabling fast decisions and instant results without complex setup.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Operated by the <span className="font-semibold">HundredApp team</span>. Contact us at the
          email below.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200/60 bg-white/80 p-6 text-gray-700 shadow-sm dark:border-gray-800/60 dark:bg-gray-900/70 dark:text-gray-300">
          <p className="font-semibold">Contact</p>
          <p className="mt-2">hae.company.contact@gmail.com</p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Last updated: 2026-01-18</p>
        </div>
      </div>
    </div>
  );
}
