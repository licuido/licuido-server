CREATE TABLE "user_device_tokens" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "user_profile_id" uuid,
  "token" TEXT,
  "is_active" boolean DEFAULT true,
  "created_by" uuid,
  "updated_by" uuid,
  "created_at" timestamptz DEFAULT (now() at time zone 'utc'),
  "updated_at" timestamptz DEFAULT (now() at time zone 'utc'),

   CONSTRAINT "user_device_tokens_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "user_device_tokens" ADD FOREIGN KEY ("user_profile_id") REFERENCES "user_profiles" ("id");

ALTER TABLE "user_device_tokens" ADD FOREIGN KEY ("created_by") REFERENCES "user_profiles" ("id");

ALTER TABLE "user_device_tokens" ADD FOREIGN KEY ("updated_by") REFERENCES "user_profiles" ("id");
