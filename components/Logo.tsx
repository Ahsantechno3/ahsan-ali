/**
 * Ahsan ka "A" mark — uski bheji hui image se saaf vector (SVG) mein
 * dobara banaya gaya: left safed stroke, beech mein chhota triangle,
 * right neon stroke. Safed hisse theme ke saath badalte hain (light
 * theme mein dark ho jate hain taake nazar ayen), neon hissa hamesha
 * theme green rehta hai.
 */
export default function Logo({ size = 38 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M6 56 L25 8 H35 L19 56 Z"
        className="[fill:#11150D] dark:[fill:#F5F7F2]"
      />
      <path d="M31 30 L37 43 H25 Z" className="[fill:#11150D] dark:[fill:#F5F7F2]" />
      <path
        d="M41 22 H50 L59 56 H50 Z"
        className="[fill:#89FF00] dark:[fill:#C6FF00]"
      />
    </svg>
  );
}
