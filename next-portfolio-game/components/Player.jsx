'use client';

/* eslint-disable @next/next/no-img-element */

const Player = ({ x, y, facing, state = 'idle' }) => {
  return (
    <div
      className="absolute will-change-transform"
      style={{
        left: x,
        bottom: y,
        width: 64,
        height: 64,
        transform: facing === 'left' ? 'scaleX(-1)' : 'none',
      }}
    >
      <img
        src="/assets/sprites/sagi.png"
        width={64}
        height={64}
        className="select-none pointer-events-none"
        draggable={false}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default Player;
