ALTER TABLE offer_fund_ratings DROP COLUMN agency;
ALTER TABLE offer_fund_ratings DROP COLUMN rating;


CREATE TABLE "master_fund_agencies" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_fund_agencies_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "master_fund_agency_ratings" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "is_active" BOOLEAN,
    "agency_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_fund_agency_ratings_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "public"."offer_fund_ratings" ADD COLUMN agency_id INTEGER;
ALTER TABLE "public"."offer_fund_ratings" ADD FOREIGN KEY ("agency_id") REFERENCES "public"."master_fund_agencies" ("id");


ALTER TABLE "public"."offer_fund_ratings" ADD COLUMN rating_id INTEGER;
ALTER TABLE "public"."offer_fund_ratings" ADD FOREIGN KEY ("rating_id") REFERENCES "public"."master_fund_agency_ratings" ("id");
