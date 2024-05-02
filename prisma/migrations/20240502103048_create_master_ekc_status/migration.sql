CREATE TABLE "master_ekc_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ekc_status_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "public"."ekyc"
ADD COLUMN status_id INTEGER;

ALTER TABLE "ekyc" ADD FOREIGN KEY ("status_id") REFERENCES "master_ekc_status" ("id");
