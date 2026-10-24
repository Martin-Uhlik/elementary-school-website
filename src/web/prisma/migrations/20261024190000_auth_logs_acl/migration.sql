-- Admin hardening: per-section access, login and activity logs, account lockout, session inactivity,
-- and galleries ordered by their date instead of a manual order.

-- CreateEnum
CREATE TYPE "permission" AS ENUM ('aktuality', 'lide', 'dokumenty', 'galerie', 'admin');

-- CreateEnum
CREATE TYPE "login_event_kind" AS ENUM ('login', 'failed', 'locked', 'logout', 'timeout', 'password', 'username');

-- Galleries get a real date: from the folder name (YYYYMMDD..., day 00 = the 1st), otherwise from date_text
-- (d.m.yyyy), otherwise 1 January of their year. The manual order goes away.
ALTER TABLE "galleries" ADD COLUMN "date" DATE;

UPDATE "galleries" SET "date" = (make_date(substr("id", 1, 4)::int, substr("id", 5, 2)::int, 1)
  + (greatest(substr("id", 7, 2)::int, 1) - 1))::date
WHERE "id" ~ '^\d{8}' AND substr("id", 5, 2)::int BETWEEN 1 AND 12;

UPDATE "galleries" SET "date" = (
  SELECT make_date(m[3]::int, m[2]::int, m[1]::int)
  FROM regexp_match("date_text", '(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})') AS m
)
WHERE "date" IS NULL AND "date_text" ~ '(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})';

UPDATE "galleries" SET "date" = make_date("year", 1, 1) WHERE "date" IS NULL;

ALTER TABLE "galleries" ALTER COLUMN "date" SET NOT NULL;
ALTER TABLE "galleries" DROP COLUMN "sort_order";

-- DropIndex
DROP INDEX "galleries_unit_idx";

-- CreateIndex
CREATE INDEX "galleries_unit_date_idx" ON "galleries"("unit", "date");

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN "failed_logins" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "locked_until" TIMESTAMP(3),
ADD COLUMN "permissions" "permission"[] DEFAULT ARRAY[]::"permission"[],
ADD COLUMN "real_name" TEXT;

-- Users that exist already could edit everything, so they keep full access
UPDATE "users" SET "permissions" = ARRAY['aktuality', 'lide', 'dokumenty', 'galerie', 'admin']::"permission"[];

-- CreateTable
CREATE TABLE "login_events" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "username" TEXT NOT NULL,
    "kind" "login_event_kind" NOT NULL,
    "ip" TEXT NOT NULL DEFAULT '',
    "user_agent" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "login_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "username" TEXT NOT NULL,
    "section" "permission" NOT NULL,
    "text" TEXT NOT NULL,
    "ip" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "login_events_created_at_idx" ON "login_events"("created_at");

-- CreateIndex
CREATE INDEX "login_events_user_id_created_at_idx" ON "login_events"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "activities_created_at_idx" ON "activities"("created_at");

-- CreateIndex
CREATE INDEX "activities_user_id_created_at_idx" ON "activities"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "login_events" ADD CONSTRAINT "login_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
