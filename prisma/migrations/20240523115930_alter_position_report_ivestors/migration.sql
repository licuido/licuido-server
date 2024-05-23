

-- Step 1: Add Column issuer_profile_id in entity_investors table
ALTER TABLE "public"."position_report_investors" ADD COLUMN report_id uuid;

-- Step 2: Add References
ALTER TABLE "public"."position_report_investors" ADD FOREIGN KEY ("report_id") REFERENCES "public"."position_reports" ("id");
