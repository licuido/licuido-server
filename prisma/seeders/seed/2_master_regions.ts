import { master_regions } from "@prisma/client";

export const masterRegions: { table: string; data: master_regions[] } = {
  table: "master_regions",
  data: [
    {
      id: 1,
      name: "North America",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Central America",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "South America",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Caribbean",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      name: "Europe",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      name: "Africa",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 7,
      name: "Middle East",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 8,
      name: "Asia",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 9,
      name: "Oceania",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 10,
      name: "Antarctic",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
