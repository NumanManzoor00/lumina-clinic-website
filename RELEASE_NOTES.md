# Latest source package

## Layout and content corrections
- Navbar links use a small underline, without card borders or halo boxes; keyboard focus remains visible.
- Button labels are shrinkable text spans, with icons kept at a fixed size.
- Long labels, email addresses, names and translated content wrap inside their panels.
- Service/doctor grids use `minmax(0, 1fr)` columns and stack on mobile.
- Quick-book, booking fields, summaries, appointment cards and footer columns have explicit narrow-screen containment.
- Booking and appointment text uses simpler visitor-facing wording. Technical storage details remain in the architecture document.
- Mobile menu labels are translated in all four languages.

## Included features
Five primary pages, three detailed doctor profiles, multilingual controls, Arabic RTL, light/dark themes, booking/list/cancel API, Node.js SQLite persistence, hosted D1 adapter, glass surfaces, halo interaction, organic cards, dithering hero, and a custom 3D-style SVG brand mark.

## Validation
Production builds and API integration checks are run for this release. Browser visual QA is unavailable in the authoring environment, so desktop/mobile rendering, hover effects, Arabic RTL, and long-content cases still need a browser review before real-world use.

## Archive contents
The ZIP contains the application source, runtime/build scripts, dependency manifest and lockfile, database migration files, public assets, README, design-system and system-architecture documents. Dependency directories, generated output, runtime databases, credentials and Git history are excluded. The hosting manifest has no existing Site identity, so the package can be used independently.

## Quick start
Install Node.js 22.13 or later, extract the folder, open a terminal in the folder containing package.json, then run:
```bash
npm install
npm run dev:next
```
Open http://localhost:3000. Use sample details for demo bookings. The same Next.js process serves the Node backend and initializes the SQLite database.
