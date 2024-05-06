import { master_order_status } from "@prisma/client";

export const masterOrderStatus: {
  table: string;
  data: master_order_status[];
} = {
  table: "master_order_status",
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
      name: "In Progress",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Success",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Reject",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
