import { Briefcase, Handshake, Rocket, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

interface Standard {
  value: string;
  label: string;
  Icon: LucideIcon;
}

/**
 * Full-width bar directly under the hero, styled exactly like the
 * reference stats bar (icon + big bold value + small gray label,
 * divided columns) — but the values are honest service standards,
 * NOT fabricated business statistics (no invented percentages,
 * project counts or ratings).
 */
const standards: Standard[] = [
  { value: "Fast", label: "Performance-First Delivery", Icon: Rocket },
  { value: "Modern", label: "Latest Next.js Stack", Icon: Briefcase },
  { value: "Responsive", label: "Flawless On Every Device", Icon: Zap },
  { value: "On-Time", label: "Clear Timelines, Kept", Icon: Handshake },
];

export default function Benefits() {
  return (
    <section className="relative border-y border-black/[0.07] bg-black/[0.015] dark:border-white/[0.07] dark:bg-white/[0.015]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {standards.map((item, i) => (
          <div
            key={item.value}
            className={`border-black/[0.07] px-8 py-7 dark:border-white/[0.07] ${
              i > 0 ? "border-t sm:border-t-0 lg:border-l" : ""
            } ${i % 2 === 1 ? "sm:border-l" : ""} ${i >= 2 ? "max-lg:border-t" : ""} ${
              i === 2 ? "sm:border-l-0 lg:border-l" : ""
            }`}
          >
            <Reveal delay={i * 0.08}>
              <div className="flex items-center gap-4">
                <item.Icon
                  size={30}
                  strokeWidth={1.9}
                  className="shrink-0 text-[#7fb800] drop-shadow-[0_0_12px_rgba(198,255,0,0.45)] dark:text-[#C6FF00]"
                />
                <div>
                  <p className="font-heading text-[26px] font-bold leading-none tracking-tight">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-[12.5px] font-medium text-[#11150D]/55 dark:text-[#A5AAA0]">
                    {item.label}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
