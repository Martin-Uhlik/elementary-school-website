# ZŠMP web (Next.js)

The school website and its admin. Content comes from PostgreSQL through Prisma; photos and documents from a media folder.

## Run on a dev machine

```bash
# a database: e.g. "docker compose up -d db" in the repository root (port 5432)
echo 'DATABASE_URL=postgres://zsmp:change-me@127.0.0.1:5432/zsmp' > .env
npm install            # also runs prisma generate
npm run db:deploy      # creates the tables (prisma migrate deploy)
npm run db:seed        # fills an empty database: the content + user admin / zsmp
npm run dev            # http://localhost:3000, admin on http://localhost:3000/admin
npm run lint
npm run format         # Prettier; format:check only checks
```

Photos and documents are read from `media/` in the repository root (or `MEDIA_DIR`): `media/galerie/<folder>/`, `media/dokument/`.

## Layout

- `app/(site)/` the public pages, same URLs as the old site without `.html`; `app/(site)/layout.tsx` adds the header, cookie bar and footer.
- `app/(site)/galerie/[id]/[...file]` and `app/(site)/dokument/[...file]` serve photos and documents from the media folder, so uploads show up at once.
- `app/admin/` the sign-in page (not linked anywhere, `noindex`, disallowed in `robots.txt`).
- `app/auth/` the admin: news, people, documents, galleries, users. Every page and action checks the session (`lib/auth/session.ts`).
- `lib/content/` what the pages read (one function per need); `lib/content/format.ts` holds the helpers without database access.
- `lib/admin/` helpers of the admin: document and photo uploads, ordering.
- `prisma/schema.prisma` the tables; `prisma/migrations/` their history; `prisma/seed.ts` + `seed/content.sql` the first content.
- `app/styles.css` imports the styles, one file per block in `app/styles/` (BEM: `.block__element--modifier`; the rules are at the top of `styles.css`); `app/admin.css` is the admin's.
- `public/` static files: `data/images`, `informatika/` (Scratch projects, PDFs).

## Changing the database

Edit `prisma/schema.prisma`, then `npx prisma migrate dev --name <what-changed>`. This writes a migration into `prisma/migrations/`, which Docker applies on the next `docker compose up` (the `migrate` service).

## Galleries

A gallery is a row in `galleries` plus a folder `media/galerie/<folder>/` with the photos. Uploading in the admin keeps the full photo (turned upright when the phone stored it rotated) and makes a preview with its shorter side 256 px in `thumbnails/`. The gallery page shows the previews and opens the full photos. An optional `meta.json` in the folder overrides the heading.
