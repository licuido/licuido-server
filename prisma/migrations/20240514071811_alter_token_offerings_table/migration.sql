-- Step 1: Add Columns in token_offerings table
ALTER TABLE "public"."token_offerings"
 ADD COLUMN is_deployed BOOLEAN,
 ADD COLUMN valuation_price DECIMAL;