'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { usePortfolio } from "@/contexts/PortfolioContext";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { portfolioUnlocked } = usePortfolio();

  const handleSkip = () => {
    router.push("/game");
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-sm font-medium">
        <button
          onClick={handleSkip}
          className="rounded-full border border-white/20 px-4 py-1.5 text-white transition hover:border-white hover:text-emerald-300"
        >
          {portfolioUnlocked ? "Home" : "Game"}
        </button>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            const isLocked = !portfolioUnlocked;
            return (
              <Link
                key={link.href}
                href={isLocked ? "/game" : link.href}
                onClick={(e) => {
                  if (isLocked) {
                    e.preventDefault();
                    router.push("/game");
                  }
                }}
                className={`transition ${
                  isLocked
                    ? "text-white/30 cursor-not-allowed"
                    : isActive
                      ? "text-emerald-300"
                      : "text-white/70 hover:text-white"
                }`}
                title={isLocked ? "Complete the game to unlock" : ""}
              >
                {link.label}
                {isLocked && " 🔒"}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;

