'use client';

import { ReactNode } from 'react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import Link from 'next/link';

type PortfolioLockProps = {
  children: ReactNode;
};

export default function PortfolioLock({ children }: PortfolioLockProps) {
  const { portfolioUnlocked } = usePortfolio();

  if (!portfolioUnlocked) {
    return (
      <div className="relative pointer-events-none">
        <div className="blur-sm select-none">{children}</div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 text-center p-8">
          <p className="text-lg font-semibold text-emerald-300 mb-2">
            Portfolio Locked
          </p>
          <p className="text-sm text-slate-300 mb-4">
            Collect all 5 blocks in the game to unlock my full portfolio!
          </p>
          <Link
            href="/game"
            className="rounded-full bg-emerald-400 px-6 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-300 transition pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Play Game
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

