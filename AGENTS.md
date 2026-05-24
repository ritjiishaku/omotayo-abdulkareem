<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent Rules — Omotayo Abdulkareem Portfolio

## Project Identity

This is a single-page portfolio website for **Omotayo Abdulkareem**, an **AI Automation Engineer** (NOT a developer, software engineer, or full-stack engineer). Every piece of content — UI copy, metadata, JSON-LD schema, filenames — must reinforce this positioning.

## Golden Rules

1. **Never use these terms** in any content: "developer", "software engineer", "full-stack", "frontend", "backend", "web developer", "coder", "programmer". Past job titles in experience data are already rewritten (e.g., "Full Stack Developer" → "Integration Engineer").
2. **No icon libraries** — `lucide-react` is removed. All icons are inline SVGs only. Never import from any icon package.
3. **No runtime dependencies** beyond `next`, `react`, `react-dom`. Check `package.json` before adding any dep.
4. **Mobile-first responsive** — all sections must work on 320px+ screens without horizontal scroll.
5. **All components are server components** by default. Only use `"use client"` when absolutely required (state/effects: Navbar scroll + mobile drawer, Projects filter, Contact form). Never add `"use client"` unnecessarily.

## Design System

Referenced in `app/globals.css` as `@theme` tokens:

- `bg-primary: #0A0A0A` — page background
- `bg-surface: #111111` — card/section surfaces
- `gold: #D4AF37` — accent color for headings, borders, buttons
- `gold-muted: #B68D2A` — hover/alt gold
- `text-primary: #F5F5F5` — body text
- `text-muted: #A1A1AA` — secondary text
- `border: rgba(255,255,255,0.06)` — subtle borders
- Fonts: Inter (body), Playfair Display (headings) — both loaded via `next/font/google` with `display: swap`

Utility classes available: `card`, `card-hover`, `btn-primary`, `btn-secondary`, `section-label`, `section-title`, `section-divider`, `tag`, `text-link`. Never add new CSS files; extend `globals.css` if needed.

## Architecture

```
app/
  layout.tsx          — Root layout, fonts, full SEO metadata (OG, Twitter, canonical, keywords, robots)
  page.tsx            — Home page: fetches all CMS data, renders sections, injects 3 JSON-LD schemas, dynamic imports Contact
  sitemap.ts          — Dynamic sitemap (home weekly/1.0, projects monthly/0.8)
  robots.ts           — Allow all, sitemap pointer
  projects/[slug]/
    page.tsx          — Project detail: generateStaticParams, dynamicParams=false, generateMetadata, next/image, JSON-LD schema
  api/
    sheets/
      route.ts        — GET (read all data), POST/PUT (write to any tab)
      [tab]/
        route.ts      — PUT (write to a specific tab by name)
  globals.css         — All styles via @theme tokens + utility classes

components/
  Navbar.tsx          — "use client": scroll-aware backdrop blur, mobile drawer with ham/close SVGs, LinkedIn link
  Hero.tsx            — Full-screen, name + role + tagline, WhatsApp + Projects CTAs
  About.tsx           — Bio + 4 pillar cards (inline SVG icons)
  Services.tsx        — 3-col grid, 5 services, card-hover
  Skills.tsx          — 4-col grid, category cards with tag badges
  Experience.tsx      — Vertical timeline with gold indicator dots
  Projects.tsx        — "use client": filter tabs, featured-first sort, 3-col grid, ProjectCard with Problem/Solution/Outcome
  ProjectCard.tsx     — Project card with gold hover border
  Testimonials.tsx    — 3-col card grid, quote SVG, avatar initials
  Contact.tsx         — "use client": form state, WhatsApp + email CTAs, success state
  WhatsAppButton.tsx  — Fixed bottom-right green floating button
  Footer.tsx          — Nav links, social icons (LinkedIn, WhatsApp, Email), scroll-to-top, copyright

lib/
  mockData.ts         — All fallback data + shared interfaces (GeneralInfo, Service, Testimonial). Content fully automation-reframed.
  googleSheets.ts     — Fetch layer with ISR (revalidate: 3600), column-based parsing, mock fallback per entity, updateSheetValues()
  sheetsAuth.ts       — JWT auth using service account (createPrivateKey + RSA-SHA256 signing), token caching
  seo.ts              — JSON-LD schema generators: Person, LocalBusiness, Services, Project

types/
  experience.ts, project.ts, skill.ts  — TypeScript interfaces

public/               — Static assets (og.png, favicon, etc.)
```

