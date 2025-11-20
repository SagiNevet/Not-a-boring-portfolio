'use client';

import { useEffect, useState } from 'react';

/* eslint-disable @next/next/no-img-element */

const Block = ({ x, y, type, id, isHit, isAnimating }) => {
  const [bounceOffset, setBounceOffset] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      // Use setTimeout to avoid setState directly in effect
      const timer1 = setTimeout(() => setBounceOffset(8), 0);
      const timer2 = setTimeout(() => setBounceOffset(0), 200);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isAnimating]);

  if (type === 'stone') {
    return (
      <div
        className="absolute"
        style={{ left: x, bottom: y, width: 64, height: 64 }}
      >
        <img
          src="/assets/sprites/block-stone.png"
          width={64}
          height={64}
          className="select-none pointer-events-none"
          draggable={false}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    );
  }

  if (type === 'info') {
    let texture = 'block-info.png';
    if (isHit) {
      texture = 'block-empty.png';
    } else if (isAnimating) {
      texture = 'block-hit.png';
    }
    
    return (
      <div
        className="absolute"
        style={{
          left: x,
          bottom: y + bounceOffset,
          width: 64,
          height: 64,
          transition: bounceOffset ? 'none' : 'bottom 0.2s ease-out',
        }}
      >
        <img
          src={`/assets/sprites/${texture}`}
          width={64}
          height={64}
          className="select-none pointer-events-none"
          draggable={false}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    );
  }

  if (type === 'locked') {
    return (
      <div
        className="absolute"
        style={{ left: x, bottom: y, width: 64, height: 64 }}
      >
        <img
          src="/assets/sprites/block-info.png"
          width={64}
          height={64}
          className="select-none pointer-events-none opacity-50"
          draggable={false}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    );
  }

  return null;
};

export default Block;
