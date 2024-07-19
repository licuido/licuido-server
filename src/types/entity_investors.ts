export interface UpsertInvestorQualifyStatusPayload {
  user_profile_id?: string;
  user_entity_id?: string;
  status_id: 1 | 2 | 3;
  id: string;
  investor_type_id: 1 | 2;
  investor_entity_id: string;
}

export interface getInvestorListPayload {
  offset: number;
  limit: number;
  search?: string;
  status_filter?: string;
  investor_type_filter?: string;
  country_filter?: string;
  user_entity_id?: string;
  minimum_investment_value?: string;
  maximum_investment_value?: string;
  request?: any;
  top_five?: boolean;
}

export interface getInvestorListAsCSVPayload {
  search?: string;
  status_filter?: string;
  investor_type_filter?: string;
  country_filter?: string;
  user_entity_id?: string;
  minimum_investment_value?: string;
  maximum_investment_value?: string;
}
