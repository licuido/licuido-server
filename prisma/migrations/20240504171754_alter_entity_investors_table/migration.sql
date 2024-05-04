-- Step 1: Add Column issuer_profile_id in entity_investors table
ALTER TABLE "public"."entity_investors" ADD COLUMN issuer_profile_id uuid;

-- Step 2: Add References
ALTER TABLE "public"."entity_investors" ADD FOREIGN KEY ("issuer_profile_id") REFERENCES "public"."user_profiles" ("id");
