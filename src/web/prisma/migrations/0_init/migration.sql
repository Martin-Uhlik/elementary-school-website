-- Tables for the site content; one table per list in src/web/data/ (see data/types.ts).
-- Runs once, when the database volume is empty. sort_order is the display order (the order of the array).

CREATE TYPE unit AS ENUM ('zs', 'ms', 'druzina');
CREATE TYPE phone_kind AS ENUM ('internal', 'landline', 'mobile');

-- A heading with a list of links on a page, e.g. "Výroční zprávy" on /dokumenty
CREATE TABLE link_groups (
  id         text PRIMARY KEY,
  page       text NOT NULL,            -- route of the page that shows the group
  title      text,
  sort_order integer NOT NULL
);

-- A document, a web page or a page of this site; the type shown next to it comes from href
CREATE TABLE links (
  id          text PRIMARY KEY,
  group_id    text NOT NULL REFERENCES link_groups (id) ON DELETE CASCADE,
  title       text NOT NULL,
  href        text,                    -- missing for a plain text item
  description text[] NOT NULL DEFAULT '{}',
  details     text,                    -- longer note shown in a tooltip
  sort_order  integer NOT NULL
);
CREATE INDEX links_group_id_idx ON links (group_id);

-- A photo gallery in public/galerie/<folder>/, or a link to a video
CREATE TABLE galleries (
  id         text PRIMARY KEY,
  folder     text,                     -- photo folder when it differs from id
  unit       unit NOT NULL,
  year       integer NOT NULL,         -- the archive heading it is listed under
  title      text NOT NULL,
  date_text  text,                     -- the date as written on the site, e.g. "31.5.-1.6.2023"
  url        text,                     -- a video or another address instead of a photo gallery
  sort_order integer NOT NULL
);
CREATE INDEX galleries_unit_idx ON galleries (unit);

-- The three tiles on the Foto a video page
CREATE TABLE gallery_sections (
  unit       unit PRIMARY KEY,
  title      text NOT NULL,
  href       text NOT NULL,
  cover      text NOT NULL,
  sort_order integer NOT NULL
);

-- A member of staff, a board member, or a contact without a person (label "Kontakt", e.g. the kitchen phone)
CREATE TABLE people (
  id           text PRIMARY KEY,
  title_before text,
  first_name   text,
  last_name    text,
  title_after  text,
  name         text,                   -- what a contact without a person is, e.g. "Knihovna"
  labels       text[] NOT NULL DEFAULT '{}', -- where the entry is shown, e.g. section headings on /kontakty
  position     text,                   -- short job title, e.g. "ředitelka"
  email        text,
  description  text[] NOT NULL DEFAULT '{}',
  sort_order   integer NOT NULL
);
CREATE INDEX people_labels_idx ON people USING gin (labels);

CREATE TABLE phones (
  person_id  text NOT NULL REFERENCES people (id) ON DELETE CASCADE,
  kind       phone_kind NOT NULL,
  number     text NOT NULL,
  sort_order integer NOT NULL,
  PRIMARY KEY (person_id, sort_order)
);

-- One line of "Průběh školního roku"; **text** is shown in bold
CREATE TABLE calendar_events (
  id          text PRIMARY KEY,
  school_year text NOT NULL,           -- e.g. "2023/2024"
  date        date NOT NULL,           -- first day
  end_date    date,                    -- last day of an event longer than one day
  holiday     boolean NOT NULL DEFAULT false,
  text        text NOT NULL
);
CREATE INDEX calendar_events_school_year_idx ON calendar_events (school_year, date);

CREATE TABLE sponsors (
  id         text PRIMARY KEY,
  name       text NOT NULL,
  logo       text NOT NULL,
  sort_order integer NOT NULL
);

-- Photos of the school (home page carousel) and the Skládanka puzzle pictures
CREATE TABLE photos (
  id         text PRIMARY KEY,
  collection text NOT NULL CHECK (collection IN ('school', 'puzzle')),
  src        text NOT NULL,
  alt        text NOT NULL,
  sort_order integer NOT NULL
);