## Data Flow

1. `app/page.tsx` calls 6 `get*()` functions from `lib/googleSheets.ts` in parallel via `Promise.all`.
2. Each function calls `getAccessToken()` from `lib/sheetsAuth.ts` (JWT via service account), then fetches its sheet tab with `Authorization: Bearer <token>` and `next: { revalidate: 3600 }` for ISR caching.
3. If the API call fails or returns invalid data, the function falls back to the corresponding mock data from `lib/mockData.ts`.
4. Structured data (JSON-LD) is generated server-side via `lib/seo.ts` and injected into the `<head>` via `<script type="application/ld+json">` in the page component.

## Google Sheets CMS

- **Auth**: Service account (JWT bearer grant) via `lib/sheetsAuth.ts`
- **Service Account Email**: `portfolio@omotayo-abdulkareem-portfolio.iam.gserviceaccount.com`
- **Must be added as Editor** on the sheet (Share → add email as Editor)
- **Spreadsheet ID**: `1g9M7hMFo3zewh50soI8WrrGSIlrPrxSGlNQhoIfaCDE`
- **Env var** `GOOGLE_SERVICE_ACCOUNT_KEY_B64`: base64-encoded service account JSON key
- **Sheets API must be enabled** in Google Cloud Console
- Expected 6 tabs with exact column headers (case-insensitive, parsed via `parseRowsToObjects`):
  Row 1 = column headers, Row 2+ = data.

### `General` (range A1:B20 — key-value, parsed row-by-row)

| Column | Used for | Example |
|--------|----------|---------|
| A (key) | The `.key` after stripping non-alphanumeric | `name`, `role`, `tagline`, `biosummary`, `biodetailed`, `email`, `phone`, `whatsapp`, `location`, `linkedin` |
| B (value) | The `.value` | `Omotayo Abdulkareem` |

Only recognized keys are mapped; unknown keys are ignored. Stats are hardcoded in `mockData.ts:45-50` — not from sheet.

### `Services` (range A1:B50)

| Column header | Type | Example |
|---------------|------|---------|
| Title | string | `AI Workflow Automation` |
| Description | string | `Connect your marketing, sales, and operations tools...` |

### `Skills` (range A1:C50)

| Column header | Type | Example |
|---------------|------|---------|
| Name | string | `OpenAI` |
| Category | string | `AI & LLMs` |
| Level | number (0-100) | `95` |

Categories are grouped in the UI via `Array.from(new Set(...))`.

### `Experience` (range A1:D50)

| Column header | Type | Example |
|---------------|------|---------|
| Company | string | `Freelance / Automation Lab` |
| Role | string | `Lead AI Automation Consultant` |
| Period | string | `Jan 2024 - Present` |
| Description | string | Use `\n` for bullet lines |

### `Projects` (range A1:K50)

| Column header | Type | Example |
|---------------|------|---------|
| Id | string | `1` |
| Slug | string | `autoreach-outreach-engine` |
| Title | string | `AutoReach: AI-Powered Outreach Engine` |
| Category | string | `AI & Automation` |
| Summary | string | Short 1-sentence overview |
| Problem | string | The pain point before automation |
| Solution | string | What was built and how it works |
| Tools | comma-sep string | `Make.com, OpenAI API, Smartlead API, HubSpot CRM, Airtable` |
| Outcome | string | Bullet outcomes, use `\n` for lines |
| Featured | boolean string | `TRUE` or `FALSE` (also accepts `true`/`1`/`yes`) |
| Image | full URL string | `https://images.unsplash.com/...` (defaults to Unsplash placeholder if empty) |

