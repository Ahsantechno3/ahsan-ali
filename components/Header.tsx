"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import Logo from "./Logo";
import { openContactModal } from "./ContactModal";

export default function Header() {
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Scroll-spy: jo section is waqt view mein hai, nav mein wahi active.
  // Aakhri section jiska top header ke neeche wali line se upar guzar
  // gaya ho — beech wale bina-id sections (skills/process) par pichla
  // nav section hi active rehta hai.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href);
    // Sections ko page ki asal (DOM) tartib mein lo — nav ki tartib
    // page ki tartib se alag hai, warna galat link active hoga.
    const sections = Array.from(document.querySelectorAll("section[id]")).filter(
      (el) => ids.includes(`#${el.id}`)
    );
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.scrollY + 140;
      let current = ids[0];
      for (const el of sections) {
        if (el.getBoundingClientRect().top + window.scrollY <= line) {
          current = `#${el.id}`;
        }
      }
      // Page ke bilkul aakhir mein aakhri link hi active
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = `#${sections[sections.length - 1].id}`;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_36px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.07] dark:bg-[#080A07]/50 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_36px_rgba(0,0,0,0.35)]">
      {/* glassy sheen — upar halki si roshni wali parat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-white/10 to-transparent dark:from-white/[0.07] dark:via-white/[0.02] dark:to-transparent"
      />
      {/* neeche kinare par halki neon chamak */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#89FF00]/25 to-transparent dark:via-[#C6FF00]/25"
      />
      <div className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
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
              onClick={() => setActive(link.href)}
              aria-current={active === link.href ? "true" : undefined}
              className={`relative text-sm font-medium transition ${
                active === link.href
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
          <button
            type="button"
            onClick={() => openContactModal()}
            className="hidden items-center gap-2 rounded-full bg-[#89FF00] dark:bg-[#C6FF00] px-5 py-2.5 text-sm font-semibold text-[#080A07] transition hover:shadow-[0_0_28px_rgba(137,255,0,0.5)] dark:hover:shadow-[0_0_28px_rgba(198,255,0,0.5)] sm:flex"
          >
            Let&apos;s Talk <ArrowRight size={16} />
          </button>
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
        <nav className="relative border-t border-black/5 px-5 py-4 dark:border-white/5 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActive(link.href);
                  setOpen(false);
                }}
                aria-current={active === link.href ? "true" : undefined}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 ${
                  active === link.href
                    ? "font-semibold text-[#458000] dark:text-[#C6FF00]"
                    : ""
                }`}
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
