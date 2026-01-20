import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Link
          href="/"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          ← 홈으로 돌아가기
        </Link>
        <h1 className="mt-6 text-4xl font-black text-gray-900 dark:text-white">Privacy Policy</h1>
        <ul className="mt-6 space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <li>HundredApp은 회원가입을 요구하지 않으며, 기본적으로 개인 식별 정보를 수집하지 않습니다.</li>
          <li>서비스 품질 개선을 위해 브라우저에서 생성되는 비식별 정보가 사용될 수 있습니다(예: 쿠키/로그).</li>
          <li>광고가 표시되는 경우, 제3자 광고 파트너(예: Google)가 쿠키를 통해 맞춤형 광고를 제공할 수 있습니다.</li>
          <li>사용자는 브라우저 설정을 통해 쿠키 저장을 제한할 수 있습니다.</li>
          <li>문의: hae.company.contact@gmail.com</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy (EN)</h2>
        <ul className="mt-4 space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <li>HundredApp does not require sign-up and does not collect personally identifiable information by default.</li>
          <li>Non-identifying data (e.g., cookies/logs) may be used to improve service quality.</li>
          <li>If ads are displayed, third-party partners (e.g., Google) may use cookies to serve personalized ads.</li>
          <li>You can restrict cookies in your browser settings.</li>
          <li>Contact: hae.company.contact@gmail.com</li>
        </ul>

        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">Last updated: 2026-01-18</p>
      </div>
    </div>
  );
}
