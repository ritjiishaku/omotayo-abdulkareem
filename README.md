# Omotayo Abdulkareem — Portfolio

AI Automation Engineer portfolio. Built with Next.js 16, React 19, and Tailwind CSS v4.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens) |
| Fonts | Inter (body) + Playfair Display (headings) via `next/font/google` |
| Icons | Inline SVGs (no icon library) |
| CMS | Google Sheets (ISR: 1-hour revalidation) |
| Hosting | Vercel (recommended) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Google Sheets CMS

The site fetches content from a Google Sheet. To enable live editing:

1. Open the sheet: [Portfolio CMS](https://docs.google.com/spreadsheets/d/1g9M7hMFo3zewh50soI8WrrGSIlrPrxSGlNQhoIfaCDE)
2. Share → "Anyone with the link → Viewer"
3. The site reads 6 tabs: `General`, `Services`, `Skills`, `Experience`, `Projects`, `Testimonials`
4. Changes appear within 1 hour (ISR cache). To force-refresh, append `?clearCache` to the URL.

The API key and spreadsheet ID are in `.env.local`. If the API fails, the site falls back to `lib/mockData.ts`.

## Project Structure

```
app/
  layout.tsx          Root layout, fonts, full SEO metadata
  page.tsx            Home page — fetches CMS data, renders all sections, JSON-LD schemas
  sitemap.ts          Dynamic sitemap
  robots.ts           Robots config
  globals.css         Design tokens + utility classes
  projects/[slug]/
    page.tsx          Project detail pages (ISR)

components/           14 components — server by default, client only when state required
  Navbar.tsx          Client: scroll-aware blur, mobile drawer
  Hero.tsx            Name, role, tagline, CTAs
  About.tsx           Bio + 4 pillar cards
  Services.tsx        5 services grid
  Skills.tsx          4 categories with tag badges
  Experience.tsx      Timeline with gold dots
  Projects.tsx        Client: filter tabs, featured-first grid
  ProjectCard.tsx     Card with gold hover border
  Testimonials.tsx    Quote cards with initials
  Contact.tsx         Client: form + WhatsApp/email CTAs
  WhatsAppButton.tsx  Fixed floating button
  Footer.tsx          Links, social icons, scroll-to-top

lib/
  mockData.ts         Fallback data + interfaces
  googleSheets.ts     Sheet fetch layer with ISR
  seo.ts              JSON-LD schema generators

types/
  experience.ts, project.ts, skill.ts
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Lint check |

## Deployment

Deploy on Vercel:

```bash
npx vercel --prod
```

Set environment variables in Vercel dashboard:
- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_DEVELOPER_API_KEY`

## Content Positioning

All copy positions Omotayo as an **AI Automation Engineer** — not a developer, software engineer, or full-stack engineer. Messaging emphasizes automation systems, AI agents, workflow automation, and business process automation.

## SEO

- Dynamic sitemap at `/sitemap.xml`
- `/robots.txt` allows all crawlers
- JSON-LD schemas: Person, LocalBusiness, Services (home), CreativeWork (projects)
- OpenGraph + Twitter cards
- Canonical URL: `https://omotayo.dev`
