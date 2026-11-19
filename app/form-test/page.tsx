"use client";

import { useEffect, useState } from "react";
import { web3formsAccessKey } from "@/lib/data";

/**
 * WAQTI diagnostic page — form fail honay ki asal wajah pakarne ke liye.
 * Modal wala bilkul waisa hi fetch yahan chalta hai aur natija screen
 * par likh kar dikhata hai. Masla hal hotay hi ye page hata diya jayega.
 */
export default function FormTestPage() {
  const [lines, setLines] = useState<string[]>(["Running tests..."]);

  useEffect(() => {
    const out: string[] = [];
    const log = (s: string) => {
      out.push(s);
      setLines([...out]);
    };
    const run = async () => {
      log("UA: " + navigator.userAgent);
      try {
        const self = await fetch("/", { method: "GET" });
        log("PAGE CSP: " + (self.headers.get("content-security-policy") ?? "(none)"));
      } catch (e) {
        log("CSP check failed: " + String(e));
      }

      const fullPayload = {
        access_key: web3formsAccessKey,
        subject: "New Project Inquiry — Business Website",
        from_name: "Ahsan Ali Portfolio",
        name: "Diag Page Test",
        email: "diagpage@example.com",
        replyto: "diagpage@example.com",
        message: "Project type: Business Website\n\nDiagnostic page test.",
        botcheck: "",
      };

      const attempt = async (label: string, init: RequestInit) => {
        try {
          const res = await fetch("https://api.web3forms.com/submit", init);
          const text = await res.text();
          log(`${label}: STATUS ${res.status} BODY ${text.slice(0, 300)}`);
        } catch (e) {
          const err = e as Error;
          log(`${label}: FETCH ERROR ${err.name}: ${err.message}`);
        }
      };

      // A — modal wala exact tareeqa (JSON, saare fields)
      await attempt("A exact-modal-json", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fullPayload),
      });

      // B — sirf bunyadi fields
      await attempt("B minimal-json", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          name: "Diag Minimal",
          email: "diagmin@example.com",
          message: "minimal diagnostic",
        }),
      });

      // C — form-encoded (simple request, koi preflight nahi)
      await attempt("C form-encoded", {
        method: "POST",
        body: new URLSearchParams(
          Object.entries(fullPayload).map(([k, v]) => [k, String(v)])
        ),
      });

      log("DONE");
    };
    run();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "monospace", background: "#0B0E09", color: "#F5F7F2", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 18, marginBottom: 16 }}>Form diagnostic</h1>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 13, lineHeight: 1.6 }}>
        {lines.join("\n")}
      </pre>
    </main>
  );
}
