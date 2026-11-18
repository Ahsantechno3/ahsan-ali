# Developer Portfolio — Next.js + TypeScript

A premium, modern developer portfolio for Ahsan, a freelance web developer.
This is a **real Next.js codebase** (not a static HTML file): every technology
below is actually used in the source.

## Tech stack

| Technology | Used for |
| --- | --- |
| **Next.js** (App Router) | React framework, routing, metadata, fonts |
| **Tailwind CSS** v4 | Styling (dark/light themes via the `dark` class) |
| **Framer Motion** | Hero fade-in animations and scroll reveals (`components/Reveal.tsx`) |
| **GSAP** + ScrollTrigger | Advanced animations on the Process section (`components/Process.tsx`) |
| **Three.js** | Ambient 3D orbit rings, wireframe geometry & particles behind the hero laptop (`components/LaptopScene.tsx`, loaded with `next/dynamic`, `ssr: false`) |
| **Lucide React** | All icons throughout the site |
| **TypeScript** | Type safety — all source is `.ts` / `.tsx`, data is typed in `lib/data.ts` |

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build & deploy

```bash
npm run build
npm run start
```

To deploy on **Vercel**: push this folder to a Git repository, import it in
Vercel (framework preset: Next.js), and deploy — no extra configuration needed.

## Project structure

```
app/
  layout.tsx      Root layout, fonts (Space Grotesk + Inter), metadata / Open Graph
  page.tsx        Page composition (all sections)
  globals.css     Tailwind v4 setup, theme, glow/card utilities
  icon.svg        Neon "A" favicon
components/
  Header.tsx      Sticky header, nav, dark/light theme toggle, mobile menu
  Hero.tsx        Headline, CTAs, trusted-by row, floating brand badges, orbit rings
  LaptopVisual.tsx Premium CSS-3D laptop with neon </> code-editor screen
  LaptopScene.tsx Three.js ambient rings, wireframe & particles behind the laptop
  Logo.tsx        Stylised neon 'A' logo mark (header & footer)
  SectionTag.tsx  Neon-dash section label used across sections
  Benefits.tsx    Service-standards strip (no invented statistics)
  Projects.tsx    3 project cards; "Build something like this" pre-fills the contact form
  Services.tsx    6 services with Lucide icons
  About.tsx       Code-editor visual with monogram
  TechStack.tsx   The 7 technologies above, with a working category filter
  Process.tsx     Discuss → Plan → Design → Develop → Launch (GSAP ScrollTrigger)
  Testimonials.tsx Genuine-reviews-only placeholder
  Contact.tsx     Validated form with copy/download inquiry summary
  Footer.tsx      Social links, nav, back-to-top
lib/
  data.ts         All typed content data (projects, services, tech stack, process)
```

## Replace these placeholders with your real details

Search the codebase for `TODO` — the main ones:

1. **Contact email** — `components/Contact.tsx`: add your real email (and a
   `mailto:` link) in the contact column. No email is invented in this code,
   and the form has no backend — it produces a copy/download inquiry summary.
   To receive submissions directly, connect a form service or a Next.js
   Route Handler / Server Action.
2. **Social profile URLs** — `components/Footer.tsx`: the GitHub / LinkedIn /
   X / YouTube icons currently point to the platform homepages. Replace them
   with your real profile URLs, and remove any platform you don't use.
3. **Photo** — `components/About.tsx`: the About section uses a code-editor
   visual with an "A" monogram because no photo was provided. Drop your photo
   into `public/` and swap it in here.
4. **Genuine testimonials & stats** — `components/Testimonials.tsx` and
   `components/Benefits.tsx`: add only real client reviews (verbatim, with
   name/role) and real figures. Nothing on this site is invented.
5. **Project links** — `lib/data.ts` + `components/Projects.tsx`: add live
   URLs / repo links for the three projects, or relabel them as example work
   if they are not real client projects.

## Notes

- Dark theme is the default; the toggle stores the choice in `localStorage`
  and an inline script in `app/layout.tsx` applies it before first paint.
- Fonts load via `next/font/google` (Space Grotesk headings, Inter body).
