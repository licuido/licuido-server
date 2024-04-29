-- This is an empty migration.

ALTER TABLE "public"."user_profiles" ADD COLUMN investor_type_id INTEGER;

ALTER TABLE "user_profiles" ADD FOREIGN KEY ("investor_type_id") REFERENCES "master_investor_types" ("id");
