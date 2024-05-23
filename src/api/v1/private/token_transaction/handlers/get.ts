import { FastifyReply, FastifyRequest } from "fastify";
import { Logger, handleResponse, responseType } from "@helpers";
import { TokenTransaction } from "interactors";
import { queryRequestInfo } from "@mappers";

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
  