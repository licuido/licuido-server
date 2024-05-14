import { master_order_status } from "@prisma/client";

export const masterOrderStatus: {
  table: string;
  data: master_order_status[];
} = {
  table: "master_order_status",
  data: [
    {
      id: 1,
      name: "Pending Order",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Pending Confirmation",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Payment Confirmed",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Payment Sent",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      name: "Minted",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      name: "Redeemed",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 7,
      name: "Cancelled by Investor",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 8,
      name: "Rejected By Issuer",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 9,
      name: "Request to mint",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 10,
      name: "Request to burn",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
