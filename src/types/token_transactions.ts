export interface createTransaction {
  type: 'mint'|'burn';
  order_id: string;
  amount: number;
  sender_balance: number;
  receiver_balance: number;
  total_supply: number;
  transaction_hash: string;
  status_id: number;
  block_token: number;
  unblock_token: number;
  created_by?:string;
}
