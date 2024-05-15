-- Step 1: Alter Column in token_valuations table
ALTER TABLE "public"."token_valuations"
 DROP COLUMN start_time;

 ALTER TABLE "public"."token_valuations"
 ADD COLUMN start_time TIME;
