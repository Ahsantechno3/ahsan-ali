"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Copy, Download, Send } from "lucide-react";
import { projectTypes } from "@/lib/data";
import Reveal from "./Reveal";

interface Inquiry {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

const empty: Inquiry = { name: "", email: "", projectType: projectTypes[0], message: "" };

export default function Contact() {
  const [form, setForm] = useState<Inquiry>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const [submitted, setSubmitted] = useState<Inquiry | null>(null);
  const [copied, setCopied] = useState(false);

  // Projects section dispatches this when "Build something like this" is clicked.
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (projectTypes.includes(detail)) {
        setForm((prev) => ({ ...prev, projectType: detail }));
        setSubmitted(null);
      }
    };
    window.addEventListener("prefill-project", handler);
    return () => window.removeEventListener("prefill-project", handler);
  }, []);

  const summary = (data: Inquiry) =>
    `Project Inquiry\n----------------\nName: ${data.name}\nEmail: ${data.email}\nProject type: ${data.projectType}\n\nMessage:\n${data.message}`;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<keyof Inquiry, string>> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      next.message = "Please add a little detail about your project (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(form);
  };

  const download = () => {
    if (!submitted) return;
    const blob = new Blob([summary(submitted)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project-inquiry.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    if (!submitted) return;
    try {
      await navigator.clipboard.writeText(summary(submitted));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const inputClass =
    "w-full rounded-[10px] border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C6FF00] dark:border-white/10 dark:bg-[#121610]";

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <Reveal>
        {/* CTA banner — reference treatment: rounded 24px, green-glow
            gradient border, heading left, pill button + paper plane right */}
        <div className="relative overflow-hidden rounded-[24px] border border-[#89FF00]/35 dark:border-[#C6FF00]/35 bg-gradient-to-br from-[#1a2408] via-[#0d1207] to-[#070905] p-8 text-[#F5F7F2] shadow-[0_25px_60px_-25px_rgba(137,255,0,0.35)] dark:shadow-[0_25px_60px_-25px_rgba(198,255,0,0.35)] sm:p-11">
          <div className="glow-pulse pointer-events-none absolute -bottom-16 left-[12%] h-36 w-[55%] rounded-[100%] bg-[#89FF00]/25 dark:bg-[#C6FF00]/25 blur-[50px]" />
          <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[#89FF00]/12 dark:bg-[#C6FF00]/12 blur-[60px]" />
          {/* border par ghoomti hui light — pehle halo, phir sharp beam */}
          <div className="cta-beam cta-beam-glow" aria-hidden="true" />
          <div className="cta-beam" aria-hidden="true" />
          <div className="relative flex flex-wrap items-center gap-8">
            <div className="min-w-[260px] flex-1">
              <h2 className="max-w-xl text-[32px] font-bold leading-[1.12] tracking-tight sm:text-[38px]">
                Your Next Website Could Be Your Best{" "}
                <span className="text-[#89FF00] dark:text-[#C6FF00]">Business Move.</span>
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#A5AAA0]">
                Have a project in mind? Let&apos;s discuss how we can build
                something amazing together.
              </p>
            </div>
            <a
              href="#contact-form"
              className="flex items-center gap-2 rounded-full bg-[#89FF00] dark:bg-[#C6FF00] px-6 py-3.5 text-sm font-bold text-[#080A07] transition hover:shadow-[0_0_38px_rgba(137,255,0,0.65)] dark:hover:shadow-[0_0_38px_rgba(198,255,0,0.65)]"
            >
              Let&apos;s Talk About Your Project <Send size={15} />
            </a>
            {/* neon origami paper plane — neeche zameen wala shadow + neon pool */}
            <div className="relative hidden shrink-0 md:block">
              <div
                className="pointer-events-none absolute -bottom-4 left-1/2 h-6 w-[130%] -translate-x-1/2 rounded-[100%] bg-[#89FF00]/25 blur-[16px] dark:bg-[#C6FF00]/25"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-2 left-1/2 h-3.5 w-[95%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-[7px]"
                aria-hidden="true"
              />
              <svg
                viewBox="0 0 120 100"
                className="relative w-[104px] drop-shadow-[0_0_10px_rgba(137,255,0,0.55)] dark:drop-shadow-[0_0_10px_rgba(198,255,0,0.55)]"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 52 L114 6 L74 94 L58 64 Z"
                  className="[stroke:#89FF00] dark:[stroke:#C6FF00]"
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                />
                <path d="M58 64 L114 6" className="[stroke:#89FF00] dark:[stroke:#C6FF00]" strokeWidth="2.2" />
                <path
                  d="M58 64 L46 88 L74 94"
                  className="[stroke:#89FF00] dark:[stroke:#C6FF00]"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </Reveal>

      <div id="contact-form" className="mt-10 grid scroll-mt-28 gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-[#11150D]/70 dark:text-[#A5AAA0]">
            <p>
              Tell me about your project using the form — you&apos;ll get a clean
              summary you can copy or download and send however you prefer.
            </p>
            <p>Every project starts with a free, friendly conversation about your goals.</p>
            <p>Working with clients worldwide, fully remote.</p>
            {/* TODO: add your real contact email here once ready, e.g.
                <a href="mailto:you@example.com">you@example.com</a> */}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div className="card-surface p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#89FF00]/15 dark:bg-[#C6FF00]/15 text-[#458000] dark:text-[#C6FF00]">
                <CheckCircle2 size={22} />
              </span>
              <h3 className="mt-4 text-2xl font-semibold">Your inquiry is ready</h3>
              <pre className="mt-4 whitespace-pre-wrap rounded-[10px] bg-black/5 p-4 text-sm dark:bg-white/5">
                {summary(submitted)}
              </pre>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copy}
                  className="flex items-center gap-2 rounded-full bg-[#89FF00] dark:bg-[#C6FF00] px-5 py-2.5 text-sm font-semibold text-[#080A07]"
                >
                  <Copy size={15} /> {copied ? "Copied!" : "Copy inquiry"}
                </button>
                <button
                  type="button"
                  onClick={download}
                  className="flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold dark:border-white/15"
                >
                  <Download size={15} /> Download .txt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(null);
                    setForm(empty);
                  }}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold underline"
                >
                  Write another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="card-surface space-y-5 p-8">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                  Your name
                </label>
                <input
                  id="name"
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Smith"
                />
                {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@company.com"
                />
                {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="projectType" className="mb-2 block text-sm font-semibold">
                  Project type
                </label>
                <select
                  id="projectType"
                  className={inputClass}
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                >
                  {projectTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                  About your project
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={inputClass}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What are you building, and what should it do for your business?"
                />
                {errors.message && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-[#89FF00] dark:bg-[#C6FF00] px-6 py-3 text-sm font-semibold text-[#080A07] transition hover:shadow-[0_0_32px_rgba(137,255,0,0.55)] dark:hover:shadow-[0_0_32px_rgba(198,255,0,0.55)]"
              >
                Let&apos;s Talk About Your Project <Send size={15} />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
