
import { master_fund_agency_ratings } from "@prisma/client";

export const masterFundAgencyRatings: {
  table: string;
  data: master_fund_agency_ratings[];
} = {
  table: "master_fund_agency_ratings",
  data: [
    {
      id: 1,
      name: "AAA",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      agency_id:1,
    },
    {
      id: 2,
      name: "AA",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      agency_id:1,
    },
    {
        id: 3,
        name: "AAA",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
        agency_id:2,
      },
      {
        id: 4,
        name: "BBB",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
        agency_id:2,
      }
  ],
};
