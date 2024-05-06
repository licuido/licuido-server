import { master_entity_investor_status } from "@prisma/client";

export const masterEntityInvestorStatus: {
  table: string;
  data: master_entity_investor_status[];
} = {
  table: "master_entity_investor_status",
  data: [
    {
      id: 1,
      name: "Pending",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Considered",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Approved",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
