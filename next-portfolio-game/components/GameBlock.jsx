'use client';

/* eslint-disable @next/next/no-img-element */

const GameBlock = ({ x, y, label, isHit }) => {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: x, bottom: y }}
    >
      <div className="mb-2 z-10 rounded-full border border-emerald-200/40 bg-black/80 px-3 py-1 text-xs font-medium text-emerald-300 shadow-lg">
        {label}
      </div>
      <img
        src="/assets/sprites/question-mark-block.svg"
        className="w-16 h-16 select-none"
        alt="Question block"
        draggable={false}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default GameBlock;
