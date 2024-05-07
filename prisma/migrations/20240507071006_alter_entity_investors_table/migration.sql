-- Step 1: Add Column issuer_entity_id in entity_investors table
ALTER TABLE "public"."entity_investors" ADD COLUMN issuer_entity_id uuid;

-- Step 2: Add References
ALTER TABLE "public"."entity_investors" ADD FOREIGN KEY ("issuer_entity_id") REFERENCES "public"."entities" ("id");

-- Step 3: DROP issuer_profile_id column
ALTER TABLE "public"."entity_investors" DROP COLUMN issuer_profile_id;
