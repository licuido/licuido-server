-- Step 1: Add Columns in token_orders table
ALTER TABLE "public"."token_orders"
 ADD COLUMN reason_for_reject TEXT,
 ADD COLUMN rejected_blockchain_reference_id TEXT,
 ADD COLUMN remarks TEXT;