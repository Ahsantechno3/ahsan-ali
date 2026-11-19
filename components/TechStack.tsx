"use client";

import { useState } from "react";
import { techStack } from "@/lib/data";
import type { TechItem } from "@/lib/data";
import { techIconPaths } from "./tech-icons";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

type Filter = "all" | TechItem["category"];

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "animation", label: "Animation & 3D" },
  { key: "tools", label: "Icons & Type Safety" },
];

export default function TechStack() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = techStack.filter((item) => filter === "all" || item.category === filter);

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
      <Reveal>
        <SectionTag>Skills &amp; Technology</SectionTag>
        <h2 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight sm:text-[44px]">
          Built With <span className="text-[#89FF00] dark:text-[#C6FF00]">Next.js + Tailwind CSS</span>
        </h2>
        <p className="mt-3 max-w-xl text-[15px] text-[#11150D]/65 dark:text-[#A5AAA0]">
          This portfolio itself is written in exactly this stack — every technology
          below is used in its code.
        </p>
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              filter === f.key
                ? "bg-[#89FF00] dark:bg-[#C6FF00] text-[#080A07]"
                : "border border-black/15 hover:border-[#89FF00] dark:hover:border-[#C6FF00] dark:border-white/15"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((tech, i) => {
          const path = techIconPaths[tech.name];
          return (
            <Reveal key={tech.name} delay={i * 0.05}>
              <div className="card-surface flex h-full items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[#89FF00]/25 dark:border-[#C6FF00]/25 bg-[#0d100b]">
                  {path && (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                      <path
                        d={path}
                        className="[fill:#89FF00] dark:[fill:#C6FF00]"
                      />
                    </svg>
                  )}
                </span>
                <div>
                  <h3 className="font-heading text-[19px] font-bold leading-tight">
                    {tech.name}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-[#11150D]/60 dark:text-[#A5AAA0]">
                    {tech.label} · {tech.categoryLabel}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
