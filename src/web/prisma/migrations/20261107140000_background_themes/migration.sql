-- Seasonal backgrounds move from code (lib/background.ts) to the database, editable in /auth/pozadi
ALTER TYPE "permission" ADD VALUE 'pozadi' BEFORE 'admin';

CREATE TABLE "background_themes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "start_day" SMALLINT,
    "start_month" SMALLINT,
    "end_day" SMALLINT,
    "end_month" SMALLINT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "background_themes_pkey" PRIMARY KEY ("id")
);

-- the three backgrounds the site had: winter in December and January, Easter in March, boxes otherwise
INSERT INTO "background_themes" ("id", "name", "src", "start_day", "start_month", "end_day", "end_month") VALUES
  (gen_random_uuid(), 'Zima', '/data/images/background_elements/winter.svg', 1, 12, 31, 1),
  (gen_random_uuid(), 'Velikonoce', '/data/images/background_elements/easter.svg', 1, 3, 31, 3),
  (gen_random_uuid(), 'Krabičky', '/data/images/background_elements/boxes.svg', NULL, NULL, NULL, NULL);
