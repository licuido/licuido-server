import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import models from "../../../models";
import { decrypt } from "../../encryption";

const nodeMailerTypes = [
  "gmail",
  "office365",
  "hotmail",
  "sparkpost",
  "yandex",
  "outlook",
  "outlook365",
  "mailgun",
  "mailchimp",
  "sendgrid",
  "pinpoint",
  "aws",
  "azure",
];

const fetch_mail_provider = async ({ tokenProfileId, mail_provider_id }) => {
  try {
    let condition = {
      profileId: tokenProfileId,
      isActive: true,
      isDelete: false,
    };
    if (mail_provider_id) condition["identification_name"] = mail_provider_id;
    else condition["isDefault"] = true;
    let data = await models.email_configurations.findOne({
      raw: true,
      where: condition,
    });
    return {
      mail_provider: data?.email_provider || null,
      config: data,
      type: "Success",
    };
  } catch (error) {
    console.log("Error while fetching email provider: ", error);
  }
};

const mail_service = async (req, dbData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        reference_id,
        alert_rule_code,
        from_mail,
        to_emails,
        email_CC,
        email_BCC,
        email_subject,
        email_body,
        email_attachments,
        tokenProfileId,
        mail_provider_id,
      } = req;

      // Checking receivers
      if (!Array.isArray(to_emails)) {
        return resolve({
          statusCode: 420,
          message: "to_emails field must be an Array",
        });
      }

      if (to_emails.length === 0) {
        return resolve({
          statusCode: 420,
          message: "to_emails field must be valid",
        });
      }

      // Validating CC and BCC
      if (email_CC && !Array.isArray(email_CC)) {
        return resolve({
          statusCode: 420,
          message: "cc_body must be an array",
        });
      }

      if (email_BCC && !Array.isArray(email_BCC)) {
        return resolve({
          statusCode: 420,
          message: "bcc_body must be an array",
        });
      }

      // Email Attachment validation
      if (email_attachments && !Array.isArray(email_attachments)) {
        return resolve({
          statusCode: 420,
          message:
            "email_attachments field does NOT contains a valid array json",
        });
      }

      if (
        email_attachments &&
        email_attachments.length > 0 &&
        Array.isArray(email_attachments)
      ) {
        let isValid = true;
        await Promise.all(
          email_attachments.map((att) => {
            Object.keys(att).forEach((attkeys) => {
              if (!att[attkeys]) {
                isValid = false;
                return;
              }
            });
          })
        );
        if (!isValid) {
          return resolve({
            statusCode: 420,
            message: "Invalid Email Attachments",
          });
        }
      }

      if (Array.isArray(email_subject) && (alert_rule_code || reference_id)) {
        // Replacing email subject with dynamic params
        email_subject.forEach((ele, i) => {
          dbData["email_subject"] = dbData["email_subject"].replace(
            new RegExp(`%${i + 1}%`, "g"),
            ele
          );
        });
      }

      // Replacing email body with dynamic params
      if (Array.isArray(email_body) && (alert_rule_code || reference_id)) {
        email_body.forEach((ele, i) => {
          dbData["email_body"] = dbData["email_body"].replace(
            new RegExp(`%${i + 1}%`, "g"),
            ele
          );
        });
      }

      // Variables for email
      let from = from_mail;
      let to = to_emails?.toString();
      let subject = dbData["email_subject"] || email_subject?.toString();
      let html = dbData["email_body"] || email_body?.toString();
      let cc = email_CC?.toString() || dbData["email_CC"] || "";
      let bcc = email_BCC?.toString() || dbData["email_BCC"] || "";
      let attachments = email_attachments || [];

      // Returning response if subject and body are empty
      if (!subject && !html) {
        return resolve({
          statusCode: 420,
          message: "Email subject and body must NOT be empty",
        });
      }

      let { mail_provider, config } = await fetch_mail_provider({
        tokenProfileId,
        mail_provider_id,
      });

      let transporter;

      if (
        mail_provider &&
        nodeMailerTypes.includes(mail_provider.toLowerCase())
      ) {
        from = from_mail || config["from_mail"];

        const apiKey = await decrypt({
          hash: config["api_key"],
          tokenProfileId,
        });

        const domain = await decrypt({
          hash: config["mail_domain"],
          tokenProfileId,
        });

        const user = await decrypt({
          hash: config["smtp_username"],
          tokenProfileId,
        });

        const pass = await decrypt({
          hash: config["smtp_password"],
          tokenProfileId,
        });

        if (
          domain &&
          !domain.includes("sandbox") &&
          !domain.includes("mailgun.org") &&
          !from.toLowerCase().includes(domain.toLowerCase())
        ) {
          resolve({
            statusCode: 401,
            message: "Unauthorized from email address domain",
          });
        }

        // Create transporter object with smtp server details
        if (mail_provider.toLowerCase() === "sendgrid") {
          transporter = nodemailer.createTransport(
            sendgridTransport({
              auth: {
                api_key: apiKey,
              },
            })
          );
        } else {
          transporter = nodemailer.createTransport({
            pool: true,
            service: mail_provider,
            auth: {
              user,
              pass,
            },
          });
        }
      } else {
        resolve({
          statusCode: 400,
          message: "Please configure email provider information!",
        });
      }

      // Email triggering point
      if (mail_provider.toLowerCase() !== "pinpoint") {
        await transporter
          .sendMail({
            from,
            to,
            cc,
            bcc,
            subject,
            html: Array.isArray(html) ? JSON.stringify(html) : html,
            attachments,
          })
          .then((info) => {
            resolve({
              id: info.messageId,
              type: "Success",
              message: "Email has been sent successfully",
              sent_via: mail_provider,
              isDefaultProvider: config?.isDefault || false,
            });
          })
          .catch((err) => {
            resolve({
              statusCode: 400,
              message: err?.message,
              details: err,
            });
          });
      }
    } catch (err) {
      resolve({ statusCode: 400, message: err.message });
    }
  });
};

export default mail_service;
