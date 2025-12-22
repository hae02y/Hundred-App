import { NextRequest, NextResponse } from 'next/server';

/**
 * 이벤트 로깅 API (MVP에서는 메모리 저장 또는 콘솔 로그)
 * 추후 실제 이벤트 저장소(DB, Analytics 등)로 교체 가능
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { appKey, eventType, data } = body;

    // MVP: 콘솔 로그로만 처리
    // TODO: 추후 실제 이벤트 저장소로 전송
    console.log(`[Event] appKey: ${appKey}, type: ${eventType}`, data);

    // 메모리 저장 예시 (프로덕션에서는 DB 사용)
    // events.push({ appKey, eventType, data, timestamp: Date.now() });

    return NextResponse.json({
      success: true,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error in /api/event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

