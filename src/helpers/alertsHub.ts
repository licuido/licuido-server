// import AlertshubClient from "@crayond_dev/alertshub-client-sdk";

import { Logger } from "@helpers";
// import { env } from "@config";

interface EmailAttachment {
  content?: string;
  filename?: string;
  type?: string;
  disposition?: string;
}

interface PushAction {
  title?: string;
  action?: string;
}

interface sendAlertOptions {
  reference_id: string;
  // ----SMS----
  to_mobiles?: string[];
  sms_body?: string[];
  // ----EMAIL----
  to_emails: string[];
  email_CC?: string[];
  email_BCC?: string[];
  from_mail?: string;
  email_subject?: string[];
  email_body?: string[];
  email_attachments?: EmailAttachment[];
  mail_provider_id?: string;
  // ----WHATSAPP----
  whatsapp_body?: any;
  whatsapp_template_name?: string;
  language_code?: string;
  whatsapp_provider_name?: string;
  // ----INAPP----
  inapp_title?: any[];
  inapp_body?: any[];
  inapp_image?: string;
  inapp_action1?: string;
  inapp_action2?: string;
  inapp_type?: string;
  inapp_eventReferenceId?: string;
  inapp_clientIds?: string[];
  inapp_icon?: string;
  alert_rule_code?: string;
  is_user_specific_notification?: boolean;
  // ----PUSH----
  push_receivers?: string[];
  push_title?: string[];
  push_body?: string[];
  push_data?: string;
  push_click_action?: string;
  push_icon?: string;
  push_image?: string;
  push_actions?: PushAction[];
  push_receiver_clientIds?: string[];
  // ----SLACK----
  slack_to?: string;
  slack_body?: string;
  slack_provider_name?: string;
}

// class AlertsHub extends AlertshubClient {
//   constructor() {
//     super({ apiKey: env.ALERTSHUB_KEY });
//   }

//   // ----------SEND ALERT-----------------
//   async sendAlert(options: sendAlertOptions) {
//     try {
//       return super.triggerAlert({ ...options }).catch((error) => {
//         Logger.error(error.message, error);
//         throw new Error(error.message);
//       });
//     } catch (error: any) {
//       Logger.error(error.message, error);
//       throw new Error(error.message);
//     }
//   }
// }

// const alertsHub = new AlertsHub();

export const sendAlert = async (options: sendAlertOptions) => {
    try {
      // return await alertsHub.sendAlert({ ...options });
      console.log(options,"We did not configured alerts it's just function")
    } catch (error: any) {
      Logger.error(error.message, error);
      throw new Error(error.message);
    }
  };
