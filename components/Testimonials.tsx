import { ArrowRight, BadgeCheck, Quote } from "lucide-react";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

/**
 * Reference layout: left heading block + one large dark testimonial
 * card with a big neon quote mark and dot navigation.
 * Content stays genuine-only — no invented quotes, names or ratings.
 * Replace the card text with a real client review when one is supplied.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden">
      <div className="pointer-events-none absolute right-10 top-16 h-64 w-64 rounded-full bg-[#C6FF00]/6 blur-[110px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-[300px_1fr] lg:gap-14 lg:px-8 lg:py-14">
        <Reveal>
          <SectionTag>Client Testimonials</SectionTag>
          <h2 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-[44px]">
            What My Clients <span className="text-[#C6FF00]">Say About Me.</span>
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
          <div className="card-surface relative overflow-hidden p-8 sm:p-11">
            {/* dotted texture, stronger toward the right like the reference */}
            <div className="dot-texture pointer-events-none absolute inset-0 opacity-25 [mask-image:linear-gradient(to_left,black_25%,transparent_85%)]" />
            <div className="relative">
              <Quote
                size={44}
                className="text-[#C6FF00] drop-shadow-[0_0_14px_rgba(198,255,0,0.5)]"
                fill="#C6FF00"
                strokeWidth={0}
              />
              <p className="mt-5 max-w-xl font-heading text-[19px] font-medium leading-relaxed sm:text-[21px]">
                Every project is a partnership. When clients share their
                experience of working with me, their words will be featured
                here — exactly as they wrote them.
              </p>

              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C6FF00]/15 text-[#7fb800] dark:text-[#C6FF00]">
                    <BadgeCheck size={20} />
                  </span>
                  <div>
                    <p className="text-[14.5px] font-bold leading-tight">
                      Genuine reviews only
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-[#11150D]/55 dark:text-[#A5AAA0]">
                      No invented testimonials — ever
                    </p>
                  </div>
                </div>
                {/* dot navigation, reference style */}
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#C6FF00] shadow-[0_0_8px_rgba(198,255,0,0.8)]" />
                  <span className="h-2 w-2 rounded-full border border-[#C6FF00]/60" />
                  <span className="h-2 w-2 rounded-full border border-[#C6FF00]/60" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
