# AGENTS.md — Thiha Linn Portfolio

> This file is auto-loaded by OpenCode every session. **Read only this file first** — a full project scan should not be needed for routine tasks. Update this file when the project structure changes.

## Project Overview

Personal portfolio site for **Thiha Linn** (Mobile & Fullstack Developer, Yangon, Myanmar).
Single-page, minimalist, **light/dark theme** portfolio. Repo `ThihaLinn-13.github.io` deploys to **GitHub Pages** via GitHub Actions (static export → `./out`).

## Stack

- **Next.js 16.0.3** — App Router, `src/` directory, static export (`output: "export"` in `next.config.ts`)
- **React 19.2** + React Compiler (`reactCompiler: true`)
- **Tailwind CSS 4** (CSS-first config — `globals.css` holds all theme tokens; the legacy `tailwind.config.ts` is inert)
- **shadcn/ui tokens** (`components.json`) — semantic CSS variables (`--background`, `--foreground`, `--muted`, `--border`, `--brand`, `--chart-*`)
- **Motion** (`motion/react`, v14 — the renamed framer-motion; `framer-motion` is uninstalled)
- **anime.js** v4 — powers the scroll experience: backdrop (`scroll-backdrop.tsx` — **night sky** in dark mode with twinkling stars + `moon.svg` + `earth.svg`, **day sky** in light mode with `sun.svg` + drifting cartoon clouds, plus a **lerped/eased scroll value** in a rAF loop driving an anime timeline) **and** the opening animation (`intro.tsx` — robot mascot bounce + letter-by-letter name reveal, ~2.4s) **and** section scroll-reveals with rotation (`reveal.tsx`). Hover lifts live in `hero.tsx` / `skills.tsx`
- **Bklit UI** radar chart (`@/components/charts/*`) — skills visualization
- Fonts: **Inter** (body), **Space Grotesk** (`font-heading`, display), **JetBrains Mono** (mono labels) — wired via `--font-*` vars in `globals.css` `@theme inline`

## Commands

```bash
npm run dev      # dev server → http://localhost:3000
npm run build    # production build → out/
npm run start    # production server
npm run lint     # ESLint (0 errors expected, 1 benign <img> warning)
```

CI: **Node 20**, push to `main` → build → deploy to GitHub Pages (`.github/workflows/nextjs.yml`).

## Structure

```
src/
  app/
    layout.tsx      ← fonts, metadata, NO-FLASH theme script (reads localStorage before paint)
    page.tsx        ← server component, just composes sections
    globals.css     ← Tailwind import + shadcn light/dark tokens + --brand/--chart vars
  components/
    navbar.tsx      ← sticky nav, scroll progress bar, ThemeToggle
    intro.tsx       ← opening animation (anime.js, robot mascot + letter stagger, ~2.4s); plays on EVERY page load, skippable
    scroll-backdrop.tsx ← anime.js fixed background: scroll-driven drift + ambient loops (z-0; content above it is z-10)
    hero.tsx        ← avatar + name + typing role | summary + CTA buttons
    skills.tsx      ← Bklit radar chart + grouped skill chips
    experience.tsx  ← timeline (2 jobs)
    education.tsx   ← card: school, degree, academic projects
    certifications.tsx
    contact.tsx       ← contact details + compose form (mailto:, no backend — site is statically exported)
    footer.tsx
    theme-toggle.tsx ← light/dark switch (useSyncExternalStore, no effect setState)
    reveal.tsx       ← Motion scroll-reveal wrapper
    section-heading.tsx
    typing-text.tsx
    charts/         ← Bklit UI vendored registry code (lint-relaxed in eslint.config.mjs)
  lib/
    data.ts         ← ALL CONTENT (single source of truth, incl. DATA.intro wording)
    mail.ts         ← gmailComposeUrl() — all email actions open Gmail web (no mail app)
    utils.ts        ← cn() from shadcn
```

## Conventions

- **Content edits go in `src/lib/data.ts` only** — `DATA` object + `NAV_LINKS`. Never hardcode text in components.
- **Styling uses semantic tokens** (`bg-background`, `text-muted-foreground`, `border-border`, `text-brand`) — never `slate-*`/`blue-*` — so both themes work.
- Class-based dark mode: `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`; toggle adds `.dark` to `<html>`.
- **Theme default is DARK**; choice persisted in `localStorage` under key `theme` (no stored value → dark).
- Motion for entrances/scroll reveals; anime.js only for transform micro-interactions (must not hide content on JS failure).
- `react-hooks/set-state-in-effect` and `react-hooks/refs` are enforced — avoid sync `setState` in effects (use `useSyncExternalStore` or async callbacks).
