export interface createUserDeviceToken {
  user_profile_id?: string;
  token?: string;
  created_by?: string;
}

export interface updateUserDeviceToken {
  device_token_id: string;
  user_profile_id: string;
}
