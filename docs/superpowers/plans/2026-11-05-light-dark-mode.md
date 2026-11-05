# Light and Dark Mode (Warm Studio) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a high-performance, low-end friendly Light Mode and Dark Mode system across all pages of DJ CANKZ portfolio, featuring automatic device preference detection, zero-flicker hydration, and a theme toggle placed beside "Book Event".

**Architecture:** Client-side theme detection via an inline `<head>` script that toggles the `.dark` class on `<html>` before first paint, backed by Tailwind CSS v4 custom variants (`@custom-variant dark`), semantic CSS tokens, and a decoupled React `<ThemeToggle />` component synchronized via standard browser `localStorage` and custom window events.

**Tech Stack:** Next.js 16.4.3 (App Router), React 19, Tailwind CSS v4, `lucide-react`.

**Spec:** `docs/superpowers/specs/2026-11-05-light-dark-mode-design.md`

## Global Constraints
- Next.js and `eslint-config-next` locked at exact `16.4.3` (no caret/tilde).
- `devIndicators: false` and `nextjs-portal` override in CSS must be preserved.
- No new external npm dependencies (specifically no `next-themes` or heavyweight runtime CSS-in-JS).
- Public language locked to 100% English on `/`, `/songs`, and `/gallery`.
- Universal 2-column grid (`grid-cols-2`, `max-w-4xl mx-auto`, `gap-3 sm:gap-5`, `rounded-2xl`) must remain strictly intact across all card sections.
- Brand name locked to `CANKZ` / `DJ CANKZ`, username `rafacankz`.
- Do NOT edit or lock `prd.md` until implementation is finished, verified, and explicitly approved by the user.

## Review Focus
1. **Hydration Mismatch on `<html>`:** Next.js warning when `.dark` class is attached before React loads → Resolved with `suppressHydrationWarning` on `<html>`.
2. **Flash of Wrong Theme (FOUC) on Cold Load:** Blank white screen flashing before dark mode applies → Tested with synchronous inline `<script>` executing in `<head>`.
3. **Contrast Ratio on Light Backgrounds:** Amber text or buttons becoming unreadable against white/cream → Verified with `amber-600`/`amber-500` and dark slate text on light backgrounds.
4. **Modal & Backdrop Blur Performance on Low-End Hardware:** Over-blurring causing dropped frames → Tested with lightweight backdrops (`bg-slate-950/80` dark, `bg-stone-900/40` light).
5. **Cross-Tab & Multi-Toggle Desynchronization:** Desktop and mobile toggles showing out-of-sync icons → Solved with a lightweight `cankz-theme-change` window event listener.

---

### Task 1: Foundation Setup, Zero-Flicker Script & ThemeToggle Component

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Create: `tests/theme-detection.test.mjs`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `localStorage`, `window.matchMedia`
- Produces: `<ThemeToggle className?: string />` component, `.dark` CSS variant support in Tailwind v4

- [ ] **Step 1: Write the failing unit test for theme resolution logic**

```javascript
// tests/theme-detection.test.mjs
import assert from 'node:assert/strict';
import test from 'node:test';

function resolveTheme(storedTheme, systemPrefersDark) {
  if (storedTheme === 'dark') return 'dark';
  if (storedTheme === 'light') return 'light';
  return systemPrefersDark ? 'dark' : 'light';
}

test('resolveTheme honors stored preference over system preference', () => {
  assert.equal(resolveTheme('light', true), 'light');
  assert.equal(resolveTheme('dark', false), 'dark');
});

test('resolveTheme falls back to system preference when no stored value', () => {
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme(null, false), 'light');
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `node --test tests/theme-detection.test.mjs`
Expected: PASS 2/2 tests

- [ ] **Step 3: Update `app/globals.css` with Tailwind v4 dark variant and theme tokens**

In `app/globals.css`:
- Add `@custom-variant dark (&:where(.dark, .dark *));` directly after `@import "tailwindcss";`
- Update `:root` to have `--background: #faf9f6; --foreground: #1c1917;` (stone-50 and stone-900)
- Add `:root.dark { --background: #020617; --foreground: #f8fafc; }`
- Update `.glass-panel` to adapt between light (`background: rgba(255, 255, 255, 0.85); border: 1px solid rgba(229, 231, 235, 0.8); box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);`) and `.dark .glass-panel` (`background: rgba(15, 23, 42, 0.72); border: 1px solid rgba(255, 255, 255, 0.08);`)

