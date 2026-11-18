"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ClipboardList,
  Code2,
  MessagesSquare,
  PenTool,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { processSteps } from "@/lib/data";
import SectionTag from "./SectionTag";

const icons: LucideIcon[] = [MessagesSquare, ClipboardList, PenTool, Code2, Rocket];

/** GSAP + ScrollTrigger reveal for the work-process timeline. */
export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-step",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
      // Subtle pulse on the step icons, driven by GSAP.
      gsap.to(".process-icon", {
        boxShadow: "0 0 32px rgba(198,255,0,0.55)",
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
        <SectionTag>My Process</SectionTag>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-[44px]">
            A Simple &amp; <span className="text-[#C6FF00]">Transparent Process.</span>
          </h2>
          <p className="max-w-sm text-[14.5px] leading-relaxed text-[#11150D]/60 dark:text-[#A5AAA0]">
            From idea to launch, I keep things simple, clear, and collaborative.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {processSteps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div key={step.title} className="process-step relative text-center">
                {/* connector arrow to the next step */}
                {i < processSteps.length - 1 && (
                  <ArrowRight
                    size={18}
                    className="absolute -right-[13px] top-7 z-10 hidden -translate-y-1/2 text-[#C6FF00]/60 lg:block"
                  />
                )}
                <span className="process-icon mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C6FF00]/45 bg-[#C6FF00]/[0.07] text-[#7fb800] dark:text-[#C6FF00]">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-heading text-[16px] font-bold">
                  {String(i + 1).padStart(2, "0")}. {step.title}
                </h3>
                <p className="mx-auto mt-1.5 max-w-[180px] text-[13px] leading-relaxed text-[#11150D]/60 dark:text-[#A5AAA0]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
