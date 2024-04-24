

import { master_wallet_types } from "@prisma/client";

export const masterWallet: {
  table: string;
  data: master_wallet_types[];
} = {
  table: "master_wallet_types",
  data: [
    {
      id: 1,
      name: "komainu",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }
  ],
};
