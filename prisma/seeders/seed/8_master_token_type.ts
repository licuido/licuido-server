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
      name: "Other",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
