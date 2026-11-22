"use client";

import { memo, useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowDownLeft, ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import { projects } from "@/lib/data";
import { openContactModal } from "./openContactModal";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export function prefillProject(projectType: string) {
  // Card ke type ke saath wahi reusable contact modal khulta hai.
  openContactModal(projectType);
}

/* ── Mock-screenshot visuals (pure JSX/SVG, no external images) ─── */

function ChromeBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.04] px-3 py-2">
      <span className="h-[7px] w-[7px] rounded-full bg-[#ff5f57]/80" />
      <span className="h-[7px] w-[7px] rounded-full bg-[#febc2e]/80" />
      <span className="h-[7px] w-[7px] rounded-full bg-[#28c840]/80" />
      <span className="ml-2 flex h-4 flex-1 items-center rounded-full bg-white/[0.07] px-2 font-mono text-[8px] text-white/45">
        {url}
      </span>
    </div>
  );
}

function SneakerVisual() {
  return (
    <div className="flex h-full flex-col bg-[#0b0f08]">
      <ChromeBar url="shop.store" />
      <div className="relative flex flex-1 items-center px-4">
        <div className="relative z-10 shrink-0">
          <div className="h-1.5 w-14 rounded bg-white/70" />
          <div className="mt-2 h-1.5 w-10 rounded bg-white/30" />
          <p className="mt-3 font-heading text-[15px] font-bold text-white">
            $129<span className="text-[#89FF00] dark:text-[#C6FF00]">.00</span>
          </p>
          <span className="mt-2 inline-block rounded-full bg-[#89FF00] dark:bg-[#C6FF00] px-3 py-1 text-[9px] font-bold text-[#080A07]">
            Add to Cart
          </span>
        </div>
        {/* sneaker illustration */}
        <svg
          viewBox="0 0 210 120"
          className="absolute -right-2 bottom-3 w-[74%] -rotate-[10deg] drop-shadow-[0_18px_20px_rgba(0,0,0,0.6)]"
          aria-hidden="true"
        >
          <ellipse cx="105" cy="106" rx="88" ry="7" className="[fill:#89FF00] dark:[fill:#C6FF00]" opacity="0.22" />
          <path
            d="M14 74 C48 72 66 64 88 50 C101 41 114 34 129 35 C149 37 168 52 184 64 C193 71 196 77 196 84 L14 84 Z"
            fill="#f4f6f1"
          />
          <path
            d="M88 50 C101 41 114 34 129 35 C138 36 147 40 155 46 L120 66 C106 60 96 56 88 50 Z"
            fill="#dfe5da"
          />
          <path
            d="M60 68 C84 60 108 48 128 38 C118 54 96 68 72 74 Z"
            fill="#11150d"
          />
          <path d="M96 52 l10 -6 M104 58 l10 -6 M112 63 l10 -6" stroke="#9aa393" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M10 84 L200 84 L200 93 C200 98 196 100 190 100 L22 100 C14 100 10 94 10 84 Z"
            className="[fill:#89FF00] dark:[fill:#C6FF00]"
          />
          <path d="M10 93 L200 93" stroke="#0c0f09" strokeWidth="2" opacity="0.35" />
        </svg>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="flex h-full flex-col bg-[#080d14]">
      <ChromeBar url="app.analytics.io" />
      <div className="flex flex-1">
        {/* sidebar */}
        <div className="flex w-9 flex-col items-center gap-2.5 border-r border-white/[0.06] bg-white/[0.02] py-3">
          <span className="h-3.5 w-3.5 rounded-[4px] bg-[#89FF00] dark:bg-[#C6FF00]" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <div className="flex-1 px-3 py-2.5">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {["$24,780", "8,542", "+32.5%"].map((v, i) => (
              <div key={v} className="rounded-md bg-white/[0.05] px-2 py-1.5">
                <div className="h-1 w-8 rounded bg-white/30" />
                <p
                  className={`mt-1.5 font-heading text-[10px] font-bold ${
                    i === 2 ? "text-[#89FF00] dark:text-[#C6FF00]" : "text-white"
                  }`}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
          {/* chart */}
          <svg viewBox="0 0 220 74" className="mt-2 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="[stop-color:#89FF00] dark:[stop-color:#C6FF00]" stopOpacity="0.4" />
                <stop offset="100%" className="[stop-color:#89FF00] dark:[stop-color:#C6FF00]" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[14, 32, 50, 68].map((y) => (
              <line key={y} x1="0" y1={y} x2="220" y2={y} stroke="#ffffff" strokeOpacity="0.07" />
            ))}
            <path
              d="M0 62 C26 56 38 38 60 42 C84 46 94 22 118 24 C142 26 152 38 176 26 C194 17 208 10 220 8 L220 74 L0 74 Z"
              fill="url(#dashFill)"
            />
            <path
              d="M0 62 C26 56 38 38 60 42 C84 46 94 22 118 24 C142 26 152 38 176 26 C194 17 208 10 220 8"
              fill="none"
              className="[stroke:#89FF00] dark:[stroke:#C6FF00]"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M0 52 C30 50 52 56 82 48 C112 40 140 48 172 40 C192 35 208 30 220 28"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.85"
            />
            <circle cx="118" cy="24" r="3.4" className="[fill:#89FF00] dark:[fill:#C6FF00]" stroke="#080d14" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RealEstateVisual() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-b from-[#1d2a4a] via-[#4a3a52] to-[#b06a3c]">
      {/* moon + stars */}
      <span className="absolute right-5 top-3 h-6 w-6 rounded-full bg-[#ffe9c4] shadow-[0_0_18px_rgba(255,233,196,0.8)]" />
      <span className="absolute left-6 top-4 h-1 w-1 rounded-full bg-white/80" />
      <span className="absolute left-16 top-8 h-1 w-1 rounded-full bg-white/50" />
      <span className="absolute right-20 top-9 h-1 w-1 rounded-full bg-white/60" />
      {/* house */}
      <svg
        viewBox="0 0 240 130"
        className="absolute bottom-6 left-1/2 w-[86%] -translate-x-1/2"
        aria-hidden="true"
      >
        <path d="M18 58 L120 14 L222 58" stroke="#0d0f14" strokeWidth="7" fill="none" strokeLinecap="round" />
        <rect x="34" y="56" width="172" height="66" fill="#141821" />
        <rect x="48" y="70" width="40" height="30" rx="2" fill="#ffb45e" />
        <rect x="100" y="70" width="26" height="52" rx="2" fill="#0a0c10" />
        <rect x="140" y="70" width="52" height="30" rx="2" fill="#ffc978" />
        <rect x="48" y="106" width="40" height="10" fill="#ffb45e" opacity="0.65" />
        <rect x="140" y="106" width="52" height="10" fill="#ffb45e" opacity="0.65" />
        <line x1="68" y1="70" x2="68" y2="100" stroke="#141821" strokeWidth="3" />
        <line x1="166" y1="70" x2="166" y2="100" stroke="#141821" strokeWidth="3" />
      </svg>
      {/* trees */}
      <svg viewBox="0 0 40 60" className="absolute bottom-5 left-2 w-7" aria-hidden="true">
        <path d="M20 0 L36 34 H26 L38 52 H2 L14 34 H4 Z" fill="#0a1410" />
        <rect x="18" y="50" width="4" height="8" fill="#0a1410" />
      </svg>
      <svg viewBox="0 0 40 60" className="absolute bottom-5 right-2 w-6" aria-hidden="true">
        <path d="M20 0 L36 34 H26 L38 52 H2 L14 34 H4 Z" fill="#0a1410" />
        <rect x="18" y="50" width="4" height="8" fill="#0a1410" />
      </svg>
      {/* ground + label */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-[#070a06]" />
      <span className="absolute bottom-8 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[9px] font-bold text-white backdrop-blur">
        Modern Family Home
      </span>
      <span className="absolute bottom-8 right-3 rounded-full bg-[#89FF00] dark:bg-[#C6FF00] px-2.5 py-1 text-[9px] font-bold text-[#080A07]">
        New Listing
      </span>
    </div>
  );
}

const visuals: Record<string, ComponentType> = {
  "E-Commerce Store": SneakerVisual,
  "Analytics Dashboard": DashboardVisual,
  "Real Estate Platform": RealEstateVisual,
};

/* ── One project card (unchanged content + growing live badge) ─── */

const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  const Visual = visuals[project.title] ?? SneakerVisual;
  return (
    <article
      data-project-card={project.title}
      className="card-surface group relative z-10 flex h-full flex-col overflow-hidden !rounded-[14px]"
    >
      <div className="relative h-44 shrink-0 overflow-hidden">
        <div className="h-full transition duration-500 group-hover:scale-[1.06]">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={`${project.title} — live app screenshot`}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <Visual />
          )}
        </div>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — open live demo`}
            className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-all duration-300 group-hover:right-[-34px] group-hover:top-[-34px] group-hover:h-[128px] group-hover:w-[128px] group-hover:bg-[#89FF00] group-hover:text-[#080A07] hover:bg-[#89FF00] hover:text-[#080A07] dark:group-hover:bg-[#C6FF00] dark:hover:bg-[#C6FF00]"
          >
            <ArrowUpRight className="h-[14px] w-[14px] [stroke-width:2] transition-all duration-300 group-hover:h-[54px] group-hover:w-[54px] group-hover:-translate-x-[10px] group-hover:translate-y-[10px] group-hover:[stroke-width:3]" />
          </a>
        ) : (
          <span className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-all duration-300 group-hover:right-[-34px] group-hover:top-[-34px] group-hover:h-[128px] group-hover:w-[128px] group-hover:bg-[#89FF00] group-hover:text-[#080A07] dark:group-hover:bg-[#C6FF00]">
            <ArrowUpRight className="h-[14px] w-[14px] [stroke-width:2] transition-all duration-300 group-hover:h-[54px] group-hover:w-[54px] group-hover:-translate-x-[10px] group-hover:translate-y-[10px] group-hover:[stroke-width:3]" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-[19px] font-bold leading-snug">
          {project.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-semibold text-[#458000] dark:text-[#C6FF00]">
          {project.benefit}
          <TrendingUp size={13} />
        </p>
        <p className="mt-2.5 text-[13px] leading-relaxed text-[#11150D]/60 dark:text-[#A5AAA0]">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[11px] font-medium dark:bg-white/[0.07]"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => prefillProject(project.type)}
          className="mt-5 inline-flex items-center gap-1.5 self-start pt-1 text-[13px] font-bold text-[#11150D] transition hover:text-[#458000] dark:text-[#F5F7F2] dark:hover:text-[#C6FF00]"
        >
          Build something like this
          <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
});

/* ── Section with the 3-card carousel ─────────────────────────── */

const ANIM_MS = 1050;

export default function Projects() {
  const total = projects.length;
  const [start, setStart] = useState(0);
  const [anim, setAnim] = useState<{ dir: 1 | -1; to: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef({ start, anim: !!anim });
  stateRef.current = { start, anim: !!anim };

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 639px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setIsMobile(mqMobile.matches);
      setReduced(mqReduced.matches);
    };
    apply();
    mqMobile.addEventListener("change", apply);
    mqReduced.addEventListener("change", apply);
    return () => {
      mqMobile.removeEventListener("change", apply);
      mqReduced.removeEventListener("change", apply);
    };
  }, []);

  const goTo = useCallback(
    (to: number, dir: 1 | -1) => {
      const target = ((to % total) + total) % total;
      if (target === stateRef.current.start) return;
      if (stateRef.current.anim) return;
      if (reduced) {
        setStart(target);
        return;
      }
      setAnim({ dir, to: target });
      setStart(target);
      timerRef.current = setTimeout(() => setAnim(null), ANIM_MS + 60);
    },
    [reduced, total],
  );

  const next = useCallback(() => {
    goTo(stateRef.current.start + 1, 1);
  }, [goTo]);
  const prev = useCallback(() => {
    goTo(stateRef.current.start - 1, -1);
  }, [goTo]);

  // Gentle auto-cycle; pauses on hover / during animation / reduced motion.
  useEffect(() => {
    if (hovered || reduced) return;
    const id = setInterval(() => {
      if (!stateRef.current.anim && !document.hidden) next();
    }, 5000);
    return () => clearInterval(id);
  }, [hovered, reduced, next]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const visibleCount = isMobile ? 1 : 3;
  const visible = Array.from(
    { length: visibleCount },
    (_, i) => projects[(start + i) % total],
  );
  const peekProject = projects[(start + visibleCount) % total];

  // Cards displaced by the running transition, for motion assignment.
  const exitingProject = anim
    ? projects[
        anim.dir === 1
          ? (start - 1 + total) % total // was position 1
          : isMobile
            ? (start + 1) % total // was the single visible card
            : (start + 3) % total // was position 3
      ]
    : null;

  const renderSlot = (project: Project, slot: number) => {
    if (!anim) return <ProjectCard key={project.title} project={project} />;
    // Which role does this slot play in the transition?
    let role: "shift" | "enter" | "plain" = "plain";
    if (anim.dir === 1) role = slot === visibleCount - 1 ? "enter" : "shift";
    else role = slot === 0 ? "enter" : "shift";
    const shiftFrom =
      anim.dir === 1 ? "calc(100% + 1.25rem)" : "calc(-100% - 1.25rem)";
    return (
      <motion.div
        key={`${project.title}-anim`}
        data-enter-card={role === "enter" ? "true" : undefined}
        className="relative h-full"
        style={{
          zIndex: role === "enter" ? 20 : 10,
          transformOrigin: "center center",
        }}
        initial={
          role === "enter"
            ? // Entering card: starts SMALL (0.85) with ZERO opacity below
              // its slot, then grows to full size / max opacity in place.
              { opacity: 0, scale: 0.85, y: anim.dir === 1 ? 56 : -56 }
            : { x: shiftFrom, opacity: 1 }
        }
        animate={
          role === "enter"
            ? { opacity: 1, scale: 1, y: 0 }
            : { x: 0, opacity: 1 }
        }
        transition={{
          duration: ANIM_MS / 1000,
          ease: [0.22, 0.61, 0.36, 1],
          // Opacity fades in gradually across the whole duration.
          opacity: { duration: ANIM_MS / 1000, ease: "linear" },
        }}
      >
        <ProjectCard project={project} />
      </motion.div>
    );
  };

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[#89FF00]/7 dark:bg-[#C6FF00]/7 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[290px_1fr] lg:gap-12 lg:px-8 lg:py-14">
        {/* left header column, reference style */}
        <Reveal>
          <SectionTag>My Projects</SectionTag>
          <h2 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-[44px]">
            Real Problems.
            <br />
            Thoughtful <span className="text-[#89FF00] dark:text-[#C6FF00]">Solutions.</span>
          </h2>
          <p className="mt-4 max-w-[260px] text-[15px] leading-relaxed text-[#11150D]/65 dark:text-[#A5AAA0]">
            From business websites to web applications, I create solutions that
            help brands grow online.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#89FF00]/70 dark:border-[#C6FF00]/70 px-5 py-2.5 text-[13px] font-bold text-[#458000] transition hover:bg-[#89FF00] dark:hover:bg-[#C6FF00] hover:text-[#080A07] dark:text-[#C6FF00] dark:hover:text-[#080A07]"
          >
            Explore All Projects <ArrowRight size={14} />
          </a>
        </Reveal>

        {/* carousel: stage + right-side diagonal buttons */}
        <div
          data-testid="projects-carousel"
          data-start={start}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex items-stretch gap-3 sm:gap-4">
            <div className="relative min-w-0 flex-1">
              <div className="relative z-10 grid h-full gap-5 sm:grid-cols-3">
                {visible.map((project, i) => (
                  <div key={project.title} className="relative z-10 h-full min-w-0">
                    {renderSlot(project, i)}
                  </div>
                ))}
              </div>

              {/* exiting card: grows and fades out slowly as it leaves */}
              {anim && exitingProject ? (
                <motion.div
                  aria-hidden="true"
                  data-exiting-card="true"
                  className="pointer-events-none absolute top-0 z-40 h-full overflow-visible"
                  style={{
                    left:
                      anim.dir === 1 || isMobile
                        ? 0
                        : "calc((100% - 2.5rem) / 3 * 2 + 2.5rem)",
                    width: isMobile
                      ? "100%"
                      : "calc((100% - 2.5rem) / 3)",
                    transformOrigin: "center center",
                  }}
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{
                    // Exiting card: GROWS bigger while it leaves and its
                    // opacity drops slowly to fully transparent; the anim
                    // state is only cleared after this completes
                    // (ANIM_MS + 60ms), so it is removed at opacity 0.
                    opacity: 0,
                    scale: 1.22,
                    y: anim.dir === 1 ? -64 : 64,
                  }}
                  transition={{
                    duration: ANIM_MS / 1000,
                    ease: "easeIn",
                    // Slow, gradual fade across the full duration —
                    // not a quick fade at the end.
                    opacity: { duration: ANIM_MS / 1000, ease: "linear" },
                  }}
                >
                  <ProjectCard project={exitingProject} />
                </motion.div>
              ) : null}

              {/* mobile only: next card peeking below, clipped with a fade */}
              {isMobile && !anim ? (
                <div
                  aria-hidden="true"
                  data-peek-card={peekProject.title}
                  className="relative z-0 mt-5 h-[110px] overflow-hidden rounded-[14px] opacity-70"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 25%, transparent 98%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 25%, transparent 98%)",
                  }}
                >
                  <div className="pointer-events-none relative">
                    <ProjectCard project={peekProject} />
                  </div>
                </div>
              ) : null}
            </div>

            {/* navigation buttons — right side, diagonal arrows */}
            <div className="relative z-40 flex shrink-0 flex-col items-center justify-center gap-3">
              <button
                type="button"
                onClick={next}
                aria-label="Next projects"
                data-carousel-next="true"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#89FF00]/70 text-[#458000] transition hover:bg-[#89FF00] hover:text-[#080A07] dark:border-[#C6FF00]/70 dark:text-[#C6FF00] dark:hover:bg-[#C6FF00] dark:hover:text-[#080A07]"
              >
                <ArrowUpRight size={19} />
              </button>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous projects"
                data-carousel-prev="true"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#89FF00]/70 text-[#458000] transition hover:bg-[#89FF00] hover:text-[#080A07] dark:border-[#C6FF00]/70 dark:text-[#C6FF00] dark:hover:bg-[#C6FF00] dark:hover:text-[#080A07]"
              >
                <ArrowDownLeft size={19} />
              </button>
            </div>
          </div>

          {/* carousel dots — below the cards, all devices */}
          <div
            className="relative z-40 mt-6 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Project sets"
          >
            {projects.map((project, i) => (
              <button
                key={project.title}
                type="button"
                role="tab"
                aria-selected={i === start}
                aria-label={`Show projects starting with ${project.title}`}
                data-carousel-dot={i}
                onClick={() =>
                  goTo(i, (i - start + total) % total <= total / 2 ? 1 : -1)
                }
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === start
                    ? "w-7 bg-[#89FF00] dark:bg-[#C6FF00]"
                    : "w-2.5 bg-black/20 hover:bg-black/35 dark:bg-white/20 dark:hover:bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
