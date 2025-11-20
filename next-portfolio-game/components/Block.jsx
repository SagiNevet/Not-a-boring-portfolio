'use client';

import { useEffect, useState } from 'react';

/* eslint-disable @next/next/no-img-element */

const Block = ({ x, y, type, id, isHit, isAnimating }) => {
  const [bounceOffset, setBounceOffset] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      setBounceOffset(8);
      const timer = setTimeout(() => setBounceOffset(0), 200);
      return () => clearTimeout(timer);
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
