-- CreateEnum
CREATE TYPE "fulfilled_by_types" AS ENUM ('admin', 'issuer');

-- Step 2: Add Column in token_orders table
ALTER TABLE "public"."token_orders"
ADD COLUMN recived_amount_in_euro DECIMAL,
ADD COLUMN fulfilled_by "fulfilled_by_types";



