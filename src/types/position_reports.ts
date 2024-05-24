export interface createPositionReport {
  title: string;
  investors?: string[];
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  is_all_investors?: boolean;
  user_profile_id: string;
  issuer_entity_id: string;
}
