"use client";

import { motion } from "framer-motion";

/**
 * Premium laptop visual built with CSS 3D transforms, matching the
 * reference: a large laptop at a slight angle, code-editor screen with
 * a big glowing neon </>, metallic keyboard base in perspective.
 * Framer Motion drives the slow float.
 */
export default function LaptopVisual() {
  return (
    <motion.div
      animate={{ y: [0, -13, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10"
      aria-hidden="true"
    >
      <div
        style={{
          transform: "perspective(1200px) rotateY(-16deg) rotateX(5deg)",
          transformStyle: "preserve-3d",
        }}
        className="relative w-[290px] sm:w-[400px] lg:w-[450px]"
      >
        {/* ── Screen ─────────────────────────────────────────── */}
        <div className="relative rounded-[16px] border border-white/20 bg-gradient-to-br from-[#2a3324] via-[#151a11] to-[#05070a] p-[10px] shadow-[0_50px_90px_-25px_rgba(0,0,0,0.85)]">
          <div className="relative aspect-[16/10.2] overflow-hidden rounded-[9px] bg-[#060905]">
            {/* window chrome */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b border-white/5 bg-white/[0.03] px-3.5 py-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
              <span className="ml-3 hidden h-3.5 w-32 rounded-full bg-white/10 sm:block" />
              <span className="ml-auto hidden h-3.5 w-14 rounded-full bg-[#89FF00]/25 dark:bg-[#C6FF00]/25 sm:block" />
            </div>

            {/* faint code lines */}
            <div className="absolute left-4 top-12 space-y-2 opacity-35">
              <div className="h-1.5 w-24 rounded bg-[#89FF00]/70 dark:bg-[#C6FF00]/70" />
              <div className="h-1.5 w-36 rounded bg-white/40" />
              <div className="ml-4 h-1.5 w-28 rounded bg-sky-400/60" />
              <div className="ml-4 h-1.5 w-20 rounded bg-white/30" />
              <div className="h-1.5 w-32 rounded bg-white/40" />
            </div>
            <div className="absolute bottom-9 left-4 space-y-2 opacity-25">
              <div className="h-1.5 w-28 rounded bg-white/40" />
              <div className="ml-4 h-1.5 w-16 rounded bg-[#89FF00]/70 dark:bg-[#C6FF00]/70" />
            </div>

            {/* big neon </> */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[76px] font-bold tracking-tighter text-[#89FF00] dark:text-[#C6FF00] [text-shadow:0_0_18px_rgba(137,255,0,0.95),0_0_55px_rgba(137,255,0,0.6),0_0_110px_rgba(137,255,0,0.4)] dark:[text-shadow:0_0_18px_rgba(198,255,0,0.95),0_0_55px_rgba(198,255,0,0.6),0_0_110px_rgba(198,255,0,0.4)] sm:text-[104px]">
                &lt;/&gt;
              </span>
            </div>

            {/* status bar */}
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-[#89FF00]/10 dark:bg-[#C6FF00]/10 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#89FF00] dark:bg-[#C6FF00]" />
              <span className="h-1 w-16 rounded bg-[#89FF00]/50 dark:bg-[#C6FF00]/50" />
              <span className="h-1 w-10 rounded bg-white/25" />
              <span className="ml-auto font-mono text-[9px] text-[#89FF00]/80 dark:text-[#C6FF00]/80">
                TypeScript
              </span>
            </div>

            {/* glass reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent" />
          </div>
        </div>

        {/* ── Base / keyboard deck ───────────────────────────── */}
        <div
          className="relative mx-auto h-[26px] w-[114%] max-w-none -translate-x-[6.2%]"
          style={{
            clipPath: "polygon(2.5% 0, 97.5% 0, 100% 100%, 0 100%)",
            background:
              "linear-gradient(180deg, #454f3d 0%, #232a1e 34%, #10140d 72%, #04060a 100%)",
          }}
        >
          <div className="key-texture absolute inset-x-[9%] top-[3px] h-[13px] rounded-[3px] opacity-70" />
          <div className="absolute left-1/2 top-[16px] h-[6px] w-[26%] -translate-x-1/2 rounded-[2px] bg-white/10" />
        </div>
        {/* neon front edge */}
        <div className="mx-auto h-[2px] w-[112%] -translate-x-[5.5%] rounded-full bg-[#89FF00]/80 dark:bg-[#C6FF00]/80 blur-[1.5px]" />
      </div>
    </motion.div>
  );
}
