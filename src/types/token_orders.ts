export interface createTokenOrderPayload {
  issuer_profile_id: string;
  type: "subscription" | "redemption";
  invesment_type: "by_token_volume" | "by_investment_value";
  issuer_entity_id: string;
  token_offering_id: string;
  currency: string;
  currency_code: string;
  ordered_tokens: number;
  price_per_token: number;
  net_investment_value: number;
  fee: number;
  total_paid: number;
  payment_reference: string;
  user_entity_id: string;
  user_profile_id: string;
}

export interface createTokenOrders
  extends Omit<
    createTokenOrderPayload,
    "issuer_profile_id" | "user_entity_id" | "user_profile_id"
  > {
  receiver_entity_id: string;
  created_by: string;
  is_active: boolean;
  status_id: 1 | 2 | 3 | 4;
}
