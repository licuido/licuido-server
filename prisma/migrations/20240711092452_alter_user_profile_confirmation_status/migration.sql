-- Add column is_politically_exposed and is_legally_confirmed 
ALTER TABLE "public"."user_profiles"
ADD COLUMN is_politically_exposed BOOLEAN DEFAULT false,
ADD COLUMN is_legally_confirmed BOOLEAN DEFAULT false;