export interface createTransaction {
  type: "mint" | "burn";
  order_id: string;
  amount: number;
  sender_balance: number;
  total_supply: number;
  status_id: number;
  block_token: number;
  unblock_token: number;
  created_by?: string;
  is_active: boolean;
}

export interface getAllTransaction {
  type: string;
  token_offering_id?: string;
  search?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  offset: number;
  limit: number;
  issuer_id: string;
  investor_id: string;
}

export interface updateTransaction {
  sender_balance?: number;
  total_supply?: number;
  status_id: number;
  block_token?: number;
  unblock_token?: number;
  updated_by?: string;
}
