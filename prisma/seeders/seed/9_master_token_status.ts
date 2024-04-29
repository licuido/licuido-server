import { master_token_status } from "@prisma/client";

export const masterTokenStatus: {
  table: string;
  data: master_token_status[];
} = {
  table: "master_token_status",
  data: [
    {
      id: 1,
      name: "Open",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Closed",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Draft",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
