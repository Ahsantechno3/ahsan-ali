"use client";

import dynamic from "next/dynamic";

const PortraitScene = dynamic(() => import("./PortraitScene"), { ssr: false });

/**
 * About portrait composition, Ahsan ke banner jaisi:
 * peeche solid neon objects (bara triangle + patla circle), beech mein
 * Three.js scene (photo + do 3D lines: ek aagay, ek peeche), aur photo
 * ka neeche wala hissa background mein fade hota hai — neeche koi
 * shadow ya glow band nahi hai. Sab kuch still hai, koi animation nahi.
 */
export default function PortraitVisual() {
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[350px] sm:h-[470px]">
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

      {/* Three.js scene — neeche se sirf halka fade, koi shadow/band nahi */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_82%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_82%,transparent_98%)]">
        <PortraitScene />
      </div>
    </div>
  );
}
