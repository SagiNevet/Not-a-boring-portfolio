'use client';

import Image from "next/image";
import Link from "next/link";
import PortfolioLock from "@/components/PortfolioLock";

const projectCards = [
  {
    title: "TechPulse",
    description:
      "Lifecycle analysis suite combining Google Trends data with Zap scraping insights.",
    bullets: [
      "Detects “end of life” signals",
      "Switches between PyTrends/Selenium",
      "Interactive analytics dashboard",
    ],
    image: "/assets/techpulse.png",
    href: "#techpulse",
  },
  {
    title: "Trackademics",
    description:
      "React-based task and schedule manager for students with persistent local storage.",
    bullets: [
      "Tasks, lectures, schedules",
      "Desktop & mobile layouts",
      "Progress tracking",
    ],
    image: "/assets/trackademics.jpg",
    href: "#trackademics",
  },
  {
    title: "Worldwide Holidays Finder",
    description:
      "Next.js app for exploring global holidays with Calendarific API filtering.",
    bullets: [
      "Country & year search",
      "Filter by type & date",
      "Responsive UI & “Learn more”",
    ],
    image: "/assets/worldwide-holidays-finder.jpg",
    href: "#holidays",
  },
  {
    title: "zapRest Scraper",
    description:
      "Python Selenium workflow that exports rich restaurant datasets into CSV.",
    bullets: [
      "Dynamic “Show more” handling",
      "ChromeDriver automation",
      "Structured Pandas output",
    ],
    image: "/assets/zap-rest-scraper.jpg",
    href: "#zaprest",
  },
];

const breakdowns = [
  {
    id: "techpulse",
    icon: "📊",
    title: "TechPulse · Tool for analyzing the lifecycle of tech products",
    description:
      "Interactive Streamlit experience that fuses Google Trends data with live Zap.co.il scraping to understand product demand over time.",
    image: "/assets/techpulse.png",
    about:
      "Built with Python and Streamlit to track search-interest trends, detect “end of life,” and surface real product metadata including pricing, ratings, and specs.",
    features: [
      "Analyzes 5+ years of search trends via PyTrends.",
      "Identifies sharp drops to predict lifecycle stages.",
      "Scrapes Zap for rich product details (name, image, specs, ratings).",
      "Automatically switches to Selenium when blocked.",
      "Visualizes insights using Matplotlib and Seaborn.",
    ],
    stack: [
      "Python",
      "Streamlit",
      "PyTrends",
      "Selenium",
      "BeautifulSoup",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
    ],
    contributions: [
      "Developed the full system end-to-end.",
      "Built the Streamlit UI/UX and interactive flows.",
      "Implemented scraping, trend-analysis, and data-cleaning logic.",
      "Resolved Selenium timing/rendering issues and automated fallbacks.",
    ],
  },
  {
    id: "trackademics",
    icon: "📘",
    title: "Trackademics · Task management & weekly schedule system",
    description:
      "Responsive React application that helps students organize tasks, lectures, and weekly planning with a delightful UI and LocalStorage persistence.",
    image: "/assets/trackademics.jpg",
    about:
      "Designed to keep academic responsibilities aligned. The interface prioritizes clarity, desktop and mobile parity, and smooth interactions without needing a backend.",
    features: [
      "Add, delete, and mark tasks as completed.",
      "Organize lectures/exercises by category.",
      "Create weekly schedules with start/end times.",
      "Track completion rates and progress.",
      "Responsive layouts for every device.",
    ],
    stack: ["React", "JavaScript", "CSS · Responsive", "LocalStorage"],
    contributions: [
      "Architected the entire React app and UI components.",
      "Implemented task state management with persistence.",
      "Designed responsive layouts and resolved edge-case bugs.",
      "Wrote logic for sorting, marking, and interaction flows.",
    ],
  },
  {
    id: "holidays",
    icon: "🌍",
    title: "Worldwide Holidays Finder · Next.js application",
    description:
      "Global holiday explorer where users search by country, year, or filters to uncover relevant events powered by the Calendarific API.",
    image: "/assets/worldwide-holidays-finder.jpg",
    about:
      "Delivers a clean UI/UX layered on top of Next.js and React, complete with type/date filters and “Learn more” shortcuts for every result.",
    features: [
      "Searches holidays by country and year.",
      "Filters by month, day, or custom range.",
      "Filters by holiday type (national, local, religious, observance).",
      "Provides one-click Google searches per holiday.",
      "Delivers a fully responsive experience.",
    ],
    stack: [
      "Next.js",
      "React",
      "JavaScript",
      "Calendarific API",
      "CSS · Responsive",
      "Git · GitHub",
    ],
    contributions: [
      "Designed and built the full Next.js architecture.",
      "Implemented filtering by date ranges and types.",
      "Integrated and formatted API data for clarity.",
      "Created intuitive UI components and handled deployment.",
    ],
  },
  {
    id: "zaprest",
    icon: "🍽",
    title: "zapRest Scraper · Data collection & automation",
    description:
      "Python Selenium workflow for extracting restaurant data from rest.co.il (Zap Rest) and exporting structured CSV outputs.",
    image: "/assets/zap-rest-scraper.jpg",
    about:
      "Automates “Show More” interactions, captures restaurant metadata, and produces timestamped CSV datasets ready for analysis.",
    features: [
      "Loads dynamic pages with automated pagination.",
      "Extracts names, images, cuisine, address, phone, reviews, and more.",
      "Exports clean CSV files with proper schema.",
      "Supports headless mode and custom timing per ChromeDriver.",
      "Handles network delays and Selenium edge cases.",
    ],
    stack: [
      "Python",
      "Selenium",
      "Pandas",
      "WebDriver Manager",
      "ChromeDriver",
    ],
    contributions: [
      "Developed the system end-to-end.",
      "Built scraping, timing, and export logic.",
      "Optimized reliability despite dynamic loading.",
      "Documented flows for future automation work.",
    ],
    note: "Cover design by Freepik.",
  },
];

