"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import Logo from "./Logo";

export default function Header() {
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#F7F9F4]/85 backdrop-blur dark:border-white/5 dark:bg-[#080A07]/85">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          href="#home"
          className="flex items-center gap-2 text-[#11150D] dark:text-[#F5F7F2]"
          aria-label="Home"
        >
          <Logo size={40} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition ${
                link.label === "Home"
                  ? "font-semibold text-[#11150D] after:absolute after:-bottom-[9px] after:left-0 after:h-[2.5px] after:w-full after:rounded-full after:bg-[#89FF00] dark:after:bg-[#C6FF00] after:shadow-[0_0_8px_rgba(137,255,0,0.8)] dark:after:shadow-[0_0_8px_rgba(198,255,0,0.8)] dark:text-[#F5F7F2]"
                  : "text-[#11150D]/75 hover:text-[#11150D] dark:text-[#A5AAA0] dark:hover:text-[#C6FF00]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle colour theme"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:border-[#89FF00] dark:hover:border-[#C6FF00] dark:border-white/15"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-[#89FF00] dark:bg-[#C6FF00] px-5 py-2.5 text-sm font-semibold text-[#080A07] transition hover:shadow-[0_0_28px_rgba(137,255,0,0.5)] dark:hover:shadow-[0_0_28px_rgba(198,255,0,0.5)] sm:flex"
          >
            Let&apos;s Talk <ArrowRight size={16} />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-black/5 px-5 py-4 dark:border-white/5 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
