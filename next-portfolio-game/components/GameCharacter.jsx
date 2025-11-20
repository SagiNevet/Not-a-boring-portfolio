'use client';

/* eslint-disable @next/next/no-img-element */

const GameCharacter = ({ x, y }) => {
  return (
    <div
      className="absolute will-change-transform"
      style={{
        left: x,
        bottom: y,
        width: 32,
        height: 48,
      }}
    >
      <img
        src="/assets/sprites/sagi.png"
        alt="Pixel art of Sagi"
        width={32}
        height={48}
        className="pixelated select-none drop-shadow-[0_8px_15px_rgba(15,255,208,0.25)]"
        draggable={false}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default GameCharacter;
