import {
  ArrowRight,
  Code2,
  Gauge,
  GraduationCap,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PortraitVisual from "./PortraitVisual";
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

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 lg:grid-cols-[0.95fr_1.15fr_0.85fr] lg:gap-10 lg:px-8 lg:py-14">
        <Reveal>
          <PortraitVisual />
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
