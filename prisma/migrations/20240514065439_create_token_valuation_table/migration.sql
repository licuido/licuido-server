CREATE TABLE "token_valuations" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "token_offering_id" uuid,
  "offer_price" DECIMAL,
  "bid_price" DECIMAL,
  "valuation_price" DECIMAL,
  "start_date" DATE,
  "start_time" DATE,
  "is_active" boolean DEFAULT true,
  "created_by" uuid,
  "updated_by" uuid,
  "created_at" timestamptz DEFAULT (now() at time zone 'utc'),
  "updated_at" timestamptz DEFAULT (now() at time zone 'utc'),

   CONSTRAINT "token_valuations_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "token_valuations" ADD FOREIGN KEY ("token_offering_id") REFERENCES "token_offerings" ("id");

ALTER TABLE "token_valuations" ADD FOREIGN KEY ("created_by") REFERENCES "user_profiles" ("id");

ALTER TABLE "token_valuations" ADD FOREIGN KEY ("updated_by") REFERENCES "user_profiles" ("id");
