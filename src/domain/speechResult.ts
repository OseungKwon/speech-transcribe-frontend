// src/domain/speechResult.ts

export interface SpeechResult {
    id: number;
    text: string;
    createdAt: string;
  }
  
  /**
   * SSE로 받은 raw 데이터를 파싱하고, 올바른 타입이면 SpeechResult 객체 반환
   * @param raw
   * @returns SpeechResult | null
   */
  export const parseSpeechResult = (raw: string): SpeechResult | null => {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.type === 'speech-result' && parsed.data) {
        return {
          id: parsed.data.id,
          text: parsed.data.text,
          createdAt: parsed.data.createdAt,
        };
      }
      return null;
    } catch {
      return null;
    }
  };