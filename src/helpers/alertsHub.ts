import { Logger, makeNetworkRequest } from "@helpers";
import { env } from "@config";

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
  push_icon?: string;
  push_receivers?: string[];
  push_title?: string[];
  push_body?: string[];
  to_emails?: string[];
  email_subject?: string[];
  email_body: string[];
  to_mobiles?: string[];
  sms_body?: string[];
  URL?: string;
  push_click_action?: PushAction[];
  email_attachments?: EmailAttachment[];
  push_data?: any;
}

class AlertsHub {
  // ----------SEND ALERT-----------------
  async sendAlert(options: sendAlertOptions) {
    try {
      const response: any = await makeNetworkRequest(
        {
          url: env.ALERTHUB_ENDPOINT,
          config: {
            method: "POST",
          },
        },
        {
          ...options,
          alert_key: env.ALERTSHUB_KEY,
        }
      );

      return response;
    } catch (error: any) {
      Logger.error(error.message, error);
      throw new Error(error.message);
    }
  }
}

const alertsHub = new AlertsHub();

export const sendAlert = async (options: sendAlertOptions) => {
  try {
    return await alertsHub.sendAlert({ ...options });
  } catch (error: any) {
    Logger.error(error.message, error);
    throw new Error(error.message);
  }
};
