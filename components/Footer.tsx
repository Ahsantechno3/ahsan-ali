import { ArrowUp, Github, Heart, Linkedin, Mail } from "lucide-react";
import { contactEmail } from "@/lib/data";
import Logo from "./Logo";

// GitHub aur LinkedIn Ahsan ke asal profiles hain. X aur YouTube us ke
// kehne par hata diye gaye hain (un par us ke profiles nahi hain).
// Email icon mailto hai — click karne par visitor ke mail app mein
// Ahsan ka address To mein pehle se likha ata hai.
const socials = [
  { label: "GitHub", href: "https://github.com/Ahsantechno3", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ahsan-ali-468453440", Icon: Linkedin },
  { label: "Email", href: `mailto:${contactEmail}`, Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-black/[0.07] dark:border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* ek hi row: logo + tagline (left) | copyright (center) | socials (right).
            Footer nav links Ahsan ke kehne par hata diye gaye hain. */}
        <div className="grid items-center gap-x-10 gap-y-7 md:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-3.5 justify-self-center md:justify-self-start">
            <span className="text-[#11150D] dark:text-[#F5F7F2]">
              <Logo size={44} />
            </span>
            <p className="text-[13px] font-medium leading-snug text-[#11150D]/60 dark:text-[#A5AAA0]">
              Building Better
              <br />
              Digital Experiences.
            </p>
          </div>

          {/* copyright — neeche wali bar se utha kar center mein, jahan
              pehle socials the */}
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-center text-[12.5px] text-[#11150D]/50 dark:text-[#A5AAA0]">
            © {new Date().getFullYear()}. All rights reserved. Designed with
            <Heart size={12} className="text-red-500" fill="#ef4444" />
            for a better web.
          </p>

          <div className="flex gap-2.5 justify-self-center md:justify-self-end">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-[#89FF00] dark:hover:border-[#C6FF00] hover:text-[#458000] dark:border-white/12 dark:hover:text-[#C6FF00]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* back-to-top, fixed bottom-right like the reference */}
      <a
        href="#home"
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#89FF00] dark:bg-[#C6FF00] text-[#080A07] shadow-[0_10px_30px_rgba(137,255,0,0.4)] dark:shadow-[0_10px_30px_rgba(198,255,0,0.4)] transition hover:shadow-[0_0_32px_rgba(137,255,0,0.65)] dark:hover:shadow-[0_0_32px_rgba(198,255,0,0.65)]"
      >
        <ArrowUp size={18} />
      </a>
    </footer>
  );
}
