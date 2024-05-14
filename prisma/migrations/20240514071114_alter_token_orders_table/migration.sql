-- Step 1: Add Columns in token_orders table
ALTER TABLE "public"."token_orders"
 ADD COLUMN default_currency TEXT,
 ADD COLUMN default_currency_code TEXT,
 ADD COLUMN net_investment_value_in_euro DECIMAL,
 ADD COLUMN last_action_track_id uuid;

-- Step 2: Add References
ALTER TABLE "token_orders" ADD FOREIGN KEY ("last_action_track_id") REFERENCES "track_token_order_actions" ("id");
