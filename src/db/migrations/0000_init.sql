CREATE TYPE "public"."login_event_kind" AS ENUM('login', 'failed', 'locked', 'logout', 'timeout', 'password', 'username');--> statement-breakpoint
CREATE TYPE "public"."permission" AS ENUM('aktuality', 'lide', 'dokumenty', 'galerie', 'kalendar', 'pozadi', 'admin');--> statement-breakpoint
CREATE TYPE "public"."phone_kind" AS ENUM('internal', 'landline', 'mobile');--> statement-breakpoint
CREATE TYPE "public"."unit" AS ENUM('zs', 'ms', 'druzina');--> statement-breakpoint
CREATE TABLE "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"username" text NOT NULL,
	"section" "permission" NOT NULL,
	"text" text NOT NULL,
	"ip" text DEFAULT '' NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "background_themes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"src" text NOT NULL,
	"start_day" smallint,
	"start_month" smallint,
	"end_day" smallint,
	"end_month" smallint,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "calendar_events" (
	"id" text PRIMARY KEY NOT NULL,
	"school_year" text NOT NULL,
	"date" date NOT NULL,
	"end_date" date,
	"holiday" boolean DEFAULT false NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "galleries" (
	"id" text PRIMARY KEY NOT NULL,
	"folder" text,
	"unit" "unit" NOT NULL,
	"year" integer NOT NULL,
	"title" text NOT NULL,
	"date_text" text,
	"url" text,
	"date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gallery_sections" (
	"unit" "unit" PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"href" text NOT NULL,
	"cover" text NOT NULL,
	"sort_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "link_groups" (
	"id" text PRIMARY KEY NOT NULL,
	"page" text NOT NULL,
	"title" text,
	"sort_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"title" text NOT NULL,
	"href" text,
	"description" text[] DEFAULT '{}' NOT NULL,
	"details" text,
	"sort_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "login_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"username" text NOT NULL,
	"kind" "login_event_kind" NOT NULL,
	"ip" text DEFAULT '' NOT NULL,
	"user_agent" text DEFAULT '' NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"date" date NOT NULL,
	"text" text DEFAULT '' NOT NULL,
	"href" text,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "people" (
	"id" text PRIMARY KEY NOT NULL,
	"title_before" text,
	"first_name" text,
	"last_name" text,
	"title_after" text,
	"name" text,
	"labels" text[] DEFAULT '{}' NOT NULL,
	"position" text,
	"email" text,
	"description" text[] DEFAULT '{}' NOT NULL,
	"sort_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "phones" (
	"person_id" text NOT NULL,
	"kind" "phone_kind" NOT NULL,
	"number" text NOT NULL,
	"sort_order" integer NOT NULL,
	CONSTRAINT "phones_person_id_sort_order_pk" PRIMARY KEY("person_id","sort_order")
);
--> statement-breakpoint
CREATE TABLE "photos" (
	"id" text PRIMARY KEY NOT NULL,
	"collection" text NOT NULL,
	"src" text NOT NULL,
	"alt" text NOT NULL,
	"sort_order" integer NOT NULL,
	CONSTRAINT "photos_collection_check" CHECK ("photos"."collection" IN ('school', 'puzzle'))
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"last_seen_at" timestamp (3) DEFAULT now() NOT NULL,
	"expires_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sponsors" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"sort_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"real_name" text,
	"password_hash" text NOT NULL,
	"must_change_password" boolean DEFAULT false NOT NULL,
	"permissions" "permission"[] DEFAULT '{}' NOT NULL,
	"failed_logins" integer DEFAULT 0 NOT NULL,
	"locked_until" timestamp (3),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_group_id_link_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."link_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "login_events" ADD CONSTRAINT "login_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "phones" ADD CONSTRAINT "phones_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "activities_created_at_idx" ON "activities" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "activities_user_id_created_at_idx" ON "activities" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "calendar_events_school_year_idx" ON "calendar_events" USING btree ("school_year","date");--> statement-breakpoint
CREATE INDEX "galleries_unit_date_idx" ON "galleries" USING btree ("unit","date");--> statement-breakpoint
CREATE INDEX "links_group_id_idx" ON "links" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX "login_events_created_at_idx" ON "login_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "login_events_user_id_created_at_idx" ON "login_events" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "news_date_idx" ON "news" USING btree ("date");--> statement-breakpoint
CREATE INDEX "people_labels_idx" ON "people" USING gin ("labels");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");