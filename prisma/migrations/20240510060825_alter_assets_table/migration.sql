-- Step 1: Add Column file_meta in assets table
ALTER TABLE "public"."assets"
 ADD COLUMN file_meta jsonb;