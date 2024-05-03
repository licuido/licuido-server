import { master_ekc_status } from "@prisma/client";

export const masterEkycStatus: {
  table: string;
  data: master_ekc_status[];
} = {
  table: "master_ekc_status",
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
      name: "Approved",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
