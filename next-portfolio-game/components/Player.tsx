'use client';

import { PLAYER_WIDTH, PLAYER_HEIGHT } from '@/utils/physics';

type PlayerState = 'idle' | 'run' | 'jump';

export default function Player({
  x,
  y,
  state,
  vx,
  facing,
}: {
  x: number;
  y: number;
  state: PlayerState;
  vx: number;
  facing: 'left' | 'right';
}) {
  let animationClass = '';

  if (state === 'idle') {
    animationClass = 'animate-[sg-breathe_1s_ease-in-out_infinite]';
  } else if (state === 'run') {
    animationClass = 'animate-[sg-run_0.3s_linear_infinite]';
  } else if (state === 'jump') {
    animationClass = 'animate-[sg-jump_0.4s_ease-out_infinite]';
  }

  return (
    <div
      className={`absolute ${animationClass}`}
      style={{
        left: x,
        bottom: y,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        zIndex: 10,
        transform: facing === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
        transformOrigin: 'center',
      }}
    >
      <img
        src="/assets/sprites/sagi.png"
        alt="Sagi pixel hero"
        className="w-16 h-16 pixelated select-none pointer-events-none"
        style={{
          imageRendering: 'pixelated',
        }}
        draggable={false}
      />
    </div>
  );
}
