'use client';

import { PLAYER_WIDTH, PLAYER_HEIGHT, BLOCK_SIZE } from './physics';

export function checkAABBCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top > rect2.bottom &&
    rect1.bottom < rect2.top
  );
}

export function checkBlockCollision(player, block) {
  const playerRect = {
    left: player.x,
    right: player.x + PLAYER_WIDTH,
    bottom: player.y,
    top: player.y + PLAYER_HEIGHT,
  };

  const blockRect = {
    left: block.x,
    right: block.x + BLOCK_SIZE,
    bottom: block.y,
    top: block.y + BLOCK_SIZE,
  };

  if (!checkAABBCollision(playerRect, blockRect)) {
    return null;
  }

  const hitFromBelow = playerRect.top <= blockRect.top && playerRect.top >= blockRect.bottom && player.vy < 0;
  const hitFromAbove = playerRect.bottom >= blockRect.bottom && playerRect.bottom <= blockRect.top && player.vy > 0;
  const hitFromLeft = playerRect.right >= blockRect.left && playerRect.right <= blockRect.right;
  const hitFromRight = playerRect.left <= blockRect.right && playerRect.left >= blockRect.right;

  return {
    hitFromBelow,
    hitFromAbove,
    hitFromLeft,
    hitFromRight,
  };
}
