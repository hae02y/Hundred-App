import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Link
          href="/"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          ← 홈으로 돌아가기
        </Link>
        <h1 className="mt-6 text-4xl font-black text-gray-900 dark:text-white">Contact</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <p>운영팀: HundredApp 팀</p>
          <p>이메일: hae.company.contact@gmail.com</p>
          <p>문의 내용에는 가능한 한 상세한 상황을 포함해주세요.</p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Contact (EN)</h2>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <p>Team: HundredApp Team</p>
          <p>Email: hae.company.contact@gmail.com</p>
          <p>Please include as much detail as possible in your inquiry.</p>
        </div>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">Last updated: 2026-01-18</p>
      </div>
    </div>
  );
}
