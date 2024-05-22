import { master_transaction_status } from "@prisma/client";

export const masterTransactionStatus: {
  table: string;
  data: master_transaction_status[];
} = {
  table: "master_transaction_status",
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
      name: "Confirmed",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
