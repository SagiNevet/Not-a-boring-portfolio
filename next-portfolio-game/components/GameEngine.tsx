'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Player from './Player';
import Block, { type GameBlockConfig, type BlockState } from './Block';
import InfoBubble, { type InfoItem } from './InfoBubble';
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  FLOOR_Y,
  GRAVITY,
  JUMP_FORCE,
  MOVE_SPEED,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  BLOCK_WIDTH,
  BLOCK_HEIGHT,
  INFO_GRAVITY,
  INFO_ITEM_HEIGHT,
  SMALL_BLOCK_WIDTH,
  SMALL_BLOCK_HEIGHT,
} from '@/utils/physics';
import { checkAABBCollision, checkBlockHitFromBelow } from '@/utils/collision';

// Exactly 4 info blocks only - no stone blocks
// Info blocks also serve as platforms so player can stand on them
const INFO_BLOCKS: GameBlockConfig[] = [
  {
    id: 'who',
    type: 'info',
    x: 200,
    y: 220,
    label: 'Who Am I?',
    fact: "I'm Sagi, a CS student and builder.",
    isPlatform: true,
  },
  {
    id: 'tech',
    type: 'info',
    x: 400,
    y: 220,
    label: 'Technologies / Skills',
    fact: 'React, Next.js, TypeScript, Python, automation and more.',
    isPlatform: true,
  },
  {
    id: 'projects',
    type: 'info',
    x: 600,
    y: 220,
    label: 'Projects',
    fact: 'TechPulse, Trackademics, Worldwide Holidays Finder, ZapRest Scraper.',
    isPlatform: true,
  },
  {
    id: 'education',
    type: 'info',
    x: 150,
    y: 140,
    label: 'Education',
    fact: 'Third-year CS student at HIT. Building a strong CS foundation alongside practical project work.',
    isPlatform: true,
  },
];

// Only info blocks - no stone blocks
const ALL_BLOCKS = [...INFO_BLOCKS];

const COIN_OFFSET_Y = 32;

type GameEngineProps = {
  onCollect: () => void;
  collectedCount: number;
  onUnlockPortfolio?: () => void;
};

