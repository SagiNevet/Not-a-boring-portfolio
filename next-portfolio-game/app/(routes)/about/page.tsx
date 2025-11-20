'use client';

import Image from "next/image";
import Link from "next/link";
import PortfolioLock from "@/components/PortfolioLock";

const heroTags = [
  "Open to fullstack roles",
  "React · Next.js · Node",
  "Automation · Scraping · AI",
];

const listCards = [
  {
    title: "What I Bring",
    body: "UI/UX sensitivity, precise implementation, and holistic thinking, from research through deployment.",
  },
  {
    title: "How I Work",
    body: "Fast learner, problem-solver, and autodidact who keeps codebases maintainable and well-documented.",
  },
  {
    title: "Collaboration",
    body: "Strong communicator with experience training teams, mentoring peers, and translating feedback into action.",
  },
];

const techColumns = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript (basic)", "Python", "C / C++"],
  },
  {
    title: "Fullstack Frameworks",
    items: [
      "React · Next.js",
      "Node.js · Express (basic)",
      "HTML5 · CSS3 · Tailwind",
      "Responsive design systems",
    ],
  },
  {
    title: "APIs & Data",
    items: ["Node.js (basic)", "REST APIs", "MongoDB (basic)", "SQL (basic)"],
  },
  {
    title: "Tools & Other",
    items: [
      "Git · GitHub",
      "VS Code · Chrome DevTools",
      "Postman · Selenium",
      "Adobe Suite · Streamlit",
    ],
  },
];

const topSkills = [
  "Quick learner",
  "Independent & autodidact",
  "Strong interpersonal skills",
  "Fluent English",
  "Fast typing",
  "Extensive computer knowledge",
];

const experience = [
  {
    period: "Oct 2019 – Oct 2023",
    role: "H.Y.E Group · Sales Department (Full-time)",
    body: "Led direct customer sales, upsold complementary products, and supervised training on sales techniques and software tools.",
    bullets: [
      "Managed inventory and ordering for operational needs.",
      "Reported monthly performance against targets.",
      "Won multiple sales contests for excellence.",
      "Thrived in high-pressure, fast-paced environments.",
    ],
  },
  {
    period: "Dec 2015 – Oct 2023",
    role: "Sagi Nevet Photography · Photographer & Videographer",
    body: "Specialized in portraits and business visuals, delivering end-to-end production from shooting to editing with Adobe Photoshop, Premiere Pro, and Lightroom.",
    bullets: [
      "Produced high-quality, on-brand visual assets.",
      "Ensured consistency via meticulous post-production.",
      "Collaborated with clients to translate concepts into visuals.",
    ],
  },
];

const languages = [
  "English · Full professional proficiency",
  "Hebrew · Native / bilingual",
  "Russian · Limited working proficiency",
];

export default function AboutPage() {
  return (
    <PortfolioLock>
      <div className="space-y-16 px-4 py-16 lg:px-8">
        <section
          id="intro"
          className="mx-auto grid max-w-5xl gap-10 rounded-3xl border border-white/5 bg-slate-900/40 p-8 text-left lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
              Fullstack · Product · Builder
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white">
              Hi, I&apos;m <span className="font-black">Sagi Nevet</span>
            </h1>
            <p className="mt-4 text-base text-slate-200">
              Fullstack engineer crafting clean React/Next.js experiences wired to
              solid Node.js services, REST APIs, automation, and data tooling. I
              ship fast, keep accessibility in mind, and sweat the details.
            </p>
            <p className="mt-3 text-base text-slate-200">
              Third-year Computer Science student at HIT, collaborating with
              startups, experimenting with AI workflows, and constantly leveling
              up design-to-dev handoffs.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {heroTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-full bg-emerald-400 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-emerald-300"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/15 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white/40"
              >
                Contact me
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-4">
              <Image
                src="/assets/sagi-portrait.PNG"
                alt="Sagi Nevet portrait"
                width={420}
                height={520}
                priority
                className="h-auto w-full rounded-2xl object-cover"
              />
            </div>
            <p className="mt-4 text-sm text-white/70">
              Fullstack Developer · HIT B.Sc. CS
            </p>
          </div>
        </section>

        <section
          id="about"
          className="mx-auto max-w-5xl rounded-3xl border border-white/5 bg-slate-900/30 p-8"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
            About
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            Fullstack builder with a strong product and design sense.
          </h2>
          <div className="mt-4 space-y-4 text-slate-200">
            <p>
              Third-year B.Sc. Computer Science student at the Holon Institute of
              Technology (HIT). I specialize in creating production-ready
              fullstack experiences that connect React/Next.js interfaces with
              Node.js services, REST APIs, and data layers, always focusing on UX,
              performance, and clean architecture.
            </p>
            <p>
              Experienced with state management, routing, debugging, automation,
              and Git-based workflows. I&apos;m looking to join an engineering team,
              learn professional development best practices, and contribute to
              products that deliver measurable value.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {listCards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate-200">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="technologies"
          className="mx-auto max-w-5xl space-y-8 rounded-3xl border border-white/5 bg-slate-900/20 p-8"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
              Technologies
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Hands-on fullstack toolkit.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {techColumns.map((column) => (
              <div
                key={column.title}
                className="rounded-2xl border border-white/5 bg-slate-950/40 p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {column.title}
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-slate-200">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {topSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section
          id="education"
          className="mx-auto grid max-w-5xl gap-6 rounded-3xl border border-white/5 bg-slate-900/30 p-8 lg:grid-cols-2"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
              Education
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Holon Institute of Technology (HIT)
            </h2>
            <p className="mt-4 text-base text-slate-200">
              <span className="font-semibold text-white">
                November 2023 · December 2026 (expected)
              </span>
              <br />
              Bachelor of Science – Computer Science.
              <br />
              Building a strong CS foundation alongside practical project work.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <h3 className="text-lg font-semibold text-white">
              High School · Mekif Hei
            </h3>
            <p className="mt-2 text-sm text-slate-200">
              High School Diploma and Electrician Certificate · September 2011 – July 2017.
            </p>
          </div>
        </section>

        <section
          id="experience"
          className="mx-auto max-w-5xl space-y-6 rounded-3xl border border-white/5 bg-slate-900/20 p-8"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
              Experience
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Customer-facing roles that sharpened leadership and communication.
            </h2>
          </div>
          <div className="space-y-6">
            {experience.map((item) => (
              <article
                key={item.role}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-6"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                  {item.period}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="mt-3 text-sm text-slate-200">{item.body}</p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-200">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          id="languages"
          className="mx-auto grid max-w-5xl gap-6 rounded-3xl border border-white/5 bg-slate-900/30 p-8 lg:grid-cols-2"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
              Languages
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Multilingual communicator.
            </h2>
            <ul className="mt-4 space-y-2 text-base text-slate-200">
              {languages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
              More Projects
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Explore additional repositories.
            </h2>
            <p className="mt-4 text-base text-slate-200">
              Browse automation scripts, UI explorations, and tooling experiments.
            </p>
            <Link
              href="https://github.com/SagiNevet?tab=repositories"
              target="_blank"
              className="mt-5 inline-flex rounded-full bg-emerald-400 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-emerald-300"
            >
              GitHub Profile
            </Link>
          </div>
        </section>
      </div>
    </PortfolioLock>
  );
}

