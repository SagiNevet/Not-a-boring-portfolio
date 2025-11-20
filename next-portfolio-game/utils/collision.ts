'use client';

import { PLAYER_WIDTH, PLAYER_HEIGHT, BLOCK_SIZE } from './physics';

export type CollisionResult = {
  hitFromBelow: boolean;
  hitFromAbove: boolean;
  hitFromLeft: boolean;
  hitFromRight: boolean;
};

export function checkAABBCollision(
  player: { x: number; y: number },
  block: { x: number; y: number; width?: number; height?: number }
): boolean {
  const blockWidth = block.width ?? BLOCK_SIZE;
  const blockHeight = block.height ?? BLOCK_SIZE;

  const playerLeft = player.x;
  const playerRight = player.x + PLAYER_WIDTH;
  const playerBottom = player.y;
  const playerTop = player.y + PLAYER_HEIGHT;

  const blockLeft = block.x;
  const blockRight = block.x + blockWidth;
  const blockBottom = block.y;
  const blockTop = block.y + blockHeight;

  return (
    playerRight > blockLeft &&
    playerLeft < blockRight &&
    playerTop > blockBottom &&
    playerBottom < blockTop
  );
}

export function checkBlockHitFromBelow(
  player: { x: number; y: number; vy: number },
  prevPlayer: { x: number; y: number },
  block: { x: number; y: number; width?: number; height?: number }
): boolean {
  const blockWidth = block.width ?? BLOCK_SIZE;
  const blockHeight = block.height ?? BLOCK_SIZE;

  const playerTop = player.y + PLAYER_HEIGHT;
  const prevPlayerTop = prevPlayer.y + PLAYER_HEIGHT;
  const blockBottom = block.y;
  const blockTop = block.y + blockHeight;
  const playerCenterX = player.x + PLAYER_WIDTH / 2;
  const blockLeft = block.x;
  const blockRight = block.x + blockWidth;

  // Check if player's top edge is hitting block's bottom edge
  // and player is moving upward
  return (
    prevPlayerTop < blockBottom &&
    playerTop >= blockBottom &&
    player.vy > 0 &&
    playerCenterX >= blockLeft &&
    playerCenterX <= blockRight
  );
}

