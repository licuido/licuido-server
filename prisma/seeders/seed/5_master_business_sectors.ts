import { master_business_sectors } from "@prisma/client";

export const masterBusinessSectors: {
  table: string;
  data: master_business_sectors[];
} = {
  table: "master_business_sectors",
  data: [
    {
      id: 1,
      name: "Investment management",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Banking",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Real Estate",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Technology",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      name: "Healthcare",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
