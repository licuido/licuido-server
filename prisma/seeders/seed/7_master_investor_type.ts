import { master_investor_types } from "@prisma/client";

export const masterInvestorType: {
  table: string;
  data: master_investor_types[];
} = {
  table: "master_investor_types",
  data: [
    {
      id: 1,
      name: "Corporate",
      is_active: true,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Individual",
      is_active: false,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
