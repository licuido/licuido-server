CREATE TABLE "position_reports" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "title" TEXT,
  "start_date" DATE,
  "end_date" DATE,
  "start_time" TIME,
  "end_time" TIME,
  "is_all_investors" boolean DEFAULT false,
  "is_active" boolean DEFAULT true,
  "created_by" uuid,
  "updated_by" uuid,
  "created_at" timestamptz DEFAULT (now() at time zone 'utc'),
  "updated_at" timestamptz DEFAULT (now() at time zone 'utc'),

   CONSTRAINT "position_reports_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "position_reports" ADD FOREIGN KEY ("created_by") REFERENCES "user_profiles" ("id");

ALTER TABLE "position_reports" ADD FOREIGN KEY ("updated_by") REFERENCES "user_profiles" ("id");


CREATE TABLE "position_report_investors" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "investor_id" uuid 
  "is_active" boolean DEFAULT true,
  "created_by" uuid,
  "updated_by" uuid,
  "created_at" timestamptz DEFAULT (now() at time zone 'utc'),
  "updated_at" timestamptz DEFAULT (now() at time zone 'utc'),

   CONSTRAINT "position_report_investors_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "position_report_investors" ADD FOREIGN KEY ("investor_id") REFERENCES "entities" ("id");
