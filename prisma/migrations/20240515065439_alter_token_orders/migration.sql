-- Step 1: Add Column in token_orders table
ALTER TABLE "public"."token_orders"
 ADD COLUMN is_payment_confirmed BOOLEAN DEFAULT false;