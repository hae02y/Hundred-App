import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "HundredApp",
    template: "%s | HundredApp",
  },
  description: "다양한 룰렛과 계산기 앱을 빠르게 사용할 수 있는 멀티테넌트 서비스입니다.",
  openGraph: {
    title: "HundredApp",
    description: "다양한 룰렛과 계산기 앱을 빠르게 사용할 수 있는 멀티테넌트 서비스입니다.",
    type: "website",
    siteName: "HundredApp",
  },
  twitter: {
    card: "summary",
    title: "HundredApp",
    description: "다양한 룰렛과 계산기 앱을 빠르게 사용할 수 있는 멀티테넌트 서비스입니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
