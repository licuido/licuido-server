import mail_service from "./mail";

export const message_service = (req) => {
  let { alert_rule_code, reference_id, tokenProfileId } = req;

  return new Promise(async (resolve, reject) => {
    try {
      if (alert_rule_code || reference_id) {
        models.alert_rules
          .findOne({
            where: {
              [models.Sequelize.Op.or]: {
                reference_id: alert_rule_code,
                reference_id: reference_id,
              },
              profileId: tokenProfileId,
              isActive: true,
              isDelete: false,
            },
            raw: true,
          })
          .then(async (roledetail) => {
            if (roledetail) {
              await trigger_notifications({ resolve, reject, req, roledetail });
            } else {
              reject({
                statusCode: 420,
                message:
                  "Please make sure reference ID or Alert Rule Code rule and also check is in Active state",
              });
            }
          })
          .catch((err) => {
            reject({ statusCode: 400, type: "Error", message: err.message });
          });
      } else {
        await trigger_notifications({ resolve, reject, req, roledetail: {} });

        // reject({
        //   statusCode: 420,
        //   message: "Alert Rule ID or Reference ID must NOT be empty",
        // });
      }
    } catch (err) {
      reject({ statusCode: 400, type: "Error", message: err.message });
    }
  });
};

const trigger_notifications = async ({ resolve, reject, req, roledetail }) => {
  try {
    let resp = "";

    let mail_status;
    let sms_status;
    let push_status;
    let whatsapp_status;
    let inapp_status;
    let slack_status;

    let {
      notification_type = [],
      tokenProfileId,
      timeStamp,
      is_send_inapp_notification = true,
    } = req;

    if (tokenProfileId) {
      let reports = {
        alertId: roledetail.id,
        profileId: tokenProfileId,
        request_body: req,
        createdAt: timeStamp || new Date().toISOString(),
        updatedAt: timeStamp || new Date().toISOString(),
        createdBy: tokenProfileId,
        updatedBy: tokenProfileId,
      };

      if (roledetail?.is_email || notification_type.includes("email")) {
        mail_status = await mail_service(req, roledetail);
        if (!mail_status["statusCode"]) {
          resp = " EMAIL";
        }
      }

      if (
        is_send_inapp_notification &&
        (roledetail?.is_inapp || notification_type.includes("inapp"))
      ) {
        inapp_status = await inapp_service(req, roledetail);
        if (!inapp_status["statusCode"]) {
          if (resp) {
            resp += " and In_App";
          } else {
            resp = "In_App";
          }
        }
      }

      //storing reports
      reports["email_response"] = mail_status;
      reports["inapp_response"] = inapp_status;
      //   updateReportStatus(reports);

      if (resp) {
        resolve({
          message: "Notification has been sent via" + resp,
          type: "Success",
          mail_status,
          sms_status,
          push_status,
          whatsapp_status,
          slack_status,
          inapp_status,
        });
      } else {
        reject({
          statusCode: 400,
          type: "Info",
          message:
            "Could NOT send notification. Please verify input params once again",
          mail_status,
          sms_status,
          push_status,
          whatsapp_status,
          slack_status,
          inapp_status,
        });
      }
    } else {
      reject({
        statusCode: 401,
        type: "Error",
        message: "Alert_key must NOT be empty",
        mail_status,
        sms_status,
        push_status,
        whatsapp_status,
        slack_status,
        inapp_status,
      });
    }
  } catch (err) {
    console.log("Error while triggering alerts : ", err);
    reject({
      statusCode: 500,
      type: "Error",
      message: err.message || "Something went wrong!",
    });
  }
};
