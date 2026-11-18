import {
  Globe,
  Headphones,
  Layers,
  PenTool,
  ShoppingCart,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const icons: Record<string, LucideIcon> = {
  Globe,
  PenTool,
  Zap,
  ShoppingCart,
  Layers,
  Headphones,
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-[#C6FF00]/6 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[290px_1fr] lg:gap-12 lg:px-8 lg:py-14">
        {/* left header column, reference style */}
        <Reveal>
          <SectionTag>What I Offer</SectionTag>
          <h2 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-[44px]">
            I Build Digital Experiences That{" "}
            <span className="text-[#C6FF00]">Drive Growth.</span>
          </h2>
          <p className="mt-4 max-w-[260px] text-[15px] leading-relaxed text-[#11150D]/65 dark:text-[#A5AAA0]">
            Modern solutions. Real business impact.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#C6FF00]/70 px-5 py-2.5 text-[13px] font-bold text-[#5c8400] transition hover:bg-[#C6FF00] hover:text-[#080A07] dark:text-[#C6FF00] dark:hover:text-[#080A07]"
          >
            Explore Services <ArrowRight size={14} />
          </a>
        </Reveal>

        {/* 3 × 2 card grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon] ?? Globe;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.08}>
                <div className="card-surface h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#C6FF00]/25 bg-[#0d100b] text-[#C6FF00] shadow-[inset_0_0_18px_rgba(198,255,0,0.07)] dark:bg-[#0B0E08]">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 font-heading text-[17px] font-bold leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#11150D]/60 dark:text-[#A5AAA0]">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
