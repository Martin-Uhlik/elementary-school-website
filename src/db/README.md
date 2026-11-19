# ZŠMP database (Drizzle ORM)

The tables, their migrations and the first content. It runs on its own as the `migrate` container (`Dockerfile`,
no Next.js inside) and is also the package `@zsmp/db` the web app imports the tables from (`@zsmp/db/schema`).

- `schema.ts` the tables, enums and relations
- `migrations/` the SQL migrations, applied in order; the database lists the applied ones in `drizzle.__drizzle_migrations`
- `migrate.ts` applies the new ones; `seed.ts` + `seed/content.sql` fill an empty database (the content and the user admin / zsmp)
- `drizzle.config.ts` settings of drizzle-kit, which writes the migrations

`DATABASE_URL` comes from the environment, or on a dev machine from `.env` here or in `../web/.env`.

## Changing the database

In `src/` (the npm workspace):

```bash
# 1. edit schema.ts, then write the migration and read it before committing
npm run db:generate -- --name <what-changed>
# a data change (UPDATE, INSERT) instead: an empty migration to write the SQL into
npm run db:generate -- --custom --name <what>
# 2. apply it on the dev machine; Docker applies it on the next "docker compose up --build"
npm run db:migrate
```
