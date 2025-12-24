'use client';

import { useEffect, useMemo, useState } from 'react';

interface ShareButtonProps {
  appKey: string;
  title: string;
  result?: string;
  variant?: 'icon' | 'button';
  showKakao?: boolean;
}

export default function ShareButton({
  appKey,
  title,
  result,
  variant = 'icon',
  showKakao = true,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/${appKey}`;
  }, [appKey]);

  const shareText = result
    ? `${title} 결과: ${result}`
    : `${title}을(를) 바로 사용해보세요.`;

  useEffect(() => {
    if (!showKakao) return;
    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (!appKey) return;
    const kakao = (window as typeof window & { Kakao?: any }).Kakao;
    if (!kakao) return;
    if (!kakao.isInitialized()) {
      kakao.init(appKey);
    }
    setKakaoReady(true);
  }, [showKakao]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (error) {
          console.error('Error copying to clipboard:', error);
          alert('링크 복사 중 오류가 발생했습니다.');
        }
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (error) {
          console.error('Error copying:', error);
        }
        document.body.removeChild(textArea);
      }
    }
  };

  const handleKakaoShare = () => {
    if (!shareUrl) return;
    const kakao = (window as typeof window & { Kakao?: any }).Kakao;
    if (!kakaoReady || !kakao?.Link?.sendDefault) {
      handleShare();
      return;
    }

    const imageUrl = `${window.location.origin}/og-default.png`;
    const description = result ? `${title} 결과: ${result}` : `${title}을(를) 바로 사용해보세요.`;

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          webUrl: shareUrl,
          mobileWebUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '앱 열기',
          link: {
            webUrl: shareUrl,
            mobileWebUrl: shareUrl,
          },
        },
      ],
    });
  };

  if (variant === 'icon') {
    return (
      <div className="flex items-center gap-2">
        {showKakao && (
          <button
            onClick={handleKakaoShare}
            className="p-3 rounded-xl bg-yellow-300 text-black hover:scale-110 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="카카오톡 공유"
          >
            <span className="font-black">K</span>
          </button>
        )}
        <button
          onClick={handleShare}
          className="p-3 rounded-xl glass hover:scale-110 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
          aria-label="링크 공유"
        >
          {copied ? (
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      {showKakao && (
        <button
          onClick={handleKakaoShare}
          className="px-6 py-3 rounded-xl font-bold text-black transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-lg bg-yellow-300"
        >
          카카오톡 공유
        </button>
      )}
      <button
        onClick={handleShare}
        className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {copied ? (
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            링크가 복사되었습니다
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.885 12.938 9 12.482 9 12c0-.482-.115-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            링크 공유
          </span>
        )}
      </button>
    </div>
  );
}
