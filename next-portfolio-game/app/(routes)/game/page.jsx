'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import GameEngine from '@/components/GameEngine';
import GamePlatform from '@/components/GamePlatform';

const GAME_WIDTH = 960;
const GAME_HEIGHT = 480;
const WORLD_WIDTH = 2400;
const PLATFORM_HEIGHT = 72;

const BLOCKS = [
  { id: 'stone-1', x: 200, y: 0, type: 'stone' },
  { id: 'stone-2', x: 400, y: 0, type: 'stone' },
  { id: 'stone-3', x: 600, y: 0, type: 'stone' },
  { id: 'info-1', x: 300, y: 150, type: 'info' },
  { id: 'info-2', x: 500, y: 150, type: 'info' },
  { id: 'info-3', x: 700, y: 150, type: 'info' },
  { id: 'info-4', x: 900, y: 150, type: 'info' },
  { id: 'info-5', x: 1100, y: 150, type: 'info' },
  { id: 'locked-1', x: 1500, y: 150, type: 'locked' },
];

const MOBILE_CONTROLS = [
  { id: 'left', label: '←', action: 'left' },
  { id: 'right', label: '→', action: 'right' },
  { id: 'jump', label: '⤒', action: 'jump' },
];

export default function GamePage() {
  const [collectedItems, setCollectedItems] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [cameraX, setCameraX] = useState(0);
  const keysRef = useRef({ left: false, right: false, jump: false });

  const handleCollect = () => {
    setCollectedItems((prev) => {
      const newCount = prev + 1;
      return newCount;
    });
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => setShowNav(true), 500);
  };

  const handleControlPress = (control, isActive) => {
    if (control === 'left') keysRef.current.left = isActive;
    if (control === 'right') keysRef.current.right = isActive;
    if (control === 'jump') keysRef.current.jump = isActive;
  };

  const visibleBlocks = isUnlocked
    ? BLOCKS
    : BLOCKS.filter((block) => block.type !== 'locked');

  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-950">
      <h1 className="absolute top-6 left-1/2 z-20 -translate-x-1/2 text-center text-4xl font-bold tracking-wide text-gray-200 whitespace-nowrap">
        PLAY TO GET TO KNOW ME
      </h1>

      <div className="flex h-full w-full flex-col items-center justify-center px-4">
        <div className="mb-4 text-center">
          <div className="text-lg font-semibold text-emerald-300">
            Collected: {collectedItems} / 5
          </div>
        </div>

        <div
          className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#040718] shadow-2xl shadow-emerald-500/20"
          style={{ height: GAME_HEIGHT }}
        >
          <img
            src="/assets/backgrounds/stars.svg"
            alt="Stars layer"
            className="absolute inset-0 h-full w-full select-none object-cover pointer-events-none"
            style={{ transform: `translateX(${-cameraX * 0.1}px)` }}
          />
          <img
            src="/assets/backgrounds/mountains.svg"
            alt="Mountains layer"
            className="absolute inset-0 h-full w-full select-none object-cover pointer-events-none"
            style={{ transform: `translateX(${-cameraX * 0.2}px)` }}
          />
          <img
            src="/assets/backgrounds/hills.svg"
            alt="Hills layer"
            className="absolute inset-0 h-full w-full select-none object-cover pointer-events-none"
            style={{ transform: `translateX(${-cameraX * 0.3}px)` }}
          />

          <div className="absolute inset-0">
            <div
              className="absolute top-0 h-full"
              style={{
                width: WORLD_WIDTH,
              }}
            >
              <GamePlatform height={PLATFORM_HEIGHT} width={WORLD_WIDTH} />

              <GameEngine
                blocks={visibleBlocks}
                onCollect={handleCollect}
                collectedCount={collectedItems}
                onUnlock={handleUnlock}
                keysRef={keysRef}
                onCameraUpdate={setCameraX}
              />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-4 flex justify-center md:hidden">
            <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white">
              {MOBILE_CONTROLS.map((control) => (
                <button
                  key={control.id}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    handleControlPress(control.action, true);
                  }}
                  onPointerUp={(event) => {
                    event.preventDefault();
                    handleControlPress(control.action, false);
                  }}
                  onPointerLeave={() =>
                    handleControlPress(control.action, false)
                  }
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-xl font-bold"
                >
                  {control.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showNav && (
          <div
            className={`mt-6 flex gap-4 transition-opacity duration-1000 ${
              showNav ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative rounded-2xl border-2 border-emerald-400/60 bg-emerald-400/10 px-6 py-4 shadow-[0_0_20px_#00ffc8]">
              <div className="absolute -inset-1 rounded-2xl bg-emerald-400/20 blur-xl animate-pulse" />
              <div className="relative flex gap-4">
                <Link
                  href="/projects"
                  className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
