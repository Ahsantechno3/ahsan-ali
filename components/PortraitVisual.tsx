"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const PortraitScene = dynamic(() => import("./PortraitScene"), { ssr: false });

/**
 * About portrait composition, Ahsan ke banner jaisi:
 * peeche solid neon objects (bara triangle + patla circle), beech mein
 * Three.js scene (photo + do 3D lines: ek aagay, ek peeche), aur photo
 * ka neeche wala hissa background mein fade hota hai — neeche koi
 * shadow ya glow band nahi hai. Sab kuch still hai, koi animation nahi.
 */
export default function PortraitVisual() {
  // Performance: Three.js scene sirf tab load/mount hoti hai jab About
  // section screen ke qareeb aye — page load par main-thread free rehta hai
  const wrapRef = useRef<HTMLDivElement>(null);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowScene(true);
          io.disconnect();
        }
      },
      { rootMargin: "350px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-[420px] w-full max-w-[350px] sm:h-[470px]"
    >
      {/* solid neon background objects — banner style */}
      <svg
        viewBox="0 0 340 440"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="geoA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#5c8400" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="geoB" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#C6FF00" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C6FF00" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {/* bara solid triangle (play shape) — banner ki pehchan */}
        <polygon points="60,66 318,240 60,414" fill="url(#geoA)" opacity="0.55" />
        <polygon points="38,96 268,240 38,384" fill="url(#geoB)" opacity="0.85" />
        {/* patla bara circle photo ke peeche */}
        <circle
          cx="172"
          cy="198"
          r="150"
          fill="none"
          stroke="#C6FF00"
          strokeWidth="1.6"
          opacity="0.5"
        />
        {/* chhota triangle accent upar */}
        <polygon points="122,20 172,104 72,104" fill="#C6FF00" opacity="0.22" />
      </svg>

      {/* Three.js scene — scroll ke qareeb anay par mount hoti hai */}
      <div className="absolute inset-0">{showScene && <PortraitScene />}</div>

      {/* bottom shadow — neeche (0 par) bilkul solid, upar jaty hue
          ahista ahista khatam ho jata hai */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#F7F9F4] via-[#F7F9F4]/35 to-transparent dark:from-[#080A07] dark:via-[#080A07]/35" />
    </div>
  );
}
