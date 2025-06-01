/**
 * SSE 구독 함수. 연결을 반환하므로 언마운트 시 close 필요
 * @param url SSE 엔드포인트
 * @param onMessage 메시지 수신 핸들러
 * @param onError 에러 핸들러
 * @returns unsubscribe 함수
 */
export const subscribeSpeechSSE = (
    url: string,
    onMessage: (event: MessageEvent) => void,
    onError: (event: Event) => void
  ): (() => void) => {
    const eventSource = new EventSource(url);
    eventSource.onmessage = onMessage;
    eventSource.onerror = onError;
    return () => eventSource.close();
  };