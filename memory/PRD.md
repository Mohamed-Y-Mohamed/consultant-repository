# Evora Capital — PRD

## Original Problem Statement
User provided a reference GitHub repo (Mohamed-Y-Mohamed/consultant-repository — Next.js 16 + Tailwind v4 "Meridian" consultancy template) and asked for a full rebuild/re-branding as **Evora Capital**, a premium hospitality investment & hotel management brand. The output must preserve the exact luxury dark/editorial aesthetic (gold accents, glass navbar, Cormorant serif + DM Mono + Outfit fonts, CSS-variable theming, ghost numerals, grain overlays) with new content, a Services dropdown in the navbar, query-param driven Services page, improved responsive design, and a contact form that emails submissions to `m.y.m1995@outlook.com`. Later asked to remove the Python backend entirely and keep the project as a single Next.js application.

## Tech Stack
- Next.js 16.2.3 (App Router) + React 19 + TypeScript — runs in production mode (`next start`) for reliable hydration through the preview ingress
- Tailwind v4 (`@tailwindcss/postcss`) with custom CSS-variable theme tokens
- Resend (npm `resend`) for contact form email delivery via the Next.js route handler `/send-enquiry`
- **No Python / FastAPI backend** — MongoDB also unused

## Project Layout (flat)
```
/app
├── app/                    Next.js App Router
│   ├── layout.tsx          RootLayout + pre-hydration theme script
│   ├── page.tsx            /                (Landing)
│   ├── about/page.tsx      /about
│   ├── services/page.tsx   /services (reads ?s=<id>)
│   ├── contactus/page.tsx  /contactus
│   ├── send-enquiry/route.ts   POST handler — Resend → m.y.m1995@outlook.com
│   ├── components/         navbar, home, about, services, contact, theme, Footer
│   ├── context/ThemeProvider.tsx
│   ├── lib/services.ts     Shared SERVICES array (ids 1..5)
│   └── globals.css         Design system + Tailwind v4
├── next.config.ts          allowedDevOrigins for preview hostnames
├── tsconfig.json
├── postcss.config.mjs
├── package.json            Next.js + Resend + Tailwind
├── .env                    RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
└── frontend/package.json   Supervisor compatibility stub that delegates `yarn start` to /app
```

### Why `/app/frontend/package.json` still exists
The platform's `/etc/supervisor/conf.d/supervisord.conf` is marked read-only and hardcodes `directory=/app/frontend` + `command=yarn start`. The stub has a single `start` script (`cd .. && yarn start`) that delegates to the real Next.js project at `/app`, so the codebase is effectively flat while supervisor keeps working.

### Why the contact route is at `/send-enquiry` (not `/api/contact`)
The platform's K8s ingress hardcodes `/api/*` → port 8001 (the former FastAPI backend). Since we removed the backend entirely, any `/api/*` path now returns 502. Next.js route handlers live on port 3000, so using a non-`/api` path (`/send-enquiry`) lets the ingress forward the request to Next.js correctly.

## Pages
- `/` — Landing (Hero, Welcome, WhatWeDo, ServicesPreview, WhyEvora, CtaStrip)
- `/about` — AboutHero + 5 narrative sections (Welcome, What is Evora, Hotel Management, Operational Excellence, Partnership)
- `/services` — ServicesHero + indexed list of 5 services; `?s=<id>` auto-scrolls + highlights
- `/contactus` — ContactHero + ContactForm + ContactInfo (direct lines, London office, response commitment, discretion)

## Design System
- Gold: `#C9A96E`; Obsidian bg dark: `#0E0C0A`; Cream light bg: `#FEFCF7`
- CSS vars: `--gold`, `--bg-page`, `--bg-nav`, `--bg-secondary`, `--bg-surface`, `--bg-card-hover`, `--text-primary/secondary/tertiary/muted`, `--border`, `--border-gold`
- Fonts: Cormorant Garamond (display/italic), DM Mono (labels, nav, buttons), Outfit (body)
- Reusable utility classes: `.display-heading`, `.font-mono`, `.section-label`, `.gold-line`, `.rule-gold`, `.btn-primary`, `.btn-outline`, `.nav-link`, `.services-dropdown(-item)`, `.service-card.active`, `.field-input/select/textarea`, `.theme-toggle(-knob)`

## Implemented Features
- [x] Full Next.js App Router project (no backend, no MongoDB)
- [x] Design-system globals.css matching reference aesthetic (dark + light modes, gold accents)
- [x] Navbar with Services dropdown (desktop hover/click + mobile accordion); hamburger appears below 768 px
- [x] Landing page with 6 sections per brief
- [x] About page with 5 dedicated narrative sections + ghost numerals
- [x] Services page with `?s=` query-param driven selection/highlight + auto-scroll
- [x] Contact page with premium hero, form, direct-lines panel, offices, commitment/discretion
- [x] Contact form wired to Next.js route `/send-enquiry` → Resend → `m.y.m1995@outlook.com` (reply-to submitter)
- [x] Theme toggle (dark default) persisted in localStorage with pre-hydration inline script (no FOUC)
- [x] Responsive (mobile accordion nav, fluid typography, stacked grids, overflow-x hidden)
- [x] Services preview grid is symmetrical at tablet/desktop (6 tiles — 5 services + decorative "Explore All")
- [x] Production Next.js build used by supervisor for reliable hydration through the ingress
- [x] Backend folder removed; MongoDB unused; supervisor backend program STOPPED

## Pending / Backlog
- [ ] P0: Replace `RESEND_API_KEY=re_placeholder_replace_me` in `/app/.env` with a real Resend key
- [ ] P0: Verify `m.y.m1995@outlook.com` in Resend dashboard (required while using the default `onboarding@resend.dev` sender)
- [ ] P1: Verify a custom sender domain at Resend (`evoracapital.com`) and set `CONTACT_FROM_EMAIL=advisory@evoracapital.com`
- [ ] P2: Hero imagery / brand photography
- [ ] P2: Analytics (Plausible / GA4)
- [ ] P2: Auto-reply email to submitters

## Environment Variables — `/app/.env`
- `RESEND_API_KEY` — required (https://resend.com → API Keys)
- `CONTACT_TO_EMAIL=m.y.m1995@outlook.com`
- `CONTACT_FROM_EMAIL=onboarding@resend.dev` (default; swap after verifying custom domain)
