import { FastifyPluginAsync } from "fastify";

// import schema from "./schmea";
import handlers from "./handlers";

const uploads: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/start", { schema: {} }, handlers.CREATE_MULTI_PART_UPLOAD);
  fastify.post(
    "/presigned-url",
    { schema: {} },
    handlers.GET_MULTIPART_PRE_SIGNED_URL
  );
  fastify.post("/complete", { schema: {} }, handlers.COMPLETE_MULTIPART_UPLOAD);
  fastify.post("/cancel", { schema: {} }, handlers.CANCEL_MULTIPART_UPLOAD);
  fastify.post("/delete", { schema: {} }, handlers.DELETE_S3_OBJECT);
};

export default uploads;
