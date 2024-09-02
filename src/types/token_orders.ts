export interface createTokenSubscriptionOrderPayload {
  type: "subscription" | "redemption";
  investment_type: "by_token_volume" | "by_investment_value";
  issuer_entity_id: string;
  token_offering_id: string;
  currency: string;
  currency_code: string;
  ordered_tokens: number;
  price_per_token: number;
  net_investment_value: number;
  fee?: number;
  total_paid?: number;
  payment_reference?: string;
  user_entity_id: string;
  user_profile_id: string;
}

export interface createTokenOrders
  extends Omit<
    createTokenSubscriptionOrderPayload,
    "issuer_profile_id" | "user_entity_id" | "user_profile_id"
  > {
  receiver_entity_id: string;
  created_by: string;
  is_active: boolean;
  status_id: 1 | 2 | 3 | 4;
  bank_name?: string;
  bank_account_name?: string;
  swift_bic_no?: string;
  iban_no?: string;
  fulfilled_by: "admin" | "issuer";
}

export interface createTokenRedemptionOrderPayload
  extends Omit<
    createTokenSubscriptionOrderPayload,
    "fee" | "payment_reference"
  > {
  bank_name: string;
  bank_account_name: string;
  swift_bic_no: string;
  iban_no: string;
}

export interface updateTokenOrders {
  status_id?: number;
  last_action_track_id?: string;
  recived_amount_in_euro?: number;
  is_payment_confirmed?: boolean;
  payment_reference?: string;
  updated_by: string;
  reason_for_reject?: string;
  rejected_blockchain_reference_id?: string;
  remarks?: string;
  recived_amount_by_token?: number;
}

export interface getSubscriptionOrderPayload {
  entity_type_id: number;
  offset: number;
  limit: number;
  user_entity_id?: string;
  search?: string;
  status_filter?: string;
  investment_currency_filter?: string;
  start_date?: string;
  end_date?: string;
  order_fulfillment_filter?: string;
  token_id?: string;
}

export interface getRedemptionOrderPayload {
  entity_type_id: number;
  offset: number;
  limit: number;
  user_entity_id?: string;
  search?: string;
  status_filter?: string;
  start_date?: string;
  end_date?: string;
  order_fulfillment_filter?: string;
  token_id?: string;
}

export interface getTokenSubscriptionOrderAsCSVPayload
  extends Omit<getSubscriptionOrderPayload, "offset" | "limit"> {}

export interface getTokenRedemptionOrderAsCSVPayload
  extends Omit<getRedemptionOrderPayload, "offset" | "limit"> {}
