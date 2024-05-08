-- Step 1: Add Columns in token_orders table
ALTER TABLE "public"."token_orders"
 ADD COLUMN bank_name TEXT,
 ADD COLUMN bank_account_name TEXT,
 ADD COLUMN swift_bic_no TEXT,
 ADD COLUMN iban_no TEXT;