'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type PortfolioContextType = {
  portfolioUnlocked: boolean;
  setPortfolioUnlocked: (unlocked: boolean) => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  // NO localStorage - always start fresh on refresh
  const [portfolioUnlocked, setPortfolioUnlocked] = useState(false);

  return (
    <PortfolioContext.Provider value={{ portfolioUnlocked, setPortfolioUnlocked }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

