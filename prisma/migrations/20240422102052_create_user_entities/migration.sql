CREATE TABLE "user_entities" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "entity_id" integer,
  "user_profile_id" uuid,
  "is_active" boolean DEFAULT true,
  "created_by" uuid,
  "updated_by" uuid,
  "created_at" timestamptz DEFAULT (now() at time zone 'utc'),
  "updated_at" timestamptz DEFAULT (now() at time zone 'utc'),

   CONSTRAINT "user_entities_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "user_entities" ADD FOREIGN KEY ("entity_id") REFERENCES "master_entity_types" ("id");

ALTER TABLE "user_entities" ADD FOREIGN KEY ("user_profile_id") REFERENCES "user_profiles" ("id");

ALTER TABLE "user_entities" ADD FOREIGN KEY ("created_by") REFERENCES "user_profiles" ("id");

ALTER TABLE "user_entities" ADD FOREIGN KEY ("updated_by") REFERENCES "user_profiles" ("id");