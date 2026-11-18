import { ArrowUp, Github, Heart, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import { navLinks } from "@/lib/data";
import Logo from "./Logo";

// TODO: replace these platform homepages with your real profile URLs.
const socials = [
  { label: "GitHub", href: "https://github.com", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com", Icon: Linkedin },
  { label: "Twitter / X", href: "https://x.com", Icon: Twitter },
  { label: "YouTube", href: "https://www.youtube.com", Icon: Youtube },
  { label: "Email", href: "#contact", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-black/[0.07] dark:border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 lg:px-8">
        {/* top row: logo + tagline | socials | nav */}
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-8">
          <div className="flex items-center gap-3.5">
            <span className="text-[#11150D] dark:text-[#F5F7F2]">
              <Logo size={44} />
            </span>
            <p className="text-[13px] font-medium leading-snug text-[#11150D]/60 dark:text-[#A5AAA0]">
              Building Better
              <br />
              Digital Experiences.
            </p>
          </div>

          <div className="flex gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-[#C6FF00] hover:text-[#5c8400] dark:border-white/12 dark:hover:text-[#C6FF00]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <nav className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13.5px] font-medium text-[#11150D]/70 transition hover:text-[#11150D] dark:text-[#A5AAA0] dark:hover:text-[#C6FF00]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* bottom copyright bar */}
        <p className="mt-11 flex flex-wrap items-center justify-center gap-1.5 border-t border-black/[0.07] pt-6 text-center text-[12.5px] text-[#11150D]/50 dark:border-white/[0.07] dark:text-[#A5AAA0]">
          © {new Date().getFullYear()}. All rights reserved. Designed with
          <Heart size={12} className="text-red-500" fill="#ef4444" />
          for a better web.
        </p>
      </div>

      {/* back-to-top, fixed bottom-right like the reference */}
      <a
        href="#home"
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#C6FF00] text-[#080A07] shadow-[0_10px_30px_rgba(198,255,0,0.4)] transition hover:shadow-[0_0_32px_rgba(198,255,0,0.65)]"
      >
        <ArrowUp size={18} />
      </a>
    </footer>
  );
}
