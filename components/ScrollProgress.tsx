"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Page ke sab se upar wali neon progress bar — GSAP ScrollTrigger se
 * scroll ke saath bharti hai, taake visitor ko pata chale page mein
 * kitna neeche aa gaya hai.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-[#89FF00] shadow-[0_0_12px_rgba(137,255,0,0.8)] dark:bg-[#C6FF00] dark:shadow-[0_0_12px_rgba(198,255,0,0.8)]"
    />
  );
}
