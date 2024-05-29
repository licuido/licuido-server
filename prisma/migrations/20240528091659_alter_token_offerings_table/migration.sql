-- Step 1: Add Column circulating_supply_count in token_offerings table
ALTER TABLE "public"."token_offerings" ADD COLUMN circulating_supply_count DECIMAL;