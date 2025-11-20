'use client';

import GameEngine from '@/components/GameEngine';
import LoadingScreen from '@/components/LoadingScreen';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/contexts/PortfolioContext';

export default function GamePage() {
  const [collectedCount, setCollectedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [gameKey, setGameKey] = useState(0); // Key to force GameEngine remount on refresh
  const router = useRouter();
  const { portfolioUnlocked, setPortfolioUnlocked } = usePortfolio();

  // Reset on mount (refresh) - NO localStorage persistence
  // Force complete reset on every page load/refresh
  useEffect(() => {
    // Reset all game state - use setTimeout to avoid setState in effect
    setTimeout(() => {
      setCollectedCount(0);
      setPortfolioUnlocked(false);
      setIsLoading(true); // Reset loading screen on refresh - will show loading screen again
      setGameKey(Date.now()); // Force GameEngine to remount by changing key to unique value
    }, 0);
    
    // Clear any potential URL params or state
    if (typeof window !== 'undefined') {
      // Remove any hash or query params that might affect state
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []); // Empty dependency array - only run on mount/refresh

  const handleCollect = () => {
    setCollectedCount((prev) => {
      const n = Math.min(prev + 1, 4); // Updated to 4 (4 blocks, 1 coin each)
      return n;
    });
  };

  const handleUnlockPortfolio = () => {
    setPortfolioUnlocked(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Ensure unlock is triggered when count reaches 4
  useEffect(() => {
    if (collectedCount >= 4 && !portfolioUnlocked) {
      handleUnlockPortfolio();
    }
  }, [collectedCount, portfolioUnlocked]);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <h1 className="mt-6 text-center text-3xl font-bold tracking-[0.2em] text-slate-100">
        PLAY TO GET TO KNOW ME
      </h1>

      <div className="flex flex-col items-center">
        <div className="mt-4 flex items-center gap-3">
          <p className="text-center text-sm font-semibold text-emerald-400">
            Collected: {collectedCount} / 4
          </p>
          {portfolioUnlocked && (
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-400/40">
              UNLOCKED
            </span>
          )}
        </div>

        <GameEngine
          key={gameKey}
          onCollect={handleCollect}
          collectedCount={collectedCount}
          onUnlockPortfolio={handleUnlockPortfolio}
        />

        {portfolioUnlocked && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm text-emerald-300 font-medium">
              Portfolio unlocked! Navigate using the menu below.
            </p>
            <button
              className="rounded-full bg-emerald-400 px-8 py-2 text-sm font-semibold text-slate-900 shadow-[0_0_24px_rgba(16,185,129,0.95)] hover:bg-emerald-300 transition-all duration-300"
              onClick={() => router.push('/about')}
            >
              View Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
