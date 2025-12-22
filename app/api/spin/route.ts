import { NextRequest, NextResponse } from 'next/server';
import { loadAppConfig } from '@/lib/app-config-loader';

/**
 * 가중치 기반 랜덤 선택 함수
 */
function weightedRandom(items: Array<{ id: string; weight: number }>): string {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.weight;
    if (random <= 0) {
      return item.id;
    }
  }

  // 폴백 (이론적으로 도달하지 않아야 함)
  return items[items.length - 1].id;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { appKey } = body;

    if (!appKey || typeof appKey !== 'string') {
      return NextResponse.json(
        { error: 'appKey is required' },
        { status: 400 }
      );
    }

    // 앱 설정 로드
    const config = await loadAppConfig(appKey);

    if (!config) {
      return NextResponse.json(
        { error: 'App not found' },
        { status: 404 }
      );
    }

    if (!config.items || config.items.length === 0) {
      return NextResponse.json(
        { error: 'No items configured' },
        { status: 400 }
      );
    }

    // 서버에서 가중치 기반 랜덤 확정
    const selectedItemId = weightedRandom(config.items);
    const selectedItem = config.items.find(item => item.id === selectedItemId);

    if (!selectedItem) {
      return NextResponse.json(
        { error: 'Failed to select item' },
        { status: 500 }
      );
    }

    // 이벤트 로깅 (옵션)
    // TODO: 추후 실제 이벤트 저장소로 전송
    console.log(`[Spin Event] appKey: ${appKey}, itemId: ${selectedItemId}, timestamp: ${Date.now()}`);

    return NextResponse.json({
      itemId: selectedItem.id,
      label: selectedItem.label,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error in /api/spin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

