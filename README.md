# Thiha Linn — Portfolio

Personal portfolio site of Thiha Linn, Mobile & Fullstack Developer (Yangon, Myanmar).
Minimalist single-page portfolio with light/dark theme, deployed to GitHub Pages.

## Stack

- **Next.js 16** (App Router, static export) + **React 19**
- **Tailwind CSS 4** + shadcn/ui design tokens
- **Motion** (motion.dev) — animations
- **anime.js** — micro-interactions
- **Bklit UI** — skills radar chart

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `npm run dev`    | Start development server         |
| `npm run build`  | Production build → `out/`        |
| `npm run start`  | Start production server          |
| `npm run lint`   | Run ESLint                       |

## Deployment

Deployed to **GitHub Pages** via `.github/workflows/nextjs.yml`:
push to `main` → `next build` (static export to `out/`) → deploy.

## Editing Content

All site content lives in **`src/lib/data.ts`** — personal info, skills, experience,
education, certifications. Edit that file only; components read from it.

## Theme

Light is the default. The toggle in the navbar switches to dark and remembers
your choice (stored in `localStorage`). A tiny inline script applies the stored
theme before first paint, so there is no flash of the wrong theme.

## Project Structure

```
src/lib/data.ts        ← all content
src/components/        ← navbar, hero, skills, experience, education, certifications, footer
src/app/globals.css    ← Tailwind + light/dark theme tokens
public/assets/         ← images (avatar)
```
