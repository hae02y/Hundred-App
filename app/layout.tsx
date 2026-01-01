import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "HundredApp",
    template: "%s | HundredApp",
  },
  description: "다양한 룰렛과 계산기 앱을 빠르게 사용할 수 있는 멀티테넌트 서비스입니다.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/icon.png",
  },
  openGraph: {
    title: "HundredApp",
    description: "다양한 룰렛과 계산기 앱을 빠르게 사용할 수 있는 멀티테넌트 서비스입니다.",
    type: "website",
    siteName: "HundredApp",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "HundredApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HundredApp",
    description: "다양한 룰렛과 계산기 앱을 빠르게 사용할 수 있는 멀티테넌트 서비스입니다.",
    images: ["/og-default.png"],
  },

  other: {
    "google-adsense-account":"ca-pub-8508714818929173"
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased dark">
        <Link
          href="/"
          className="fixed left-4 top-4 z-50 rounded-full glass px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-lg hover:scale-[1.02] transition-transform"
          aria-label="메인 페이지로 이동"
        >
          홈으로
        </Link>
        {children}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