export default function GameEngine({
  onCollect,
  collectedCount,
  onUnlockPortfolio,
}: GameEngineProps) {
  const router = useRouter();
  const keysRef = useRef({ left: false, right: false, jump: false });
  const [player, setPlayer] = useState({
    x: 120,
    y: FLOOR_Y,
    vx: 0,
    vy: 0,
    isJumping: false,
    facing: 'right' as 'left' | 'right',
  });
  const [blockStates, setBlockStates] = useState<Record<string, BlockState>>({});
  const [blockBumps, setBlockBumps] = useState<Record<string, number>>({});
  const [infoItems, setInfoItems] = useState<InfoItem[]>([]);
  const prevPlayerRef = useRef({ x: 120, y: FLOOR_Y });
  const currentPlayerRef = useRef({ x: 120, y: FLOOR_Y });
  // Use ref to prevent double spawning (race condition fix)
  const spawningBlocksRef = useRef<Set<string>>(new Set());
  // Use ref to store onCollect callback
  const onCollectRef = useRef(onCollect);
  // Use ref to track items collected in current frame
  const itemsCollectedThisFrameRef = useRef(0);

  // Update onCollect ref when it changes
  useEffect(() => {
    onCollectRef.current = onCollect;
  }, [onCollect]);

  // Initialize all info blocks as 'idle' with hasSpawnedCoin = false (NO localStorage)
  // Reset everything on mount/refresh
  useEffect(() => {
    const initialStates: Record<string, BlockState> = {};
    INFO_BLOCKS.forEach((block) => {
      initialStates[block.id] = {
        mode: 'idle',
        hasSpawnedCoin: false,
      };
    });
    setBlockStates(initialStates);
    // Reset info items on mount
    setInfoItems([]);
    // Reset block bumps
    setBlockBumps({});
    // Reset spawning blocks ref
    spawningBlocksRef.current.clear();
    // Reset items collected ref
    itemsCollectedThisFrameRef.current = 0;
    // Reset player position
    setPlayer({
      x: 120,
      y: FLOOR_Y,
      vx: 0,
      vy: 0,
      isJumping: false,
      facing: 'right',
    });
    prevPlayerRef.current = { x: 120, y: FLOOR_Y };
    currentPlayerRef.current = { x: 120, y: FLOOR_Y };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        keysRef.current.left = true;
      }
      if (
        event.key === 'ArrowRight' ||
        event.key === 'd' ||
        event.key === 'D'
      ) {
        keysRef.current.right = true;
      }
      if (
        event.key === ' ' ||
        event.key === 'ArrowUp' ||
        event.key === 'w' ||
        event.key === 'W'
      ) {
        event.preventDefault();
        keysRef.current.jump = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        keysRef.current.left = false;
      }
      if (
        event.key === 'ArrowRight' ||
        event.key === 'd' ||
        event.key === 'D'
      ) {
        keysRef.current.right = false;
      }
      if (
        event.key === ' ' ||
        event.key === 'ArrowUp' ||
        event.key === 'w' ||
        event.key === 'W'
      ) {
        keysRef.current.jump = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Physics loop
  useEffect(() => {
    let frame: number;

    const step = () => {
      setPlayer((prev) => {
        let { x, y, vy, isJumping, facing } = prev;
        const leftPressed = keysRef.current.left;
        const rightPressed = keysRef.current.right;
        const jumpPressed = keysRef.current.jump;

        // Horizontal movement
        const vx = rightPressed
          ? MOVE_SPEED
          : leftPressed
            ? -MOVE_SPEED
            : 0;

        // Update facing direction - track in state
        // When moving RIGHT (ArrowRight) → facing = "right" → sprite faces right (flipped)
        // When moving LEFT (ArrowLeft) → facing = "left" → sprite faces left (normal)
        if (rightPressed) {
          facing = 'right';
        } else if (leftPressed) {
          facing = 'left';
        }
        // Keep last facing direction when not moving (don't reset)

        // Apply gravity
        vy += GRAVITY;

        // Jump - can jump from ground or platform
        if (jumpPressed && !isJumping) {
          let canJump = y <= FLOOR_Y + 1;

          // Check if standing on any platform (stone or stone-small)
          if (!canJump) {
            ALL_BLOCKS.forEach((block) => {
              if (block.isPlatform) {
                const blockHeight =
                  block.type === 'stone-small'
                    ? SMALL_BLOCK_HEIGHT
                    : BLOCK_HEIGHT;
                const blockWidth =
                  block.type === 'stone-small' ? SMALL_BLOCK_WIDTH : BLOCK_WIDTH;
                const blockTop = block.y + blockHeight;
                const playerLeft = x;
                const playerRight = x + PLAYER_WIDTH;
                const blockLeft = block.x;
                const blockRight = block.x + blockWidth;

                if (
                  Math.abs(y - blockTop) < 2 &&
                  playerRight > blockLeft &&
                  playerLeft < blockRight
                ) {
                  canJump = true;
                }
              }
            });
          }

          if (canJump) {
            vy = JUMP_FORCE;
            isJumping = true;
          }
        }

        // Update position
        x += vx;
        y += vy;

        const newPlayer = { x, y, vx, vy, isJumping, facing };
        const prevY = prevPlayerRef.current.y;

        // Check platform collisions first (all platforms: stone, stone-small)
        ALL_BLOCKS.forEach((block) => {
          if (block.isPlatform) {
            const blockHeight =
              block.type === 'stone-small' ? SMALL_BLOCK_HEIGHT : BLOCK_HEIGHT;
            const blockWidth =
              block.type === 'stone-small' ? SMALL_BLOCK_WIDTH : BLOCK_WIDTH;
            const blockTop = block.y + blockHeight;
            const blockLeft = block.x;
            const blockRight = block.x + blockWidth;
            const playerLeft = x;
            const playerRight = x + PLAYER_WIDTH;
            const playerBottom = y;
            const playerTop = y + PLAYER_HEIGHT;

            // Platform landing detection
            if (
              prevY >= blockTop &&
              vy < 0 &&
              playerBottom <= blockTop &&
              playerRight > blockLeft &&
              playerLeft < blockRight
            ) {
              y = blockTop;
              vy = 0;
              isJumping = false;
            }
          }
        });

        // Check collisions with blocks
        ALL_BLOCKS.forEach((block) => {
          if (!checkAABBCollision(newPlayer, block)) return;

          const blockState =
            blockStates[block.id] ||
            (block.type === 'info'
              ? { mode: 'idle', hasSpawnedCoin: false }
              : null);

          if (block.type === 'stone' || block.type === 'stone-small') {
            // Stone blocks - just collision, no interaction
            const blockHeight =
              block.type === 'stone-small' ? SMALL_BLOCK_HEIGHT : BLOCK_HEIGHT;
            const blockWidth =
              block.type === 'stone-small' ? SMALL_BLOCK_WIDTH : BLOCK_WIDTH;
            const blockTop = block.y + blockHeight;
            const blockBottom = block.y;
            const playerTop = y + PLAYER_HEIGHT;
            const prevPlayerTop = prevPlayerRef.current.y + PLAYER_HEIGHT;

            // Landing on top
            if (
              prevPlayerTop <= blockTop &&
              playerTop >= blockTop &&
              vy < 0
            ) {
              y = blockTop;
              vy = 0;
              isJumping = false;
            }
            // Hitting from below
            else if (
              prevPlayerRef.current.y > blockBottom &&
              y <= blockBottom &&
              vy > 0
            ) {
              y = blockBottom - PLAYER_HEIGHT;
              vy = 0;
            }
            // Hitting from left
            else if (
              x + PLAYER_WIDTH > block.x &&
              prevPlayerRef.current.x + PLAYER_WIDTH <= block.x
            ) {
              x = block.x - PLAYER_WIDTH;
            }
            // Hitting from right
            else if (
              x < block.x + blockWidth &&
              prevPlayerRef.current.x >= block.x + blockWidth
            ) {
              x = block.x + blockWidth;
            }
          } else if (block.type === 'info' && blockState) {
            const currentState =
              typeof blockState === 'string'
                ? { mode: blockState, hasSpawnedCoin: false }
                : blockState;

            // Info blocks - check hit from below
            // Prevent spawning if all 4 are already collected
            if (
              currentState.mode === 'idle' &&
              checkBlockHitFromBelow(newPlayer, prevPlayerRef.current, block) &&
              collectedCount < 4 &&
              !spawningBlocksRef.current.has(block.id) &&
              !currentState.hasSpawnedCoin
            ) {
              // Mark as currently spawning IMMEDIATELY to prevent double spawn
              spawningBlocksRef.current.add(block.id);
              
              // Mark as hit and spawned
              setBlockStates((prev) => ({
                ...prev,
                [block.id]: {
                  mode: 'hit',
                  hasSpawnedCoin: true,
                },
              }));

              // Bump animation
              setBlockBumps((prev) => ({
                ...prev,
                [block.id]: 8,
              }));

              // After a short delay, set to empty
              setTimeout(() => {
                setBlockStates((prev) => ({
                  ...prev,
                  [block.id]: {
                    mode: 'empty',
                    hasSpawnedCoin: true,
                  },
                }));
              }, 100);

              // Spawn coin ABOVE the block (not on player)
              // A. Spawn position based ONLY on block, not player
              // Coin stays ABOVE the block (like Mario) - doesn't fall down
              const BLOCK_TOP = block.y + BLOCK_HEIGHT;
              const INFO_SPAWN_Y = BLOCK_TOP + 20; // 20px above the block - stays there
              // Add small random horizontal offset (±30px) so coins don't overlap
              const horizontalOffset = (Math.random() - 0.5) * 60; // ±30px - small offset
              const INFO_SPAWN_X = block.x + BLOCK_WIDTH / 2 + horizontalOffset;
              
              const itemId = `info-${block.id}-${Date.now()}`;
              const itemText = block.fact ?? block.label ?? 'Info';

              setInfoItems((prev) => [
                ...prev,
                {
                  id: itemId,
                  x: INFO_SPAWN_X,
                  y: INFO_SPAWN_Y,
                  vy: 0, // No velocity - stays in place
                  text: itemText,
                  state: 'idle', // Start as 'idle' - stays above block like Mario
                },
              ]);
              
              // Remove from spawning set after delay to allow next hit (but hasSpawnedCoin prevents it)
              setTimeout(() => {
                spawningBlocksRef.current.delete(block.id);
              }, 1000);
            } else if (
              currentState.mode === 'idle' &&
              checkBlockHitFromBelow(newPlayer, prevPlayerRef.current, block) &&
              currentState.hasSpawnedCoin
            ) {
              // Already spawned - just bump animation, no new coin
              setBlockBumps((prev) => ({
                ...prev,
                [block.id]: 4, // Smaller bump
              }));
              
              // Position player just below the block and bounce down
              y = block.y - PLAYER_HEIGHT;
              vy = -2;
            } else {
              // Regular collision with info block - PREVENT PASSING THROUGH
              const blockTop = block.y + BLOCK_HEIGHT;
              const blockBottom = block.y;
              const blockLeft = block.x;
              const blockRight = block.x + BLOCK_WIDTH;
              const playerTop = y + PLAYER_HEIGHT;
              const playerBottom = y;
              const playerLeft = x;
              const playerRight = x + PLAYER_WIDTH;
              const prevPlayerTop = prevPlayerRef.current.y + PLAYER_HEIGHT;
              const prevPlayerBottom = prevPlayerRef.current.y;
              const prevPlayerLeft = prevPlayerRef.current.x;
              const prevPlayerRight = prevPlayerRef.current.x + PLAYER_WIDTH;

              // Check if player is colliding with block (AABB collision)
              const isColliding = 
                playerRight > blockLeft &&
                playerLeft < blockRight &&
                playerTop > blockBottom &&
                playerBottom < blockTop;

              if (isColliding) {
                // Landing on top (falling down onto block)
                if (
                  prevPlayerTop <= blockTop &&
                  playerTop > blockTop &&
                  vy < 0 &&
                  playerRight > blockLeft &&
                  playerLeft < blockRight
                ) {
                  y = blockTop;
                  vy = 0;
                  isJumping = false;
                }
                // Hitting from below (jumping up into block) - PREVENT THIS
                else if (
                  prevPlayerBottom >= blockBottom &&
                  playerBottom < blockBottom &&
                  vy > 0 &&
                  playerRight > blockLeft &&
                  playerLeft < blockRight
                ) {
                  // Stop player from going through block from below
                  y = blockBottom - PLAYER_HEIGHT;
                  vy = 0;
                }
                // Hitting from left side
                else if (
                  prevPlayerRight <= blockLeft &&
                  playerRight > blockLeft &&
                  playerTop > blockBottom &&
                  playerBottom < blockTop
                ) {
                  x = blockLeft - PLAYER_WIDTH;
                }
                // Hitting from right side
                else if (
                  prevPlayerLeft >= blockRight &&
                  playerLeft < blockRight &&
                  playerTop > blockBottom &&
                  playerBottom < blockTop
                ) {
                  x = blockRight;
                }
                // General collision - push player out
                else {
                  // If player is inside block, push them out based on smallest overlap
                  const overlapLeft = playerRight - blockLeft;
                  const overlapRight = blockRight - playerLeft;
                  const overlapTop = playerTop - blockBottom;
                  const overlapBottom = blockTop - playerBottom;
                  
                  const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
                  
                  if (minOverlap === overlapLeft) {
                    x = blockLeft - PLAYER_WIDTH;
                  } else if (minOverlap === overlapRight) {
                    x = blockRight;
                  } else if (minOverlap === overlapTop) {
                    y = blockBottom - PLAYER_HEIGHT;
                    vy = 0;
                  } else if (minOverlap === overlapBottom) {
                    y = blockTop;
                    vy = 0;
                    isJumping = false;
                  }
                }
              }
            }
          }
        });

        // Ground collision
        if (y <= FLOOR_Y) {
          y = FLOOR_Y;
          vy = 0;
          isJumping = false;
        }

        // Clamp x within world bounds
        x = Math.max(0, Math.min(x, WORLD_WIDTH - PLAYER_WIDTH));

        prevPlayerRef.current = { x, y };
        currentPlayerRef.current = { x, y };
        return { x, y, vx, vy, isJumping, facing };
      });

      // Update block bump animations
      setBlockBumps((prev) => {
        const updated: Record<string, number> = {};
        Object.keys(prev).forEach((blockId) => {
          const current = prev[blockId];
          if (current > 0) {
            updated[blockId] = Math.max(0, current - 0.5);
          }
        });
        return updated;
      });

      // Update info items physics (B. Gravity pulls DOWN)
      setInfoItems((prev) => {
        return prev.map((item) => {
          if (item.state !== 'falling') return item;

          let { x, y, vy } = item;

          // Apply gravity downward (negative vy = falling down in our coordinate system)
          // INFO_GRAVITY = -0.5, so vy becomes more negative = falls down
          vy += INFO_GRAVITY;
          y += vy;

          // C. Stop at ground/platform
          // Collision with ground - stop falling when touching ground
          if (y <= FLOOR_Y + INFO_ITEM_HEIGHT / 2) {
            // Stop falling - set to idle state
            y = FLOOR_Y + INFO_ITEM_HEIGHT / 2;
            vy = 0;
            return { ...item, x, y, vy, state: 'idle' };
          }

          // Collision with platform top - check all platforms
          let landedOnPlatform = false;
          ALL_BLOCKS.forEach((block) => {
            if (landedOnPlatform) return;

            if (block.isPlatform) {
              const blockHeight =
                block.type === 'stone-small'
                  ? SMALL_BLOCK_HEIGHT
                  : BLOCK_HEIGHT;
              const blockWidth =
                block.type === 'stone-small' ? SMALL_BLOCK_WIDTH : BLOCK_WIDTH;
              const blockTop = block.y + blockHeight;
              const blockLeft = block.x;
              const blockRight = block.x + blockWidth;
              // Item collision box (x is center, so left/right are ±80px)
              const itemLeft = x - 80;
              const itemRight = x + 80;
              const itemBottom = y; // Distance from bottom to item's bottom
              const itemTop = y + INFO_ITEM_HEIGHT; // Distance from bottom to item's top

              // If item is falling and crosses platform top, and horizontally overlaps
              // itemBottom <= blockTop means item's bottom is at or below block's top
              // itemTop > blockTop means item's top is still above block's top (just crossed)
              if (
                itemBottom <= blockTop &&
                itemTop > blockTop &&
                itemRight > blockLeft &&
                itemLeft < blockRight
              ) {
                // Stop falling on platform - set to idle
                y = blockTop + INFO_ITEM_HEIGHT / 2;
                vy = 0;
                landedOnPlatform = true;
              }
            }
          });

          // If landed on platform, mark as idle
          if (landedOnPlatform) {
            return { ...item, x, y, vy, state: 'idle' };
          }

          return { ...item, x, y, vy };
        });
      });

      // D. Player collecting the info item (only when idle)
      // Check collision and collect items
      const playerPos = currentPlayerRef.current;
      const playerLeft = playerPos.x;
      const playerRight = playerPos.x + PLAYER_WIDTH;
      const playerBottom = playerPos.y;
      const playerTop = playerPos.y + PLAYER_HEIGHT;

      // First, find items that should be collected
      const itemsToRemove: string[] = [];
      infoItems.forEach((item) => {
        if (item.state !== 'idle') return;

        // AABB collision between player and info item
        const itemLeft = item.x - 80; // Half of message width (160px / 2)
        const itemRight = item.x + 80;
        const itemBottom = item.y;
        const itemTop = item.y + INFO_ITEM_HEIGHT;

        const collides =
          playerRight > itemLeft &&
          playerLeft < itemRight &&
          playerTop > itemBottom &&
          playerBottom < itemTop;

        if (collides) {
          itemsToRemove.push(item.id);
        }
      });

      // Remove collected items
      if (itemsToRemove.length > 0) {
        setInfoItems((prev) => prev.filter((item) => !itemsToRemove.includes(item.id)));
        
        // Call onCollect for each collected item (outside of setState)
        // Use queueMicrotask to defer the call outside of the render phase
        queueMicrotask(() => {
          for (let i = 0; i < itemsToRemove.length; i++) {
            onCollectRef.current();
          }
        });
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [blockStates, onCollect, collectedCount]);

  // Check for unlock (exactly 4 coins)
  useEffect(() => {
    if (collectedCount >= 4 && onUnlockPortfolio) {
      onUnlockPortfolio();
    }
  }, [collectedCount, onUnlockPortfolio]);

  const playerState: 'idle' | 'run' | 'jump' =
    player.isJumping || player.y < FLOOR_Y
      ? 'jump'
      : Math.abs(player.vx) > 0
        ? 'run'
        : 'idle';

  return (
    <div
      className="relative mx-auto mt-8 h-[480px] w-[960px] max-w-full overflow-hidden rounded-[32px] border border-slate-700 bg-slate-950"
      style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT }}
    >
      {/* Background layers - rendered first */}
      <img
        src="/assets/backgrounds/stars.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover pointer-events-none opacity-30 z-0"
      />
      <img
        src="/assets/backgrounds/mountains.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover pointer-events-none opacity-40 z-0"
      />
      <img
        src="/assets/backgrounds/hills.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover pointer-events-none opacity-50 z-0"
      />

      {/* Ground */}
      <div
        className="absolute left-0 right-0 bg-slate-800/70 border-t border-slate-700 z-0"
        style={{
          bottom: 0,
          height: FLOOR_Y,
        }}
      />

      {/* Blocks - rendered before player */}
      {ALL_BLOCKS.map((block) => {
        const blockState = blockStates[block.id];
        const stateForBlock =
          block.type === 'info' && blockState
            ? blockState
            : block.type === 'info'
              ? { mode: 'idle' as const, hasSpawnedCoin: false }
              : 'idle';
        return (
          <Block
            key={block.id}
            block={block}
            state={stateForBlock}
            bumpOffset={blockBumps[block.id] || 0}
          />
        );
      })}

      {/* Player - rendered after blocks */}
      <Player
        x={player.x}
        y={player.y}
        state={playerState}
        vx={player.vx}
        facing={player.facing}
      />

      {/* Info items - rendered on top */}
      {infoItems.map((item) => (
        <InfoBubble key={item.id} item={item} />
      ))}

      {/* Unlocked banner overlay */}
      {collectedCount >= 4 && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="rounded-3xl border-2 border-emerald-400 bg-slate-900/95 px-8 py-6 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-emerald-400 mb-2">
              Portfolio Unlocked!
            </h2>
            <p className="text-slate-200 mb-4">
              You've collected all 4 insights about me!
            </p>
            <button
              onClick={() => {
                onUnlockPortfolio?.();
                router.push('/about');
              }}
              className="rounded-full bg-emerald-400 px-8 py-3 text-lg font-semibold text-slate-900 shadow-[0_0_24px_rgba(16,185,129,0.95)] hover:bg-emerald-300 transition-all duration-300 cursor-pointer"
            >
              View Portfolio
            </button>
          </div>
        </div>
      )}

      {/* Mobile touch controls - only visible on mobile */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 md:hidden z-40 pointer-events-none">
        <div className="flex gap-3 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-sm px-4 py-3 pointer-events-auto">
          {/* Left arrow */}
          <button
            onPointerDown={(e) => {
              e.preventDefault();
              keysRef.current.left = true;
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              keysRef.current.left = false;
            }}
            onPointerLeave={() => {
              keysRef.current.left = false;
            }}
            onPointerCancel={() => {
              keysRef.current.left = false;
            }}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-2xl font-bold text-white active:bg-white/20 select-none touch-none"
            aria-label="Move left"
          >
            ←
          </button>
          
          {/* Jump button */}
          <button
            onPointerDown={(e) => {
              e.preventDefault();
              keysRef.current.jump = true;
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              keysRef.current.jump = false;
            }}
            onPointerLeave={() => {
              keysRef.current.jump = false;
            }}
            onPointerCancel={() => {
              keysRef.current.jump = false;
            }}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-xl font-bold text-white active:bg-white/20 select-none touch-none"
            aria-label="Jump"
          >
            ⤒
          </button>
          
          {/* Right arrow */}
          <button
            onPointerDown={(e) => {
              e.preventDefault();
              keysRef.current.right = true;
            }}
            onPointerUp={(e) => {
              e.preventDefault();
              keysRef.current.right = false;
            }}
            onPointerLeave={() => {
              keysRef.current.right = false;
            }}
            onPointerCancel={() => {
              keysRef.current.right = false;
            }}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-2xl font-bold text-white active:bg-white/20 select-none touch-none"
            aria-label="Move right"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
