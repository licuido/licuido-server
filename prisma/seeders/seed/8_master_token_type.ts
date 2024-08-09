import { master_token_type } from "@prisma/client";

export const masterTokenType: {
  table: string;
  data: master_token_type[];
} = {
  table: "master_token_type",
  data: [
    {
      id: 1,
      name: "Equity",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Utility",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Security",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Fund",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      name: "Debt",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      name: "Stablecoin",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 7,
      name: "Commodity",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 8,
      name: "Others",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
