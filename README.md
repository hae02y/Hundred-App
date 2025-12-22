# HundredApp - 룰렛/랜덤 기반 멀티테넌트 웹앱

Next.js로 구현된 룰렛/랜덤 기반의 멀티테넌트 웹앱 MVP입니다. 1개 코드베이스로 100개 이상의 앱을 운영할 수 있는 구조로 설계되었습니다.

## 🚀 주요 기능

- **멀티테넌트 구조**: URL 경로(`/{appKey}`)로 테넌트 구분
- **가중치 기반 랜덤**: 서버에서 확정하는 공정한 랜덤 선택
- **쿨다운 시스템**: 연속 클릭 방지 및 하루 1회 제한 옵션
- **반응형 디자인**: 모바일 우선, 데스크탑 최적화
- **부드러운 애니메이션**: framer-motion 기반의 자연스러운 회전 효과
- **공유 기능**: Web Share API 및 링크 복사 지원

## 📦 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Animation**: framer-motion
- **State Management**: React Hooks (Context 필요시 zustand)
- **Package Manager**: pnpm

## 🛠️ 설치 및 실행

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 프로덕션 빌드

```bash
pnpm build
pnpm start
```

## 📁 프로젝트 구조

```
hundredapp/
├── app/                      # Next.js App Router
│   ├── [appKey]/            # 동적 라우트 (멀티테넌트)
│   │   ├── page.tsx         # 앱 페이지
│   │   └── not-found.tsx    # 404 페이지
│   ├── api/                 # API Routes
│   │   ├── spin/            # 룰렛 돌리기 API
│   │   └── event/           # 이벤트 로깅 API
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈페이지
│   └── globals.css          # 전역 스타일
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── RouletteApp.tsx  # 메인 앱 컴포넌트
│   │   ├── RouletteWheel.tsx # 룰렛 휠 컴포넌트
│   │   ├── ResultModal.tsx  # 결과 모달
│   │   └── ShareButton.tsx  # 공유 버튼
│   ├── config/              # 앱 설정
│   │   └── apps/            # 앱별 JSON 설정
│   │       ├── roulette-01.json
│   │       └── roulette-02.json
│   ├── hooks/               # Custom Hooks
│   │   └── useCooldown.ts   # 쿨다운 관리
│   ├── lib/                 # 유틸리티
│   │   └── app-config-loader.ts # 설정 로더
│   └── types/               # TypeScript 타입
│       └── app-config.ts    # 앱 설정 타입
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🎯 사용 방법

### 앱 접근

1. 홈페이지(`/`)에서 앱 목록 확인
2. 원하는 앱 클릭 또는 직접 URL 접근: `/{appKey}`
   - 예: `/roulette-01`, `/roulette-02`

### 룰렛 돌리기

1. 앱 페이지에서 "돌리기" 버튼 클릭
2. 룰렛이 회전하며 서버에서 결과 확정
3. 결과 모달에서 결과 확인 및 공유

### 새 앱 추가하기

1. `src/config/apps/` 디렉토리에 새 JSON 파일 생성
2. `src/lib/app-config-loader.ts`에 import 추가
3. `configMap`에 새 앱 등록

예시:

```json
{
  "appKey": "roulette-03",
  "title": "내 앱 이름",
  "description": "앱 설명",
  "theme": {
    "primary": "#색상코드",
    "background": "#색상코드",
    "accent": "#색상코드"
  },
  "items": [
    {
      "id": "item1",
      "label": "항목1",
      "weight": 1,
      "description": "설명"
    }
  ],
  "rules": {
    "cooldownSec": 3,
    "onePerDay": false
  }
}
```

## ⚙️ 설정 스펙

### AppConfig 타입

```typescript
{
  appKey: string;           // 고유 앱 키 (URL 경로)
  title: string;            // 앱 제목
  description?: string;      // 앱 설명
  theme: {
    primary: string;        // 주 색상
    background: string;     // 배경 색상
    accent: string;         // 강조 색상
    text?: string;          // 텍스트 색상 (옵션)
  };
  items: Array<{
    id: string;             // 항목 ID
    label: string;          // 표시 이름
    weight: number;         // 가중치 (높을수록 선택 확률 증가)
    description?: string;   // 설명 (옵션)
  }>;
  rules?: {
    cooldownSec?: number;   // 쿨다운 시간 (초)
    onePerDay?: boolean;    // 하루 1회 제한
  };
}
```

## 🔌 API 엔드포인트

### POST /api/spin

룰렛을 돌려 결과를 확정합니다.

**Request:**
```json
{
  "appKey": "roulette-01"
}
```

**Response:**
```json
{
  "itemId": "korean",
  "label": "한식",
  "timestamp": 1234567890
}
```

### POST /api/event

이벤트를 로깅합니다 (MVP에서는 콘솔 로그만).

**Request:**
```json
{
  "appKey": "roulette-01",
  "eventType": "spin",
  "data": {}
}
```

## 🎨 커스터마이징

### 테마 변경

각 앱의 JSON 설정에서 `theme` 객체를 수정하여 색상을 변경할 수 있습니다.

### 애니메이션 조정

`src/components/RouletteWheel.tsx`에서 `duration` 및 `ease` 값을 조정할 수 있습니다.

### 쿨다운 규칙

각 앱의 `rules` 설정에서 쿨다운 시간과 하루 1회 제한을 설정할 수 있습니다.

## 🚀 추후 확장 포인트

### 백엔드 연결

1. `src/lib/app-config-loader.ts`의 `loadAppConfig` 함수를 API 호출로 교체
2. Spring Boot 등 백엔드 API와 연동
3. 데이터베이스에서 앱 설정 및 이벤트 저장

### WebView 포팅

1. React Native WebView 또는 Capacitor 사용
2. 네이티브 공유 기능 연동
3. 푸시 알림 추가

### 추가 기능

- 사용자 인증 및 개인화
- 통계 및 분석 대시보드
- 관리자 페이지
- 다국어 지원

## 📝 라이선스

MIT

## 🤝 기여

이슈 및 풀 리퀘스트를 환영합니다!

