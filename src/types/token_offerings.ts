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
  member_picture_id: string;
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
  };
  banner_asset: {
    url: string;
    type: string;
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
  }[];
  teams: {
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
    };
    member_type: string;
  }[];
  status: 1 | 2 | 3;
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
  }[];
  teams: {
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
    };
    member_type: string;
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
  }[];
  removed_documents: string[];
  new_team_members: {
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
    };
    member_type: string;
  }[];
  removed_team_members: string[];
  updated_team_members: {
    member_id: string;
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
    };
    member_type: string;
  }[];
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
  }[];
  removed_documents?: string[];
  new_team_members?: {
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
    };
    member_type: string;
  }[];
  removed_team_members?: string[];
  updated_team_members?: {
    member_id: string;
    member_name: string;
    member_title: string;
    member_picture: {
      url: string;
      type: string;
    };
    member_type: string;
  }[];
}

export interface updateTokenOfferingTeams
  extends Omit<
    createTokenOfferingTeams,
    "token_offering_id" | "created_by" | "is_active"
  > {
  updated_by: string;
}
