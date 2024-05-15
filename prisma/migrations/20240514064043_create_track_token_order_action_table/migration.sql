CREATE TABLE "track_token_order_actions" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "user_profile_id" uuid,
  "user_entity_id" uuid,
  "action_status_id" INTEGER,
  "is_active" boolean DEFAULT true,
  "created_by" uuid,
  "updated_by" uuid,
  "created_at" timestamptz DEFAULT (now() at time zone 'utc'),
  "updated_at" timestamptz DEFAULT (now() at time zone 'utc'),

   CONSTRAINT "track_token_order_actions_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "track_token_order_actions" ADD FOREIGN KEY ("user_profile_id") REFERENCES "user_profiles" ("id");

ALTER TABLE "track_token_order_actions" ADD FOREIGN KEY ("user_entity_id") REFERENCES "entities" ("id");

ALTER TABLE "track_token_order_actions" ADD FOREIGN KEY ("action_status_id") REFERENCES "master_order_status" ("id");

ALTER TABLE "track_token_order_actions" ADD FOREIGN KEY ("created_by") REFERENCES "user_profiles" ("id");

ALTER TABLE "track_token_order_actions" ADD FOREIGN KEY ("updated_by") REFERENCES "user_profiles" ("id");
