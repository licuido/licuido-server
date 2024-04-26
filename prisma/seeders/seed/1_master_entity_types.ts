import { master_entity_types } from "@prisma/client";

export const masterEntityTypes: { table: string; data: master_entity_types[] } =
  {
    table: "master_entity_types",
    data: [
      {
        id: 1,
        name: "Admin",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "Investor",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "Issuer",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  };
