import Image from "next/image";
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
 * Ahsan's own portrait (transparent cutout he supplied), composed like
 * his banner: solid neon shapes behind, glowing orbit lines over the
 * photo, a gentle float/sway animation, and the bottom of the photo
 * fading into the page background instead of ending in a hard edge.
 */
function PortraitPanel() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[350px] sm:h-[470px]">
      {/* solid neon geometric shapes behind the portrait */}
      <svg viewBox="0 0 340 440" className="absolute inset-0 h-full w-full" aria-hidden="true">
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
      {/* green glow pools behind and below the figure */}
      <div className="absolute left-1/2 top-[46%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C6FF00]/25 blur-[60px]" />
      <div className="absolute bottom-2 left-1/2 h-24 w-72 -translate-x-1/2 rounded-full bg-[#C6FF00]/20 blur-[45px]" />

      {/* floating group: portrait + orbit lines over it */}
      <div className="float-y absolute inset-0">
        <Image
          src="/images/ahsan-portrait.png"
          alt="Ahsan — freelance web developer"
          fill
          sizes="(max-width: 640px) 320px, 350px"
          className="object-contain drop-shadow-[0_24px_35px_rgba(0,0,0,0.55)] [mask-image:linear-gradient(to_bottom,black_80%,transparent_97%)] [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent_97%)]"
        />

        {/* glowing orbit lines over the portrait, banner style */}
        <svg viewBox="0 0 340 440" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <filter id="ringGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g className="ring-sway-a" filter="url(#ringGlow)">
            <ellipse
              cx="170"
              cy="272"
              rx="169"
              ry="57"
              fill="none"
              stroke="#C6FF00"
              strokeWidth="2.4"
              opacity="0.9"
              transform="rotate(-16 170 272)"
            />
            <circle cx="30" cy="306" r="4.5" fill="#C6FF00" />
          </g>
          <g className="ring-sway-b" filter="url(#ringGlow)">
            <ellipse
              cx="170"
              cy="254"
              rx="152"
              ry="45"
              fill="none"
              stroke="#C6FF00"
              strokeWidth="1.8"
              opacity="0.6"
              transform="rotate(13 170 254)"
            />
            <ellipse
              cx="170"
              cy="254"
              rx="152"
              ry="45"
              fill="none"
              stroke="#C6FF00"
              strokeWidth="3"
              strokeDasharray="2 16"
              opacity="0.85"
              transform="rotate(13 170 254)"
              className="dash-drift"
            />
            <circle cx="298" cy="212" r="3.5" fill="#C6FF00" opacity="0.9" />
          </g>
        </svg>
      </div>

      {/* extra blend so the photo's bottom melts into the page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#F7F9F4]/70 to-transparent dark:from-[#080A07]/70" />
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
          <ul className="space-y-3">
            {features.map((f) => (
              <li
                key={f.title}
                className="flex items-center gap-4 rounded-2xl border border-black/[0.07] bg-white/70 px-4 py-3.5 dark:border-white/[0.08] dark:bg-white/[0.03]"
              >
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
