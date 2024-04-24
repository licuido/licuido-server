CREATE TABLE "master_position" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_position_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "public"."user_profiles"
ADD COLUMN position_id INTEGER;

ALTER TABLE "user_profiles" ADD FOREIGN KEY ("position_id") REFERENCES "master_position" ("id");
