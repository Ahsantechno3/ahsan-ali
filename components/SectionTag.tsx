/**
 * Section label in the reference style: a short neon dash followed by
 * a small bold label ("— My Projects", "— What I Offer", ...).
 */
export default function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[13px] font-bold tracking-wide text-[#11150D] dark:text-[#F5F7F2]">
      <span className="h-[3px] w-7 rounded-full bg-[#89FF00] dark:bg-[#C6FF00] shadow-[0_0_12px_rgba(137,255,0,0.9)] dark:shadow-[0_0_12px_rgba(198,255,0,0.9)]" />
      {children}
    </p>
  );
}
