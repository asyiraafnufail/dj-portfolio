# Design Document: Light and Dark Mode (Warm Studio)

- **Date:** 2026-11-05
- **Author:** Claude (AI Assistant)
- **Status:** Draft / Pending Review

---

## 1. Intent & Context

DJ CANKZ's portfolio currently operates strictly under a dark theme (`bg-slate-950` / `bg-slate-900`). The user requested a dual-theme system supporting both Light Mode and Dark Mode across the entire site. The system must automatically detect the user's operating system/device preference (`prefers-color-scheme`), allow manual switching via a toggle button placed beside the "Book Event" CTA, and maintain exceptional performance and responsiveness on low-end mobile devices without unnecessary dependencies.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **Full Site Coverage:** Implement Light and Dark modes across all public routes (`/`, `/songs`, `/gallery`), auth (`/login`), and CMS dashboard (`/admin`).
- **Zero-Flicker Initialization:** Eliminate Flash of Unstyled Content (FOUC) on initial load by injecting an inline `<script>` in `<head>` that applies or removes the `.dark` class on `<html>` before DOM painting.
- **Auto Preference Detection:** Honor `prefers-color-scheme` on first visit; remember user manual override in `localStorage.getItem('cankz_theme')`.
- **Theme Toggle Accessibility:**
  - Desktop: Positioned directly to the left of the "Book Event" button in `Navbar.tsx`.
  - Mobile: Included in the mobile navigation drawer.
  - Subpages & Admin: Accessible in header navigation / back-bar on `/songs`, `/gallery`, `/login`, and `/admin`.
- **Warm Studio Aesthetic (Light Mode):**
  - Primary Background: Warm off-white (`bg-stone-50` / `#faf9f6`), avoiding harsh 100% pure white glare.
  - Cards & Panels: Crisp white (`bg-white`), bordered by subtle stone borders (`border-stone-200/80`) with soft shadows (`shadow-sm` / `shadow-md`).
  - Typography: High-contrast charcoal text (`text-stone-900` for headings, `text-stone-600` for descriptions), fully WCAG AA compliant.
  - Accents: Deep amber (`amber-600` / `amber-500`) to guarantee crisp legibility against bright backgrounds.
- **Dark Mode Preservation:** Exact parity with existing dark theme (`bg-slate-950`, `bg-slate-900`, `text-white`, `text-slate-300`, `amber-400`, `glass-panel`).
- **Low-End Hardware Optimization:** Zero external runtime libraries (no `next-themes`); lightweight standard DOM manipulation.

### Non-Goals
- Adding multiple arbitrary themes (e.g. cyberpunk, neon, high-contrast monochrome).
- Modifying grid structures, section sequences, or card aspect ratios locked in `prd.md`.
- Storing theme preferences in Supabase database (client-side `localStorage` is sufficient and privacy-friendly).

### Anti-Goals
- White flash / jarring brightness burst during page refresh or SSR hydration.
- Inaccessible low-contrast combinations (e.g. light amber text on white cards).
- Heavy layout thrashing or large JS bundles that degrade performance on budget smartphones.

---

## 3. Architecture & Technical Strategy

### 3.1. Zero-Flicker Script Execution
In `app/layout.tsx`, an inline script is rendered inside `<head>` prior to page content:
```js
(function() {
  try {
    const saved = localStorage.getItem('cankz_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
```

### 3.2. Styling Engine (Tailwind CSS v4 Integration)
In `app/globals.css`:
- Define semantic CSS variables on `:root` and `:root.dark`, or configure Tailwind variant `@custom-variant dark (&:where(.dark, .dark *));`.
- Ensure utility classes on components adapt via standard `dark:` modifiers (e.g., `bg-stone-50 dark:bg-slate-950`, `text-stone-900 dark:text-white`).
- Adapt `.glass-panel` to provide a subtle milky glass effect in light mode (`bg-white/80 border-stone-200/80`) and deep translucent glass in dark mode (`rgba(15, 23, 42, 0.72)`).

### 3.3. Theme Toggle Component
A unified, lightweight client component `<ThemeToggle />`:
- Uses Lucide `Sun` and `Moon` icons with an accessible `aria-label`.
- Reads active theme from document class on mount (hydrating safely with no mismatch).
- Toggles `.dark` class on `document.documentElement` and synchronizes `localStorage`.
- Dispatches a lightweight custom event (`cankz-theme-change`) or shared React state so multiple toggles on screen (e.g. desktop + mobile) remain in sync.

### 3.4. Route-by-Route Breakdown
1. **Homepage (`/`)**:
   - `Navbar`: Add toggle next to "Book Event".
   - `HeroAbout`: Adapt text, backgrounds, and skeleton loader colors.
   - `Genres`, `Experience`, `StageArchive`, `YouTubePlayer`, `EditedSongs`, `AssetsFile`, `Contact`: Update backgrounds, border colors, and card containers with `dark:` variants.
2. **Subpages (`/songs` & `/gallery`)**:
   - Add `<ThemeToggle />` in the top header beside the "Back to Home" button.
   - Adapt search inputs, track cards, photo cards, and modal dialogs.
3. **Login (`/login`)**:
   - Adapt login card, form inputs, labels, and error states.
   - Provide toggle in the corner of the login screen.
4. **Admin Dashboard (`/admin`)**:
   - Header bar: Include `<ThemeToggle />` next to Logout.
   - Tabs, tables, item cards, custom select dropdowns, modals, and file inputs support clean light mode styling.

---

## 4. Decisions Settled in Brainstorming
- **Palette**: Warm Studio / Clean Cream (`stone-50` base with amber accents).
- **Scope**: All pages (`/`, `/songs`, `/gallery`, `/login`, `/admin`).
- **Dependency Strategy**: Native implementation without `next-themes` to protect Next.js 16.4.3 lock and maximize low-end speed.

---

## 5. Builder Calls & Concrete Implementation Details
- **Tailwind v4 Configuration:** Add `@custom-variant dark (&:where(.dark, .dark *));` in `app/globals.css` so standard `dark:` utilities work with the `.dark` class on `<html>`.
- **Logo Badge:** The DJ CANKZ circular logo container in `Navbar.tsx` keeps a dark charcoal badge background (`bg-stone-900 dark:bg-slate-900 border border-amber-400/30`) to ensure the white graphic inside `aset/logodj.png` remains high-contrast in both Light and Dark modes.
- **Toggle Button Format:** Compact circular icon button (38px x 38px) with `Sun` (when dark) and `Moon` (when light) icons, matching the height and radius of the surrounding navbar elements.
- **Shared State Synchronization:** State is synced via `localStorage` and a `window.dispatchEvent(new Event('cankz-theme-change'))` so simultaneous toggles (desktop header, mobile drawer) stay instantly synchronized without page reload.
- **Admin & Subpages:** The `<ThemeToggle />` component is placed in the top right corner of `/songs`, `/gallery`, `/login`, and the `/admin` dashboard header.
