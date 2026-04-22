# Evora Capital — PRD

## Original Problem Statement
User provided a reference GitHub repo (Mohamed-Y-Mohamed/consultant-repository — Next.js 16 + Tailwind v4 "Meridian" consultancy template) and asked for a full rebuild/re-branding as **Evora Capital**, a premium hospitality investment & hotel management brand. The output must preserve the exact luxury dark/editorial aesthetic (gold accents, glass navbar, Cormorant serif + DM Mono + Outfit fonts, CSS-variable theming, ghost numerals, grain overlays) with new content, a Services dropdown in the navbar, query-param driven Services page, improved responsive design, and a contact form that emails submissions to `m.y.m1995@outlook.com`.

## Tech Stack
- Next.js 16.2.3 (App Router) + React 19 + TypeScript
- Tailwind v4 (`@tailwindcss/postcss`) with custom CSS-variable theme tokens
- Resend (npm `resend` v4) for contact form email delivery via `/api/contact`
- No Python backend required (FastAPI + Mongo remain idle)

## Pages
- `/` — Landing (Hero, Welcome, WhatWeDo, ServicesPreview, WhyEvora, CtaStrip)
- `/about` — AboutHero + 5 narrative sections (Welcome, What is Evora, Hotel Management, Operational Excellence, Partnership)
- `/services` — ServicesHero + indexed list of 5 services; `?s=<id>` auto-scrolls + highlights
- `/contactus` — ContactHero + ContactForm + ContactInfo (direct lines, London office, response commitment, discretion)

## Components (reusable)
- `components/navbar/Navbar.tsx` — fixed transparent → blurred-on-scroll, Services dropdown (desktop hover/click, mobile accordion)
- `components/theme/ThemeTrigger.tsx` + `context/ThemeProvider.tsx` — dark/light toggle with localStorage persistence
- `components/Footer.tsx`
- home: Hero, Welcome, WhatWeDo, ServicesPreview, WhyEvora, CtaStrip
- about: AboutHero, AboutContent
- services: ServicesHero, ServicesList (reads `useSearchParams()`)
- contact: ContactHero, ContactForm, ContactInfo
- `lib/services.ts` — shared SERVICES array

## Design System
- Gold: `#C9A96E`; Obsidian bg dark: `#0E0C0A`; Cream light bg: `#FEFCF7`
- CSS vars: `--gold`, `--bg-page`, `--bg-nav`, `--bg-secondary`, `--bg-surface`, `--bg-card-hover`, `--text-primary/secondary/tertiary/muted`, `--border`, `--border-gold`
- Fonts: Cormorant Garamond (display/italic), DM Mono (labels, nav, buttons), Outfit (body)
- Reusable utility classes: `.display-heading`, `.font-mono`, `.section-label`, `.gold-line`, `.rule-gold`, `.btn-primary`, `.btn-outline`, `.nav-link`, `.services-dropdown(-item)`, `.service-card.active`, `.field-input/select/textarea`, `.theme-toggle(-knob)`

## Implemented Features (Jan 2026 – initial build)
- [x] Full Next.js App Router project replacing prior CRA starter
- [x] Design-system globals.css matching reference aesthetic (dark + light modes, gold accents)
- [x] Navbar with Services dropdown (desktop hover/click + mobile accordion)
- [x] Landing page with 6 sections per brief
- [x] About page with 5 dedicated narrative sections + ghost numerals
- [x] Services page with `?s=` query-param driven selection/highlight + auto-scroll
- [x] Contact page with premium hero, form, direct-lines panel, offices, commitment/discretion
- [x] Contact form wired to `/api/contact` → Resend → `m.y.m1995@outlook.com` (reply-to submitter)
- [x] Theme toggle (dark default) persisted in localStorage
- [x] Responsive (mobile accordion nav, fluid typography, stacked grids)

## Pending / Backlog
- [ ] P0: Replace placeholder `RESEND_API_KEY` in `/app/frontend/.env` with real key
- [ ] P0: Verify `m.y.m1995@outlook.com` in Resend dashboard (required for testing-mode senders)
- [ ] P1: Add a sender domain at Resend (evoracapital.com) to send from advisory@evoracapital.com
- [ ] P2: Add real hero imagery / photography once brand guidelines land
- [ ] P2: Add `noindex` meta while content is being reviewed
- [ ] P2: Seed basic analytics (Plausible / GA4)

## Environment Variables
- `RESEND_API_KEY` — required (obtain from https://resend.com → API Keys)
- `CONTACT_TO_EMAIL=m.y.m1995@outlook.com`
- `CONTACT_FROM_EMAIL=onboarding@resend.dev` (default) — swap after verifying a custom domain
