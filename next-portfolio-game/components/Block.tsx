'use client';

import { BLOCK_SIZE, SMALL_BLOCK_WIDTH, SMALL_BLOCK_HEIGHT } from '@/utils/physics';

export type BlockType = 'stone' | 'info' | 'stone-small';

export type BlockState = {
  mode: 'idle' | 'hit' | 'empty';
  hasSpawnedCoin: boolean;
};

export type GameBlockConfig = {
  id: string;
  type: BlockType;
  x: number;
  y: number;
  label?: string;
  fact?: string;
  isPlatform?: boolean;
};

type BlockProps = {
  block: GameBlockConfig;
  state: BlockState | 'idle' | 'hit' | 'empty'; // Support both old and new format
  bumpOffset?: number;
};

export default function Block({ block, state, bumpOffset = 0 }: BlockProps) {
  let spriteSrc = '';
  const blockState = typeof state === 'string' ? { mode: state, hasSpawnedCoin: false } : state;
  const blockWidth = block.type === 'stone-small' ? SMALL_BLOCK_WIDTH : BLOCK_SIZE;
  const blockHeight = block.type === 'stone-small' ? SMALL_BLOCK_HEIGHT : BLOCK_SIZE;

  if (block.type === 'stone' || block.type === 'stone-small') {
    spriteSrc = '/assets/sprites/block.svg';
  } else {
    // Info block states
    if (blockState.mode === 'idle') {
      spriteSrc = '/assets/sprites/question-mark-block.svg';
    } else if (blockState.mode === 'hit') {
      spriteSrc = '/assets/sprites/question-mark-block.svg';
    } else {
      // empty state
      spriteSrc = '/assets/sprites/block.svg';
    }
  }

  return (
    <div
      className="absolute flex flex-col items-center z-10"
      style={{
        left: block.x,
        bottom: block.y + bumpOffset,
      }}
    >
      {block.type === 'info' && (
        <div className="mb-2 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-emerald-300 text-center border border-emerald-400/40">
          {block.label}
        </div>
      )}
      <div
        className={`flex items-center justify-center ${block.type === 'stone' || block.type === 'stone-small' ? 'opacity-100' : blockState.mode === 'empty' ? 'opacity-50' : 'opacity-100'}`}
        style={{
          width: blockWidth,
          height: blockHeight,
        }}
      >
        <img
          src={spriteSrc}
          alt={block.type === 'stone' ? 'Stone block' : 'Info block'}
          className="w-16 h-16 pixelated select-none pointer-events-none"
          style={{
            imageRendering: 'pixelated',
          }}
          draggable={false}
        />
      </div>
    </div>
  );
}
