/**
 * Stylised "A" logo mark matching the reference: two bold strokes
 * forming an A, with a neon crossbar / right stroke.
 * The main strokes use currentColor so the mark adapts to the theme.
 */
export default function Logo({ size = 38 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M5 31 L15.5 5 L21 18"
        stroke="currentColor"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 16.5 L31 31"
        className="[stroke:#89FF00] dark:[stroke:#C6FF00]"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      <path
        d="M10.5 23.5 L24 23.5"
        className="[stroke:#89FF00] dark:[stroke:#C6FF00]"
        strokeWidth="3.6"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}
