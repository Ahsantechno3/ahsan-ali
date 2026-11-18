import { ArrowRight, Quote } from "lucide-react";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";
import { testimonials } from "@/lib/data";

/**
 * Layout matches Ahsan's reference design: left heading block, one large
 * rounded testimonial card, a second card peeking in from the right edge,
 * and dot navigation at the card's bottom right.
 */
export default function Testimonials() {
  const t = testimonials[0];

  return (
    <section id="testimonials" className="relative overflow-hidden">
      <div className="pointer-events-none absolute right-10 top-16 h-64 w-64 rounded-full bg-[#C6FF00]/6 blur-[110px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[320px_1fr] lg:gap-14 lg:px-8 lg:py-14">
        <Reveal>
          <SectionTag>Client Testimonials</SectionTag>
          <h2 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-[44px]">
            What My Clients Say About <span className="text-[#C6FF00]">Me.</span>
          </h2>
          <p className="mt-4 text-[15px] text-[#11150D]/65 dark:text-[#A5AAA0]">
            Real feedback from real clients.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#C6FF00]/70 px-5 py-2.5 text-[13px] font-bold text-[#5c8400] transition hover:bg-[#C6FF00] hover:text-[#080A07] dark:text-[#C6FF00] dark:hover:text-[#080A07]"
          >
            View More Reviews <ArrowRight size={14} />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            {/* main testimonial card */}
            <div className="relative z-10 overflow-hidden rounded-[26px] border border-[#A5AAA0]/20 bg-white p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] dark:bg-[#121610] sm:p-12">
              {/* soft green glow along the bottom, like the reference */}
              <div className="pointer-events-none absolute -bottom-28 left-16 h-52 w-[420px] rounded-full bg-[#C6FF00]/12 blur-[80px]" />
              <div className="relative">
                <Quote
                  size={46}
                  className="text-[#C6FF00] drop-shadow-[0_0_14px_rgba(198,255,0,0.5)]"
                  fill="#C6FF00"
                  strokeWidth={0}
                />
                <p className="mt-6 max-w-2xl text-[19px] font-medium leading-[1.55] sm:text-[21px]">
                  {t.quote}
                </p>

                <div className="mt-10 flex items-end justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-lime-200 to-emerald-500 text-[15px] font-bold text-black/70 ring-2 ring-[#C6FF00]/30">
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-[15.5px] font-bold leading-tight">
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-[13px] text-[#11150D]/55 dark:text-[#A5AAA0]">
                        {t.role}
                      </p>
                    </div>
                  </div>
                  {/* dot navigation, reference style */}
                  <div className="flex items-center gap-2 pb-1">
                    <span className="h-2 w-2 rounded-full bg-[#11150D]/25 dark:bg-white/25" />
                    <span className="h-2 w-2 rounded-full bg-[#C6FF00] shadow-[0_0_8px_rgba(198,255,0,0.8)]" />
                    <span className="h-2 w-2 rounded-full border border-[#11150D]/30 dark:border-white/30" />
                  </div>
                </div>
              </div>
            </div>

            {/* next-card peek at the right edge, like the reference */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 top-1/2 z-0 hidden h-[86%] w-[60%] -translate-y-1/2 translate-x-[84%] rounded-[26px] border border-[#A5AAA0]/15 bg-white opacity-45 blur-[1.5px] dark:bg-[#121610] lg:block"
            >
              <div className="p-10">
                <Quote
                  size={40}
                  className="text-[#C6FF00]"
                  fill="#C6FF00"
                  strokeWidth={0}
                />
                <div className="mt-6 h-3.5 w-4/5 rounded-full bg-[#11150D]/15 dark:bg-white/15" />
                <div className="mt-3 h-3.5 w-3/5 rounded-full bg-[#11150D]/15 dark:bg-white/15" />
                <div className="mt-9 flex items-center gap-3.5">
                  <span className="h-12 w-12 rounded-full bg-[#11150D]/15 dark:bg-white/15" />
                  <div>
                    <div className="h-3 w-24 rounded-full bg-[#11150D]/15 dark:bg-white/15" />
                    <div className="mt-2 h-2.5 w-16 rounded-full bg-[#11150D]/10 dark:bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
