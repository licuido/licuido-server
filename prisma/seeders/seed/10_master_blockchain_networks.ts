import { master_blockchain_networks } from "@prisma/client";

export const masterBlockChainNetworks: {
  table: string;
  data: master_blockchain_networks[];
} = {
  table: "master_blockchain_networks",
  data: [
    {
      id: 1,
      name: "Bitcoin (BTC)",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Ethereum (ETH)",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Binance Smart Chain (BSC)",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Avalanche (AVAX)",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      name: "Ripple (XRP)",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      name: "Polygon (MATIC)",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};
