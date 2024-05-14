export interface createBusinessDocument {
  business_id: string;
  asset_id: string;
  asset_type: string;
  is_active: boolean;
  created_by: string;
}

export interface createBusinessDocumentPayload {
  entity_id: string;
  business_registeration_url?: string;
  auth_url?: string;
  deleted_asset?: string[];
  user_profile: string;
  registeration_file_meta?: object;
  authorization_file_meta?: object;
}