- [ ] **Step 4: Update `app/layout.tsx` with zero-flicker script and hydration suppression**

In `app/layout.tsx`:
- Add `suppressHydrationWarning` to `<html lang="en" ...>`
- Inside `<head>`, insert inline script:
```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `(function(){try{var s=localStorage.getItem('cankz_theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&p)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
  }}
/>
```

- [ ] **Step 5: Implement `src/components/ThemeToggle.tsx`**

Create `src/components/ThemeToggle.tsx` with `'use client'`:
- State `isDark` initialized via reading `document.documentElement.classList.contains('dark')` in `useEffect`
- Render button with `Sun` (when dark) and `Moon` (when light) from `lucide-react`
- On click: toggles `.dark` on `document.documentElement`, saves `'dark'` or `'light'` to `localStorage.setItem('cankz_theme', ...)`, and dispatches `new Event('cankz-theme-change')`
- Listens to `cankz-theme-change` and updates local state

---

### Task 2: Navbar & Hero Section Integration

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/HeroAbout.tsx`

**Interfaces:**
- Consumes: `<ThemeToggle />` from `src/components/ThemeToggle`
- Produces: Updated Navbar with theme switch button beside "Book Event" and responsive Hero section

- [ ] **Step 1: Update `src/components/Navbar.tsx`**

- Import `ThemeToggle` from `./ThemeToggle`
- On desktop navigation (line ~98): place `<ThemeToggle />` immediately preceding `<a href="#contact">... Book Event</a>` inside a flex container with `items-center gap-3`
- On mobile drawer (line ~131): add `<ThemeToggle />` beside the mobile "Book Event" button
- Adapt navbar styles:
  - Scrolled state: `border-stone-200/80 bg-stone-50/85 dark:border-white/10 dark:bg-slate-950/85`
  - Text colors: `text-stone-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-200`
  - Brand text: `text-stone-900 dark:text-white`
  - Mobile menu wrapper: `border-stone-200/80 bg-stone-50/95 dark:border-white/10 dark:bg-slate-950/95`

- [ ] **Step 2: Update `src/components/HeroAbout.tsx`**

- Section background: `bg-stone-50 dark:bg-slate-950`
- Photo card frame: `border-stone-200 bg-white dark:border-white/10 dark:bg-slate-900`
- Skeleton loader: `bg-stone-200/80 dark:bg-slate-950/90`
- Gradient overlays: `from-stone-50 via-stone-50/10 to-transparent dark:from-slate-950 dark:via-slate-950/10`
- Tag badge: `border-amber-500/30 bg-amber-50 text-amber-700 dark:border-amber-400/25 dark:bg-slate-900/80 dark:text-amber-200`
- Title & Location: `text-stone-900 dark:text-white`, `text-stone-600 dark:text-slate-300`
- Description text: `text-stone-600 dark:text-slate-300`
- Contact button (secondary): `border-stone-300 bg-stone-100/80 text-stone-900 hover:bg-stone-200 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800`

---

### Task 3: Homepage Sections Adaptation (Genres, Experience, StagePhoto, YouTubePlayer)

**Files:**
- Modify: `src/components/Genres.tsx`
- Modify: `src/components/Experience.tsx`
- Modify: `src/components/StagePhoto.tsx`
- Modify: `src/components/YouTubePlayer.tsx`

**Interfaces:**
- Consumes: Tailwind v4 `dark:` classes
- Produces: Dual-theme responsive cards preserving 2-column grid (`grid-cols-2`, `gap-3 sm:gap-5`, `rounded-2xl`)

- [ ] **Step 1: Update `src/components/Genres.tsx`**

- Section wrapper: `bg-stone-50 dark:bg-slate-950`
- Badge: `border-amber-500/30 bg-amber-50 text-amber-700 dark:border-amber-400/25 dark:bg-slate-900/80 dark:text-amber-200`
- Headers: `text-stone-900 dark:text-white`, `text-stone-600 dark:text-slate-400`
- Genre card box (`rounded-2xl`): `bg-white border-stone-200 shadow-sm dark:bg-slate-900/60 dark:border-white/5`
- Icon container (`rounded-xl`): `bg-stone-100 text-stone-800 dark:bg-white/5 dark:text-slate-200`
- Genre label: `text-stone-800 dark:text-slate-200`

- [ ] **Step 2: Update `src/components/Experience.tsx`**

- Section wrapper: `bg-stone-50 dark:bg-slate-950`
- Venue cards (`rounded-2xl`): `bg-white border-stone-200 shadow-sm dark:bg-slate-900/60 dark:border-white/5`
- Venue name & category: `text-stone-900 dark:text-white`, `text-stone-600 dark:text-slate-400`
- City badge: `text-amber-700 dark:text-amber-300`

- [ ] **Step 3: Update `src/components/StagePhoto.tsx`**

- Section wrapper: `bg-stone-50 dark:bg-slate-950`
- Photo card border: `border-stone-200 dark:border-white/10`
- Lightbox Modal: `bg-stone-900/60 backdrop-blur-md dark:bg-slate-950/90`
- Action button "View All Photos": remains amber solid (`bg-amber-400 text-slate-950`)

- [ ] **Step 4: Update `src/components/YouTubePlayer.tsx`**

- Section wrapper: `bg-stone-50 dark:bg-slate-950`
- Video card box (`rounded-2xl`): `bg-white border-stone-200 shadow-sm dark:bg-slate-900/60 dark:border-white/5`
- Titles and descriptions: `text-stone-900 dark:text-white`, `text-stone-600 dark:text-slate-400`

---

### Task 4: Homepage Sections Adaptation (EditedSongs, AssetsFile, Contact)

**Files:**
- Modify: `src/components/EditedSongs.tsx`
- Modify: `src/components/AssetsFile.tsx`
- Modify: `src/components/Contact.tsx`

**Interfaces:**
- Consumes: Tailwind v4 `dark:` classes
- Produces: Dual-theme track cards, modals, asset spec cards, and booking form

- [ ] **Step 1: Update `src/components/EditedSongs.tsx`**

- Section wrapper: `bg-stone-50 dark:bg-slate-950`
- Song cards: `bg-white border-stone-200 shadow-sm dark:bg-slate-900/60 dark:border-white/5`
- Title & Artist: `text-stone-900 dark:text-white`, `text-stone-600 dark:text-slate-400`
- Quality badge: `bg-stone-100 text-stone-700 border-stone-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10`
- Download popup modal: `bg-white border-stone-200 text-stone-900 dark:bg-slate-900 dark:border-white/10 dark:text-white`
- Modal backdrop: `bg-stone-900/40 backdrop-blur-sm dark:bg-slate-950/80`

- [ ] **Step 2: Update `src/components/AssetsFile.tsx`**

- Section wrapper: `bg-stone-50 dark:bg-slate-950`
- EPK card & Asset specification cards: `bg-white border-stone-200 shadow-sm dark:bg-slate-900/60 dark:border-white/5`
- Card text & labels: `text-stone-900 dark:text-white`, `text-stone-600 dark:text-slate-400`
- Format indicator badges: `bg-stone-100 text-stone-700 border-stone-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10`

- [ ] **Step 3: Update `src/components/Contact.tsx`**

- Section wrapper: `bg-stone-50 dark:bg-slate-950`
- Form container & Direct contact cards: `bg-white border-stone-200 shadow-sm dark:bg-slate-900/60 dark:border-white/5`
- Form inputs (`<input>`, `<textarea>`, `<select>`): `bg-stone-50 border-stone-300 text-stone-900 focus:border-amber-500 dark:bg-slate-950 dark:border-white/10 dark:text-white dark:focus:border-amber-400/50`
- Labels: `text-stone-700 dark:text-slate-300`
- Social media icon buttons: `bg-stone-100 border-stone-200 text-stone-700 hover:text-amber-600 dark:bg-white/5 dark:border-white/10 dark:text-slate-300 dark:hover:text-amber-300`
- Footer text and divider: `border-stone-200 text-stone-500 dark:border-white/5 dark:text-slate-500`

---

### Task 5: Subpages (`/songs` & `/gallery`) Theme Adaptation

**Files:**
- Modify: `app/songs/page.tsx`
- Modify: `app/gallery/page.tsx`

**Interfaces:**
- Consumes: `<ThemeToggle />` component, dual-theme utility classes
- Produces: Dual-theme dedicated subpages with top-bar theme controls

- [ ] **Step 1: Update `app/songs/page.tsx`**

- Import `ThemeToggle` from `@/src/components/ThemeToggle`
- In static top bar (beside "Back to Home"): add `<ThemeToggle />` aligned right
- Page wrapper: `bg-stone-50 text-stone-900 dark:bg-slate-950 dark:text-white`
- Search bar: `bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 dark:bg-slate-900/60 dark:border-amber-400/25 dark:text-white dark:placeholder:text-slate-500`
- Song cards & download modal: mirror dual-theme classes from `src/components/EditedSongs.tsx`

- [ ] **Step 2: Update `app/gallery/page.tsx`**

- Import `ThemeToggle` from `@/src/components/ThemeToggle`
- In static top bar (beside "Back to Home"): add `<ThemeToggle />` aligned right
- Page wrapper: `bg-stone-50 text-stone-900 dark:bg-slate-950 dark:text-white`
- Photo cards & Lightbox modal: mirror dual-theme classes from `src/components/StagePhoto.tsx`

---

### Task 6: Login & Admin Dashboard Theme Adaptation

**Files:**
- Modify: `app/login/page.tsx`
- Modify: `app/admin/AdminPage.tsx`

**Interfaces:**
- Consumes: `<ThemeToggle />`, dual-theme utility classes
- Produces: Dual-theme authentication and headless CMS control panel

- [ ] **Step 1: Update `app/login/page.tsx`**

- Import `ThemeToggle` from `@/src/components/ThemeToggle`
- Add `<ThemeToggle />` in the top right corner of the screen
- Page wrapper: `bg-stone-50 dark:bg-slate-950`
- Card container: `bg-white border-stone-200 shadow-xl dark:bg-slate-900 dark:border-white/10`
- Input fields: `bg-stone-50 border-stone-300 text-stone-900 dark:bg-slate-950 dark:border-white/10 dark:text-white`
- Error/status notices: adapt for high-contrast visibility in both modes

- [ ] **Step 2: Update `app/admin/AdminPage.tsx`**

- Import `ThemeToggle` from `@/src/components/ThemeToggle`
- Header bar: place `<ThemeToggle />` beside the "Sign Out" button
- Admin container: `bg-stone-50 text-stone-900 dark:bg-slate-950 dark:text-white`
- Tab bar & active tab buttons:
  - Bar: `border-stone-200 dark:border-white/10`
  - Inactive tabs: `text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5`
  - Active tab: `bg-amber-400 text-slate-950`
- Item cards & list containers: `bg-white border-stone-200 shadow-sm dark:bg-slate-900/60 dark:border-white/5`
- Form inputs & `CustomSelect`: `bg-stone-50 border-stone-300 text-stone-900 dark:bg-slate-950 dark:border-white/10 dark:text-white`
- Modals & dialogs: `bg-white border-stone-200 dark:bg-slate-900 dark:border-white/10`

---

### Task 7: End-to-End Build Verification & Protocol Summary

**Files:**
- Check: All modified files

**Interfaces:**
- Consumes: Next.js build pipeline
- Produces: Clean production build with no type, syntax, or hydration errors

- [ ] **Step 1: Execute Next.js build verification**

Run build: `npm run build`
Expected: Build successfully completes with 0 errors, generating `/`, `/songs`, `/gallery`, `/login`, `/admin`.

- [ ] **Step 2: Summarize changes for user confirmation**

Prepare a clear summary of all Light Mode / Dark Mode changes and present it to the user. Do NOT update `prd.md` until explicit user confirmation is received.
