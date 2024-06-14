

-- Step 1: Add Column issuer_entity_id in position_reports table
ALTER TABLE "public"."position_reports" ADD COLUMN issuer_entity_id uuid;

-- Step 2: Add References
ALTER TABLE "public"."position_reports" ADD FOREIGN KEY ("issuer_entity_id") REFERENCES "public"."entities" ("id");
