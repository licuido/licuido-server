
import { master_fund_agencies } from "@prisma/client";

export const masterFundAgencies: {
  table: string;
  data: master_fund_agencies[];
} = {
  table: "master_fund_agencies",
  data: [
    {
      id: 1,
      name: "Standard & Poor's (S&P)",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Japan Credit Rating Agency (JCR)",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }
  ],
};
