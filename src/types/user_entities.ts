export interface getInvestorDataForQualificationPayload {
  entity_type_id: 1 | 2 | 3;
  user_profile_id?: string;
  offset: number;
  limit: number;
  search?: string;
  status_filter?: string;
  kyc_status_filter?: string;
  investor_type_filter?: string;
}
