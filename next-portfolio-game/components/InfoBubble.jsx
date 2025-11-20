'use client';

import { useEffect, useState } from 'react';

/* eslint-disable @next/next/no-img-element */

const INFO_TEXTS = [
  'Who Am I?',
  'Technologies I Know',
  'Projects',
  'Experience',
  'Contact Me',
];

const InfoBubble = ({ x, y, index, onComplete }) => {
  const [offsetY, setOffsetY] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setOffsetY(-40 * progress);
      setOpacity(1 - progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  const text = INFO_TEXTS[index % INFO_TEXTS.length] || 'Info';

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x + 32,
        bottom: y + 64 + offsetY,
        transform: 'translateX(-50%)',
        opacity,
        transition: 'opacity 0.1s linear',
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <img
          src="/assets/sprites/info-coin.png"
          width={32}
          height={32}
          className="select-none"
          draggable={false}
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="px-2 py-1 rounded bg-black/80 text-white text-xs font-semibold whitespace-nowrap border border-emerald-400/40">
          {text}
        </div>
      </div>
    </div>
  );
};

export default InfoBubble;
