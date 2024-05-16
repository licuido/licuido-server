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
      name: "Paused",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Not deployed yet",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Rejected",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      name: "Deployed",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
