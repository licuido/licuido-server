CREATE TABLE "offer_fund_ratings" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "offer_token_id" uuid,
  "agency" TEXT,
  "rating" TEXT,
  "is_active" boolean DEFAULT true,
  "created_by" uuid,
  "updated_by" uuid,
  "created_at" timestamptz DEFAULT (now() at time zone 'utc'),
  "updated_at" timestamptz DEFAULT (now() at time zone 'utc'),

  CONSTRAINT "offer_fund_ratings_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "offer_fund_ratings" ADD FOREIGN KEY ("offer_token_id") REFERENCES "token_offerings" ("id");

ALTER TABLE "public"."token_offerings" ADD COLUMN projected_rate_return TEXT;
ALTER TABLE "public"."token_offerings" ADD COLUMN annual_percentage_yield TEXT;
ALTER TABLE "public"."token_offerings" ADD COLUMN payback_period TEXT;
ALTER TABLE "public"."token_offerings" ADD COLUMN payback_period_type TEXT;


