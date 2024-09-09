export interface createTokenOffering {
  issuer_entity_id: string;
  name: string;
  description: string;
  isin_number: string;
  symbol: string;
  base_currency: string;
  base_currency_code: string;
  blockchain_network: number;
  logo_asset_id: string;
  banner_asset_id: string;
  offering_price: number;
  jurisdiction: number;
  start_date: string;
  end_date: string;
  minimum_investment_limit: number;
  maximum_investment_limit: number;
  bank_name: string;
  bank_account_name: string;
  swift_bic_no: string;
  iban_no: string;
  is_fund_rating_enabled: boolean;
  is_projected_rate_of_return_enabled: boolean;
  is_expected_annual_perc_yield_enabled: boolean;
  is_payback_period_enabled: boolean;
  is_eligible_for_collateral_enabled: boolean;
  offer_status_id?: number;
  is_all_countries_allowed: boolean;
  created_by: string;
  status_id: number;
  token_type_id: number;
  is_active: boolean;
  projected_rate_return?: string;
  annual_percentage_yield?: string;
  payback_period?: string;
  payback_period_type?: string;
  offering_price_in_euro?: number;
}

export interface createTokenOfferingCurrencies {
  token_offering_id: string;
  currency: string;
  currency_code: string;
  is_active: boolean;
  created_by: string;
}

export interface createTokenOfferingDocuments {
  token_offering_id: string;
  document_id: string;
  is_active: boolean;
  created_by: string;
}

export interface createTokenOfferingCountries {
  token_offering_id: string;
  allowed_country_id: number;
  is_active: boolean;
  created_by: string;
}
export interface createTokenOfferingTeams {
  token_offering_id: string;
  member_name: string;
  member_title: string;
  member_picture_id?: string;
  is_active: boolean;
  created_by: string;
}

export interface createTokenOfferingPayload {
  user_entity_id: string;
  name: string;
  description: string;
  isin_number: string;
  symbol: string;
  base_currency: string;
  base_currency_code: string;
  blockchain_network: number;
  token_type_id: number;
  logo_asset: {
    url: string;
    type: string;
    file_meta?: object;
  };
  banner_asset: {
    url: string;
    type: string;
    file_meta?: object;
  };
  offering_price: number;
  jurisdiction: number;
  start_date: string;
  end_date: string;
  minimum_investment_limit: number;
  maximum_investment_limit: number;
  bank_name: string;
  bank_account_name: string;
  swift_bic_no: string;
  iban_no: string;
  is_fund_rating_enabled: boolean;
  is_projected_rate_of_return_enabled: boolean;
  is_expected_annual_perc_yield_enabled: boolean;
  is_payback_period_enabled: boolean;
  is_eligible_for_collateral_enabled: boolean;
  offer_status_id: number;
  is_all_countries_allowed: boolean;
  user_profile_id: string;
  allowed_currencies: {
    currency: string;
    currency_code: string;
  }[];
  allowed_countries: number[];
  documents?: {
    url: string;
    type: string;
    file_meta?: object;
  }[];
  teams: {
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
      file_meta?: object;
    };
  }[];
  fund_rating?: {
    rating_id?: string;
    agency: number;
    rating: number;
  }[];
  status: 1 | 2 | 3;
  projected_rate_return?: string;
  annual_percentage_yield?: string;
  payback_period?: string;
  payback_period_type?: string;
}

export interface createTokenOfferingSubData {
  allowed_currencies: {
    currency: string;
    currency_code: string;
  }[];
  allowed_countries: number[];
  documents?: {
    url: string;
    type: string;
    file_meta?: object;
  }[];
  teams: {
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
      file_meta?: object;
    };
  }[];
  fund_rating?: {
    agency: number;
    rating: number;
  }[];
}

export interface updateTokenOfferingPayload
  extends Omit<
    createTokenOfferingPayload,
    | "user_entity_id"
    | "created_by"
    | "offer_status_id"
    | "allowed_currencies"
    | "allowed_countries"
    | "status"
    | "documents"
    | "teams"
  > {
  updated_by: string;
  token_id: string;
  added_currencies: {
    currency: string;
    currency_code: string;
  }[];
  removed_currencies: string[];
  added_countries: number[];
  removed_countries: string[];
  added_documents: {
    url: string;
    type: string;
    file_meta?: object;
  }[];
  removed_documents: string[];
  new_team_members: {
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
      file_meta?: object;
    };
  }[];
  removed_team_members: string[];
  fund_rating?: {
    agency: number;
    rating: number;
  }[];
  updated_team_members: {
    member_id: string;
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
      file_meta?: object;
    };
  }[];
  projected_rate_return: string;
  annual_percentage_yield: string;
  payback_period: string;
  payback_period_type: string;
}

export interface updateTokenOffering
  extends Omit<
    createTokenOffering,
    | "issuer_entity_id"
    | "created_by"
    | "is_active"
    | "status_id"
    | "offer_status_id"
  > {
  updated_by: string;
  circulating_supply_count?: number;
}

export interface updateTokenOfferingSubData {
  added_currencies?: {
    currency: string;
    currency_code: string;
  }[];
  removed_currencies?: string[];
  added_countries?: number[];
  removed_countries?: string[];
  added_documents?: {
    url: string;
    type: string;
    file_meta?: object;
  }[];
  removed_documents?: string[];
  new_team_members?: {
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
      file_meta?: object;
    };
  }[];
  removed_team_members?: string[];
  updated_team_members?: {
    member_id: string;
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
      file_meta?: object;
    };
  }[];
  fund_rating?: {
    agency: number;
    rating: number;
    rating_id?: string;
  }[];
}

export interface updateTokenOfferingTeams
  extends Omit<
    createTokenOfferingTeams,
    "token_offering_id" | "created_by" | "is_active"
  > {
  updated_by: string;
}

export interface TeamsPayload {
  member_name: string;
  member_title: string;
  updated_by: string;
  member_picture_id?: string;
}

export interface FundRatingPayload {
  agency_id: number;
  rating_id: number;
  offer_token_id?: string;
  created_by?: string;
  updated_by?: string;
}

export interface createTokenValuation {
  token_id: string;
  offer_price: number;
  bid_price: number;
  start_date: string;
  start_time: string;
  created_by?: string;
  updated_by?: string;
  valuation_price: number;
  user_entity_id?: string;
  user_profile_id?: string;
}

export interface getAllTokenAdmin {
  offset: number;
  limit: number;
  search?: string;
  status?: string;
  currency?: string;
  token_type?: string;
  block_chain?: string;
  created_by?: string;
  issuer?: string;
}

export interface getAllFundOfferings {
  offset?: number;
  limit?: number;
  user_entity_id?: string;
  request?: any;
  statusId?: any;
  search?: string;
  symbol?: string;
  bankName?: string;
  bankAccountName?: string;
  blockchain_network?: number;
}