### `Testimonials` (range A1:C50)

| Column header | Type | Example |
|---------------|------|---------|
| Name | string | `Sarah Jenkins` |
| Role | string | `COO, GrowthScale Media` |
| Text | string | Full testimonial quote |

- To reflect edits immediately, append `?clearCache` to the URL or wait for the 1-hour ISR revalidation.
- When adding a new field to an interface, add the parser in `googleSheets.ts` and add the column header to the sheet.

## Write API (Update Sheets Programmatically)

Two endpoints for writing data back to Google Sheets:

### `PUT /api/sheets/[tab]`

Update a specific tab. `[tab]` is one of: `general`, `services`, `skills`, `experience`, `projects`, `testimonials`.

```json
// Body: { "values": [["col1", "col2"], ["val1", "val2"]] }
// First row = headers (overwrites existing), subsequent rows = data
PUT /api/sheets/projects
{ "values": [["Id","Slug","Title",...], ["1","autoreach-...","AutoReach",...]] }
```

### `GET /api/sheets`

Returns all data from all 6 sheets in one response (debug/inspection).

### `POST` / `PUT /api/sheets`

Alternative endpoint with `tab` in body:

```json
POST /api/sheets
{ "tab": "projects", "values": [...] }
```

### Tab → Range Mapping

| Tab | Sheet Range |
|-----|-------------|
| `general` | General!A1:B20 |
| `services` | Services!A1:B50 |
| `skills` | Skills!A1:C50 |
| `experience` | Experience!A1:D50 |
| `projects` | Projects!A1:K50 |
| `testimonials` | Testimonials!A1:C50 |

### Example: Python script to update services

```python
import requests
res = requests.put(
    "https://omotayo.dev/api/sheets/services",
    json={"values": [["Title", "Description"], ["AI Workflow", "Connect your..."]]}
)
print(res.json())  # {"ok": true, "tab": "services", "rows": 2}
```

## Section Numbering

```
01 About, 02 Services, 03 Automation Stack, 04 Experience, 05 Projects, 06 Testimonials, 07 Let's Build
```

## SEO Metadata

- **Primary keywords**: AI Automation Engineer, Workflow Automation, AI Agents, Business Automation Specialist
- **Secondary keywords**: CRM Automation, AI Integrations, Workflow Automation Systems, Business Process Automation, Make.com, Zapier
- **Always use** in layout.tsx: `robots: { index: true, follow: true }`, canonical URL, OG tags, twitter:card
- **JSON-LD schemas** on home page: Person (with knowsAbout for automation), LocalBusiness, ItemList of Services
- **JSON-LD schema** on project pages: CreativeWork per project
- **Metadata title template**: `"%s | Omotayo Abdulkareem"` with default `"Omotayo Abdulkareem | AI Automation Engineer - Workflow & Business Automation Systems"`
- **metadataBase**: `https://omotayo.dev`

## Image Handling

- Use `next/image` for project images in `app/projects/[slug]/page.tsx`
- Remote patterns configured in `next.config.ts`
- Hero image is placeholder Unsplash; replace before production deploy
- OG image `/public/og.png` (1200×630) must exist before production deploy

## Content Guidelines

- All copy must position the subject as an **AI Automation Engineer** who builds **automation systems, AI agents, and workflow automations** — NOT software applications.
- Project descriptions: emphasize problem → solution → outcome, tools used, business impact measured in hours saved / revenue recovered / efficiency gained.
- Testimonials should reference specific automation outcomes.
- Never include the words "developer", "software engineer", "full-stack", "frontend", "backend" in any content, metadata, or schema.
