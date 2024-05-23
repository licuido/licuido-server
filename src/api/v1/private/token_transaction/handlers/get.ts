import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, dateTime, handleResponse, responseType } from "@helpers";
import { TokenTransaction } from "interactors";
import { queryRequestInfo } from "@mappers";
import { makeExcelFile } from "@utils";

export async function GET_ALL_TRANSACTION(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      // -----------------------------
      //  MAPPER
      // -----------------------------
      const { entity_id,user_entity_id, ...rest } = queryRequestInfo(request);

      let extra_prams:any={};
      if(entity_id === 2){
        extra_prams["investor_id"]=user_entity_id;
      }else if(entity_id===3){
        extra_prams["issuer_id"]=user_entity_id;
      }
    
      // -----------------------------
      //  INTERACTOR
      // -----------------------------
      const result = await TokenTransaction.getAllTransactions({
        ...rest,
      });
      // -----------------------------
      //  RESPONSE
      // -----------------------------
      return handleResponse(request, reply, responseType?.OK, {
        data: result,
      });
    } catch (error: any) {
      Logger.error(request, error.message, error);
      return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
        error: {
          message: responseType?.INTERNAL_SERVER_ERROR,
        },
      });
    }
  }
  


// Get Investor Data For Qualification & Export it As CSV
export async function EXPORT_ALL_TRANSACTION_AS_CSV_FILE(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    /* -----------  MAPPER ----------- */

    const { entity_id,user_entity_id, ...rest } = queryRequestInfo(request);

    let extra_prams:any={};
    if(entity_id === 2){
      extra_prams["investor_id"]=user_entity_id;
    }else if(entity_id===3){
      extra_prams["issuer_id"]=user_entity_id;
    }
  
    // -----------------------------
    //  INTERACTOR
    // -----------------------------
    const result = await TokenTransaction.getAllTransactions({
      ...rest,
    });

    if (result?.page?.length === 0) {
      return handleResponse(request, reply, responseType?.NO_CONTENT, {
        customMessage: "No Data Found",
      });
    }

    const excelData =
      result?.page?.length > 0 &&
      result?.page.map((item: any) => ({
        "Date & Time":item?.creation_date ? dateTime.formatDate(item?.creation_date):"",
        "Sender": item?.sender_name ?? "",
        "Recipient": item?.receiver_name ?? "",
        "Token name": item?.token_name ?? "",
        "Investor Type": item?.investor_type_name ?? "",
        "Sender balance": item?.sender_balance ?? "",
        "Sender block / unblock": `${item?.sender_block??0} / ${item?.sender_unblock??0}`,
        "Recipient balance": item?.receiver_balance ?? "",
        "Recipient block / unblock": `${item?.receiver_block??0} / ${item?.receiver_unblock??0}`,
        "Total supply":item?.total_supply,
        "Txhash":item?.transaction_hash ?? ""
       
      }));

    /* Make Excel File */
    const data = await makeExcelFile(excelData, "transaction_data");

    /* -----------  Response  ----------- */
    return handleResponse(request, reply, responseType?.OK, {
      data,
    });
  } catch (error: any) {
    Logger.error(request, error.message, error);
    return handleResponse(request, reply, responseType?.INTERNAL_SERVER_ERROR, {
      error: {
        message: responseType?.INTERNAL_SERVER_ERROR,
      },
    });
  }
}