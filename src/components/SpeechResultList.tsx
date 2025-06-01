import React, { useEffect, useState } from 'react';
import { parseSpeechResult } from '../domain/speechResult';
import { subscribeSpeechSSE } from '../data/speechSSE';

export interface SpeechResult {
  id: number;
  text: string;
  createdAt: string;
}

export interface SpeechResultListProps {
  sseUrl?: string;
  initialResults?: SpeechResult[];
}

const DEFAULT_SSE_URL = 'http://localhost:3000/event/stream';

const SpeechResultList: React.FC<SpeechResultListProps> = ({
  sseUrl = DEFAULT_SSE_URL,
  initialResults = [],
}) => {
  const [results, setResults] = useState<SpeechResult[]>(initialResults);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const result = parseSpeechResult(event.data);
      if (result) {
        setResults((prev) => [...prev, result]);
      }
    };

    const handleError = (error: Event) => {
      console.error('SSE Error:', error);
    };

    const unsubscribe = subscribeSpeechSSE(sseUrl, handleMessage, handleError);
    return unsubscribe;
  }, [sseUrl]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black">
      {results.slice(-2).map((result) => (
        <span key={result.id} className="text-white text-[6vw] font-bold text-center">
          {result.text}
        </span>
      ))}
    </div>
  );
};

export default SpeechResultList;