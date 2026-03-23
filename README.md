# ClipsOS Website — TheClipsAgency

A fully mobile-responsive marketing website for **ClipsOS by TheClipsAgency**, originally designed in Figma and converted to a production-ready React + Tailwind CSS v4 web application using [Figma Make](https://www.figma.com/make).

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 6** (build tool)
- **Tailwind CSS v4** (utility-first styling)
- **lucide-react** (icons)

## Project Structure

```
src/
  app/
    App.tsx                        # Main application component
    components/
      figma/
        ImageWithFallback.tsx      # Image component with error fallback
  imports/
    svg-ysal173aqj.ts              # SVG path data from Figma
  styles/
    index.css                      # CSS entry point
    tailwind.css                   # Tailwind v4 config + hide-scrollbar utility
    theme.css                      # Design tokens / CSS custom properties
    fonts.css                      # Font imports (if any)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Important: Figma Asset Images

This project was generated inside **Figma Make**, which uses a virtual module scheme (`figma:asset/`) to serve design assets at build time. These asset imports **will not resolve** in a standard Vite environment outside of Figma Make.

To run this project locally with real images:
1. Export the image assets from your Figma file (PNG/WebP).
2. Place them in `src/assets/`.
3. Replace the placeholder `const imgXxx = '';` declarations in `App.tsx` with proper imports:
   ```ts
   import imgRectangle1259 from './assets/rectangle-1259.png';
   ```

## Sections

- **Navigation** — Fixed glassmorphism navbar with responsive mobile menu
- **Hero** — Full-width headline with dual CTA buttons
- **Built For Experts** — Feature card bento grid
- **How The System Runs** — 4-step process cards
- **The Operating System** — Alternating feature showcase with images
- **Case Studies** — Client result cards (Leena, Khaled, Dr. Sara)
- **CTA** — Conversion-focused closing section
- **Footer** — Links, social icons, legal pages

## Responsive Design

All sections use progressive Tailwind breakpoints (`sm:`, `md:`, `lg:`) with:
- Smaller text sizes and tighter padding on mobile
- Horizontal scroll with hidden scrollbars for stat rows
- Stacked layouts on mobile → side-by-side on desktop
- Mobile hamburger menu with slide-down nav drawer
