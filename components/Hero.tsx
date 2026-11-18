"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
// Three.js must only run in the browser.
const LaptopOrbitScene = dynamic(() => import("./LaptopOrbitScene"), {
  ssr: false,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

/* ── Floating brand badges, reference style ─────────────────────── */

function ReactBadge() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="2.6" fill="#61DAFB" />
      <ellipse cx="20" cy="20" rx="15" ry="6" stroke="#61DAFB" strokeWidth="1.7" />
      <ellipse
        cx="20"
        cy="20"
        rx="15"
        ry="6"
        stroke="#61DAFB"
        strokeWidth="1.7"
        transform="rotate(60 20 20)"
      />
      <ellipse
        cx="20"
        cy="20"
        rx="15"
        ry="6"
        stroke="#61DAFB"
        strokeWidth="1.7"
        transform="rotate(120 20 20)"
      />
    </svg>
  );
}

function FigmaBadge() {
  return (
    <svg width="20" height="28" viewBox="0 0 24 34" fill="none" aria-hidden="true">
      <path d="M8 0h6v8H8a4 4 0 1 1 0-8Z" fill="#F24E1E" />
      <path d="M14 0h2a4 4 0 0 1 0 8h-2V0Z" fill="#FF7262" />
      <path d="M8 8h6v8H8a4 4 0 1 1 0-8Z" fill="#A259FF" />
      <circle cx="18" cy="12" r="4" fill="#1ABCFE" />
      <path d="M8 16h6v4a5 5 0 0 1-6 4.9V16Z" fill="#0ACF83" />
    </svg>
  );
}

const badgeFloat = (duration: number, delay: number) => ({
  animate: { y: [0, -11, 0] },
  transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const },
});

const badgeBase =
  "pointer-events-none absolute z-20 flex items-center justify-center rounded-full border shadow-[0_20px_45px_rgba(0,0,0,0.55)]";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* soft radial glows */}
      <div className="glow-pulse pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-[#C6FF00]/15 blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 top-64 h-72 w-72 rounded-full bg-[#C6FF00]/8 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pb-16 pt-12 lg:grid-cols-[1fr_1.12fr] lg:px-8 lg:pt-16">
        <div>
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 text-xs font-semibold dark:border-white/15 dark:bg-white/[0.04]"
          >
            <span className="h-2 w-2 rounded-full bg-[#C6FF00] shadow-[0_0_10px_rgba(198,255,0,0.9)]" />
            Freelance Web Developer
          </motion.span>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-6 text-[46px] font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[64px]"
          >
            Your Website Should <span className="text-[#C6FF00]">Do More</span> Than
            Look Good.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6 max-w-md text-base leading-relaxed text-[#11150D]/70 dark:text-[#A5AAA0]"
          >
            I build fast, modern websites that help businesses attract more
            customers and grow their brand.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-full bg-[#C6FF00] px-6 py-3.5 text-sm font-bold text-[#080A07] transition hover:shadow-[0_0_36px_rgba(198,255,0,0.6)]"
            >
              Let&apos;s Grow Your Business <ArrowRight size={16} />
            </a>
            <a
              href="#projects"
              className="flex items-center gap-2.5 rounded-full border border-black/15 px-6 py-3.5 text-sm font-semibold transition hover:border-[#C6FF00] dark:border-white/20"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C6FF00] text-[#080A07]">
                <Play size={10} fill="currentColor" />
              </span>
              View My Work
            </a>
          </motion.div>

          {/* Trusted-by row: overlapping avatar initials, generic wording */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.42 }}
            className="mt-9 flex items-center gap-3.5"
          >
            <div className="flex -space-x-3">
              {[
                { initials: "AR", bg: "from-lime-200 to-emerald-500" },
                { initials: "KS", bg: "from-amber-200 to-orange-400" },
                { initials: "MJ", bg: "from-sky-200 to-indigo-400" },
                { initials: "DT", bg: "from-rose-200 to-pink-500" },
              ].map((a) => (
                <span
                  key={a.initials}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F7F9F4] bg-gradient-to-br text-[11px] font-bold text-black/70 dark:border-[#080A07] ${a.bg}`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <p className="text-[13px] font-medium leading-snug text-[#11150D]/70 dark:text-[#A5AAA0]">
              Trusted by clients who
              <br className="hidden sm:block" /> value quality &amp; results
            </p>
          </motion.div>
        </div>

        {/* ── Hero visual ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto h-[380px] w-full max-w-[580px] sm:h-[460px] lg:h-[540px]"
        >
          {/* glow pool underneath */}
          <div className="pointer-events-none absolute bottom-[4%] left-1/2 h-24 w-[78%] -translate-x-1/2 rounded-[100%] bg-[#C6FF00]/30 blur-[46px]" />

          {/* 3D MacBook orbit scene */}
          <div className="absolute inset-0">
            <LaptopOrbitScene />
          </div>

          {/* circular floating badges */}
          <motion.span
            {...badgeFloat(5, 0)}
            className={`${badgeBase} left-[7%] top-[1%] h-16 w-16 border-white/10 bg-[#0d1522] sm:h-[72px] sm:w-[72px]`}
          >
            <ReactBadge />
          </motion.span>
          <motion.span
            {...badgeFloat(6, 0.8)}
            className={`${badgeBase} -left-2 top-[36%] h-[74px] w-[74px] border-white/25 bg-black sm:h-20 sm:w-20`}
          >
            <span className="text-center leading-none text-white">
              <span className="block font-heading text-[26px] font-bold">N</span>
              <span className="mt-0.5 block text-[8px] font-medium text-white/80">
                Next.js
              </span>
            </span>
          </motion.span>
          <motion.span
            {...badgeFloat(5.4, 0.4)}
            className="pointer-events-none absolute right-[3%] top-[40%] z-20 flex h-12 w-12 items-end justify-end rounded-[12px] bg-[#F7DF1E] p-1.5 shadow-[0_20px_45px_rgba(0,0,0,0.5)] sm:h-14 sm:w-14"
          >
            <span className="font-heading text-base font-black leading-none text-black">
              JS
            </span>
          </motion.span>
          <motion.span
            {...badgeFloat(6.4, 1.4)}
            className={`${badgeBase} bottom-[3%] right-[9%] h-16 w-16 border-white/10 bg-[#121610] sm:h-[72px] sm:w-[72px]`}
          >
            <FigmaBadge />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
