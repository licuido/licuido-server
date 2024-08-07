CREATE TABLE "token_pledges" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "token_offering_id" uuid,
  "invester_id" uuid,
  "issuer_id" uuid,
  "pledge_token" INTEGER,
  "is_active" boolean DEFAULT true,
  "created_by" uuid,
  "updated_by" uuid,
  "created_at" timestamptz DEFAULT (now() at time zone 'utc'),
  "updated_at" timestamptz DEFAULT (now() at time zone 'utc'),

   CONSTRAINT "token_pledges_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "token_pledges" ADD FOREIGN KEY ("token_offering_id") REFERENCES "token_offerings" ("id");

ALTER TABLE "token_pledges" ADD FOREIGN KEY ("invester_id") REFERENCES "entities" ("id");

ALTER TABLE "token_pledges" ADD FOREIGN KEY ("issuer_id") REFERENCES "entities" ("id");

ALTER TABLE "token_pledges" ADD FOREIGN KEY ("created_by") REFERENCES "user_profiles" ("id");

ALTER TABLE "token_pledges" ADD FOREIGN KEY ("updated_by") REFERENCES "user_profiles" ("id");
