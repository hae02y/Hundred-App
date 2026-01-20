import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getSiteUrl } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'HundredApp',
    template: '%s | HundredApp',
  },
  description: '다양한 룰렛과 계산기 앱을 빠르게 사용할 수 있는 멀티테넌트 서비스입니다.',
  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png',
    shortcut: '/icon.png',
  },
  openGraph: {
    title: 'HundredApp',
    description: '다양한 룰렛과 계산기 앱을 빠르게 사용할 수 있는 멀티테넌트 서비스입니다.',
    type: 'website',
    siteName: 'HundredApp',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'HundredApp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HundredApp',
    description: '다양한 룰렛과 계산기 앱을 빠르게 사용할 수 있는 멀티테넌트 서비스입니다.',
    images: ['/og-default.png'],
  },

  other: {
    'google-adsense-account': 'ca-pub-8508714818929173',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased dark flex min-h-screen flex-col">
        <Link
          href="/"
          className="fixed left-4 top-4 z-50 rounded-full glass px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-lg hover:scale-[1.02] transition-transform"
          aria-label="메인 페이지로 이동"
        >
          홈으로
        </Link>
        <div className="flex-1">
          {children}
        </div>
        <footer className="mt-16 border-t border-gray-200/60 bg-white/80 py-10 text-sm text-gray-600 dark:border-gray-800/60 dark:bg-gray-950/80 dark:text-gray-300">
          <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 font-semibold">
              <Link href="/about" className="hover:text-indigo-500">
                About
              </Link>
              <Link href="/privacy" className="hover:text-indigo-500">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-indigo-500">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-indigo-500">
                Contact
              </Link>
            </div>
            <p>© 2026 HundredApp Team. All rights reserved.</p>
          </div>
        </footer>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
