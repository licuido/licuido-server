export interface createPositionReport {
  title: string;
  investors?: string[];
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  is_all_investors?: boolean;
  user_profile_id: string;
  user_entity_id: string;
}

export interface getAllPositionReportsType {
  id: string;
  offset: number;
  limit: number;
  search?: string;
  reporting_start_date?: string;
  reporting_end_date?: string;
  creation_start_date?: string;
  creation_end_date?: string;
}

export interface getAllInvestorsType {
  id: string;
  offset: number;
  limit: number;
  reporting_start?: string;
  reporting_end?: string;
  is_all_investors?: boolean;
  user_entity_id?: string;
}

export interface getAllInvestorsCSVType {
  id: string;
  reporting_start?: string;
  reporting_end?: string;
  is_all_investors?: boolean;
  user_entity_id?: string;
}