export default function ProjectsPage() {
  return (
    <PortfolioLock>
      <div className="space-y-16 px-4 py-16 lg:px-8">
      <section className="mx-auto max-w-5xl space-y-8 rounded-3xl border border-white/5 bg-slate-900/30 p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
              Key Projects
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Real-world builds across products, data, and tooling.
            </h1>
          </div>
          <Link
            href="https://github.com/SagiNevet?tab=repositories"
            target="_blank"
            className="self-start rounded-full border border-white/15 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white/40"
          >
            View GitHub
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projectCards.map((project) => (
            <article
              key={project.title}
              className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={360}
                className="h-48 w-full rounded-2xl object-cover"
              />
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                {project.description}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-200">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
              <Link
                href={project.href}
                className="mt-4 inline-flex rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-white/40"
              >
                Full Breakdown
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-8">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-300">
          Deep dives
        </p>
        <h2 className="text-3xl font-semibold text-white">
          Full breakdowns with expandable details.
        </h2>
        <div className="space-y-10">
          {breakdowns.map((item) => (
            <article
              id={item.id}
              key={item.id}
              className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/30 p-8"
            >
              <header className="flex flex-col gap-4 lg:flex-row">
                <span className="text-3xl">{item.icon}</span>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-200">
                      {item.description}
                    </p>
                  </div>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={900}
                    height={480}
                    className="h-60 w-full rounded-2xl object-cover"
                  />
                </div>
              </header>
              <div className="grid gap-6 lg:grid-cols-3">
                <section className="rounded-2xl border border-white/5 bg-slate-950/40 p-5">
                  <h4 className="text-lg font-semibold text-white">
                    About {item.title.split(" · ")[0]}
                  </h4>
                  <p className="mt-3 text-sm text-slate-200">{item.about}</p>
                </section>
                <section className="rounded-2xl border border-white/5 bg-slate-950/40 p-5">
                  <h4 className="text-lg font-semibold text-white">
                    What the tool does
                  </h4>
                  <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-200">
                    {item.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </section>
                <section className="rounded-2xl border border-white/5 bg-slate-950/40 p-5 space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      Key technologies
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      Personal contribution
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-200">
                      {item.contributions.map((contribution) => (
                        <li key={contribution}>{contribution}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              </div>
              {item.note && (
                <p className="text-xs text-white/50">{item.note}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
    </PortfolioLock>
  );
}

