-- This is an empty migration.

ALTER TABLE "public"."user_profiles" ADD COLUMN contact_email TEXT;

ALTER TABLE "public"."entities" ADD COLUMN region_id INTEGER;

ALTER TABLE "entities" ADD FOREIGN KEY ("region_id") REFERENCES "master_regions" ("id");
