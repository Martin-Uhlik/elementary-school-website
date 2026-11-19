# ZŠMP web (Next.js)

The school website and its admin. Content comes from PostgreSQL through Drizzle ORM; photos and documents from a media folder.

## Run on a dev machine

```bash
# a database: e.g. "docker compose up -d db" in the repository root (port 5432)
echo 'DATABASE_URL=postgres://zsmp:change-me@127.0.0.1:5432/zsmp' > web/.env
# in src/: one npm workspace with web (this app) and db (../db, the tables)
npm install
npm run db:migrate     # creates the tables / applies new migrations (../db/migrations)
npm run db:seed        # fills an empty database: the content + user admin / zsmp
npm run dev            # http://localhost:3000, admin on http://localhost:3000/admin
npm run lint
npm run format         # Prettier; "npm run format:check -w web" only checks
```

Photos and documents are read from `media/` in the repository root (or `MEDIA_DIR`): `media/galerie/<folder>/`, `media/dokument/`.

## Layout

- `app/(site)/` the public pages, same URLs as the old site without `.html`; `app/(site)/layout.tsx` adds the header, cookie bar and footer.
- `app/(site)/galerie/[id]/[...file]` and `app/(site)/dokument/[...file]` serve photos and documents from the media folder, so uploads show up at once.
- `app/admin/` the sign-in page (not linked anywhere, `noindex`).
- `proxy.ts` answers 404 to `/admin`, `/auth` and server actions unless the client IP is in `ADMIN_ALLOWED_IPS` (`lib/adminAccess.ts`, real IP from Caddy's X-Forwarded-For in `lib/clientIp.ts`). Unset on a dev machine = everyone.
- `app/auth/` the admin: news, people, documents, galleries, users. Every page and action checks the session (`lib/auth/session.ts`).
- `lib/content/` what the pages read (one function per need); `lib/content/format.ts` holds the helpers without database access.
- `lib/admin/` helpers of the admin: document and photo uploads, ordering.
- The tables come from `../db` (package `@zsmp/db`, see [its README](../db/README.md)): `import { news } from "@zsmp/db/schema"`. `lib/db.ts` is the connection the app uses.
- `app/styles.css` imports the styles, one file per block in `app/styles/` (BEM: `.block__element--modifier`; the rules are at the top of `styles.css`); `app/admin.css` is the admin's.
- `public/` static files: `data/images`, `informatika/` (Scratch projects, PDFs).

## Changing the database

See [`../db/README.md`](../db/README.md): edit `../db/schema.ts`, then `npm run db:generate -- --name <what-changed>` in `src/`.

## Galleries

A gallery is a row in `galleries` plus a folder `media/galerie/<folder>/` with the photos. Uploading in the admin keeps the full photo (turned upright when the phone stored it rotated) and makes a preview with its shorter side 256 px in `thumbnails/`. The gallery page shows the previews and opens the full photos. An optional `meta.json` in the folder overrides the heading.
