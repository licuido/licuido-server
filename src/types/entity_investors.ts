export interface UpsertInvestorQualifyStatusPayload {
  user_profile_id?: string;
  user_entity_id?: string;
  status_id: 1 | 2 | 3;
  id: string;
  investor_type_id: 1 | 2;
  investor_entity_id: string;
}
