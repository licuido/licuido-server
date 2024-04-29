import { master_token_offering_status } from "@prisma/client";

export const masterTokenOffering: {
  table: string;
  data: master_token_offering_status[];
} = {
  table: "master_token_offering_status",
  data: [
    {
      id: 1,
      name: "Active",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Pause",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
