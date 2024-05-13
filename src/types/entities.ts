export interface createEntity {
  entity_type_id: number;
  legal_name?: string;
  lei_number?: string;
  legal_address?: string;
  zipcode?: string;
  country_id?: number;
  business_sector_id?: number;
  contact_profile_id: string;
  created_at?: Date;
  created_by?: string;
  id?: string;
  logo?: string;
  logo_type?: string;
  investor_type_id?: number;
  logo_asset_id?: string;
  file_meta?: object;
}

export interface findEntity {
  entity_type_id: number;
  contact_profile_id: string;
}
