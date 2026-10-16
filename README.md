# Lumina Clinic
Five-page React / Next.js clinic website with full doctor profiles, frosted glass UI, dark mode, English/Chinese/Spanish/Arabic, RTL layout, and database-backed demo appointments.

## Run with Node.js and Next.js
Requires Node.js 22.13 or later (tested on Node 24).
```bash
npm install
npm run dev:next
```
Open http://localhost:3000. The Next.js backend stores appointments in `server/data/clinic.sqlite`. No second server or external database setup is needed.

## Production Node build
```bash
npm run build:next
npm run start:next
```
Use a durable filesystem for the SQLite database. Set `DATA_DIR` to change its location. Do not use an ephemeral serverless filesystem for this Node configuration.

## Optional standalone Node API
```bash
npm run backend
```
Runs on http://127.0.0.1:4000 with `/api/appointments` and `/api/health`. It shares the same SQLite repository. The frontend already uses its own Next.js API and does not require this separate server.

## Private hosted Sites version
`npm run dev` and `npm run build` use Vinext and the hosted D1 adapter. The hosted version uses Cloudflare Workers rather than a Node process.

## Documents and tests
Read [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md) and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). Both are also downloadable from the website footer.
```bash
node --test server/appointment-api.test.mjs
```

Doctor names, qualifications, and profiles are illustrative. Appointments are demo records, not real clinic bookings. No email is sent. Use sample information. Browser session cookies control access to saved visits; no account login or medical records are implemented.
