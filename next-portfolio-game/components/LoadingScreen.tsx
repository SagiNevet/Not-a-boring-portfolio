'use client';

import { useState, useEffect } from 'react';

type LoadingScreenProps = {
  onComplete: () => void;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const text = 'NOT A BORING PORTFOLIO';
  const speed = 55; // 40-70ms per char (using middle value)

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        // Wait a bit then fade out
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            onComplete();
          }, 500); // Fade out duration
        }, 800);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950 transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="font-mono text-2xl md:text-4xl font-bold text-emerald-400 tracking-wider pixelated" style={{ fontFamily: 'monospace' }}>
          {displayText}
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}

