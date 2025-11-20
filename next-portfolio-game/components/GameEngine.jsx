'use client';

import { useEffect, useRef, useState } from 'react';
import Player from './Player';
import Block from './Block';
import InfoBubble from './InfoBubble';
import { GRAVITY, JUMP_FORCE, MOVE_SPEED, GROUND_Y, PLAYER_HEIGHT } from '@/utils/physics';
import { checkBlockCollision } from '@/utils/collision';

const GAME_WIDTH = 960;
const GAME_HEIGHT = 480;
const WORLD_WIDTH = 2400;

const GameEngine = ({ blocks, onCollect, collectedCount, onUnlock, keysRef: externalKeysRef, onCameraUpdate }) => {
  const internalKeysRef = useRef({ left: false, right: false, jump: false });
  const keysRef = externalKeysRef || internalKeysRef;
  const [player, setPlayer] = useState({
    x: 100,
    y: GROUND_Y - PLAYER_HEIGHT,
    vx: 0,
    vy: 0,
    isJumping: false,
    facing: 'right',
    state: 'idle',
  });
  const [hitBlocks, setHitBlocks] = useState({});
  const [animatingBlocks, setAnimatingBlocks] = useState({});
  const [infoBubbles, setInfoBubbles] = useState([]);
  const hitBlocksRef = useRef({});
  const infoBubblesRef = useRef([]);

  useEffect(() => {
    hitBlocksRef.current = hitBlocks;
  }, [hitBlocks]);

  useEffect(() => {
    infoBubblesRef.current = infoBubbles;
  }, [infoBubbles]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        keysRef.current.left = true;
      }
      if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        keysRef.current.right = true;
      }
      if (event.key === ' ' || event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
        event.preventDefault();
        keysRef.current.jump = true;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        keysRef.current.left = false;
      }
      if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        keysRef.current.right = false;
      }
      if (event.key === ' ' || event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
        keysRef.current.jump = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keysRef]);

  useEffect(() => {
    let frame;

    const step = () => {
      setPlayer((prev) => {
        let { x, y, vy, isJumping, facing, state } = prev;
        const leftPressed = keysRef.current.left;
        const rightPressed = keysRef.current.right;
        const jumpPressed = keysRef.current.jump;

        const vx = rightPressed ? MOVE_SPEED : leftPressed ? -MOVE_SPEED : 0;
        
        if (vx !== 0) {
          facing = vx > 0 ? 'right' : 'left';
          state = isJumping ? 'jump' : 'run';
        } else {
          state = isJumping ? 'jump' : 'idle';
        }

        vy += GRAVITY;

        if (jumpPressed && !isJumping && y + PLAYER_HEIGHT >= GROUND_Y - 1) {
          vy = JUMP_FORCE;
          isJumping = true;
          state = 'jump';
        }

        y += vy;
        x += vx;

        const updatedPlayer = { x, y, vx, vy, isJumping, facing, state };

        blocks.forEach((block) => {
          if (block.type === 'stone') {
            const collision = checkBlockCollision(updatedPlayer, block);
            if (!collision) return;

            if (collision.hitFromAbove) {
              y = block.y + 64;
              vy = 0;
              isJumping = false;
              state = 'idle';
            } else if (collision.hitFromBelow) {
              y = block.y - 64;
              vy = 0;
              isJumping = false;
              state = 'idle';
            } else if (collision.hitFromLeft) {
              x = block.x - 64;
            } else if (collision.hitFromRight) {
              x = block.x + 64;
            }
            return;
          }

          if (block.type === 'info') {
            if (hitBlocksRef.current[block.id]) {
              const collision = checkBlockCollision(updatedPlayer, block);
              if (!collision) return;

              if (collision.hitFromAbove) {
                y = block.y + 64;
                vy = 0;
                isJumping = false;
                state = 'idle';
              } else if (collision.hitFromLeft) {
                x = block.x - 64;
              } else if (collision.hitFromRight) {
                x = block.x + 64;
              }
              return;
            }

            const collision = checkBlockCollision(updatedPlayer, block);
            if (!collision) return;

            if (collision.hitFromBelow && vy < 0) {
              setHitBlocks((prev) => {
                if (prev[block.id]) return prev;
                return { ...prev, [block.id]: true };
              });
              setAnimatingBlocks((prev) => ({ ...prev, [block.id]: true }));
              
              setTimeout(() => {
                setAnimatingBlocks((prev) => {
                  const next = { ...prev };
                  delete next[block.id];
                  return next;
                });
              }, 200);

              const bubbleIndex = collectedCount + infoBubblesRef.current.length;
              setInfoBubbles((prev) => [
                ...prev,
                {
                  id: `${block.id}-bubble-${Date.now()}`,
                  x: block.x,
                  y: block.y,
                  index: bubbleIndex,
                },
              ]);

              onCollect?.();
            } else if (collision.hitFromAbove) {
              y = block.y + 64;
              vy = 0;
              isJumping = false;
              state = 'idle';
            } else if (collision.hitFromLeft) {
              x = block.x - 64;
            } else if (collision.hitFromRight) {
              x = block.x + 64;
            }
            return;
          }

          if (block.type === 'locked') {
            const collision = checkBlockCollision(updatedPlayer, block);
            if (!collision) return;

            if (collision.hitFromAbove) {
              y = block.y + 64;
              vy = 0;
              isJumping = false;
              state = 'idle';
            } else if (collision.hitFromBelow) {
              y = block.y - 64;
              vy = 0;
              isJumping = false;
              state = 'idle';
            } else if (collision.hitFromLeft) {
              x = block.x - 64;
            } else if (collision.hitFromRight) {
              x = block.x + 64;
            }
          }
        });

        if (y + PLAYER_HEIGHT >= GROUND_Y) {
          y = GROUND_Y - PLAYER_HEIGHT;
          vy = 0;
          isJumping = false;
          if (vx === 0) state = 'idle';
        }

        x = Math.max(0, Math.min(x, WORLD_WIDTH - 64));

        return { x, y, vx, vy, isJumping, facing, state };
      });

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [blocks, collectedCount, onCollect, keysRef]);

  useEffect(() => {
    if (collectedCount >= 5) {
      onUnlock?.();
    }
  }, [collectedCount, onUnlock]);

  const cameraX = Math.min(
    Math.max(player.x - GAME_WIDTH / 2, 0),
    WORLD_WIDTH - GAME_WIDTH
  );

  useEffect(() => {
    onCameraUpdate?.(cameraX);
  }, [cameraX, onCameraUpdate]);

  const handleBubbleComplete = (bubbleId) => {
    setInfoBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
  };

  return (
    <div className="absolute inset-0">
      <div
        className="absolute top-0 h-full"
        style={{
          width: WORLD_WIDTH,
          transform: `translateX(${-cameraX}px)`,
        }}
      >
        {blocks.map((block) => (
          <Block
            key={block.id}
            x={block.x}
            y={block.y}
            type={block.type}
            id={block.id}
            isHit={!!hitBlocks[block.id]}
            isAnimating={!!animatingBlocks[block.id]}
          />
        ))}

        {infoBubbles.map((bubble) => (
          <InfoBubble
            key={bubble.id}
            x={bubble.x}
            y={bubble.y}
            index={bubble.index}
            onComplete={() => handleBubbleComplete(bubble.id)}
          />
        ))}

        <Player x={player.x} y={player.y} facing={player.facing} state={player.state} />
      </div>
    </div>
  );
};

export default GameEngine;
