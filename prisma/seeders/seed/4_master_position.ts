import { master_position } from "@prisma/client";

export const masterPositon: { table: string; data: master_position[] } = {
  table: "master_position",
  data: [
    {
      id: 1,
      name: "CEO",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Manager",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Software Engineer",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Data Analyst",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      name: "Sales Manager",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      name: "Marketing Specialist",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 7,
      name: "HR Manager",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 8,
      name: "Other",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
