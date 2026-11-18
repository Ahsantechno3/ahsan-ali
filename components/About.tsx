import {
  ArrowRight,
  Code2,
  Gauge,
  GraduationCap,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

interface Feature {
  title: string;
  text: string;
  Icon: LucideIcon;
}

/** Honest feature rows — no fabricated years or project counts. */
const features: Feature[] = [
  { title: "Clean Code", text: "Clean Code Approach", Icon: Code2 },
  { title: "Client-Focused", text: "Client-Focused Approach", Icon: Users },
  { title: "Performance First", text: "Fast On Every Device", Icon: Gauge },
  { title: "Always Learning", text: "Modern Tools & Practices", Icon: GraduationCap },
];

/**
 * Stylised developer figure over the reference's angular neon backdrop.
 * No photo of Ahsan was provided, so no stock photo of a real person
 * is used — this is an intentional graphic, not a portrait claim.
 */
function PortraitPanel() {
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[340px] sm:h-[440px]" aria-hidden="true">
      {/* angular neon geometric backdrop */}
      <svg viewBox="0 0 340 440" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="geoA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#5c8400" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="geoB" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C6FF00" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <polygon points="170,64 322,300 238,300" fill="url(#geoA)" opacity="0.9" />
        <polygon points="18,300 96,120 196,300" fill="url(#geoB)" opacity="0.75" />
        <polygon points="120,60 170,150 70,150" fill="#C6FF00" opacity="0.28" />
        <polygon points="238,300 322,300 300,412 262,412" fill="#C6FF00" opacity="0.18" />
        <polygon points="30,412 90,318 150,412" fill="#C6FF00" opacity="0.14" />
      </svg>
      <div className="absolute left-1/2 top-[46%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6FF00]/25 blur-[60px]" />

      {/* developer silhouette */}
      <svg
        viewBox="0 0 200 260"
        className="absolute bottom-4 left-1/2 w-[248px] -translate-x-1/2 drop-shadow-[0_24px_35px_rgba(0,0,0,0.6)]"
      >
        <circle cx="100" cy="66" r="34" fill="#10130d" stroke="#C6FF00" strokeOpacity="0.5" strokeWidth="1.6" />
        <path
          d="M100 104 C58 104 34 132 28 176 L26 236 C26 246 34 252 44 252 L156 252 C166 252 174 246 174 236 L172 176 C166 132 142 104 100 104 Z"
          fill="#10130d"
          stroke="#C6FF00"
          strokeOpacity="0.5"
          strokeWidth="1.6"
        />
        {/* collar / shirt detail */}
        <path d="M84 108 L100 132 L116 108 L108 104 L100 114 L92 104 Z" fill="#C6FF00" opacity="0.85" />
        {/* glasses */}
        <g stroke="#C6FF00" strokeWidth="2.4" fill="none" opacity="0.9">
          <rect x="72" y="58" width="24" height="15" rx="4" />
          <rect x="104" y="58" width="24" height="15" rx="4" />
          <line x1="96" y1="63" x2="104" y2="63" />
        </g>
        {/* code glyph on chest */}
        <text
          x="100"
          y="196"
          textAnchor="middle"
          fontFamily="monospace"
          fontWeight="bold"
          fontSize="30"
          fill="#C6FF00"
        >
          {"</>"}
        </text>
      </svg>

      {/* fade into page background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F7F9F4] to-transparent dark:from-[#080A07]" />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 lg:grid-cols-[0.95fr_1.15fr_0.85fr] lg:gap-10 lg:px-8 lg:py-14">
        <Reveal>
          <PortraitPanel />
        </Reveal>

        <Reveal delay={0.08}>
          <SectionTag>About Me</SectionTag>
          <h2 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-[44px]">
            Turning Ideas Into <span className="text-[#C6FF00]">Powerful Websites.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#11150D]/70 dark:text-[#A5AAA0]">
            I&apos;m a passionate web developer who loves building modern,
            high-performance websites. My focus is on delivering clean code,
            great design, and real results.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C6FF00] px-6 py-3 text-sm font-bold text-[#080A07] transition hover:shadow-[0_0_32px_rgba(198,255,0,0.55)]"
          >
            Know More About Me <ArrowRight size={16} />
          </a>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
            {features.map((f) => (
              <li key={f.title} className="flex items-center gap-4 py-[18px]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-[#C6FF00]/35 bg-[#C6FF00]/[0.06] text-[#7fb800] dark:text-[#C6FF00]">
                  <f.Icon size={21} />
                </span>
                <div>
                  <p className="font-heading text-[15.5px] font-bold leading-tight">
                    {f.title}
                  </p>
                  <p className="mt-1 text-[12.5px] text-[#11150D]/55 dark:text-[#A5AAA0]">
                    {f.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
