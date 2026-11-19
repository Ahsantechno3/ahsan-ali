"use client";

import { Send } from "lucide-react";
import Reveal from "./Reveal";
import { openContactModal } from "./ContactModal";

/**
 * Contact section — sirf CTA banner. Form ab reusable modal mein hai
 * (ContactModal), jo Hero / Header / CTA / project cards sab se khulta
 * hai; CTA ke baad seedha footer aata hai.
 */
export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <Reveal>
        {/* CTA banner — reference treatment: rounded 24px, green-glow
            gradient border, heading left, pill button + paper plane right */}
        <div className="relative overflow-hidden rounded-[24px] border border-[#89FF00]/35 dark:border-[#C6FF00]/35 bg-gradient-to-br from-[#1a2408] via-[#0d1207] to-[#070905] p-8 text-[#F5F7F2] shadow-[0_25px_60px_-25px_rgba(137,255,0,0.35)] dark:shadow-[0_25px_60px_-25px_rgba(198,255,0,0.35)] sm:p-11">
          <div className="glow-pulse pointer-events-none absolute -bottom-16 left-[12%] h-36 w-[55%] rounded-[100%] bg-[#89FF00]/25 dark:bg-[#C6FF00]/25 blur-[50px]" />
          <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[#89FF00]/12 dark:bg-[#C6FF00]/12 blur-[60px]" />
          {/* border par ghoomti hui light — pehle halo, phir sharp beam */}
          <div className="cta-beam cta-beam-glow" aria-hidden="true" />
          <div className="cta-beam" aria-hidden="true" />
          <div className="relative flex flex-wrap items-center gap-8">
            <div className="min-w-[260px] flex-1">
              <h2 className="max-w-xl text-[32px] font-bold leading-[1.12] tracking-tight sm:text-[38px]">
                Your Next Website Could Be Your Best{" "}
                <span className="text-[#89FF00] dark:text-[#C6FF00]">Business Move.</span>
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#A5AAA0]">
                Have a project in mind? Let&apos;s discuss how we can build
                something amazing together.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openContactModal()}
              className="flex items-center gap-2 rounded-full bg-[#89FF00] dark:bg-[#C6FF00] px-6 py-3.5 text-sm font-bold text-[#080A07] transition hover:shadow-[0_0_38px_rgba(137,255,0,0.65)] dark:hover:shadow-[0_0_38px_rgba(198,255,0,0.65)]"
            >
              Let&apos;s Talk About Your Project <Send size={15} />
            </button>
            {/* neon origami paper plane — neeche zameen wala shadow + neon pool */}
            <div className="relative hidden shrink-0 md:block">
              <div
                className="pointer-events-none absolute -bottom-4 left-1/2 h-6 w-[130%] -translate-x-1/2 rounded-[100%] bg-[#89FF00]/25 blur-[16px] dark:bg-[#C6FF00]/25"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-2 left-1/2 h-3.5 w-[95%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-[7px]"
                aria-hidden="true"
              />
              <svg
                viewBox="0 0 120 100"
                className="relative w-[104px] drop-shadow-[0_0_10px_rgba(137,255,0,0.55)] dark:drop-shadow-[0_0_10px_rgba(198,255,0,0.55)]"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 52 L114 6 L74 94 L58 64 Z"
                  className="[stroke:#89FF00] dark:[stroke:#C6FF00]"
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                />
                <path d="M58 64 L114 6" className="[stroke:#89FF00] dark:[stroke:#C6FF00]" strokeWidth="2.2" />
                <path
                  d="M58 64 L46 88 L74 94"
                  className="[stroke:#89FF00] dark:[stroke:#C6FF00]"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
