"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Copy, Download, X } from "lucide-react";
import { projectTypes } from "@/lib/data";

interface Inquiry {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

const empty: Inquiry = { name: "", email: "", projectType: "", message: "" };

/**
 * Kahin se bhi (Hero, Header, CTA, project cards) ye call karo —
 * aik hi reusable modal khul jata hai. projectType diya jaye to
 * wo type pehle se select ho jati hai.
 */
export function openContactModal(projectType?: string) {
  window.dispatchEvent(
    new CustomEvent<string>("open-contact-modal", { detail: projectType ?? "" })
  );
}

const inputClass =
  "w-full rounded-[12px] border border-white/[0.12] bg-white/[0.03] px-4 py-[13px] text-[15px] text-[#F5F7F2] outline-none transition placeholder:text-white/35 focus:border-[#89FF00] focus:shadow-[0_0_0_3px_rgba(137,255,0,0.15)] dark:focus:border-[#C6FF00] dark:focus:shadow-[0_0_0_3px_rgba(198,255,0,0.15)]";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Inquiry>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const [submitted, setSubmitted] = useState<Inquiry | null>(null);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Kisi bhi enquiry button se khulne wala listener
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail && projectTypes.includes(detail)) {
        setForm((prev) => ({ ...prev, projectType: detail }));
      }
      setSubmitted(null);
      setErrors({});
      setOpen(true);
    };
    window.addEventListener("open-contact-modal", handler);
    return () => window.removeEventListener("open-contact-modal", handler);
  }, []);

  const close = () => setOpen(false);

  // Khulne par: body scroll lock, pehle field par focus, Esc band kare,
  // Tab modal ke andar hi ghume. Band hone par focus wapas.
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      lastFocused.current?.focus?.();
    };
  }, [open ]);

  const summary = (data: Inquiry) =>
    `Project Inquiry\n----------------\nName: ${data.name}\nEmail: ${data.email}\nProject type: ${data.projectType}\n\nMessage:\n${data.message}`;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<keyof Inquiry, string>> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.projectType) next.projectType = "Please select a project type.";
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

  if (!open) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        style={{ colorScheme: "dark" }}
        className="modal-panel modal-scroll relative max-h-[90dvh] w-full max-w-[660px] overflow-y-auto rounded-[20px] border border-white/10 bg-[#0B0E09] p-7 text-[#F5F7F2] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)] sm:p-9"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] transition hover:bg-white/[0.12]"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#89FF00]/15 text-[#89FF00] dark:bg-[#C6FF00]/15 dark:text-[#C6FF00]">
              <CheckCircle2 size={22} />
            </span>
            <h3 className="mt-4 font-heading text-2xl font-semibold">
              Your inquiry is ready
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#A5AAA0]">
              Copy or download this summary and send it over — I&apos;ll get
              back to you as soon as possible.
            </p>
            <pre className="mt-4 whitespace-pre-wrap rounded-[12px] bg-white/[0.04] p-4 text-sm leading-relaxed">
              {summary(submitted)}
            </pre>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copy}
                className="flex items-center gap-2 rounded-full bg-[#89FF00] px-5 py-2.5 text-sm font-semibold text-[#080A07] dark:bg-[#C6FF00]"
              >
                <Copy size={15} /> {copied ? "Copied!" : "Copy inquiry"}
              </button>
              <button
                type="button"
                onClick={download}
                className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold"
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
          <>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#89FF00] dark:text-[#C6FF00]">
              Start a Project
            </p>
            <h3
              id="contact-modal-title"
              className="mt-2.5 font-heading text-[26px] font-bold leading-tight"
            >
              Let&apos;s Build Something Great.
            </h3>
            <p className="mt-2 text-[15px] text-[#A5AAA0]">
              Tell me about your project and let&apos;s get started.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
              <div>
                <label htmlFor="modal-name" className="mb-2 block text-[15px] font-semibold">
                  Your Name
                </label>
                <input
                  id="modal-name"
                  ref={nameRef}
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="mt-1.5 text-sm text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="modal-email" className="mb-2 block text-[15px] font-semibold">
                  Email Address
                </label>
                <input
                  id="modal-email"
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="modal-type" className="mb-2 block text-[15px] font-semibold">
                  Project Type
                </label>
                <select
                  id="modal-type"
                  className={inputClass}
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                >
                  <option value="" disabled>
                    Select project type
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="mt-1.5 text-sm text-red-400">{errors.projectType}</p>
                )}
              </div>
              <div>
                <label htmlFor="modal-message" className="mb-2 block text-[15px] font-semibold">
                  About Your Project
                </label>
                <textarea
                  id="modal-message"
                  rows={4}
                  className={inputClass}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your idea..."
                />
                {errors.message && (
                  <p className="mt-1.5 text-sm text-red-400">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#89FF00] py-4 text-[15px] font-bold text-[#080A07] transition hover:shadow-[0_0_36px_rgba(137,255,0,0.5)] dark:bg-[#C6FF00] dark:hover:shadow-[0_0_36px_rgba(198,255,0,0.5)]"
              >
                Let&apos;s Talk About Your Project <ArrowUpRight size={17} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
