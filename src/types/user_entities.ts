export interface getInvestorDataForQualificationPayload {
  entity_type_id: 1 | 2 | 3;
  offset: number;
  limit: number;
  search?: string;
  status_filter?: string;
  kyc_status_filter?: string;
  investor_type_filter?: string;
}
