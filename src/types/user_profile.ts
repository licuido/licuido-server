export interface signInType {
  email_id: string;
  password: string;
  entity_id: number;
  is_agree_terms_condition: boolean;
}
export interface forgetPasswordInterface {
  email_id: string;
}
export interface verifyOTPInterface {
  email_id: string;
  otp: string;
}
export interface resetPasswordInterface {
  new_password: string;
}
export interface resetUserPasswordPayload {
  old_password: string;
  new_password: string;
}
