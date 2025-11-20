'use client';

import Link from "next/link";
import PortfolioLock from "@/components/PortfolioLock";

const contactLinks = [
  { href: "mailto:880sagi@gmail.com", label: "880sagi@gmail.com" },
  {
    href: "https://www.linkedin.com/in/sagi-nevet-1bbb87151/",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/SagiNevet?tab=repositories",
    label: "GitHub",
  },
];

export default function ContactPage() {
  return (
    <PortfolioLock>
      <div className="space-y-16 px-4 py-16 lg:px-8">
      <section className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-white/5 bg-slate-900/30 p-8 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
            Contact
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Let’s build something impactful.
          </h1>
          <p className="mt-4 text-base text-slate-200">
            Tell me about the challenge, users, and timeline. I’ll respond
            within 48 hours with ideas and next steps.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm font-semibold uppercase tracking-wide text-white">
            {contactLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                className="text-emerald-300 transition hover:text-emerald-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <form className="space-y-4">
          <label className="block text-sm font-semibold uppercase tracking-wide text-white/80">
            Full name
            <input
              type="text"
              name="name"
              placeholder="How should I address you?"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-emerald-300 focus:outline-none"
            />
          </label>
          <label className="block text-sm font-semibold uppercase tracking-wide text-white/80">
            Email
            <input
              type="email"
              name="email"
              placeholder="example@domain.com"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-emerald-300 focus:outline-none"
            />
          </label>
          <label className="block text-sm font-semibold uppercase tracking-wide text-white/80">
            Project details
            <textarea
              name="message"
              rows={4}
              placeholder="Share context, goals, and timeline"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-emerald-300 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-emerald-300"
          >
            Send
          </button>
        </form>
      </section>

      <footer className="mx-auto max-w-5xl rounded-3xl border border-white/5 bg-slate-900/20 p-6 text-center text-sm text-white/70">
        © 2025 · Crafted with precision by Sagi Nevet.
      </footer>
    </div>
    </PortfolioLock>
  );
}

